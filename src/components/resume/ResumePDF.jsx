import PropTypes from "prop-types";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { normalizeOrder } from "./resumeOrder";

/* ── Resume stylesheet (Arial/Helvetica sans-serif, 0.5in margins) ── */
const styles = StyleSheet.create({
  page: {
    padding: 36, // 0.5 inch on all four sides (72pt = 1in)
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#000000",
    lineHeight: 1.4,
  },

  /* Header */
  header: { marginBottom: 6 },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  contactLine: {
    textAlign: "center",
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#000000",
  },
  link: { color: "#000000", textDecoration: "underline" },
  sep: { color: "#000000" },

  /* Section heading with rule */
  section: { marginTop: 15 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  rule: {
    borderBottomWidth: 0.7,
    borderBottomColor: "#000000",
    marginTop: 3,
    marginBottom: 6,
  },

  summary: { fontSize: 10, textAlign: "justify" },

  /* Entry (experience / education / project) */
  entry: { marginTop: 8 },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  entryRight: { fontSize: 10 },
  entrySubRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  entrySubLeft: { fontFamily: "Helvetica-Oblique", fontSize: 10 },
  entrySubRight: { fontFamily: "Helvetica-Oblique", fontSize: 10 },

  /* Bullets */
  bulletRow: { flexDirection: "row", marginTop: 4, paddingLeft: 8 },
  bulletDot: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, textAlign: "justify" },

  /* Skills / one-line rows */
  skillRow: { marginTop: 4, flexDirection: "row" },
  skillLabel: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  skillValue: { fontSize: 10, flex: 1 },

  projectTitleRow: { flexDirection: "row" },
  projectTech: { fontFamily: "Helvetica-Oblique", fontSize: 10 },

  /* Custom-field rendering */
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  fieldText: { fontSize: 10 },
  fieldPara: { fontSize: 10, textAlign: "justify", marginTop: 2 },
  fBold: { fontFamily: "Helvetica-Bold" },
  fItalic: { fontFamily: "Helvetica-Oblique" },
  fNormal: { fontFamily: "Helvetica" },
});

const emphasisStyle = (f) =>
  f.style === "bold"
    ? styles.fBold
    : f.style === "italic"
      ? styles.fItalic
      : styles.fNormal;

const fieldDisplay = (f, value) =>
  f.showLabel && isFilled(f.label) ? `${f.label}: ${value}` : value;

const isFilled = (v) => Boolean(v && String(v).trim().length > 0);

const personalShape = PropTypes.shape({
  name: PropTypes.string,
  location: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  website: PropTypes.string,
});

function Bullet({ children }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>{"•"}</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function SectionHeading({ title }) {
  // minPresenceAhead: if there isn't at least this much room below the heading
  // on the current page, push the whole heading to the next page instead of
  // stranding it above a blank gap (its first entry uses wrap={false}).
  return (
    <View style={styles.section} minPresenceAhead={72}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.rule} />
    </View>
  );
}

Bullet.propTypes = { children: PropTypes.node };
SectionHeading.propTypes = { title: PropTypes.string.isRequired };
ContactLine.propTypes = { personal: personalShape.isRequired };

/* Build the contact line from whatever fields are present */
function ContactLine({ personal }) {
  const parts = [];
  if (isFilled(personal.location)) parts.push({ text: personal.location });
  if (isFilled(personal.phone)) parts.push({ text: personal.phone });
  if (isFilled(personal.email))
    parts.push({ text: personal.email, href: `mailto:${personal.email}` });

  const links = [];
  if (isFilled(personal.linkedin))
    links.push({
      text: prettyUrl(personal.linkedin),
      href: normalizeUrl(personal.linkedin),
    });
  if (isFilled(personal.github))
    links.push({
      text: prettyUrl(personal.github),
      href: normalizeUrl(personal.github),
    });
  if (isFilled(personal.website))
    links.push({
      text: prettyUrl(personal.website),
      href: normalizeUrl(personal.website),
    });

  const renderRow = (items) =>
    items.map((it, i) => (
      <Text key={i}>
        {i > 0 ? <Text style={styles.sep}>{"  |  "}</Text> : null}
        {it.href ? (
          <Link src={it.href} style={styles.link}>
            {it.text}
          </Link>
        ) : (
          <Text>{it.text}</Text>
        )}
      </Text>
    ));

  return (
    <>
      {parts.length > 0 && (
        <Text style={styles.contactLine}>{renderRow(parts)}</Text>
      )}
      {links.length > 0 && (
        <Text style={styles.contactLine}>{renderRow(links)}</Text>
      )}
    </>
  );
}

function normalizeUrl(u) {
  const s = String(u).trim();
  if (/^https?:\/\//i.test(s)) return s;
  if (/^mailto:/i.test(s)) return s;
  return `https://${s}`;
}

// Clean text shown for a link: drop protocol, "www.", and trailing slash,
// so full pasted URLs still read tidily (e.g. "github.com/user").
function prettyUrl(u) {
  return String(u)
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/+$/, "");
}

function splitLines(text) {
  return String(text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

ResumePDF.propTypes = {
  data: PropTypes.shape({
    personal: personalShape.isRequired,
    summary: PropTypes.string,
    skills: PropTypes.array,
    experience: PropTypes.array,
    projects: PropTypes.array,
    education: PropTypes.array,
    certifications: PropTypes.array,
    customSections: PropTypes.array,
    disabledSections: PropTypes.array,
  }).isRequired,
};

const enabled = (item) => !item || !item.disabled;

export default function ResumePDF({ data }) {
  const {
    personal,
    summary,
    skills: allSkills,
    experience: allExperience,
    projects: allProjects,
    education: allEducation,
    certifications: allCertifications,
    customSections = [],
    disabledSections = [],
  } = data;

  // Drop items the user has disabled before building any section.
  const skills = (allSkills || []).filter(enabled);
  const experience = (allExperience || []).filter(enabled);
  const projects = (allProjects || []).filter(enabled);
  const education = (allEducation || []).filter(enabled);
  const certifications = (allCertifications || []).filter(enabled);

  // Build each section as a keyed node; render null when empty so ordering
  // never leaves blank headings behind.
  const nodes = {
    summary: isFilled(summary) ? (
      <View>
        <SectionHeading title="Professional Summary" />
        <Text style={styles.summary}>{summary}</Text>
      </View>
    ) : null,

    skills: skills.some((s) => isFilled(s.value)) ? (
      <View>
        <SectionHeading title="Technical Skills" />
        {skills
          .filter((s) => isFilled(s.value))
          .map((s, i) =>
            isFilled(s.label) ? (
              <View key={i} style={styles.skillRow}>
                <Text style={styles.skillValue}>
                  <Text style={styles.skillLabel}>{s.label}: </Text>
                  {s.value}
                </Text>
              </View>
            ) : (
              <Bullet key={i}>{s.value}</Bullet>
            )
          )}
      </View>
    ) : null,

    experience: experience.some(
      (e) => isFilled(e.company) || isFilled(e.role) || splitLines(e.bullets).length
    ) ? (
      <View>
        <SectionHeading title="Experience" />
        {experience.map((e, i) => {
          const bullets = splitLines(e.bullets);
          if (!isFilled(e.company) && !isFilled(e.role) && !bullets.length)
            return null;
          return (
            <View key={i} style={styles.entry}>
              {/* Header stays together and won't orphan at a page bottom; the
                  bullets below are free to flow onto the next page. */}
              <View wrap={false} minPresenceAhead={40}>
                <View style={styles.entryRow}>
                  <Text style={styles.entryTitle}>{e.company}</Text>
                  <Text style={styles.entryRight}>{e.dates}</Text>
                </View>
                <View style={styles.entrySubRow}>
                  <Text style={styles.entrySubLeft}>{e.role}</Text>
                  <Text style={styles.entrySubRight}>{e.location}</Text>
                </View>
              </View>
              {bullets.map((b, j) => (
                <Bullet key={j}>{b}</Bullet>
              ))}
            </View>
          );
        })}
      </View>
    ) : null,

    projects: projects.some(
      (p) => isFilled(p.name) || splitLines(p.bullets).length
    ) ? (
      <View>
        <SectionHeading title="Projects" />
        {projects.map((p, i) => {
          const bullets = splitLines(p.bullets);
          if (!isFilled(p.name) && !bullets.length) return null;
          return (
            <View key={i} style={styles.entry}>
              <View wrap={false} minPresenceAhead={40}>
                <Text style={styles.projectTitleRow}>
                  <Text style={styles.entryTitle}>{p.name}</Text>
                  {isFilled(p.tech) && (
                    <Text style={styles.projectTech}>{"  |  " + p.tech}</Text>
                  )}
                </Text>
              </View>
              {bullets.map((b, j) => (
                <Bullet key={j}>{b}</Bullet>
              ))}
            </View>
          );
        })}
      </View>
    ) : null,

    education: education.some(
      (e) => isFilled(e.school) || isFilled(e.degree)
    ) ? (
      <View>
        <SectionHeading title="Education" />
        {education.map((e, i) => {
          if (!isFilled(e.school) && !isFilled(e.degree)) return null;
          return (
            <View key={i} style={styles.entry} wrap={false}>
              <View style={styles.entryRow}>
                <Text style={styles.entryTitle}>{e.school}</Text>
                <Text style={styles.entryRight}>{e.location}</Text>
              </View>
              <View style={styles.entrySubRow}>
                <Text style={styles.entrySubLeft}>{e.degree}</Text>
                <Text style={styles.entrySubRight}>{e.dates}</Text>
              </View>
            </View>
          );
        })}
      </View>
    ) : null,

    certifications: certifications.filter((c) => isFilled(c.text)).length > 0 ? (
      <View>
        <SectionHeading title="Certifications & Training" />
        {certifications
          .filter((c) => isFilled(c.text))
          .map((c, i) => (
            <View key={i} style={styles.skillRow}>
              <Text style={styles.skillValue}>{c.text}</Text>
            </View>
          ))}
      </View>
    ) : null,
  };

  // Custom sections keyed by their id.
  for (const sec of customSections) {
    if (!sec || !sec.id) continue;
    nodes[sec.id] = renderCustomSection(sec);
  }

  const order = normalizeOrder(data);
  const hidden = new Set(disabledSections);

  return (
    <Document title={personal.name || "Resume"} author={personal.name || ""}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal.name || "Your Name"}</Text>
          <ContactLine personal={personal} />
        </View>

        {order.map((key) =>
          !hidden.has(key) && nodes[key] ? (
            <View key={key}>{nodes[key]}</View>
          ) : null
        )}
      </Page>
    </Document>
  );
}

/* Render one fully-custom section from its field schema.
 * Left/right single-line text fields pair up into a justified row (like the
 * classic "Company … Dates" line); paragraphs and bullet lists span full width. */
function renderCustomSection(sec) {
  const fields = sec.fields || [];
  const items = (sec.items || [])
    .filter((it) => !it.disabled)
    .filter((it) => fields.some((f) => isFilled(it[f.id])));
  if (!isFilled(sec.title) && !items.length) return null;

  return (
    <View>
      <SectionHeading title={sec.title || "Additional"} />
      {items.map((item, idx) => (
        <View key={idx} style={styles.entry} minPresenceAhead={40}>
          {renderEntryFields(fields, item)}
        </View>
      ))}
    </View>
  );
}

function renderEntryFields(fields, item) {
  const out = [];
  let pending = null; // holds a left text awaiting an optional right partner

  const flush = () => {
    if (!pending) return;
    out.push(
      <View key={`row-${out.length}`} style={styles.fieldRow}>
        <Text style={pending.leftStyle}>{pending.left || ""}</Text>
        {pending.right != null && (
          <Text style={pending.rightStyle}>{pending.right}</Text>
        )}
      </View>
    );
    pending = null;
  };

  fields.forEach((f) => {
    const raw = item[f.id];
    if (!isFilled(raw)) return;
    const style = [styles.fieldText, emphasisStyle(f)];

    if (f.type === "textarea") {
      flush();
      out.push(
        <Text key={`ta-${f.id}`} style={[styles.fieldPara, emphasisStyle(f)]}>
          {fieldDisplay(f, raw)}
        </Text>
      );
    } else if (f.type === "bullets") {
      flush();
      splitLines(raw).forEach((b, i) =>
        out.push(
          <Bullet key={`b-${f.id}-${i}`}>
            {i === 0 ? fieldDisplay(f, b) : b}
          </Bullet>
        )
      );
    } else {
      // single-line text: pair left + right into one justified row
      const text = fieldDisplay(f, raw);
      if (f.align === "right") {
        if (!pending) pending = { left: "" };
        pending.right = text;
        pending.rightStyle = style;
        flush();
      } else {
        if (pending && pending.left) flush();
        pending = { ...(pending || {}), left: text, leftStyle: style };
      }
    }
  });
  flush();
  return out;
}
