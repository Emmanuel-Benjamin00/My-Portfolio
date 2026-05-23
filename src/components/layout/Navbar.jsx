import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/work", label: "Work" },
    ...(siteConfig.blog.show ? [{ to: "/blog", label: "Blog" }] : []),
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={`nav ${isScrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-brand" onClick={() => setIsOpen(false)}>
          <span className="nav-brand-mark">&lt;/&gt;</span>
          <span>{siteConfig.shortName}</span>
        </Link>

        <nav className={`nav-links ${isOpen ? "nav-links-open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary nav-cta"
          >
            Resume
          </a>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
