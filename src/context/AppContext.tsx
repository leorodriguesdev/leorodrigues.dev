// src/context/AppContext.tsx

"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import {
  fetchEducationData,
  fetchExperienceData,
  fetchProjectsData,
  fetchSkillsData,
} from "../services/portfolio"; // Ajuste o caminho conforme a sua estrutura

interface EducationData {
  id: number;
  title: string;
  institution: string;
  year: string;
  description: string;
}

interface ExperienceData {
  id: number;
  title: string;
  duration: string;
  description: string;
  achievements: string[];
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string; // Se houver um link
}

interface SkillData {
  id: number;
  name: string;
  percentage: number;
}

interface AppContextProps {
  education: EducationData[];
  experiences: ExperienceData[];
  projects: ProjectData[];
  skills: SkillData[];
  loading: boolean;
  error: string | null;
}

export const AppContext = createContext<AppContextProps | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [education, setEducation] = useState<EducationData[]>([]);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para buscar todos os dados
    const fetchData = async () => {
      try {
        const [educationData, experienceData, projectsData, skillsData] =
          await Promise.all([
            fetchEducationData(),
            fetchExperienceData(),
            fetchProjectsData(),
            fetchSkillsData(),
          ]);

        setEducation(educationData);
        setExperiences(experienceData);
        setProjects(projectsData);
        setSkills(skillsData);
      } catch (err) {
        console.error("Erro ao buscar os dados:", err);
        setError("Erro ao buscar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        education,
        experiences,
        projects,
        skills,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
