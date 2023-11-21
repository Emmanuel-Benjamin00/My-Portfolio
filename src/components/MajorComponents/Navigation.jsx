import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../Stylesheets/Navigation.css";
import Logo from "../NestedComponents/Logo";
import { Button } from "react-bootstrap";
import gitimg from "../../assets/NavImages/gitbranch.svg";
import starimg from "../../assets/NavImages/star.svg";
import { useState } from "react";

function Navigation() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <Navbar expand="md" className="mb-2 pb-2 navbar-css">
        <Container>
          <Navbar.Brand href="#home">
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" className="aria-control"  onClick={() => setShowOffcanvas(!showOffcanvas)}/>
          <Navbar.Offcanvas id="offcanvasNavbar" placement="top" className="offCanvas" show={showOffcanvas}   onHide={handleCloseOffcanvas}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <Logo />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 fs-6 flex-wrap row-gap-1 nav-styling">
                <Nav.Link href="#home" className="menuListItems"  onTouchEnd={(e) => { e.preventDefault(); window.location.href="#home";  handleCloseOffcanvas();}}>
                  Home
                </Nav.Link>
                <Nav.Link href="#about" className="menuListItems"  onTouchEnd={(e) => { e.preventDefault(); window.location.href="#about";  handleCloseOffcanvas();}}>
                  About
                </Nav.Link>
                <Nav.Link href="#skills" className="menuListItems"  onTouchEnd={(e) => { e.preventDefault(); window.location.href="#skills";  handleCloseOffcanvas(); }}>
                 Skills
                </Nav.Link>
                <Nav.Link href="#education" className="menuListItems"  onTouchEnd={(e) => { e.preventDefault(); window.location.href="#education";  handleCloseOffcanvas();}}>
                Education
                </Nav.Link>
                <Nav.Link href="#projects" className="menuListItems"  onTouchEnd={(e) => { e.preventDefault(); window.location.href="#projects"; handleCloseOffcanvas(); }}>
                  Projects
                </Nav.Link>
                <Nav.Link href="#contact" className="menuListItems"  onTouchEnd={(e) => { e.preventDefault(); window.location.href="#contact";  handleCloseOffcanvas();}}>
                  Contact Me
                </Nav.Link>
                <Nav.Link href="https://github.com/Emmanuel-Benjamin00/portfolio-frontend" target="_blank" >
                  <Button className="github-btn" onClick={()=> handleCloseOffcanvas()}>
                    <img src={gitimg} className="pe-3" />
                    <img src={starimg} />
                  </Button>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
