import React from "react";
import Type from "../Typewriter/Type";
import { Col, Container, Image } from "react-bootstrap";
import HiImg from "../../assets/HeroImages/HiImg.png"
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebook, faXTwitter, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import "../../components/MajorComponents/Hero/Hero.css"
import { Link } from "react-router-dom";
import resume from "../../assets/HeroImages/Resume.pdf"
import { useState } from "react";
import html2canvas from "html2canvas"
import jsPDF from "jspdf";
import '../../components/MajorComponents/Hero/Hero.css'
import whatsapp from "../../assets/HeroImages/whatsapp.svg"
import github from "../../assets/HeroImages/github.svg"
import linkedin from "../../assets/HeroImages/linkedin.svg"



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
              A dedicated Full Stack Software Developer proficient in JavaScript, Reactjs & Nodejs, continuously
              exploring new technologies and frameworks to craft innovative web applications. Passionate about elegant
              solutions, obsessed with quality, and always eager to enhance the development process for optimal outcomes.
            </p>
          </div>
        </div>
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <Link to="https://drive.google.com/file/d/13VAKfNG2Jyq5lYWRyHYLaHmtUUwx7VJG/view?usp=sharing" target="_blank" className="socials-resume">View Resume</Link>
          <Link to="https://www.linkedin.com/in/emmanuel-b-b5145593/" target="_blank" className="socials"><Image src={linkedin} style={{ width: "35px" }} /></Link>
          <Link to="https://github.com/Emmanuel-Benjamin00" target="_blank" className="socials"><Image src={github} style={{ width: "35px" }} /></Link>
          <Link to="https://wa.me/9445482366" target="_blank" className="socials"><Image src={whatsapp} style={{ width: "35px" }} /></Link>
        </div>
      </Container>
    </>
  );
}

export default HeroMainContent;
