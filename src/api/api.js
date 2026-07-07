import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://backend-portfolio-ten-delta.vercel.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const getProfile = () => api.get("/profile");
export const getSkills = () => api.get("/skills");
export const getProjects = () => api.get("/projects");
export const getTestimonials = () => api.get("/testimonials");
export const sendContactMessage = (payload) => api.post("/contact", payload);

export default api;
