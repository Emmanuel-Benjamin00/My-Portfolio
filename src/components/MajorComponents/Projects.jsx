import React from "react";
import { Container, Row } from "react-bootstrap";
import ProjectsCard from "../NestedComponents/ProjectsCard";
import "../../Stylesheets/Projects.css";
import projectsData from "../../assets/data/projectData";

function Portfolio() {
  return (
    <>
      <Container className="px-4 text-center projects-cont" id="projects">
        <h3 className="display-5 fw-bold">My Projects</h3>
        <Container>
          <Row className="row-cols-1 row-cols-md-3 cards-container g-3">
              {
                projectsData.map((e,i)=>{
                  return <ProjectsCard data={e} key={i} />
                })
              }
          </Row>
        </Container>
        <Container className="contributions-cont">
        <h1 className="contributions p-0">Github Contributions this Year</h1><br/><span className="fs-6 p-0">Dynamic Data from github API</span>
        <img src="https://ghchart.rshah.org/810CA8/Emmanuel-Benjamin00" alt="Github chart" className="github-chart pt-3"></img>
        </Container>
      </Container>
    </>
  );
}

export default Portfolio;
