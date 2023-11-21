import React from "react";
import Type from "./Type";
import { Col } from "react-bootstrap";
import HiImg from "../../assets/HeroImages/HiImg.png"
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebook, faXTwitter, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import "../../Stylesheets/Hero.css"
import { Link } from "react-router-dom";
import resume from "../../assets/HeroImages/Resume.pdf"
import { useState } from "react";
import html2canvas from "html2canvas"
import jsPDF from "jspdf";



function HeroMainContent() {

  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector("#root2");
    setLoader(true);
    const contentHeight = capture.scrollHeight;
    const contentWidth = capture.scrollWidth;
    const pdfWidth = contentWidth;
    const pdfHeight = contentHeight;
    const backgroundColor = "#13011ae6";
    html2canvas(capture, { backgroundColor }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();

      doc.setFillColor(backgroundColor);
      doc.rect(0, 0, componentWidth, componentHeight, "F");
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      setLoader(false);
      doc.save("Emmanuel Benjamin Portfolio.pdf");
    });
  };

  const emailAddress = 'emmanuel26112000@gmail.com';
  const subject = 'Mail received from Portfolio link';
  const body = 'Hi Emmanuel,';
  return (
    <>
      <Col sm={12} lg={7} className="hero-main-content">
        <h2 className="hi">
          Hi There!&nbsp;
          <img src={HiImg} width="40px" />
        </h2>
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          <span className="im">I'm </span>{" "}
          <span className="name">Emmanuel Benjamin.</span>
        </h1>
        <div className="display-6 fw-bold text-body-emphasis lh-1 mt-5 mb-4">
          <span className="name ">
            <Type />
          </span>
        </div>
        <div className="py-3 d-flex social-icons flex-wrap">
          <Link to="https://www.linkedin.com/in/emmanuel26112000-b-b5145593/" target="_blank"><div className="social-background-circles"><FontAwesomeIcon icon={faLinkedin} size="xl" /></div></Link>
          <Link to="https://github.com/Emmanuel-Benjamin00" target="_blank"><div className="social-background-circles"><FontAwesomeIcon icon={faGithub} size="xl" /></div></Link>
          <Link to={`mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} target="_blank"><div className="social-background-circles"><FontAwesomeIcon icon={faEnvelope} size="xl" /></div></Link>
          <Link to="https://www.facebook.com/profile.php?id=100009359257866" target="_blank"><div className="social-background-circles"><FontAwesomeIcon icon={faFacebook} size="xl" /></div></Link>
          <Link to="https://twitter.com/EmmanuelBe38031" target="_blank"><div className="social-background-circles"><FontAwesomeIcon icon={faXTwitter} size="xl" /></div></Link>
          <Link to="https://wa.me/9445482366" target="_blank"><div className="social-background-circles"><FontAwesomeIcon icon={faWhatsapp} size="xl" /></div></Link>
          <Link to="https://t.me/Stark2023" target="_blank"><div className="social-background-circles"><FontAwesomeIcon icon={faTelegram} size="xl" /></div></Link>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-2">
          <div className="d-flex gap-4">
            <Button className="button-design down-butt" onClick={downloadPDF} disabled={!(loader === false)}>  {
              loader ? (
                <span>Downloading</span>
              ) : (
                <span>Download this page as PDF</span>
              )
            }</Button>
            <Link to={resume} target="_blank" download="Resume.pdf"> <Button className="button-design">Download Resume</Button></Link>
          </div>
        </div>
      </Col>
    </>
  );
}

export default HeroMainContent;
