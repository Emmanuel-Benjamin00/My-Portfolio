import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import "./Education.css";
import EducationCard from "../../NestedComponents/EducationCard"
import EducationData from "../../../data/EducationDAta"

function Education() {
  return (
    <>
      <Container className="mt-5 pt-4">
        <Row className="">
          <Col className="justify-content-center d-flex i-work-with mb-3 headings">
            Education & Certificationsr
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-2">
          {EducationData.map((val, idx) => (
            <Col key={idx}>
              <EducationCard
                logo={val.logo}
                title={val.course}
                company={val.institute}
                year={val.year}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Education;
