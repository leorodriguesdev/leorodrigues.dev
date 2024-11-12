// components/Experience.tsx
"use client";

import React from "react";
import { FaFire, FaBriefcase, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const experiences = [
  {
    title: "Analista de Sistemas Pleno - FIERGS",
    duration: "2022 - Presente",
    description: "Desenvolvimento front-end e mobile, modernizando aplicativos e otimizando processos.",
    achievements: [
      "Modernização de aplicativos críticos, reduzindo o tempo de resposta em 30%.",
      "Implementação de boas práticas de UI/UX, aprimorando a experiência do usuário.",
      "Colaboração com equipes multidisciplinares em metodologias ágeis.",
    ],
  },
  {
    title: "Desenvolvedor Freelance",
    duration: "2019 - Presente",
    description: "Desenvolvimento web e mobile com React, Node.js e tecnologias diversas.",
    achievements: [
      "Realização de mais de 50 projetos para clientes individuais e startups.",
      "Foco em soluções responsivas e escaláveis, alinhadas às necessidades do cliente.",
      "Desenvolvimento de APIs RESTful seguras e eficientes.",
    ],
  },
  {
    title: "Desenvolvedor Júnior - XYZ Solutions",
    duration: "2017 - 2019",
    description: "Implementação de funcionalidades em projetos de médio porte, contribuindo para equipes ágeis.",
    achievements: [
      "Desenvolvimento de funcionalidades para aplicativos de comércio eletrônico.",
      "Aprimoramento de código com boas práticas de Clean Code e Design Patterns.",
      "Colaboração com equipes de desenvolvimento para entregar projetos dentro do prazo.",
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)]">
          Experiência Profissional
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Uma jornada repleta de desafios e aprendizado, em constante evolução no mundo da tecnologia.
        </p>



        <div className="space-y-12 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group text-left  hover:-translate-y-3 hover:shadow-[var(--primary-color)]"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <FaBriefcase className="text-[var(--primary-color)] text-4xl" />
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-color)]">{experience.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    <span>{experience.duration}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">{experience.description}</p>

              {/* Bloco de Conquistas */}
              <div className="mt-6 space-y-2">
                <h4 className="text-lg font-semibold text-[var(--primary-color)]">Conquistas:</h4>
                <ul className="space-y-1">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <FaCheckCircle className="text-[var(--primary-color)]" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ícone animado no canto superior direito */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <FaFire className="text-[var(--primary-color)] text-3xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
