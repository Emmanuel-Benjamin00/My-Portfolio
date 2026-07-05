import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { siteConfig } from "../config/siteConfig";
import educationData from "../data/EducationData";
import Section from "../components/ui/Section";
import { useResumeAccess } from "../context/ResumeAccessContext";
import { useResumeSecret } from "../context/useResumeSecret";
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
              <a href={siteConfig.resume} target="_blank" rel="noreferrer">
                View Resume
              </a>
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
