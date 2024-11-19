// components/Experience.tsx
"use client";

import React from "react";
import { FaFire, FaBriefcase, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const experiences = [
  {
    title: "Analista de Sistemas Pleno - Sistema FIERGS",
    duration: "Abr 2023 - Presente",
    description: "Desenvolvedor mobile utilizando React Native, mantendo a sustentação de sistemas legados em HTML, CSS, JS e Angular.",
    achievements: [
      "React Native",
      "JavaScript",
      "5+ competências adicionais"
    ],
  },
  {
    title: "Desenvolvedor Mobile - IBM (Banco do Brasil)",
    duration: "Dez 2021 - Mar 2023 · 1 ano 4 meses",
    description: "Desenvolvimento mobile na conta do Banco do Brasil, com especialização no desenvolvimento do app de investimentos.",
    achievements: [
      "Jest",
      "Desenvolvimento de front-end",
      "1+ competência adicional"
    ],
  },
  {
    title: "QA Tester - Sicredi",
    duration: "Ago 2021 - Nov 2021 · 4 meses",
    description: "QA em projeto para o banco Sicredi, envolvendo o sistema de carteiras de usuários para respectivos gerentes. Utilizou ferramentas como Kafka, PostgreSQL, RestAssured e Salesforce.",
    achievements: [
      "PostgreSQL",
      "Salesforce",
      "Automação de testes"
    ],
  },
  {
    title: "Desenvolvedor Full Stack - IBM",
    duration: "Mar 2021 - Ago 2021 · 6 meses",
    description: "Desenvolvimento full-stack em projeto de controle de estágios na IBM, utilizando Angular, Java com Spring e PostgreSQL.",
    achievements: [
      "Desenvolvimento de front-end",
      "Java com Spring",
      "PostgreSQL"
    ],
  },
  {
    title: "Suporte ao Cliente - Nitronnews Email Marketing",
    duration: "Jun 2020 - Mar 2021 · 10 meses",
    description: "Suporte técnico aos clientes da ferramenta Nitronnews por meio de diversos canais e produção de conteúdo técnico.",
    achievements: [
      "Suporte técnico",
      "Documentação",
      "Produção de conteúdo"
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
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)] font-audiowide">
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
                    <li key={i} className="flex items-center space-x-2 text-[var(--text-color)]">
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