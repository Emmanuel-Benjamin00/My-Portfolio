import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Projects.css";
import projectsData from "../../../data/projectData";
import ProjectsCard from "../../NestedComponents/ProjectsCard"

function Portfolio() {
  return (
    <>
      <Container className="mt-5" id="">
        <Row className="mb-4 ">
          <h3 className="justify-content-center d-flex headings">My Projects</h3>
        </Row>
        <Row xs={1} md={2} lg={3} className="">
          {
            projectsData.map((e, i) => (
                <Col className="pb-4" key={i}>
                  <ProjectsCard data={e} />
                </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
}

export default Portfolio;
