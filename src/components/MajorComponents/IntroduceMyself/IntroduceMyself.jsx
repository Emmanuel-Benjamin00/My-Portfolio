
import "./IntroduceMyself.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import introImg from "../../../assets/IntroImages/Intro.png";

function Intro() {
  return (
    <>
      <Container className="my-5 pt-4">
        <Row className="align-items-center">
          <Col md={5}>
            <Image src={introImg} className="introImg" />
          </Col>
          <Col md={7}>
            <h1 className="fw-bold mb-4">
              <span>LET ME </span>
              <span className="introName">INTRODUCE </span>
              <span>MYSELF</span>
            </h1>
            <p className="para-font">
              A passionate Full Stack Developer with 2 years of experience building web and mobile
              applications using React, React Native, Python, and Django REST Framework.
              <br />
              <br />
              B.Tech Graduate (2022). Certified Full Stack Developer by GUVI, an IIT-Madras incubated company.
              Currently working as a Full Stack Developer building production-grade applications.
              <br />
              <br />
              My core skills are{" "}
              <span className="imp-words">React, React Native, Python, and DRF</span>.
              I enjoy building clean, performant applications and integrating third-party services on{" "}
              <span>Azure and AWS</span>.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Intro;
