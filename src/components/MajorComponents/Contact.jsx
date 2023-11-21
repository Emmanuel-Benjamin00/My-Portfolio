import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../Stylesheets/Contact.css"
import AxiosService from "../../common/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'

function Contact() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.number().required("Phone Number is required"),
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
        let res = await AxiosService.post("/user", values);
        if (res.status === 201) {
          console.log("Mail sent and data fetched");
          resetForm();
          document.getElementById('submitGift').innerHTML="Message sent Successfully to Emmanuel. Check your mail for confirmation"
        }
      } catch (error) {
        toast.error("Internal Server Error")
        console.log(error)
      }
    },
  });

  return (
    <>
      <Container className="px-4 py-5 pb-1 text-center mt-5" id="contact">
        <h3 className="display-5 fw-bold">Contact Me</h3>
        <Container className="col-lg-10 mx-auto" style={{ maxWidth: "600px" }}>
          <Form onSubmit={formik.handleSubmit}>
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
            <div id="submitGift" className="gift"></div>
            <Button variant="primary" type="submit" className="card-button">
              Submit
            </Button>{" "}
          </Form>
        </Container>
      </Container>
    </>
  );
}

export default Contact;
