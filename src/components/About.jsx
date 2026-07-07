import { useEffect, useState } from "react";
import { FiArrowUpRight, FiCalendar, FiCode, FiSmile, FiAward } from "react-icons/fi";
import { getProfile } from "../api/api";
import useReveal from "../hooks/useReveal";
import "./About.css";

const ICONS = { calendar: FiCalendar, code: FiCode, smile: FiSmile, trophy: FiAward };

const FALLBACK_STATS = [
  { id: 1, label: "Years Experience", value: 4, suffix: "+", icon: "calendar" },
  { id: 2, label: "Projects Completed", value: 50, suffix: "+", icon: "code" },
  { id: 3, label: "Happy Clients", value: 30, suffix: "+", icon: "smile" },
  { id: 4, label: "Client Satisfaction", value: 100, suffix: "%", icon: "trophy" },
];

const FALLBACK_ABOUT = {
  heading: "I'm passionate about creating digital solutions",
  description:
    "With 4+ years of experience in web development, I help businesses and individuals bring their ideas to life through clean, efficient, and user-friendly code.",
};

export default function About() {
  const [about, setAbout] = useState(FALLBACK_ABOUT);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [ref, visible] = useReveal();

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then((res) => {
        const data = res.data?.data;
        if (mounted && data) {
          if (data.about) setAbout(data.about);
          if (data.stats) setStats(data.stats);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="about">
      <div className="container about__grid">
        <div ref={ref} className={`about__text reveal ${visible ? "is-visible" : ""}`}>
          <span className="eyebrow">About Me</span>
          <h2 className="about__heading">{about.heading}</h2>
          <p className="about__desc">{about.description}</p>
          <a href="#contact" className="btn btn-outline">
            Learn More About Me <FiArrowUpRight />
          </a>
        </div>

        <div className="about__stats">
          {stats.map((stat, i) => {
            const Icon = ICONS[stat.icon] || FiCode;
            return (
              <StatCard key={stat.id} stat={stat} Icon={Icon} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, Icon, index }) {
  const [ref, visible] = useReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(stat.value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, stat.value]);

  return (
    <div
      ref={ref}
      className={`glass-card about__stat reveal reveal-delay-${(index % 4) + 1} ${visible ? "is-visible" : ""}`}
    >
      <span className="about__stat-icon">
        <Icon />
      </span>
      <div>
        <p className="about__stat-value">
          {count}
          {stat.suffix}
        </p>
        <p className="about__stat-label">{stat.label}</p>
      </div>
    </div>
  );
}
