import { useState } from "react";
import logo from "../assets/logo.webp";
import "./Style/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo (always left) */}
      <div className="navbar-logo">
        <img src={logo} alt="File My RTI Logo" />
      </div>

      {/* Menu (desktop + mobile dropdown) */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="/">Home</a>

        <div className="dropdown">
          <button className="dropbtn">
            Category <span className="arrows">▼</span>
          </button>
          <div className="dropdown-content">
            <a href="/cat1">Category 1</a>
            <a href="/cat2">Category 2</a>
            <a href="/cat3">Category 3</a>
          </div>
        </div>

        {/* Show in desktop menu only */}
        <a href="#" className="search-desktop">🔍</a>
        <a
          href="https://filemyrti.com/apply/personal-rti/custom-request"
          className="apply-btn"
        >
          Apply Now
        </a>
      </div>

      {/* Mobile right controls */}
      <div className="right-controls">
        <button className="search-btn">🔍</button>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
