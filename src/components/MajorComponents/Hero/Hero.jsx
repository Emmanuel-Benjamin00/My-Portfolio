import React from "react";
import HeroImg from "../../../assets/HeroImages/HeroImg.svg";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Hero.css";
import HeroMainContent from "../../NestedComponents/HeroMainContent";
import myImage from '../../../assets/HeroImages/Zoomed.png'

function Hero() {
  return (
    <>
      <Container fluid="md" className="pt-lg-4 hero-cont mb-5">
        <Row className="">
          <Col className="d-flex align-items-center flex-column">
            <div className="heroImg-div">
              <Image src={myImage} style={{ width: "100%" }} />
            </div>
            <div className="heroMain-div">
            <HeroMainContent />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Hero;
