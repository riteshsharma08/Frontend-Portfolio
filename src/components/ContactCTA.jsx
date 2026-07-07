import { useEffect, useState } from "react";
import { FiArrowUpRight, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { getProfile, sendContactMessage } from "../api/api";
import useReveal from "../hooks/useReveal";
import "./ContactCTA.css";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function ContactCTA() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", text: "" });
  const [ref, visible] = useReveal();

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

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", text: "" });
    try {
      const res = await sendContactMessage(form);
      setStatus({ state: "success", text: res.data.message || "Message sent!" });
      setForm(initialForm);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      const text = apiErrors?.length
        ? apiErrors.join(" ")
        : "Something went wrong. Please try again in a moment.";
      setStatus({ state: "error", text });
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div ref={ref} className={`contact-cta reveal ${visible ? "is-visible" : ""}`}>
          <div className="contact-cta__intro">
            <span className="eyebrow">Let's Work Together</span>
            <h2 className="contact-cta__heading">Have a project in mind?</h2>
            <p className="contact-cta__text">
              I'm always open to discussing new projects and opportunities. Let's create
              something amazing together!
            </p>
            <a href={`mailto:${profile?.email || "hello@riteshdev.com"}`} className="btn btn-primary">
              Get In Touch <FiArrowUpRight />
            </a>

            <div className="contact-cta__meta">
              <div>
                <span className="contact-cta__meta-label">Email</span>
                <span>{profile?.email || "hello@riteshdev.com"}</span>
              </div>
              <div>
                <span className="contact-cta__meta-label">Phone</span>
                <span>{profile?.phone || "+91 98765 43210"}</span>
              </div>
            </div>
          </div>

          <form className="glass-card contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <label className="contact-form__field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  minLength={2}
                />
              </label>
              <label className="contact-form__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <label className="contact-form__field">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </label>

            <label className="contact-form__field">
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
                minLength={10}
              />
            </label>

            <button type="submit" className="btn btn-primary contact-form__submit" disabled={status.state === "loading"}>
              {status.state === "loading" ? "Sending..." : "Send Message"}
              <FiSend />
            </button>

            {status.state === "success" && (
              <p className="contact-form__status contact-form__status--success">
                <FiCheckCircle /> {status.text}
              </p>
            )}
            {status.state === "error" && (
              <p className="contact-form__status contact-form__status--error">
                <FiAlertCircle /> {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
