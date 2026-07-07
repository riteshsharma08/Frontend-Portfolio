import { useEffect, useState } from "react";
import { BsQuote } from "react-icons/bs";
import { getTestimonials } from "../api/api";
import useReveal from "../hooks/useReveal";
import "./Testimonials.css";

const FALLBACK = [
  {
    id: 1,
    quote:
      "Ritesh is an exceptional developer who delivers high-quality work on time. His attention to detail and problem-solving skills are outstanding.",
    name: "Sarah Johnson",
    role: "CEO, TechStart",
  },
  {
    id: 2,
    quote:
      "Working with Ritesh was a pleasure. He translated our vague ideas into a polished, fast, and reliable product ahead of schedule.",
    name: "Daniel Kim",
    role: "Product Manager, NovaLabs",
  },
  {
    id: 3,
    quote:
      "Ritesh's frontend skills are top-notch. The UI he built for us felt premium and our conversion rate improved noticeably.",
    name: "Priya Nair",
    role: "Founder, Loopwear",
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(FALLBACK);
  const [headRef, headVisible] = useReveal();

  useEffect(() => {
    let mounted = true;
    getTestimonials()
      .then((res) => {
        if (mounted && res.data?.data?.length) setTestimonials(res.data.data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="testimonials">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? "is-visible" : ""}`}>
          <span className="eyebrow">Testimonials</span>
          <h2>What Clients Say</h2>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const [ref, visible] = useReveal();
  return (
    <figure
      ref={ref}
      className={`glass-card testimonial-card reveal reveal-delay-${(index % 4) + 1} ${visible ? "is-visible" : ""}`}
    >
      <BsQuote className="testimonial-card__quote-icon" aria-hidden="true" />
      <blockquote className="testimonial-card__quote">{testimonial.quote}</blockquote>
      <figcaption className="testimonial-card__author">
        <span className="testimonial-card__avatar">{initials(testimonial.name)}</span>
        <div>
          <p className="testimonial-card__name">{testimonial.name}</p>
          <p className="testimonial-card__role">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
