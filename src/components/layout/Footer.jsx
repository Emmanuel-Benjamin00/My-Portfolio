import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { siteConfig } from "../../config/siteConfig";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <span className="footer-brand-mark">&lt;/&gt;</span>
              <span>{siteConfig.name}</span>
            </div>
            <p className="footer-tagline">{siteConfig.tagline}</p>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Navigation</h5>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/work">Work</Link></li>
              {siteConfig.blog.show && <li><Link to="/blog">Blog</Link></li>}
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Get in touch</h5>
            <ul className="footer-list">
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li className="text-dim">{siteConfig.location}</li>
            </ul>
            <div className="footer-socials">
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
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a href={`mailto:${siteConfig.email}`} aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} {siteConfig.name}. Built with React.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
