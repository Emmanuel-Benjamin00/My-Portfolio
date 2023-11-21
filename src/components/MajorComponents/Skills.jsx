import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Boywithlap from "../../assets/skillsImages/Boywithlap.png";
import "../../Stylesheets/Skills.css";
import html5 from "../../assets/skillsImages/html5.svg";
import css from "../../assets/skillsImages/css.svg";
import js from "../../assets/skillsImages/js.svg";
import ps from "../../assets/skillsImages/adobe-photoshop-icon.svg";
import aws from "../../assets/skillsImages/aws.svg";
import blender from "../../assets/skillsImages/blender.svg";
import bootstrap from "../../assets/skillsImages/bootstrap.svg";
import db from "../../assets/skillsImages/db.svg";
import git from "../../assets/skillsImages/git.svg";
import nodejs from "../../assets/skillsImages/nodejs.svg";
import npm from "../../assets/skillsImages/npm.svg";
import reactimg from "../../assets/skillsImages/react.svg";
import firebase from "../../assets/skillsImages/firebase-icon.svg";
import github from "../../assets/skillsImages/github.svg"
import SkillChart from "./SkillChart";

function Skills() {
  return (
    <>
      <section id="skills" className="skills-section">
        <Container className="col-xxl-8 px-4">
          <Row className="flex-lg-row-reverse g-5 position-relative row-container-skill">
            <Col sm={12} lg={5} className="mx-auto">
              <img
                src={Boywithlap}
                className="d-block mx-auto text-center skill-image"
                alt="Bootstrap Themes"
                loading="lazy"
              />
            </Col>
            <Col sm={12} lg={7} className="pt-5 skills-main-content">
              <h3 className="display-6 mb-3 whatIDo">What I Do</h3>
              <p className="skill-para">
                CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH
                STACK
              </p>
              <div className="d-flex flex-row img-container-skills flex-wrap gap-4 justify-content-center">
                <img src={html5} alt="" className="skill-img" />
                <img src={css} alt="" className="skill-img" />
                <img src={js} alt="" className="skill-img" />
                <img src={reactimg} alt="" className="skill-img" />
                <img src={nodejs} alt="" className="skill-img" />
                <img src={db} alt="" className="skill-img" />
                <img src={aws} alt="" className="skill-img" />
                <img src={bootstrap} alt="" className="skill-img" />
                <img src={git} alt="" className="skill-img" />
                <img src={npm} alt="" className="skill-img" />
                <img src={firebase} alt="" className="skill-img" />
                <img src={ps} alt="" className="skill-img" />
                <img src={blender} alt="" className="skill-img" />
                <img src={github} alt="" className="skill-img" />
              </div>
              <p className="lightning-lines">
                ⚡ Develop highly interactive Front end / User Interfaces for
                your web and mobile applications <br />
                ⚡ Progressive Web Applications ( PWA ) in normal and SPA Stacks <br />
                ⚡ Integration of third party services such as Firebase/ AWS / Digital Ocean
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Skills;
