import { useEffect, useState } from "react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    setActive(href);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo" onClick={() => handleNavClick("#home")}>
          <span className="navbar__logo-icon">
            <HiOutlineCodeBracket />
          </span>
          Ritesh<span className="gradient-text">.dev</span>
        </a>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href ? "navbar__link--active" : ""}`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary navbar__cta navbar__cta--mobile" onClick={() => handleNavClick("#contact")}>
            Hire Me <FiArrowUpRight />
          </a>
        </nav>

        <div className="navbar__actions">
          <a href="#contact" className="btn btn-primary navbar__cta">
            Hire Me <FiArrowUpRight />
          </a>
          <button
            type="button"
            className="navbar__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
