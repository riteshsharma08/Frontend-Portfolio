import { useEffect, useState } from "react";
import { FiArrowUpRight, FiDownload, FiCornerLeftUp } from "react-icons/fi";

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
import { getProfile } from "../api/api";
import useReveal from "../hooks/useReveal";
import profileImg from "../asset/profile.jpeg";
import "./Hero.css";

const TECH_ICON_MAP = {
  html: { icon: SiHtml5, color: "#e34f26" },
  css: { icon: SiCss, color: "#2965f1" },
  javascript: { icon: SiJavascript, color: "#f7cb3e" },
  typescript: { icon: SiTypescript, color: "#3178c6" },
  react: { icon: SiReact, color: "#61dafb" },
  nodejs: { icon: SiNodedotjs, color: "#83cd29" },
  nextjs: { icon: SiNextdotjs, color: "#ffffff" },
  tailwind: { icon: SiTailwindcss, color: "#38bdf8" },
  git: { icon: SiGit, color: "#f34f29" },
};

const FALLBACK = {
  name: "Ritesh",
  title: "I'm a Web Developer",
  headline: "I build things for the web.",
  intro:
    "I'm a passionate frontend developer specializing in building exceptional digital experiences with modern technologies.",
  resumeUrl: "#",
  techStack: ["html", "css", "javascript", "typescript", "react", "nodejs", "git"],
};

export default function Hero() {
  const [profile, setProfile] = useState(FALLBACK);
  const [ref, visible] = useReveal();

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then((res) => {
        if (mounted && res.data?.data) setProfile(res.data.data);
      })
      .catch(() => {
        /* keep fallback content if the API is unreachable */
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div ref={ref} className={`hero__content reveal ${visible ? "is-visible" : ""}`}>
          <span className="eyebrow">{profile.title}</span>
          <h1 className="hero__headline">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
            <br />
            {profile.headline}
          </h1>
          <p className="hero__intro">{profile.intro}</p>

          <div className="hero__cta-row">
            <a href="#projects" className="btn btn-primary">
              View My Work <FiArrowUpRight />
            </a>
            <a href={profile.resumeUrl} download className="btn btn-outline">
              Download CV <FiDownload />
            </a>
          </div>

          <div className="hero__tech">
            <span className="hero__tech-label">Technologies I work with</span>
            <div className="hero__tech-icons">
              {profile.techStack.map((key) => {
                const entry = TECH_ICON_MAP[key];
                if (!entry) return null;
                const Icon = entry.icon;
                return (
                  <span key={key} className="hero__tech-icon" style={{ "--icon-color": entry.color }}>
                    <Icon />
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`hero__visual reveal reveal-delay-2 ${visible ? "is-visible" : ""}`}>
          <div className="hero__glow-orb" aria-hidden="true" />
          <div className="hero__dots" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          <div className="hero__photo-ring">
             <img src={profileImg} alt={profile.name} className="hero__illustration" />
          </div>

          <div className="hero__code-card">
            <div className="hero__code-card-head">
              <span className="hero__code-tag">&lt;/&gt; Code</span>
              <span className="hero__code-dot" />
            </div>
            <pre className="hero__code-body">
{`const developer = {
  name: "${profile.name}",
  skills: ["React", "Node.js"],
  passion: "Building things
    for the web"
};`}
            </pre>
          </div>

          <span className="hero__scroll-hint">
            <FiCornerLeftUp />
          </span>
        </div>
      </div>
    </section>
  );
}