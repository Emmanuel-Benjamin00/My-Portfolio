import React, { useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";
import Logo from "../../Logo/Logo";
import { Link } from 'react-scroll';

function Navigation() {
  const navbarRef = useRef();

  const collapseIt = () => {
    setTimeout(()=>{

      navbarRef.current.click();
    }, 900)
  }
  
  return (
    <>
      <Navbar collapseOnSelect expand="md" className="nav-bg" sticky="top">
        <Container fluid="md">
          <Navbar.Brand><Logo /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={navbarRef} />
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="home" spy={true} smooth={true} duration={100} offset={-70} className="fw-bold" style={{ cursor: 'pointer' }} onTouchEnd={()=>collapseIt()}>Home</Nav.Link>
              <Nav.Link as={Link} to="about" spy={true} smooth={true} duration={100} offset={-70} className="fw-bold" style={{ cursor: 'pointer' }} onTouchEnd={()=>collapseIt()}>About</Nav.Link>
              <Nav.Link as={Link} to="skills" spy={true} smooth={true} duration={100} offset={-70} className="fw-bold" style={{ cursor: 'pointer' }} onTouchEnd={()=>collapseIt()}>Skills</Nav.Link>
              <Nav.Link as={Link} to="projects" spy={true} smooth={true} duration={100} offset={-70} className="fw-bold" style={{ cursor: 'pointer' }} onTouchEnd={()=>collapseIt()}>Projects</Nav.Link>
              <Nav.Link as={Link} to="experience" spy={true} smooth={true} duration={100} offset={-70} className="fw-bold" style={{ cursor: 'pointer' }} onTouchEnd={()=>collapseIt()}>Experience</Nav.Link>
              <Nav.Link as={Link} to="education" spy={true} smooth={true} duration={100} offset={-70} className="fw-bold" style={{ cursor: 'pointer' }} onTouchEnd={()=>collapseIt()}>Education</Nav.Link>
              <Nav.Link as={Link} to="contact" spy={true} smooth={true} duration={100} offset={-70} className="fw-bold" style={{ cursor: 'pointer' }} onTouchEnd={()=>collapseIt()}>Contact Me</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
