import React from "react";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../Stylesheets/Contact.css"

function Contact() {
  return (
    <>
      <Container className="px-4 py-5 pb-1 text-center mt-5" id="contact">
        <h3 className="display-5 fw-bold">Contact Me</h3>
        <Container className="col-lg-10 mx-auto" style={{maxWidth:"600px"}}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Your Name"  className="form-input"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="email" placeholder="Your Mail ID"  className="form-input"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="number" placeholder="Phone Number"  className="form-input "/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={3} placeholder="Message" className="form-input text-field"/>
            </Form.Group>
            <Button variant="primary">Submit</Button>{' '}
          </Form>
        </Container>
      </Container>
    </>
  );
}

export default Contact;
