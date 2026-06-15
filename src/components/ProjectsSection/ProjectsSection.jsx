import { ArrowRight } from "lucide-react";
import { Icon } from "../../lib/icons.jsx";
import { SectionTitle } from "../SectionTitle/SectionTitle.jsx";

export function ProjectsSection({ title, projects }) {
  return (
    <section className="projects-section section-wrap" id="projects">
      <div className="projects-section__top">
        <SectionTitle>{title}</SectionTitle>
        <a href="/news">
          Все проекты <ArrowRight size={26} />
        </a>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className={`project-card project-card--${project.color}`} style={{ "--tilt": `${index % 2 ? 3 : -3}deg` }} key={project.id}>
            <div className="project-card__body">
              <Icon name={project.icon} size={52} strokeWidth={1.2} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <img src={project.image} alt="" />
          </article>
        ))}
      </div>
    </section>
  );
}
