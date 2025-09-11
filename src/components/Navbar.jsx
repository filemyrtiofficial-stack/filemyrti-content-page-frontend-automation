import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.webp";
import "./Style/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // prevent background scroll when mobile menu is open
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSearchClick = () => {
    navigate("/search");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="File My RTI Logo" />
      </div>

      {/* Links (desktop + mobile drawer) */}
      <div
        id="mobile-menu"
        className={`nav-links ${menuOpen ? "active" : ""}`}
        aria-hidden={!menuOpen}
        role="navigation"
      >
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

        <button onClick={handleSearchClick} className="search-desktop">
            <FontAwesomeIcon icon={faSearch} />
        </button>

        <a
          href="https://filemyrti.com/apply/personal-rti/custom-request"
          className="apply-btn"
        >
          Apply Now
        </a>
      </div>

      {/* Right controls (mobile) */}
      <div className="right-controls">
        {/* Desktop Search */}
<button onClick={handleSearchClick} className="search-desktop">
  <FontAwesomeIcon icon={faSearch} />
</button>

{/* Mobile Search */}
<button onClick={handleSearchClick} className="search-btn">
  <FontAwesomeIcon icon={faSearch} />
</button>

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
