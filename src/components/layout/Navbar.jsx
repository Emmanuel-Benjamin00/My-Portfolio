import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { siteConfig } from "../../config/siteConfig";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    format();
    const id = setInterval(format, 60000);
    return () => clearInterval(id);
  }, []);

  return <span className="nav-widget-time">{time}</span>;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/work", label: "Work" },
    ...(siteConfig.blog.show ? [{ to: "/blog", label: "Blog" }] : []),
    { to: "/resume-builder", label: "Resume" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="nav-dhiraj">
      <div className="nav-dhiraj-inner">
        <Link to="/" className="nav-logo-serif" onClick={() => setIsOpen(false)}>
          {siteConfig.initials}
        </Link>

        <nav className={`nav-pill ${isOpen ? "nav-pill-open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-pill-link ${isActive ? "nav-pill-link-active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="nav-pill-book"
            onClick={() => setIsOpen(false)}
          >
            Book a Call
          </Link>
        </nav>

        <div className="nav-right">
          <div className="nav-widget">
            <span className="nav-widget-temp">
              <FontAwesomeIcon icon={faCloudSun} />
              32°C
            </span>
            <span className="nav-widget-divider" />
            <span className="nav-widget-loc">{siteConfig.locationShort}</span>
            <LiveClock />
          </div>

          <button
            type="button"
            className="nav-theme-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </button>

          <button
            type="button"
            className="nav-menu-btn"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
