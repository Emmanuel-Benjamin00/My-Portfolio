import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./ProjectCard.css";

function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="project-card-image">
        <img src={project.img} alt={project.title} loading="lazy" />
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.content}</p>
        <div className="project-card-links">
          {project.site && (
            <a href={project.site} target="_blank" rel="noreferrer" className="project-link">
              Live Demo
              <ArrowIcon />
            </a>
          )}
          {project.feCode && (
            <a href={project.feCode} target="_blank" rel="noreferrer" className="project-link">
              {project.beCode ? "Frontend" : "Source"}
              <ArrowIcon />
            </a>
          )}
          {project.beCode && (
            <a href={project.beCode} target="_blank" rel="noreferrer" className="project-link">
              Backend
              <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"
      />
    </svg>
  );
}

ProjectCard.propTypes = {
  index: PropTypes.number,
  project: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    site: PropTypes.string,
    feCode: PropTypes.string,
    beCode: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
