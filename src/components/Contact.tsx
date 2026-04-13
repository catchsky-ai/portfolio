import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:Asharma94.official@gmail.com" data-cursor="disable">
                Asharma94.official@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+61433941769" data-cursor="disable">
                +61 433 941 769
              </a>
            </p>
            <h4>Location</h4>
            <p>Sydney, NSW, Australia</p>
            <p><small>PR (Permanent Resident)</small></p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.linkedin.com/in/aakash-sharma"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Portfolio of <br /> <span>Aakash Sharma</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 - Data Engineer | Data Scientist | Tech BA
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
