import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Boywithlap from "../../../assets/skillsImages/Boywithlap.png";
import "./Skills.css";
import skillData from "../../../data/SkillData";
// import html5 from "../../../assets/skillsImages/svgs/html5.svg";
// import css from "../../../assets/skillsImages/svgs/css.svg";
// import js from "../../../assets/skillsImages/svgs/js.svg";
// import ps from "../../../assets/skillsImages/svgs/adobe-photoshop-icon.svg";
// import aws from "../../../assets/skillsImages/svgs/aws.svg";
// import blender from "../../../assets/skillsImages/svgs/blender.svg";
// import bootstrap from "../../../assets/skillsImages/svgs/bootstrap.svg";
// import db from "../../../assets/skillsImages/svgs/db.svg";
// import git from "../../../assets/skillsImages/svgs/git.svg";
// import nodejs from "../../../assets/skillsImages/svgs/nodejs.svg";
// import npm from "../../../assets/skillsImages/svgs/npm.svg";
// import reactimg from "../../../assets/skillsImages/svgs/react.svg";
// import firebase from "../../../assets/skillsImages/svgs/firebase-icon.svg";
// import github from "../../../assets/skillsImages/svgs/github.svg"




function Skills() {
  return (
    <>
      <Container className="mt-5">
        <Row className="flex-lg-row-reverse align-items-center">
          <Col md={5} className="d-flex justify-content-center">
            <Image
              src={Boywithlap}
              className="skill-boy"
              alt="Boy with Lap"
            />
          </Col>
          <Col md={7} className="">
            <h3 className="headings pb-2">What I Do</h3>
            <p className="mb-4">
              CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH
              STACK
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
              ⚡ Develop highly interactive Front end / User Interfaces for
              your web. <br />
              ⚡ Integration of third party services such as AWS.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Skills;


// import React, { useState } from "react";
// import { Container, Row, Col, Image } from "react-bootstrap";
// import "./Skills.css";
// import skillData from "../../../data/SkillData";

// function Skills() {

//   const [hover, setHover] = useState(null)

//   const handleMouseEnter = (idx) => {
//     setHover(idx);
//   };

//   const handleMouseLeave = () => {
//     setHover(null);
//   };

//   const handleTouchStart = (idx) => {
//     setHover(idx);
//   };

//   const handleTouchEnd = () => {
//     setHover(null);
//   };

//   return (
//     <>
//       <Container className="my-5">
//         <Row>
//           <Col className="justify-content-center d-flex i-work-with">
//             I work with...
//           </Col>
// //         </Row>
// <Row className="justify-content-center">
//   <Row xs={2} md={3} lg={5} className="g-4">
//     {skillData.map((val, idx) => (
//       <Col key={idx}>
//         <div className={`skill-image-div m-auto d-flex flex-column gap-2 `}
//           onMouseEnter={window.innerWidth >= 768 ? () => handleMouseEnter(idx) : null}
//           onMouseLeave={window.innerWidth >= 768 ? handleMouseLeave : null}
//           onTouchStart={window.innerWidth < 768 ? () => handleTouchStart(idx) : null}
//           onTouchEnd={window.innerWidth < 768 ? handleTouchEnd : null}>
//           {
//             hover === idx ? <p className="m-auto fw-bold skills-text">{val.name}</p> : <Image variant="top" className="skill-img" src={val.img} />
//           }
//         </div>
//       </Col>
//     ))}
//   </Row>
// </Row>
// //         <Row>
//           <p className="lightning-lines mt-4 ms-4">
//             ⚡ Develop highly interactive Front end / User Interfaces for
//             your web and mobile applications <br />
//             ⚡ Progressive Web Applications ( PWA ) in normal and SPA Stacks <br />
//             ⚡ Integration of third party services such as Firebase/ AWS / Digital Ocean
//           </p>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Skills;
