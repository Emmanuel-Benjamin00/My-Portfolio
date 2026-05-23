import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { siteConfig } from "../config/siteConfig";
import projectsData from "../data/projectData";
import skillData from "../data/SkillData";
import Section from "../components/ui/Section";
import ProjectCard from "../components/ui/ProjectCard";
import "./Home.css";

function Home() {
  const featured = siteConfig.featuredProjects
    .map((title) => projectsData.find((p) => p.title === title))
    .filter(Boolean);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-pill">
              <span className="hero-pill-dot"></span>
              Available for opportunities
            </div>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hi, I&apos;m <span className="text-accent">{siteConfig.shortName}</span>.
            <br />
            {siteConfig.title}.
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {siteConfig.tagline} Based in {siteConfig.location} with{" "}
            {siteConfig.yearsOfExperience} years of experience.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/work" className="btn btn-primary">
              View my work
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Work ────────────────────────────────────── */}
      <Section
        eyebrow="Selected Work"
        title="Things I've built"
        subtitle="A few recent projects. See all on the work page."
      >
        <div className="featured-grid">
          {featured.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
        <div className="featured-cta">
          <Link to="/work" className="btn btn-secondary">
            View all projects
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </Section>

      {/* ── Tech Stack preview ───────────────────────────────── */}
      <Section eyebrow="Stack" title="Technologies I work with">
        <div className="stack-grid">
          {skillData.map((skill) => (
            <div key={skill.name} className="stack-item">
              <img src={skill.img} alt={skill.name} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="home-cta">
        <div className="container">
          <motion.div
            className="home-cta-inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2>Let&apos;s build something together.</h2>
            <p>
              Open to full-time roles and interesting freelance projects.
              Reach out and let&apos;s talk.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Contact me
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <a
                href={siteConfig.resume}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home;
