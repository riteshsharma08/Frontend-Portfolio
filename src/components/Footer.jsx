import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiPhone } from "react-icons/fi";
import { getProfile } from "../api/api";
import "./Footer.css";

const DEFAULT_SOCIAL = {
  github: "#",
  linkedin: "#",
  twitter: "#",
  instagram: "#",
};

export default function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then((res) => {
        if (mounted) setProfile(res.data?.data || null);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const social = profile?.social || DEFAULT_SOCIAL;
  const name = profile?.name || "Ritesh";

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            {name}
            <span className="gradient-text">.dev</span>
          </span>
          <p className="footer__tagline">Building fast, accessible, and beautiful web experiences.</p>
        </div>

        <div className="footer__contact">
          <span className="footer__heading">Follow Me</span>
          <div className="footer__social">
            <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
          <a href={`mailto:${profile?.email || "hello@riteshdev.com"}`} className="footer__link">
            <FiMail /> {profile?.email || "hello@riteshdev.com"}
          </a>
          <a href={`tel:${profile?.phone || ""}`} className="footer__link">
            <FiPhone /> {profile?.phone || "+91 98765 43210"}
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p>
          Made with <span className="footer__heart">&#10084;</span> by {name}
        </p>
      </div>
    </footer>
  );
}
