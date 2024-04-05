import React, { useState, useRef } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Contact.css"
import AxiosService from "../../../common/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitGiftRef = useRef(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.number(),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        let res = await AxiosService.post("/user", values);
        if (res.status === 201) {
          console.log("Mail sent and data fetched");
          resetForm();
          submitGiftRef.current.innerHTML = "Message sent Successfully to Emmanuel. Check your mail for confirmation"; 
        }
      } catch (error) {
        setErrorMessage("Internal Server Error")
        console.log(error)
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Container className="mt-5 pt-4 " >
        <Row className="mb-2">
          <Col className="d-flex justify-content-center headings">Contact Me</Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col lg={6}>
            <Form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-center contact-form">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  name="name"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error">{formik.errors.name}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  placeholder="Your Mail ID"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="number"
                  placeholder="Phone Number"
                  className="form-input "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                  name="mobile"
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="error">{formik.errors.mobile}</div>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Message"
                  className="form-input text-field"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.message}
                  name="message"
                />
                {formik.touched.message && formik.errors.message && (
                  <div className="error">{formik.errors.message}</div>
                )}
              </Form.Group>
              <Button variant="primary" type="submit" className="card-button all-button" disabled={isSubmitting} style={{width:"100%"}}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>{" "}
              <div ref={submitGiftRef} className="gift d-flex justify-content-center m-auto mt-3 align-items-center"></div> 
              <p className="fw-bold m-auto mt-3">{errorMessage}</p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Contact;
