import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import "../../Stylesheets/Education.css";
import Card from "../NestedComponents/EducationCard"
import crescentLogo from "../../assets/EducationImages/CescentLogo.png"
import corleyLogo from "../../assets/EducationImages/corleyLogo.png"
import guviLogo from "../../assets/EducationImages/guviLogo.png"
import udemyLogo from "../../assets/EducationImages/Udemy.png"

function Education() {
  return (
    <>
    <section className="education-section" id="education">
      <Container className="col-xxl-8">
        <Row className="align-items-center g-5 pt-5">
          <Col>
            <h1 className="display-5 fw-bold lh-1 mb-5">
              Education <span className="fs-5">& Certifications</span>
            </h1>
            <Card logo={crescentLogo} college="B.S. Abdur Rahman Crescent Institute of Science and Technology" course="Bachelor's in Electronics and Communication Engineering" year="2018-2022"/>
            <Card logo={corleyLogo} college="C.S.I Corley Higher Secondary School" course="State Board of TamilNadu Higher Secondary Education(HSC)" year="2016-2018" Extra="Participated in National Cadet Corps(NCC)"/>
            <Card logo={corleyLogo} college="C.S.I Corley Higher Secondary School" course="State Board of TamilNadu Secondary Education(SSLC)" year="2015-2016"  Extra="Participated in National Cadet Corps(NCC)"/>
            <h2 className=" fw-bold lh-1 mb-3">
            Certifications
            </h2>
            <Card logo={guviLogo} college="GUVI GEEK NETWORK PRIVATE LIMITED" course="FullStack Development Program (MERN)" year="2023"/>
            <Card logo={udemyLogo} college="Udemy, Inc." course="The Complete 2023 Web Development Bootcamp" year="2023"/>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
}

export default Education;
