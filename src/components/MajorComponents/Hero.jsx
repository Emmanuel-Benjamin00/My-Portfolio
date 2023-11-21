import React from "react";
import HeroImg from "../../assets/HeroImages/HeroImg.svg";
import { Container, Row, Col } from "react-bootstrap";
import "../../Stylesheets/Hero.css";
import HeroMainContent from "../NestedComponents/HeroMainContent";


function Hero() {
  return (
    <>
      <section id="home" className="hero-section">
        <Container className="col-xxl-8">
          <Row className="flex-lg-row-reverse  d-flex align-items-center row-container-hero">
            <Col sm={12} lg={5}>
              <img
                src={HeroImg}
                className="d-block mx-auto text-center image"
                alt="Hero Img"
                loading="lazy"
              />
            </Col>
            <HeroMainContent/>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Hero;
