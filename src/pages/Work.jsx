import projectsData from "../data/projectData";
import Section from "../components/ui/Section";
import ProjectCard from "../components/ui/ProjectCard";
import "./Work.css";

function Work() {
  return (
    <Section
      eyebrow="Work"
      title="Projects I've built"
      subtitle="A collection of personal and professional projects. Each one taught me something."
    >
      <div className="work-grid">
        {projectsData.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>
    </Section>
  );
}

export default Work;
