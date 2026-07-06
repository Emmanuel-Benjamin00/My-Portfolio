import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { siteConfig } from "../config/siteConfig";
import educationData from "../data/EducationData";
import Section from "../components/ui/Section";
import { useResumeAccess } from "../context/ResumeAccessContext";
import { useResumeSecret } from "../context/useResumeSecret";
import {
  isConfigured as cloudEnabled,
  onAuthStateChanged,
  loadResumeData,
  uploadResumeFile,
  OWNER_EMAIL,
  RESUME_MAX_BYTES,
} from "../common/firebase";
import "./About.css";

function About() {
  const experience = siteConfig.experience.filter((e) => !e.hidden);

  // Secret: type the unlock code anywhere on this page (desktop) or tap the
  // "About me" label 10 times (mobile) to reveal the Resume tab.
  const { onSecretTap } = useResumeSecret();
  const { unlocked } = useResumeAccess();
  const wasUnlocked = useRef(unlocked);
  useEffect(() => {
    if (unlocked && !wasUnlocked.current) {
      toast.success("Resume Builder unlocked 🔓");
    } else if (!unlocked && wasUnlocked.current) {
      toast.info("Resume Builder hidden 🔒");
    }
    wasUnlocked.current = unlocked;
  }, [unlocked]);

  // ── Public resume: "View Resume" points to the latest uploaded PDF (if any),
  // falling back to the static link in siteConfig. Only the owner, once signed
  // in through the Resume Builder, sees the Upload control.
  const [resumeUrl, setResumeUrl] = useState(siteConfig.resume);
  const [isOwner, setIsOwner] = useState(false);
  const [uploadPct, setUploadPct] = useState(null); // null = idle, 0–100 = in progress
  const [justUploaded, setJustUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const doneTimer = useRef(null);
  // Object URL for the PDF rebuilt in the browser; tracked so we can revoke
  // (i.e. "delete") the previous one whenever a newer resume replaces it.
  const blobUrlRef = useRef(null);

  // Turn a stored base64 data URL into a fresh blob URL and swap it in,
  // revoking whatever blob URL was showing before.
  const showResumeFromDataUrl = async (dataUrl) => {
    const blob = await (await fetch(dataUrl)).blob();
    const url = URL.createObjectURL(blob);
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    blobUrlRef.current = url;
    setResumeUrl(url);
  };

  useEffect(() => {
    let active = true;
    loadResumeData().then((res) => {
      if (active && res?.dataUrl) showResumeFromDataUrl(res.dataUrl);
    });
    const unsub = cloudEnabled
      ? onAuthStateChanged((u) => {
          if (active) setIsOwner(Boolean(u && u.email === OWNER_EMAIL));
        })
      : () => {};
    return () => {
      active = false;
      unsub();
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      clearTimeout(doneTimer.current);
    };
  }, []);

  const handleResumeFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.warn("Please choose a PDF file.");
      return;
    }
    if (file.size > RESUME_MAX_BYTES) {
      toast.warn(
        `PDF is too large (max ${Math.round(RESUME_MAX_BYTES / 1024)} KB). ` +
          "Compress it and try again."
      );
      return;
    }
    clearTimeout(doneTimer.current);
    setJustUploaded(false);
    setUploadPct(0);
    try {
      const dataUrl = await uploadResumeFile(file, setUploadPct);
      await showResumeFromDataUrl(dataUrl);
      setUploadPct(null); // done → button re-enabled
      setJustUploaded(true); // show "Uploaded ✓"
      doneTimer.current = setTimeout(() => setJustUploaded(false), 4000);
      toast.success("Resume updated — View Resume now opens the latest upload.");
    } catch (err) {
      console.error(err);
      setUploadPct(null);
      toast.error(
        err?.message === "FILE_TOO_LARGE"
          ? "That PDF is too large to store. Please compress it."
          : "Upload failed. Please try again."
      );
    }
  };

  return (
    <>
      {/* ── Intro ─── */}
      <Section
        eyebrow="About me"
        title={siteConfig.about.headline}
        onEyebrowClick={onSecretTap}
      >
        <div className="about-grid">
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            {siteConfig.about.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>

          <motion.div
            className="about-meta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="about-meta-item">
              <span className="about-meta-label">Location</span>
              <span>{siteConfig.location}</span>
            </div>
            <div className="about-meta-item">
              <span className="about-meta-label">Experience</span>
              <span>{siteConfig.yearsOfExperience}+ years</span>
            </div>
            <div className="about-meta-item">
              <span className="about-meta-label">Email</span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
            <div className="about-meta-item">
              <span className="about-meta-label">Resume</span>
              <div className="about-resume-row">
                <a href={resumeUrl} target="_blank" rel="noreferrer">
                  View Resume
                </a>
                {unlocked && isOwner && (
                  <>
                    <button
                      type="button"
                      className={`about-upload-btn ${
                        justUploaded ? "about-upload-done" : ""
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadPct !== null}
                    >
                      {uploadPct !== null
                        ? `Uploading ${uploadPct}%`
                        : justUploaded
                        ? "Uploaded ✓"
                        : "Upload"}
                    </button>
                    {uploadPct !== null && (
                      <span className="about-upload-bar" aria-hidden="true">
                        <span
                          className="about-upload-bar-fill"
                          style={{ width: `${uploadPct}%` }}
                        />
                      </span>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      hidden
                      onChange={handleResumeFile}
                    />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Skills ─── */}
      <Section eyebrow="Skills" title="What I work with">
        <div className="skills-grid">
          {siteConfig.skillGroups.map((group) => (
            <motion.div
              key={group.label}
              className="skill-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
            >
              <h4>{group.label}</h4>
              <div className="skill-chips">
                {group.items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Experience ─── */}
      <Section eyebrow="Career" title="Experience">
        <div className="timeline">
          {experience.map((role, i) => (
            <motion.div
              key={`${role.company}-${i}`}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>{role.role}</h4>
                  <span className="timeline-period">{role.period}</span>
                </div>
                <p className="timeline-company">{role.company}</p>
                <p className="timeline-desc">{role.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Education ─── */}
      <Section eyebrow="Background" title="Education & Certifications">
        <div className="edu-grid">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.course}
              className="edu-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="edu-logo">
                <img src={edu.logo} alt={edu.institute} />
              </div>
              <h4>{edu.course}</h4>
              <p className="edu-inst">{edu.institute}</p>
              <p className="edu-year">{edu.year}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── HIDDEN: Currently working on ─── */}
      {siteConfig.currentlyWorkingOn.show && (
        <Section eyebrow="Now" title="What I'm currently working on">
          <ul className="now-list">
            {siteConfig.currentlyWorkingOn.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── HIDDEN: Achievements ─── */}
      {siteConfig.achievements.show && (
        <Section eyebrow="Recognition" title="Achievements">
          <div className="grid grid-2">
            {siteConfig.achievements.items.map((a, i) => (
              <div key={i} className="card">
                <h4>{a.title}</h4>
                <p className="text-muted">{a.org} — {a.year}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── HIDDEN: Testimonials ─── */}
      {siteConfig.testimonials.show && (
        <Section eyebrow="Words" title="What people say">
          <div className="grid grid-2">
            {siteConfig.testimonials.items.map((t, i) => (
              <div key={i} className="card">
                <p style={{ fontStyle: "italic", marginBottom: 12 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-dim" style={{ fontSize: "0.85rem" }}>
                  — {t.author}, {t.role}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

export default About;
