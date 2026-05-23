
import { Container, Row, Col } from 'react-bootstrap';
import "./Education.css";
import EducationCard from "../../NestedComponents/EducationCard";
import EducationData from "../../../data/EducationData";

function Education() {
  return (
    <>
      <Container className="mt-5 pt-4">
        <Row>
          <Col className="justify-content-center d-flex mb-3 headings">
            Education &amp; Certification
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
