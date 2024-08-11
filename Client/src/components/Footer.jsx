 import "./styles/Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We are a leading job portal connecting job seekers with top companies. Our mission is to help you find your dream job with ease.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#jobs">Jobs</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 JobPortal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
