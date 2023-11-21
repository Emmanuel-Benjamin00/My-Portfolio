import React from "react";
import { Card, Col, Row } from 'react-bootstrap';
import "../../Stylesheets/Education.css"


function HorizontalCard(props) {
  return (
    <>
      <Card className="mb-3 education-card" style={{ maxWidth: "100vw" }}>
        <Row className="g-0">
          <Col md={2} sm={12}>
            <Card.Img
              src={props.logo}
              className="img-fluid rounded-start card-image ms-4"
              alt="..."
            />
          </Col>
          <Col md={10} sm={12}>
            <Card.Body>
              <Card.Title className="college-title">{props.college}</Card.Title>
              <Card.Text className="text-card">
                <span className="course">{props.course} <br /> <span className="year">{props.year}</span><br /><span className="extra">{props.Extra}</span></span>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default HorizontalCard;
