import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import "../../Stylesheets/Projects.css";
import portfolio2 from "../../assets/portfolio-2.png";
import { Link } from "react-router-dom";

function ProjectsCard(props) {
  return (
    <>
      <Col>
        <Card className="h-100 projects-card">
          <Card.Img src={props.img} alt="Card image" className="card-img-top image-in-card" />
          <Card.Body className="pt-1">
            <Card.Title className="fs-4 mb-2 title-card">{props.title}</Card.Title>
            <Card.Text className="card-text mb-1">{props.content}</Card.Text>
            <div className="buttons">
            <Link to={props.view} target="_blank"><Button variant="primary me-1 button-card" className="card-button">View</Button></Link>
            <Link to={props.code} target="_blank"><Button variant="primary ms-1 button-card" className="card-button">Code</Button></Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default ProjectsCard;
