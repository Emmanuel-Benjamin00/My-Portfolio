import PropTypes from "prop-types";
import { motion } from "framer-motion";

function Section({ eyebrow, title, subtitle, children, id, onEyebrowClick }) {
  return (
    <section className="section" id={id}>
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow && (
              <span className="section-eyebrow" onClick={onEyebrowClick}>
                {eyebrow}
              </span>
            )}
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  onEyebrowClick: PropTypes.func,
};

export default Section;
