import { useEffect, useState } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";
import { getSkills } from "../api/api";
import useReveal from "../hooks/useReveal";
import "./Skills.css";

const ICON_MAP = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nodejs: SiNodedotjs,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  git: SiGit,
};

const FALLBACK_SKILLS = [
  { id: 1, name: "HTML", level: 95, icon: "html", color: "#e34f26" },
  { id: 2, name: "CSS", level: 90, icon: "css", color: "#2965f1" },
  { id: 3, name: "JavaScript", level: 90, icon: "javascript", color: "#f7cb3e" },
  { id: 4, name: "React.js", level: 85, icon: "react", color: "#61dafb" },
  { id: 5, name: "Next.js", level: 80, icon: "nextjs", color: "#ffffff" },
  { id: 6, name: "TypeScript", level: 85, icon: "typescript", color: "#3178c6" },
  { id: 7, name: "Node.js", level: 80, icon: "nodejs", color: "#83cd29" },
  { id: 8, name: "Tailwind CSS", level: 90, icon: "tailwind", color: "#38bdf8" },
  { id: 9, name: "Git", level: 85, icon: "git", color: "#f34f29" },
];

export default function Skills() {
  const [skills, setSkills] = useState(FALLBACK_SKILLS);
  const [headRef, headVisible] = useReveal();

  useEffect(() => {
    let mounted = true;
    getSkills()
      .then((res) => {
        if (mounted && res.data?.data?.length) setSkills(res.data.data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="skills">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">My Skills</span>
          <h2>
            Technologies I <span className="gradient-text">Master</span>
          </h2>
        </div>

        <div className="skills__grid">
          {skills.map((skill, i) => (
            <SkillBar key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }) {
  const [ref, visible] = useReveal();
  const Icon = ICON_MAP[skill.icon];

  return (
    <div ref={ref} className={`skill-bar reveal reveal-delay-${(index % 4) + 1} ${visible ? "is-visible" : ""}`}>
      <div className="skill-bar__head">
        <span className="skill-bar__name">
          <span className="skill-bar__icon" style={{ color: skill.color }}>
            {Icon ? <Icon /> : null}
          </span>
          {skill.name}
        </span>
        <span className="skill-bar__pct">{skill.level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{ width: visible ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}
