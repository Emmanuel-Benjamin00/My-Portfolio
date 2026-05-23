
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Boywithlap from "../../../assets/skillsImages/Boywithlap.png";
import "./Skills.css";
import skillData from "../../../data/SkillData";

function Skills() {
  return (
    <>
      <Container className="mt-5">
        <Row className="flex-lg-row-reverse align-items-center">
          <Col md={5} className="d-flex justify-content-center">
            <Image src={Boywithlap} className="skill-boy" alt="Boy with Lap" />
          </Col>
          <Col md={7}>
            <h3 className="headings pb-2">What I Do</h3>
            <p className="mb-4">
              Full Stack Developer building web and mobile applications with React, React Native, and Python.
            </p>
            <div className="pb-4">
              <Row xs={4} md={5} className="g-4 d-flex justify-content-center align-items-center">
                {skillData.map((val, idx) => (
                  <Col key={idx}>
                    <Card className="skillImg">
                      <Card.Img variant="top" src={val.img} className="skillEach-img m-auto mb-2" />
                      <Card.Text className="m-auto fw-bold skillName">{val.name}</Card.Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <p className="lightning-lines">
              ⚡ Build highly interactive frontends and mobile apps with React &amp; React Native. <br />
              ⚡ Design and develop REST APIs with Python and Django REST Framework.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Skills;
