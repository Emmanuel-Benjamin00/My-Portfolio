import "./Footer.css"
import heart from "../../../assets/footer/heart.svg"
import { faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  const emailAddress = 'emmanuel26112000@gmail.com';
  const subject = 'Mail received from Portfolio link';
  const body = 'Hi Emmanuel,';

  return (
    <div className='footer-block mt-5'>
      <div className="container">
        <footer className="pt-5">
          <div className="row d-flex justify-content-between px-4">
            <div className="col-12 col-md-4 mb-3">
              <h5>Emmanuel Portfolio</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2 pt-2">
                  <p>Thank you for visiting my personal portfolio website. Connect with me over socials.</p>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <h5>Contact Info</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">+91 9445482366</li>
                <li className="nav-item mb-2">emmanuel26112000@gmail.com</li>
                <li className="nav-item mb-2">Chennai, TN, India</li>
                <li className="nav-item mb-2">
                  <div className="py-3 d-flex social-icons footer-social-icons flex-wrap">
                    <a href="https://www.linkedin.com/in/emmanuel-b-b5145593/" target="_blank" rel="noreferrer">
                      <div className="social-background-circles-footer"><FontAwesomeIcon icon={faLinkedin} size="xl" /></div>
                    </a>
                    <a href="https://github.com/Emmanuel-Benjamin00" target="_blank" rel="noreferrer">
                      <div className="social-background-circles-footer"><FontAwesomeIcon icon={faGithub} size="xl" /></div>
                    </a>
                    <a href={`mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} target="_blank" rel="noreferrer">
                      <div className="social-background-circles-footer"><FontAwesomeIcon icon={faEnvelope} size="xl" /></div>
                    </a>
                    <a href="https://wa.me/9445482366" target="_blank" rel="noreferrer">
                      <div className="social-background-circles-footer"><FontAwesomeIcon icon={faWhatsapp} size="xl" /></div>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-center py-3 border-top">
            <p>Designed with &nbsp;<img src={heart} alt="heart" />&nbsp; by Emmanuel Benjamin</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
