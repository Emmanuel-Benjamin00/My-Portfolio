import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import ResumePDF from "../components/resume/ResumePDF";
import {
  DEFAULT_SETTINGS,
  LAYOUT_PRESETS,
  withSettingsDefaults,
} from "../components/resume/resumeSettings";
import {
  BUILTIN_SECTIONS,
  genSectionId,
  normalizeOrder,
  sectionLabel,
} from "../components/resume/resumeOrder";
import {
  defaultFields,
  emptyItem,
  migrateData,
  findMissingRequired,
} from "../components/resume/customFields";
import {
  Input,
  Textarea,
  Select,
  AddBtn,
  RemoveBtn,
  ShowToggle,
  MoveButtons,
  CollapsibleCard,
} from "../components/resume/formControls";
import CustomSectionEditor from "../components/resume/CustomSectionEditor";
import AdminPanel from "../components/resume/AdminPanel";
import {
  isConfigured as cloudEnabled,
  isAdmin,
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
  loadResume,
  saveResume,
} from "../common/firebase";
import "./ResumeBuilder.css";

/* ── Blank templates for repeatable rows ── */
const emptyExperience = () => ({
  company: "",
  role: "",
  location: "",
  dates: "",
  bullets: "",
});
const emptyProject = () => ({ name: "", tech: "", bullets: "" });
const emptyEducation = () => ({
  school: "",
  degree: "",
  location: "",
  dates: "",
});
const emptySkill = () => ({ label: "", value: "" });
const emptySummary = () => ({ id: genSectionId(), text: "" });
const emptyCert = () => ({ text: "", disabled: false });
const emptyCustomSection = () => {
  const fields = defaultFields();
  return { id: genSectionId(), title: "", fields, items: [emptyItem(fields)] };
};

const initialSummary = emptySummary();

const initialData = {
  personal: {
    name: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    website: "",
  },
  // Multiple summary variants; only `selectedSummary` is rendered into the PDF.
  summaries: [initialSummary],
  selectedSummary: initialSummary.id,
  skills: [emptySkill()],
  experience: [emptyExperience()],
  projects: [emptyProject()],
  education: [emptyEducation()],
  certifications: [emptyCert()],
  customSections: [],
  sectionOrder: [...BUILTIN_SECTIONS],
  disabledSections: [], // section keys hidden from the PDF
  settings: { ...DEFAULT_SETTINGS }, // PDF layout: margins, fonts, spacing
  notes: "", // private scratchpad — never rendered into the PDF
};

const STORAGE_KEY = "resume-builder-data";

// Bring any saved/older resume up to the current shape.
function hydrate(raw) {
  const data = migrateData({ ...initialData, ...raw });
  // certifications: old string[] → { text, disabled }[]
  data.certifications = (data.certifications || []).map((c) =>
    typeof c === "string" ? { text: c, disabled: false } : c
  );
  if (!Array.isArray(data.disabledSections)) data.disabledSections = [];
  // summary: old single string → list of selectable variants. Read from `raw`
  // so the default `summaries` merged in from initialData never masks a legacy
  // string saved before this feature existed.
  if (!Array.isArray(raw && raw.summaries)) {
    const legacy =
      typeof (raw && raw.summary) === "string"
        ? raw.summary
        : typeof data.summary === "string"
          ? data.summary
          : "";
    data.summaries = [{ id: genSectionId(), text: legacy }];
  }
  if (!data.summaries.length) data.summaries = [emptySummary()];
  if (!data.summaries.some((s) => s.id === data.selectedSummary)) {
    data.selectedSummary = data.summaries[0].id;
  }
  delete data.summary;
  // Nested settings need their own merge — the top-level spread is shallow, so
  // a saved resume missing newer keys would otherwise arrive incomplete.
  data.settings = withSettingsDefaults(data.settings);
  return data;
}

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return hydrate(JSON.parse(saved));
  } catch {
    /* ignore corrupt storage */
  }
  return initialData;
}

export default function ResumeBuilder() {
  const [data, setData] = useState(loadInitial);
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);

  /* ── Cloud sync state ── */
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [syncState, setSyncState] = useState("idle"); // idle | loading | saving | saved | error
  const saveTimer = useRef(null);
  // Blocks auto-save until the cloud copy has been pulled in, so we never
  // overwrite a saved resume with the empty form during the sign-in window.
  const hydrated = useRef(false);

  // Watch auth; when a user signs in, pull their resume from the cloud.
  useEffect(() => {
    if (!cloudEnabled) {
      setAuthReady(true);
      return;
    }
    const unsub = onAuthStateChanged(async (u) => {
      hydrated.current = false; // runs synchronously before the re-render
      setUser(u);
      setAuthReady(true);
      if (u) {
        setSyncState("loading");
        try {
          const cloud = await loadResume(u.uid);
          if (cloud) {
            setData(hydrate(cloud));
            toast.info("Loaded your saved resume from the cloud.");
          }
          setSyncState("saved");
        } catch (err) {
          console.error(err);
          setSyncState("error");
        } finally {
          hydrated.current = true; // enable auto-save from here on
        }
      } else {
        setSyncState("idle");
      }
    });
    return unsub;
  }, []);

  // Auto-save to the cloud (debounced) whenever data changes while signed in.
  useEffect(() => {
    if (!cloudEnabled || !user || !hydrated.current) return;
    setSyncState("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await saveResume(user, data);
        setSyncState("saved");
      } catch (err) {
        console.error(err);
        setSyncState("error");
      }
    }, 900);
    return () => clearTimeout(saveTimer.current);
  }, [data, user]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      toast.error("Sign-in failed. Please try again.");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.info("Signed out. Edits now save on this device only.");
  };

  /* ── generic updaters ── */
  const setPersonal = (field, value) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));

  const setField = (field, value) =>
    setData((d) => ({ ...d, [field]: value }));

  /* ── PDF layout settings ── */
  const setSetting = (key, value) =>
    setData((d) => ({
      ...d,
      settings: { ...withSettingsDefaults(d.settings), [key]: value },
    }));

  // Apply a named preset (keeps the current page size, which is separate).
  const applyPreset = (name) =>
    setData((d) => ({
      ...d,
      settings: {
        ...withSettingsDefaults(d.settings),
        ...(LAYOUT_PRESETS[name] || {}),
      },
    }));

  const setListItem = (list, index, field, value) =>
    setData((d) => {
      const next = [...d[list]];
      next[index] = { ...next[index], [field]: value };
      return { ...d, [list]: next };
    });


  const addItem = (list, factory) =>
    setData((d) => ({ ...d, [list]: [...d[list], factory()] }));

  const removeItem = (list, index) =>
    setData((d) => ({
      ...d,
      [list]: d[list].filter((_, i) => i !== index),
    }));

  // Reorder an entry within a section list.
  const moveListItem = (list, from, to) =>
    setData((d) => {
      const arr = d[list];
      if (to < 0 || to >= arr.length || from === to) return d;
      const next = [...arr];
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      return { ...d, [list]: next };
    });

  /* ── summary variants ── */
  const addSummary = () => addItem("summaries", emptySummary);

  const removeSummary = (index) =>
    setData((d) => {
      const removed = d.summaries[index];
      const next = d.summaries.filter((_, i) => i !== index);
      // If the shown variant was removed, fall back to the first remaining one.
      const selectedSummary =
        d.selectedSummary === (removed && removed.id)
          ? next[0] && next[0].id
          : d.selectedSummary;
      return { ...d, summaries: next, selectedSummary };
    });

  /* ── custom-section updaters ── */
  const addSection = () =>
    setData((d) => {
      const sec = emptyCustomSection();
      return {
        ...d,
        customSections: [...d.customSections, sec],
        sectionOrder: [...normalizeOrder(d), sec.id],
      };
    });

  const removeSection = (si) =>
    setData((d) => {
      const removed = d.customSections[si];
      return {
        ...d,
        customSections: d.customSections.filter((_, i) => i !== si),
        sectionOrder: normalizeOrder(d).filter(
          (k) => k !== (removed && removed.id)
        ),
      };
    });

  /* ── section ordering ── */
  const moveSection = (from, to) =>
    setData((d) => {
      const order = normalizeOrder(d);
      if (to < 0 || to >= order.length || from === to) return d;
      const next = [...order];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...d, sectionOrder: next };
    });

  // Hide/show a whole section in the PDF (kept in the form either way).
  const toggleSection = (key) =>
    setData((d) => {
      const set = new Set(d.disabledSections || []);
      set.has(key) ? set.delete(key) : set.add(key);
      return { ...d, disabledSections: [...set] };
    });

  // Replace a whole custom section (fields + items + title) at index si.
  const updateSection = (si, nextSection) =>
    setData((d) => {
      const next = [...d.customSections];
      next[si] = nextSection;
      return { ...d, customSections: next };
    });

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  };

  const handleGenerate = async () => {
    if (!data.personal.name.trim()) {
      toast.warn("Add your name before generating the PDF.");
      return;
    }
    const missing = findMissingRequired(data.customSections);
    if (missing.length) {
      const { section, field } = missing[0];
      toast.warn(
        `Required field "${field}" in "${section}" is empty${
          missing.length > 1 ? ` (and ${missing.length - 1} more)` : ""
        }.`
      );
      return;
    }
    setGenerating(true);
    persist();
    try {
      const blob = await pdf(<ResumePDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.personal.name.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Resume PDF downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong generating the PDF.");
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Clear all fields? This cannot be undone.")) {
      setData(initialData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="rb-wrap">
      <header className="rb-head">
        <h1 className="rb-title">Resume Builder</h1>
        <p className="rb-sub">
          Fill in your details, preview live, and download a clean, ATS-friendly
          PDF.
        </p>

        <SyncBar
          cloudEnabled={cloudEnabled}
          authReady={authReady}
          user={user}
          syncState={syncState}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />

        <div className="rb-actions">
          <button
            className="rb-btn rb-btn-primary"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? "Generating…" : "Generate PDF"}
          </button>
          <button
            className="rb-btn rb-btn-ghost"
            onClick={() => setShowPreview((s) => !s)}
          >
            {showPreview ? "Hide Preview" : "Live Preview"}
          </button>
          <button className="rb-btn rb-btn-ghost" onClick={handleReset}>
            Reset
          </button>
        </div>
      </header>

      {isAdmin(user) && <AdminPanel />}

      <div className={`rb-layout ${showPreview ? "rb-layout-split" : ""}`}>
        <form className="rb-form" onBlur={persist} onSubmit={(e) => e.preventDefault()}>
          {/* ── Arrange sections ── */}
          <SectionArranger
            order={normalizeOrder(data)}
            customSections={data.customSections}
            disabledSections={data.disabledSections}
            onMove={moveSection}
            onToggle={toggleSection}
          />

          {/* ── Layout & Spacing (fit to one page) ── */}
          <LayoutPanel
            settings={withSettingsDefaults(data.settings)}
            onChange={setSetting}
            onPreset={applyPreset}
          />

          {/* ── Personal ── */}
          <CollapsibleCard title="Personal Details">
            <div className="rb-grid">
              <Input
                label="Full Name"
                value={data.personal.name}
                onChange={(v) => setPersonal("name", v)}
                placeholder="Emmanuel Benjamin D"
              />
              <Input
                label="Location"
                value={data.personal.location}
                onChange={(v) => setPersonal("location", v)}
                placeholder="Chennai, India"
              />
              <Input
                label="Phone"
                value={data.personal.phone}
                onChange={(v) => setPersonal("phone", v)}
                placeholder="+91 80000 00000"
              />
              <Input
                label="Email"
                value={data.personal.email}
                onChange={(v) => setPersonal("email", v)}
                placeholder="you@email.com"
              />
              <Input
                label="LinkedIn"
                value={data.personal.linkedin}
                onChange={(v) => setPersonal("linkedin", v)}
                placeholder="linkedin.com/in/username"
              />
              <Input
                label="GitHub"
                value={data.personal.github}
                onChange={(v) => setPersonal("github", v)}
                placeholder="github.com/username"
              />
              <Input
                label="Website / Portfolio"
                value={data.personal.website}
                onChange={(v) => setPersonal("website", v)}
                placeholder="yoursite.netlify.app"
              />
            </div>
          </CollapsibleCard>

          {/* ── Summary ── */}
          <CollapsibleCard title="Professional Summary">
            <p className="rb-notes-hint">
              Keep several summary variants — e.g. tailored to different roles —
              and pick the one shown on your resume.
            </p>
            {data.summaries.map((s, i) => {
              const shown = data.selectedSummary === s.id;
              return (
                <div
                  className={`rb-item ${shown ? "" : "rb-item-off"}`}
                  key={s.id}
                >
                  <div className="rb-item-head">
                    <label className="rb-summary-pick">
                      <input
                        type="radio"
                        name="rb-selected-summary"
                        checked={shown}
                        onChange={() => setField("selectedSummary", s.id)}
                      />
                      <span>
                        {shown ? "Shown on resume" : "Use this one"}
                      </span>
                    </label>
                    <div className="rb-item-actions">
                      <MoveButtons
                        onUp={() => moveListItem("summaries", i, i - 1)}
                        onDown={() => moveListItem("summaries", i, i + 1)}
                        disableUp={i === 0}
                        disableDown={i === data.summaries.length - 1}
                      />
                      <RemoveBtn
                        onClick={() => removeSummary(i)}
                        disabled={data.summaries.length === 1}
                      />
                    </div>
                  </div>
                  <Textarea
                    value={s.text}
                    onChange={(v) => setListItem("summaries", i, "text", v)}
                    placeholder="A short 2–3 sentence overview of who you are and what you do."
                    rows={4}
                  />
                </div>
              );
            })}
            <AddBtn label="Add summary variant" onClick={addSummary} />
          </CollapsibleCard>

          {/* ── Skills ── */}
          <CollapsibleCard title="Technical Skills">
            {data.skills.map((s, i) => (
              <div className={`rb-row ${s.disabled ? "rb-item-off" : ""}`} key={i}>
                <div className="rb-grid rb-grid-2 rb-flex1">
                  <Input
                    label="Category"
                    value={s.label}
                    onChange={(v) => setListItem("skills", i, "label", v)}
                    placeholder="Frontend & Mobile"
                  />
                  <Input
                    label="Skills (comma separated)"
                    value={s.value}
                    onChange={(v) => setListItem("skills", i, "value", v)}
                    placeholder="React, TypeScript, Redux…"
                  />
                </div>
                <MoveButtons
                  onUp={() => moveListItem("skills", i, i - 1)}
                  onDown={() => moveListItem("skills", i, i + 1)}
                  disableUp={i === 0}
                  disableDown={i === data.skills.length - 1}
                />
                <ShowToggle
                  checked={!s.disabled}
                  onChange={(on) => setListItem("skills", i, "disabled", !on)}
                />
                <RemoveBtn
                  onClick={() => removeItem("skills", i)}
                  disabled={data.skills.length === 1}
                />
              </div>
            ))}
            <AddBtn label="Add skill category" onClick={() => addItem("skills", emptySkill)} />
          </CollapsibleCard>

          {/* ── Experience ── */}
          <CollapsibleCard title="Experience">
            {data.experience.map((e, i) => (
              <div
                className={`rb-item ${e.disabled ? "rb-item-off" : ""}`}
                key={i}
              >
                <div className="rb-item-head">
                  <span>Experience {i + 1}</span>
                  <div className="rb-item-actions">
                    <MoveButtons
                      onUp={() => moveListItem("experience", i, i - 1)}
                      onDown={() => moveListItem("experience", i, i + 1)}
                      disableUp={i === 0}
                      disableDown={i === data.experience.length - 1}
                    />
                    <ShowToggle
                      checked={!e.disabled}
                      onChange={(on) =>
                        setListItem("experience", i, "disabled", !on)
                      }
                    />
                    <RemoveBtn
                      onClick={() => removeItem("experience", i)}
                      disabled={data.experience.length === 1}
                    />
                  </div>
                </div>
                <div className="rb-grid rb-grid-2">
                  <Input
                    label="Company"
                    value={e.company}
                    onChange={(v) => setListItem("experience", i, "company", v)}
                    placeholder="Company Name"
                  />
                  <Input
                    label="Role"
                    value={e.role}
                    onChange={(v) => setListItem("experience", i, "role", v)}
                    placeholder="Software Engineer"
                  />
                  <Input
                    label="Location"
                    value={e.location}
                    onChange={(v) => setListItem("experience", i, "location", v)}
                    placeholder="Chennai, India"
                  />
                  <Input
                    label="Dates"
                    value={e.dates}
                    onChange={(v) => setListItem("experience", i, "dates", v)}
                    placeholder="June 2024 – Present"
                  />
                </div>
                <Textarea
                  label="Bullet points (one per line)"
                  value={e.bullets}
                  onChange={(v) => setListItem("experience", i, "bullets", v)}
                  placeholder={"Built X that did Y…\nImproved Z by N%…"}
                  rows={4}
                />
              </div>
            ))}
            <AddBtn
              label="Add experience"
              onClick={() => addItem("experience", emptyExperience)}
            />
          </CollapsibleCard>

          {/* ── Projects ── */}
          <CollapsibleCard title="Projects">
            {data.projects.map((p, i) => (
              <div
                className={`rb-item ${p.disabled ? "rb-item-off" : ""}`}
                key={i}
              >
                <div className="rb-item-head">
                  <span>Project {i + 1}</span>
                  <div className="rb-item-actions">
                    <MoveButtons
                      onUp={() => moveListItem("projects", i, i - 1)}
                      onDown={() => moveListItem("projects", i, i + 1)}
                      disableUp={i === 0}
                      disableDown={i === data.projects.length - 1}
                    />
                    <ShowToggle
                      checked={!p.disabled}
                      onChange={(on) =>
                        setListItem("projects", i, "disabled", !on)
                      }
                    />
                    <RemoveBtn
                      onClick={() => removeItem("projects", i)}
                      disabled={data.projects.length === 1}
                    />
                  </div>
                </div>
                <div className="rb-grid rb-grid-2">
                  <Input
                    label="Project name"
                    value={p.name}
                    onChange={(v) => setListItem("projects", i, "name", v)}
                    placeholder="Full-Stack Restaurant System"
                  />
                  <Input
                    label="Tech stack"
                    value={p.tech}
                    onChange={(v) => setListItem("projects", i, "tech", v)}
                    placeholder="React, Express.js, MySQL"
                  />
                </div>
                <Textarea
                  label="Bullet points (one per line)"
                  value={p.bullets}
                  onChange={(v) => setListItem("projects", i, "bullets", v)}
                  placeholder={"What you built and the impact…"}
                  rows={3}
                />
              </div>
            ))}
            <AddBtn label="Add project" onClick={() => addItem("projects", emptyProject)} />
          </CollapsibleCard>

          {/* ── Education ── */}
          <CollapsibleCard title="Education">
            {data.education.map((e, i) => (
              <div
                className={`rb-item ${e.disabled ? "rb-item-off" : ""}`}
                key={i}
              >
                <div className="rb-item-head">
                  <span>Education {i + 1}</span>
                  <div className="rb-item-actions">
                    <MoveButtons
                      onUp={() => moveListItem("education", i, i - 1)}
                      onDown={() => moveListItem("education", i, i + 1)}
                      disableUp={i === 0}
                      disableDown={i === data.education.length - 1}
                    />
                    <ShowToggle
                      checked={!e.disabled}
                      onChange={(on) =>
                        setListItem("education", i, "disabled", !on)
                      }
                    />
                    <RemoveBtn
                      onClick={() => removeItem("education", i)}
                      disabled={data.education.length === 1}
                    />
                  </div>
                </div>
                <div className="rb-grid rb-grid-2">
                  <Input
                    label="School / University"
                    value={e.school}
                    onChange={(v) => setListItem("education", i, "school", v)}
                    placeholder="Crescent Institute of Science & Technology"
                  />
                  <Input
                    label="Degree"
                    value={e.degree}
                    onChange={(v) => setListItem("education", i, "degree", v)}
                    placeholder="B.Tech in ECE (CGPA: 7.9)"
                  />
                  <Input
                    label="Location"
                    value={e.location}
                    onChange={(v) => setListItem("education", i, "location", v)}
                    placeholder="Chennai, India"
                  />
                  <Input
                    label="Dates"
                    value={e.dates}
                    onChange={(v) => setListItem("education", i, "dates", v)}
                    placeholder="June 2018 – May 2022"
                  />
                </div>
              </div>
            ))}
            <AddBtn
              label="Add education"
              onClick={() => addItem("education", emptyEducation)}
            />
          </CollapsibleCard>

          {/* ── Certifications ── */}
          <CollapsibleCard title="Certifications & Training">
            {data.certifications.map((c, i) => (
              <div className={`rb-row ${c.disabled ? "rb-item-off" : ""}`} key={i}>
                <div className="rb-flex1">
                  <Input
                    value={c.text}
                    onChange={(v) => setListItem("certifications", i, "text", v)}
                    placeholder="Full-Stack Developer Program – Guvi"
                  />
                </div>
                <MoveButtons
                  onUp={() => moveListItem("certifications", i, i - 1)}
                  onDown={() => moveListItem("certifications", i, i + 1)}
                  disableUp={i === 0}
                  disableDown={i === data.certifications.length - 1}
                />
                <ShowToggle
                  checked={!c.disabled}
                  onChange={(on) =>
                    setListItem("certifications", i, "disabled", !on)
                  }
                />
                <RemoveBtn
                  onClick={() => removeItem("certifications", i)}
                  disabled={data.certifications.length === 1}
                />
              </div>
            ))}
            <AddBtn
              label="Add certification"
              onClick={() => addItem("certifications", emptyCert)}
            />
          </CollapsibleCard>

          {/* ── Custom sections (fully user-defined fields) ── */}
          {data.customSections.map((sec, si) => (
            <CustomSectionEditor
              key={sec.id || si}
              section={sec}
              onChange={(next) => updateSection(si, next)}
              onRemove={() => removeSection(si)}
            />
          ))}

          <button
            type="button"
            className="rb-add-section"
            onClick={addSection}
          >
            + Add custom section
            <span className="rb-add-section-hint">
              Internships, Awards, Languages, Volunteering…
            </span>
          </button>

          {/* ── Private scratchpad — future points, never in the PDF ── */}
          <CollapsibleCard
            title="Scratchpad · Future Points"
            className="rb-card-notes"
            defaultOpen={false}
          >
            <p className="rb-notes-hint">
              Jot down points you might add to your resume later. This is just
              for you — it is saved &amp; synced but never appears in the PDF.
            </p>
            <Textarea
              value={data.notes}
              onChange={(v) => setField("notes", v)}
              placeholder={
                "• Led migration to TypeScript\n• AWS certification (in progress)\n• Open-source contribution to …"
              }
              rows={6}
            />
          </CollapsibleCard>
        </form>

        {showPreview && (
          <div className="rb-preview">
            <PDFViewer className="rb-pdf-viewer" showToolbar={false}>
              <ResumePDF data={data} />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Layout & Spacing panel — tune margins/fonts/gaps to fit one page ── */
const PRESET_BUTTONS = [
  { key: "normal", label: "Normal", hint: "Roomy default" },
  { key: "compact", label: "Compact", hint: "Fits more" },
  { key: "ultra", label: "Ultra", hint: "Tightest" },
];

const PAGE_SIZE_OPTIONS = [
  { value: "A4", label: "A4" },
  { value: "LETTER", label: "US Letter" },
];

// step controls the slider granularity; some knobs move in half-points.
const SLIDERS = [
  { key: "margin", label: "Page margin", min: 20, max: 48, step: 1, unit: "pt" },
  { key: "fontSize", label: "Body font size", min: 8.5, max: 11.5, step: 0.5, unit: "pt" },
  { key: "lineHeight", label: "Line height", min: 1.1, max: 1.5, step: 0.05, unit: "" },
  { key: "sectionGap", label: "Section spacing", min: 6, max: 20, step: 1, unit: "pt" },
  { key: "entryGap", label: "Entry spacing", min: 3, max: 14, step: 1, unit: "pt" },
  { key: "nameSize", label: "Name size", min: 16, max: 28, step: 1, unit: "pt" },
];

function LayoutPanel({ settings, onChange, onPreset }) {
  return (
    <CollapsibleCard title="Layout & Spacing" defaultOpen={false}>
      <p className="rb-layout-hint">
        Fit your resume onto one page by tightening spacing and fonts — no need
        to cut content. Start with a preset, then fine-tune.
      </p>

      <div className="rb-preset-row">
        {PRESET_BUTTONS.map((p) => (
          <button
            key={p.key}
            type="button"
            className="rb-preset-btn"
            onClick={() => onPreset(p.key)}
            title={p.hint}
          >
            <span className="rb-preset-label">{p.label}</span>
            <span className="rb-preset-hint">{p.hint}</span>
          </button>
        ))}
      </div>

      <div className="rb-field rb-pagesize">
        <Select
          label="Page size"
          value={settings.pageSize}
          onChange={(v) => onChange("pageSize", v)}
          options={PAGE_SIZE_OPTIONS}
        />
      </div>

      <div className="rb-slider-grid">
        {SLIDERS.map((s) => (
          <Range
            key={s.key}
            label={s.label}
            value={settings[s.key]}
            min={s.min}
            max={s.max}
            step={s.step}
            unit={s.unit}
            onChange={(v) => onChange(s.key, v)}
          />
        ))}
      </div>
    </CollapsibleCard>
  );
}

LayoutPanel.propTypes = {
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onPreset: PropTypes.func.isRequired,
};

/* Labeled range slider with a live numeric readout. */
function Range({ label, value, min, max, step, unit, onChange }) {
  const display = Number.isInteger(value) ? value : Number(value.toFixed(2));
  return (
    <label className="rb-range">
      <span className="rb-range-head">
        <span className="rb-label">{label}</span>
        <span className="rb-range-value">
          {display}
          {unit}
        </span>
      </span>
      <input
        type="range"
        className="rb-range-input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

Range.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  unit: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

/* ── Cloud sync status bar ── */
const SYNC_LABEL = {
  loading: "Loading…",
  saving: "Saving…",
  saved: "All changes saved to cloud",
  error: "Sync error — retrying on next edit",
  idle: "",
};

function SyncBar({ cloudEnabled, authReady, user, syncState, onSignIn, onSignOut }) {
  if (!cloudEnabled) {
    return (
      <div className="rb-sync rb-sync-local">
        Saved on this device only. Cloud sync isn&apos;t configured yet.
      </div>
    );
  }
  if (!authReady) {
    return <div className="rb-sync">Checking sign-in…</div>;
  }
  if (!user) {
    return (
      <div className="rb-sync">
        <span className="rb-sync-hint">
          Sign in to save your resume and open it on any device.
        </span>
        <button className="rb-btn rb-btn-google" onClick={onSignIn}>
          <GoogleGlyph /> Sign in with Google
        </button>
      </div>
    );
  }
  return (
    <div className="rb-sync">
      <span className={`rb-sync-dot rb-sync-${syncState}`} />
      <span className="rb-sync-status">
        {SYNC_LABEL[syncState] || "Synced"}
      </span>
      <span className="rb-sync-user">· {user.email}</span>
      <button className="rb-link-btn" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

SyncBar.propTypes = {
  cloudEnabled: PropTypes.bool,
  authReady: PropTypes.bool,
  user: PropTypes.object,
  syncState: PropTypes.string,
  onSignIn: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

/* ── Drag-and-drop section reordering + show/hide ── */
function SectionArranger({ order, customSections, disabledSections, onMove, onToggle }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const hidden = new Set(disabledSections || []);

  const handleDrop = (target) => {
    if (dragIndex !== null && target !== null) onMove(dragIndex, target);
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <fieldset className="rb-card rb-arrange">
      <legend>Arrange Sections</legend>
      <p className="rb-arrange-hint">
        Drag ⠿ or use ↑ ↓ to reorder. Toggle a section to show/hide it in the
        PDF without deleting it.
      </p>
      <ul className="rb-arrange-list">
        {order.map((key, i) => {
          const off = hidden.has(key);
          return (
            <li
              key={key}
              className={`rb-arrange-item ${dragIndex === i ? "rb-dragging" : ""} ${
                overIndex === i && dragIndex !== i ? "rb-drop-target" : ""
              } ${off ? "rb-item-off" : ""}`}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => {
                e.preventDefault();
                setOverIndex(i);
              }}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
            >
              <span className="rb-grip" aria-hidden="true">
                ⠿
              </span>
              <span className="rb-arrange-label">
                {sectionLabel(key, customSections)}
              </span>
              <ShowToggle checked={!off} onChange={() => onToggle(key)} />
              <span className="rb-arrange-btns">
                <button
                  type="button"
                  onClick={() => onMove(i, i - 1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => onMove(i, i + 1)}
                  disabled={i === order.length - 1}
                  aria-label="Move down"
                  title="Move down"
                >
                  ↓
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

SectionArranger.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string).isRequired,
  customSections: PropTypes.array,
  disabledSections: PropTypes.array,
  onMove: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

