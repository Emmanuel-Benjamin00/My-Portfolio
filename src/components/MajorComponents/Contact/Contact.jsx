import { useState } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Contact.css"
import AxiosService from "../../../common/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        const res = await AxiosService.post("/user", values);
        if (res.status === 201) {
          resetForm();
          toast.success("Message sent successfully! Check your mail for confirmation.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Container className="mt-5 pt-4">
        <Row className="mb-2">
          <Col className="d-flex justify-content-center headings">Contact Me</Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col lg={6}>
            <Form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-center contact-form">
              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Your Email"
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
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Phone Number (optional)"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                  name="mobile"
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="error">{formik.errors.mobile}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
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
              <Button
                variant="primary"
                type="submit"
                className="card-button all-button"
                disabled={isSubmitting}
                style={{ width: "100%" }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Contact;
