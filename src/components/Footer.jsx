import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h2>SareeHub</h2>
          <p>
            Discover timeless elegance with our premium collection of silk,
            cotton, designer, wedding, festive, and Banarasi sarees.
          </p>
        </div>
        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/new-arrival">New Arrivals</a>
            </li>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>

            <li>
              <Link to="/shipping-policy">Shipping Policy</Link>
            </li>

            <li>
              <Link to="/return-policy">Return & Refund Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <div className="footer-contact">
            <p>
              <FaMapMarkerAlt className="contact-icon" />
              Balasore, Odisha
            </p>

            <p>
              <FaEnvelope className="contact-icon" />
              support@sareehub.com
            </p>

            <p>
              <FaPhoneAlt className="contact-icon" />
              +91 98765 43210
            </p>
          </div>
          <div className="social-icons">
            <a href="/">
              <FaFacebookF />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaTwitter />
            </a>
            <a href="/">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SareeHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
