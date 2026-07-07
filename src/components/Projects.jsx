import { useEffect, useState } from "react";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { getProjects } from "../api/api";
import useReveal from "../hooks/useReveal";
import "./Projects.css";

const GRADIENTS = [
  "linear-gradient(135deg, #7c3aed, #4f7cff)",
  "linear-gradient(135deg, #4f7cff, #22d3ee)",
  "linear-gradient(135deg, #0ea5e9, #0f172a)",
  "linear-gradient(135deg, #ec4899, #7c3aed)",
];

const FALLBACK_PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with modern UI/UX, cart, and secure checkout.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    number: "02",
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates and boards.",
    tech: ["Next.js", "Express", "Socket.io", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    number: "03",
    title: "Crypto Dashboard",
    description: "Real-time cryptocurrency tracking dashboard with live charts and alerts.",
    tech: ["React", "Node.js", "WebSocket", "Chart.js"],
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [headRef, headVisible] = useReveal();

  useEffect(() => {
    let mounted = true;
    getProjects()
      .then((res) => {
        if (mounted && res.data?.data?.length) setProjects(res.data.data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Featured Projects</span>
          <h2>Some of My Recent Work</h2>
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal();
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <article
      ref={ref}
      className={`glass-card project-card reveal reveal-delay-${(index % 4) + 1} ${visible ? "is-visible" : ""}`}
    >
      <div className="project-card__media" style={{ background: gradient }}>
        <span className="project-card__number">{project.number}</span>
        <div className="project-card__media-glyph" aria-hidden="true">
          <FiExternalLink />
        </div>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-card__tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-card__links">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-card__icon-link" aria-label={`${project.title} GitHub repository`}>
            <FiGithub />
          </a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="project-card__icon-link" aria-label={`${project.title} live demo`}>
            <FiExternalLink />
          </a>
          <a href={project.demo} target="_blank" rel="noreferrer" className="project-card__view">
            View Project <FiArrowUpRight />
          </a>
        </div>
      </div>
    </article>
  );
}
