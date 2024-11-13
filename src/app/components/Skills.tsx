// components/Skills.tsx
"use client";

import React from "react";
import { FaReact, FaNodeJs, FaJsSquare, FaCss3Alt,  } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript,  } from "react-icons/si";

const skills = [
  { icon: <FaReact className="text-blue-500" />, name: "React", percentage: 96 },
  { icon: <SiNextdotjs className="text-black dark:text-white" />, name: "Next.js", percentage: 89 },
  { icon: <FaNodeJs className="text-green-600" />, name: "Node.js", percentage: 81 },
  { icon: <SiTailwindcss className="text-blue-400" />, name: "Tailwind CSS", percentage: 87 },
  { icon: <SiTypescript className="text-blue-700" />, name: "TypeScript", percentage: 85 },
  { icon: <FaJsSquare className="text-yellow-500" />, name: "JavaScript", percentage: 95 },
  { icon: <FaCss3Alt className="text-blue-600" />, name: "CSS3", percentage: 90 },
  { icon: <FaReact className="text-blue-500" />, name: "React Native", percentage: 97 },

];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)] font-audiowide">
          Habilidades e Tecnologias
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Tecnologias e ferramentas que utilizo para transformar ideias em projetos de alta qualidade.
        </p>

        <div className="grid grid-cols-1 px-10 md:px-0 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative min-w-[255px] min-h-[176px] flex flex-col items-center space-y-5 bg-[var(--bg-card)] p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:rotate-2 duration-500 hover:shadow-[var(--primary-color)] group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Ícone da habilidade */}
              <div className="text-6xl transition-transform duration-500 group-hover:scale-110 group-hover:text-9xl md:group-hover:text-8xl lg:group-hover:text-9xl group-hover:rotate-6 group-hover:absolute group-hover:top-5 md:group-hover:top-8 group-hover:left-34 lg:group-hover:left-20 group-hover:-translate-x-1/2">
                {skill.icon}
              </div>

              {/* Nome da habilidade */}
              <h3 className="text-2xl font-semibold transition-opacity duration-500 opacity-80 group-hover:opacity-100 group-hover:hidden">
                {skill.name}
              </h3>

              {/* Barra de Progresso e Porcentagem */}
              <div className="absolute top-4 lg:top-6 right-12 md:-right-16 md:-right-18 -translate-x-3/4 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-black bg-opacity-70">
                  {/* Porcentagem */}
                  <span className="text-2xl font-bold text-white z-10">{skill.percentage}%</span>

                  {/* Barra de Progresso Circular */}
                  <svg className="absolute top-0 left-0 w-full h-full">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="38"
                      stroke="white"
                      strokeWidth="6"
                      fill="transparent"
                      className="opacity-20"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="38"
                      stroke="var(--primary-color)"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray="238" // Circunferência do círculo (aproximadamente)
                      strokeDashoffset="238"
                      style={{
                        strokeDashoffset: `${238 - (238 * skill.percentage) / 100}`,
                        transition: "stroke-dashoffset 1s ease-in-out",
                      }}
                    />
                  </svg>
                </div>
                <p className="font-audiowide text-xs text-[var(--text-color)] mt-2">
                  Expertise
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
