import React from "react";
import "./IntroduceMyself.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import introImg from "../../../assets/IntroImages/Intro.png"


function Intro() {
  return (
    <>
        <Container className="my-5 pt-4">
          <Row className="align-items-center">
            <Col md={5}>
              <Image src={introImg} className="introImg" />
            </Col>
            <Col md={7} className="">
              <h1 className="fw-bold mb-4">
                <span className="">LET ME</span>{" "}
                <span className="introName">INTRODUCE</span>{" "}
                <span className="">MYSELF</span>
              </h1>
              <p className="para-font">
                A passionate Full Stack Software Developer who builds Web applications
                with JavaScript, Reactjs & Nodejs with some other cool libraries and
                frameworks.
                <br />
                <br />
                B.Tech Graduate, graduated at the year of 2022, worked in TVS for 1 year. 
                Certified FullStack Developer by GUVI, Pvt Limited, An IIT Incubated Company.             
                <br />
                <br />I am good in{" "}
                <span className="imp-words">Javascript, React, Nodejs and MongoDB</span>. My
                field of Interest's are building new{" "}
                <span className="">Web Technologies and Products.</span>
                <br />
                <br />
                Whenever possible, I also apply my passion on designing softwares like{" "}
                <span className="">Photoshop & Illustrator.</span>
              </p>
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default Intro;
