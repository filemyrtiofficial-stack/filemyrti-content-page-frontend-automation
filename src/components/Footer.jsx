import React, { useState } from "react";
import "./Style/Footer.css"; // Make sure this CSS has your footer styles

export default function Footer() {
  const [newsletterResult, setNewsletterResult] = useState("");

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterResult("Sending...");

    const formData = new FormData(event.target);

    // Replace this with your Web3Forms access key
    formData.append("access_key", "f787d06a-0811-4ea8-b136-3c4cae898502");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setNewsletterResult("Thank you! You are now subscribed.");
        event.target.reset();
      } else {
        setNewsletterResult(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      setNewsletterResult("Something went wrong. Please try again later.");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <img
              src="https://i.postimg.cc/VLbYNNVZ/footer-logo-1733744802.webp"
              alt="File My RTI Logo"
              loading="lazy"
              title="File My RTI Logo"
            />
          </div>
          <p className="footer-tagline">
            India's Simplest Way to File RTI Online.
          </p>
          <div className="social-icons">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/filemyrti/posts/?feedView=all"
              className="social-icon linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FileMyRTI on LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61572512135057&sk=about"
              className="social-icon facebook"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FileMyRTI on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="https://x.com/FileMyRTI"
              className="social-icon twitter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FileMyRTI on Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/filemyrtiofficial/"
              className="social-icon instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FileMyRTI on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@FileMyRTI"
              className="social-icon youtube"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FileMyRTI on YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-info">
          <div className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <p>Flat No. 202, Radhakrishna</p>
              <p>Residency, Kalyannagar</p>
              <p>Phase 3, Hyderabad - 500045.</p>
            </div>
          </div>
          <div className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <p>+91 99111 00589</p>
          </div>
          <div className="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <p>Admin@filemyrti.com</p>
          </div>
        </div>

        {/* Quick Links */}
<div className="footer-section">
  <h4>Quick Links</h4>
  <div className="footer-links">
    <div className="link-column">
      <a href="https://filemyrti.com/services" target="_blank" rel="noopener noreferrer">Services</a>
      <a href="https://filemyrti.com/about-us" target="_blank" rel="noopener noreferrer">Who We Are</a>
      <a href="https://filemyrti.com/career" target="_blank" rel="noopener noreferrer">Careers</a>
    </div>
    <div className="link-column">
      <a href="https://filemyrti.com/blogs" target="_blank" rel="noopener noreferrer">Blogs</a>
      <a href="https://filemyrti.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a>
      <a href="https://filemyrti.com/contact-us" target="_blank" rel="noopener noreferrer">Contact Us</a>
      <a href="https://filemyrti.com/faqs" target="_blank" rel="noopener noreferrer">FAQs</a>
    </div>
  </div>
</div>

        {/* Newsletter / CTA */}
        <div className="footer-section newsletter">
          <h4>Remain Updated</h4>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="hidden" name="formType" value="subscription" />
            <input type="hidden" name="subject" value="New Subscriber From FileMyRTI Blog" />
            
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              required
            />
            <button type="submit" className="signup-btn">
              Sign up
            </button>
          </form>
          {newsletterResult && <p className="newsletter-result">{newsletterResult}</p>}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          Your Trusted RTI Partner - © 2025 FileMyRTI A Product of{" "}
          <a href="https://www.ranazonai.com/">Ranazonai Technologies</a>, Built with ❤️ and Dedication.
        </p>
        <div className="footer-bottom-links">
          <a href="https://filemyrti.com/refund-policy">Refund Policy</a>
          <a href="https://filemyrti.com/terms-conditions">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}