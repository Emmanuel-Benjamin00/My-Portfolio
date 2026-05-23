import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { siteConfig } from "../config/siteConfig";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-arc-wrap" aria-hidden="true">
        <motion.div
          className="home-arc-glow home-arc-glow--purple"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="home-arc-glow home-arc-glow--blue"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="home-arc-rim" />
      </div>
      <div className="home-mesh home-mesh--amber" aria-hidden="true" />
      <div className="home-mesh home-mesh--cyan" aria-hidden="true" />

      <section className="home-hero">
        <div className="home-hero-inner">
          <motion.div
            className="home-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="home-badge-dot" aria-hidden="true" />
            Available for opportunities
          </motion.div>

          <motion.h1
            className="home-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Hi, I&apos;m{" "}
            <span className="home-headline-accent">{siteConfig.shortName}</span>.
            <br />
            {siteConfig.title}.
          </motion.h1>

          <motion.p
            className="home-subline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            {siteConfig.tagline} Based in {siteConfig.location} with{" "}
            {siteConfig.yearsOfExperience} years of experience.
          </motion.p>

          <motion.div
            className="home-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <Link to="/work" className="home-connect-btn">
              <span>View my work</span>
              <span className="home-connect-arrow" aria-hidden="true">
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </Link>

            <Link to="/contact" className="home-cta-secondary">
              Get in touch
            </Link>
          </motion.div>

          <motion.div
            className="home-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
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
    </div>
  );
}

export default Home;
