import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section">
          <h2>SareeHub</h2>
          <p>
            Discover timeless elegance with our premium collection of
            silk, cotton, designer, wedding, festive, and Banarasi sarees.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Categories</a></li>
            <li><a href="/">New Arrivals</a></li>
            <li><a href="/">Offers</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">FAQs</a></li>
            <li><a href="/">Shipping Policy</a></li>
            <li><a href="/">Return Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>📍 Balasore, Odisha</p>
          <p>📧 support@sareehub.com</p>
          <p>📞 +91 98765 43210</p>

          <div className="social-icons">
            <a href="/"><FaFacebookF /></a>
            <a href="/"><FaInstagram /></a>
            <a href="/"><FaTwitter /></a>
            <a href="/"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} SareeHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;