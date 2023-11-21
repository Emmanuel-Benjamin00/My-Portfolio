import React from "react";
import "../../Stylesheets/IntroduceMyself.css";
import { Col, Container, Row } from "react-bootstrap";
import introImg from "../../assets/IntroImages/Intro.png"

function Intro() {
  return (
    <>
      <section id="about" className="intro-section">
        <Container className="col-xxl-8 intro-container">
          <Row className=" position-relative d-flex align-items-center row-container-intro">
            <Col sm={12} lg={5}>
              <img
                src={introImg}
                className="d-block mx-auto text-center image"
                alt="Bootstrap Themes"
                loading="lazy"
              />
            </Col>
            <Col sm={12} lg={7} className="d-flex flex-column align-items-center intro-main-content">
              <h1 className="display-6  lh-1 mb-3 let-me-intro">
                <span className="im">LET ME</span>{" "}
                <span className="interests">INTRODUCE</span>{" "}
                <span className="im">MYSELF</span>
              </h1>
              <p className="intropara mt-4">
                A passionate Full Stack Software Developer who builds Web applications
                with JavaScript, Reactjs & Nodejs with some other cool libraries and
                frameworks.
                <br />
                <br />
                I fell in love with programming and I have at least learnt something.
                <br />
                <br />I am good in{" "}
                <span className="interests">Javascript, React and Nodejs.</span> My
                field of Interest's are building new{" "}
                <span className="interests">Web Technologies and Products.</span>
                <br />
                <br />
                Whenever possible, I also apply my passion on designing softwares like{" "}
                <span className="interests">Photoshop, Illustrator & Blender.</span>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Intro;
