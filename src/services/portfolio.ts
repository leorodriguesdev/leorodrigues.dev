import api from "./api";

// Education
export const getEducation = () => api.get("/education");
export const addEducation = (education: {
  title: string;
  institution: string;
  year: string;
  description: string;
}) => api.post("/education", education);
export const updateEducation = (id: number, education: Partial<{
  title: string;
  institution: string;
  year: string;
  description: string;
}>) => api.put(`/education`, { id, ...education });
export const deleteEducation = (id: number) => api.delete(`/education`, { params: { id } });

// Experiences
export const getExperiences = () => api.get("/experiences");
export const addExperience = (experience: {
  title: string;
  duration: string;
  description: string;
  achievements: string[];
}) => api.post("/experiences", experience);
export const updateExperience = (id: number, experience: Partial<{
  title: string;
  duration: string;
  description: string;
  achievements: string[];
}>) => api.put(`/experiences`, { id, ...experience });
export const deleteExperience = (id: number) => api.delete(`/experiences`, { params: { id } });

// Projects
export const getProjects = () => api.get("/projects");
export const addProject = (project: {
  title: string;
  description: string;
  image: string;
  link: string;
}) => api.post("/projects", project);
export const updateProject = (id: number, project: Partial<{
  title: string;
  description: string;
  image: string;
  link: string;
}>) => api.put(`/projects`, { id, ...project });
export const deleteProject = (id: number) => api.delete(`/projects`, { params: { id } });

// Skills
export const getSkills = () => api.get("/skills");
export const addSkill = (skill: { name: string; percentage: number }) => api.post("/skills", skill);
export const updateSkill = (id: number, skill: Partial<{
  name: string;
  percentage: number;
}>) => api.put(`/skills`, { id, ...skill });
export const deleteSkill = (id: number) => api.delete(`/skills`, { params: { id } });
