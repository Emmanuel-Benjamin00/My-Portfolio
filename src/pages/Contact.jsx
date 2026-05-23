import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import AxiosService from "../common/ApiService";
import { siteConfig } from "../config/siteConfig";
import Section from "../components/ui/Section";
import "./Contact.css";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", mobile: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.number().typeError("Must be a number"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        const res = await AxiosService.post("/user", values);
        if (res.status === 201) {
          resetForm();
          toast.success("Message sent! I'll get back to you soon.");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Section
      eyebrow="Contact"
      title="Let's get in touch"
      subtitle="Have a project, role, or just want to say hi? Drop a message."
    >
      <div className="contact-grid">
        {/* ── Form ─────────────────────────────────────── */}
        <motion.form
          onSubmit={formik.handleSubmit}
          className="contact-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <span className="form-error">{formik.errors.name}</span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="form-error">{formik.errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="mobile">Phone (optional)</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              placeholder="+91"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <span className="form-error">{formik.errors.mobile}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project, role, or idea..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.message && formik.errors.message && (
              <span className="form-error">{formik.errors.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary contact-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </motion.form>

        {/* ── Side panel ───────────────────────────────── */}
        <motion.aside
          className="contact-side"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3>Other ways to reach me</h3>

          <div className="contact-channels">
            <a href={`mailto:${siteConfig.email}`} className="contact-channel">
              <FontAwesomeIcon icon={faEnvelope} />
              <div>
                <span className="contact-channel-label">Email</span>
                <span className="contact-channel-value">{siteConfig.email}</span>
              </div>
            </a>

            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-channel"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <div>
                <span className="contact-channel-label">LinkedIn</span>
                <span className="contact-channel-value">Emmanuel B.</span>
              </div>
            </a>

            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="contact-channel"
            >
              <FontAwesomeIcon icon={faGithub} />
              <div>
                <span className="contact-channel-label">GitHub</span>
                <span className="contact-channel-value">@Emmanuel-Benjamin00</span>
              </div>
            </a>

            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="contact-channel"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              <div>
                <span className="contact-channel-label">WhatsApp</span>
                <span className="contact-channel-value">{siteConfig.phone}</span>
              </div>
            </a>

            <div className="contact-channel contact-channel-static">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <div>
                <span className="contact-channel-label">Location</span>
                <span className="contact-channel-value">{siteConfig.location}</span>
              </div>
            </div>
          </div>

          {/* ── HIDDEN: Book a call ─── */}
          {siteConfig.bookACall.show && siteConfig.bookACall.calendlyUrl && (
            <div className="book-call">
              <h4>Prefer a quick call?</h4>
              <p>Book a 30-minute slot — no agenda needed.</p>
              <a
                href={siteConfig.bookACall.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Book a call
              </a>
            </div>
          )}
        </motion.aside>
      </div>
    </Section>
  );
}

export default Contact;
