import React from "react";
import { Container, Row } from "react-bootstrap";
import ProjectsCard from "../NestedComponents/ProjectsCard";
import "../../Stylesheets/Projects.css";
import NotesAppImg from "../../assets/ProjectsImages/NotesApp.png";
import ForgotPasswordImg from "../../assets/ProjectsImages/ForgotPassword.png";
import RestaurantLandingImg from "../../assets/ProjectsImages/RestaurantLanding.png";
import TravelLandingImg from "../../assets/ProjectsImages/TravelLanding.png";
import MedicoSalesImg from "../../assets/ProjectsImages/MedicoSales.png";
import DiceGameImg from "../../assets/ProjectsImages/DiceGame.png";


function Portfolio() {
  return (
    <>
      <Container className="px-4 text-center projects-cont" id="projects">
        <h3 className="display-5 fw-bold">My Projects</h3>
        <Container>
          <Row className="row-cols-1 row-cols-md-3 cards-container g-3">
            <ProjectsCard
              img={NotesAppImg}
              title="Notes App"
              content="A web app frontend for adding notes. It has functionalities of
              adding, editing and deleting a note."
              view="https://notes-app-project-guvi.netlify.app/home"
              code="https://github.com/Emmanuel-Benjamin00/NotesApp"
            />
            <ProjectsCard
              img={ForgotPasswordImg}
              title="Forgot Password Webpage"
              content="A fullstack webpage for forgot password. It sends a mail of a link when forgot password is clicked. 
              The link displays another page where the password can be changed."
              view="https://forgot-password-reset.netlify.app/"
              code="https://github.com/Emmanuel-Benjamin00/password-reset"
            />
            <ProjectsCard
              img={RestaurantLandingImg}
              title="Restaurant Landing Page"
              content="This is a frontend web page of a restaurant. It is fully done with bootstrap with 
              responsiveness for all screen sizes."
              view="https://hot-meals-2000.netlify.app/"
              code="https://github.com/Emmanuel-Benjamin00/Hot-Meals"
            />
            <ProjectsCard
              img={TravelLandingImg}
              title="Travel Landing Page"
              content="This is a frontend webpage for tourism booking. It is fully done with HTML and 
              CSS purely, with responsiveness for all screen sizes."
              view="https://unique-lolly-2479b3.netlify.app/"
              code="https://github.com/Emmanuel-Benjamin00/Travel-Landing-Page"
            />
            <ProjectsCard
              img={MedicoSalesImg}
              title="Medico Sales"
              content="A frontend website of a Medical Products Sales shop Medico Sales."
              view="https://medico-sales.netlify.app/"
              code="https://github.com/Emmanuel-Benjamin00/MedicoSales"
            />
            <ProjectsCard
              img={DiceGameImg}
              title="Dice Game"
              content="A website of a basic dice game done with javascript. Between two players, randomly one player will start 
              and who attains 30 first wins the game."
              view="https://dice-winner-2023.netlify.app/"
              code="https://github.com/Emmanuel-Benjamin00/Dice-Game"
            />
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
