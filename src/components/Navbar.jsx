import logo from "../assets/logo.webp"; // adjust path if needed
import "./Style/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="File My RTI Logo" />
      </div>

      {/* Right - CTAs */}
      <div className="navbar-ctas">
        {/* File My RTI Banner */}
        <div className="rti-banner">
          <div className="rti-content">
            <h3>Need any Legal/RTI help?</h3>
            
            <div className="rti-actions">
              <a
                href="https://filemyrti.com/apply/personal-rti/custom-request"
                target="_blank"
                rel="noopener noreferrer"
                className="rti-button"
              >
                File My RTI
              </a>
            </div>
          </div>
        </div>

        {/* Phone Banner */}
        <div className="rti-banner">
          <div className="rti-content">
            <h3>Need quick RTI assistance?</h3>
            <div className="rti-actions">
              <a href="tel:+919911100589" className="rti-button">
                +91 99111 00589
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
