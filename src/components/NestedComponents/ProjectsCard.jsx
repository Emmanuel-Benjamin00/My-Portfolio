import React from "react";
import { Card, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../components/MajorComponents/Projects/Projects.css"

function ProjectsCard({ data, index }) {
  const collapseId = `collapse-${index}`;

  return (
    <>
      <Card className="h-100 project-card">
        <Card.Img src={data.img} alt="Card image" className="projects-image pt-3 px-3" />
        <Card.Body className="m-auto pb-4" style={{ width: "90%" }}>
          <Card.Title className="py-md-2 text-center d-flex align-items-center flex-nowrap justify-content-center fw-bold project-title" >{data.title}</Card.Title>
          <Card.Text className="mb-1 mb-3 project-para" style={{ textAlign: "justify" }}>{data.content}</Card.Text>

          {
            (data.userCredentials || data.adminCredentials) && (
              <>
                <div className="d-inline-flex gap-1 mb-0">
                  <a className="link-style fs-6" data-bs-toggle="collapse" href={`#${collapseId}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                    Demo Credentials
                  </a>
                </div>
                <div className="collapse" id={collapseId}>
                  <div className="card collapseClass">
                    <div>
                      {data.adminCredentials && (
                        <div className="pb-3 pt-2">
                          <div className="pb-1">Admin Credentials:</div>
                          <div>Username:  {data.adminCredentials.email}</div>
                          <div>Password:  {data.adminCredentials.pass}</div>
                        </div>
                      )}
                      {data.userCredentials && (
                        <div>
                          <div className="pb-1">User Credentials:</div>
                          <div>Username:  {data.userCredentials[0].email}</div>
                          <div className="pb-1">Password:  {data.userCredentials[0].pass}</div>
                          {
                            data.userCredentials[1] && data.userCredentials[1] && (
                              <>
                                <div>Username:  {data.userCredentials[1].email}</div>
                                <div>Password:  {data.userCredentials[1].pass}</div>
                              </>
                            )
                          }
                          <hr className="p-0 mt-2"/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )
          }

          <div className="d-flex flex-column gap-3 mt-3">
            <a className="icon-link icon-link-hover link-style" href={data.feCode} target="_blank">
              {data.beCode ? "Client Side Code" : "Source Code"}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </a>
            {(data.beCode &&
              <a className="icon-link icon-link-hover link-style" href={data.beCode} target="_blank">
                Server Side Code
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </a>
            )}
            <a className="icon-link icon-link-hover link-style" href={data.site} target="_blank">
              View website
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </a>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProjectsCard;
