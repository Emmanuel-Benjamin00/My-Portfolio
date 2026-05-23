
import Type from "../Typewriter/Type";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import "../../components/MajorComponents/Hero/Hero.css"

function HeroMainContent() {
  return (
    <>
      <Container>
        <div>
          <div className="my-2">
            <h5 className="d-inline hi-i-am">Hi 👋🏼! I am </h5>
            <h3 className="d-md-inline name py-md-4">Emmanuel Benjamin.</h3>
          </div>
          <div className="typewriter my-2">
            <Type />
          </div>
          <div>
            <p className="hero-para my-4">
              A dedicated Full Stack Software Developer proficient in JavaScript, React &amp; Python,
              continuously exploring new technologies and frameworks to craft innovative web and mobile
              applications. Passionate about elegant solutions, obsessed with quality, and always eager
              to enhance the development process for optimal outcomes.
            </p>
          </div>
        </div>
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <a
            href="https://drive.google.com/file/d/13VAKfNG2Jyq5lYWRyHYLaHmtUUwx7VJG/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="socials-resume"
          >
            View Resume
          </a>
          <a href="https://www.linkedin.com/in/emmanuel-b-b5145593/" target="_blank" rel="noreferrer" className="socials">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://github.com/Emmanuel-Benjamin00" target="_blank" rel="noreferrer" className="socials">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://wa.me/9445482366" target="_blank" rel="noreferrer" className="socials">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
        </div>
      </Container>
    </>
  );
}

export default HeroMainContent;
