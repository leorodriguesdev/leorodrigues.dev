// components/Experience.tsx
"use client";

import React, { useState, useRef } from "react";
import { Briefcase, Calendar, CheckCircle2, Flame } from "lucide-react";

const experiences = [
  {
    title: "Fundador e Desenvolvedor - Leorodrigues.dev LTDA",
    duration: "2020 - Presente",
    description:
      "Fundador de empresa de desenvolvimento de software, atendendo clientes próprios com soluções customizadas em aplicativos mobile e web. Desenvolvimento de projetos end-to-end, desde a concepção até a entrega e manutenção.",
    achievements: ["Gestão de projetos", "Desenvolvimento full stack", "Atendimento ao cliente", "React Native", "Kotlin", "Swift", "Node.js"],
  },
  {
    title: "Engenheiro de Software Sênior - Raiô Benefícios",
    duration: "Set 2025 - Presente · 5 meses",
    description:
      "Desenvolvedor full stack sênior, com foco em escalabilidade e performance do aplicativo de benefícios corporativos Raiô Benefícios. Com as tecnologias React Native e NodeJS.",
    achievements: ["React Native", "Kotlin", "Swift", "Node.js"],
  },
  {
    title: "Desenvolvedor Mobile Sênior - STV Segurança",
    duration: "Mai 2024 - Presente · 1 ano 9 meses",
    description:
      "Desenvolvedor freelancer em aplicativo corporativo para funcionários da empresa, como hub de informações gerais e profissionais com fácil acesso.",
    achievements: ["React Native", "Kotlin", "Swift"],
  },
  {
    title: "Desenvolvedor e Analista de Sistemas Pleno - Sistema FIERGS",
    duration: "Abr 2023 - Set 2025 · 2 anos 6 meses",
    description:
      "Analista e desenvolvedor de sistemas pleno. Desenvolvedor web e mobile utilizando React e React Native, também fazendo a sustentação de sistemas legados.",
    achievements: ["Desenvolvimento orientado a testes", "JavaScript", "React", "React Native", "Kotlin", "Swift", "21+ competências adicionais"],
  },
  {
    title: "Desenvolvedor Mobile - IBM (Banco do Brasil)",
    duration: "Dez 2021 - Mar 2023 · 1 ano 4 meses",
    description:
      "Desenvolvimento mobile na conta do Banco do Brasil, com especialização no desenvolvimento do app de investimentos.",
    achievements: ["Jest", "Desenvolvimento de front-end", "1+ competência adicional"],
  },
  {
    title: "QA Tester - Sicredi",
    duration: "Ago 2021 - Nov 2021 · 4 meses",
    description:
      "QA em projeto para o banco Sicredi, envolvendo o sistema de carteiras de usuários para respectivos gerentes. Utilizei ferramentas como Kafka, PostgreSQL, RestAssured e Salesforce.",
    achievements: ["PostgreSQL", "Salesforce", "Automação de testes"],
  },
  {
    title: "Desenvolvedor Full Stack - IBM",
    duration: "Mar 2021 - Ago 2021 · 6 meses",
    description:
      "Desenvolvimento full-stack em projeto de controle de estágios na IBM, utilizando Angular, Java com Spring e PostgreSQL.",
    achievements: ["Desenvolvimento de front-end", "Java com Spring", "PostgreSQL"],
  },
  {
    title: "Suporte ao Cliente - Nitronnews Email Marketing",
    duration: "Jun 2020 - Mar 2021 · 10 meses",
    description:
      "Suporte técnico aos clientes da ferramenta Nitronnews por meio de diversos canais e produção de conteúdo técnico.",
    achievements: ["Suporte técnico", "Documentação", "Produção de conteúdo"],
  },
];

const Experience = () => {
  const [showAll, setShowAll] = useState(false);
  const experienceRef = useRef<HTMLElement>(null);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (showAll && experienceRef.current) {
      // Ao fechar, faz scroll para o topo da seção de experiência
      experienceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center relative">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)] font-audiowide">
          Experiência Profissional
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Uma jornada repleta de desafios e aprendizado, em constante evolução no mundo da tecnologia.
        </p>

        <div className="flex flex-col items-center space-y-12 max-w-4xl mx-auto relative">
          {/* Primeira experiência totalmente visível */}
          <div
            className="relative bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transform transition-transform duration-500 group text-left hover:scale-105 hover:shadow-2xl hover:-translate-y-3 hover:shadow-[var(--primary-color)] z-30"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <Briefcase className="text-[var(--primary-color)]" size={32} />
              <div>
                <h3 className="text-2xl font-semibold text-[var(--text-color)]">
                  {experiences[0].title}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2" size={16} />
                  <span>{experiences[0].duration}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">
              {experiences[0].description}
            </p>

            {/* Conquistas do primeiro item */}
            <div className="mt-6 space-y-2">
              <h4 className="text-lg font-semibold text-[var(--primary-color)]">Conquistas:</h4>
              <ul className="space-y-1">
                {experiences[0].achievements.map((achievement, i) => (
                  <li key={i} className="flex items-center space-x-2 text-[var(--text-color)]">
                    <CheckCircle2 className="text-[var(--primary-color)]" size={16} />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ícone no hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Flame className="text-[var(--primary-color)]" size={24} />
            </div>
          </div>

          {/* Segunda experiência - metade visível se não expandido */}
          <div className="relative -mt-12 w-full">
            <div
              className={`bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transform transition-transform duration-500 group text-left ${
                !showAll ? "opacity-50 blur-sm" : "opacity-100 blur-0"
              } hover:scale-105 hover:opacity-100 hover:blur-0 hover:h-auto  hover:-translate-y-3 hover:shadow-[var(--primary-color)] z-20`}
              style={
                !showAll
                  ? { height: "220px", overflow: "hidden" }
                  : {}
              }
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <Briefcase className="text-[var(--primary-color)]" size={32} />
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-color)]">
                    {experiences[1].title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2" size={16} />
                    <span>{experiences[1].duration}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">
                {experiences[1].description}
              </p>

              {/* Conquistas */}
              <div className="mt-6 space-y-2">
                <h4 className="text-lg font-semibold text-[var(--primary-color)]">Conquistas:</h4>
                <ul className="space-y-1">
                  {experiences[1].achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center space-x-2 text-[var(--text-color)]">
                      <CheckCircle2 className="text-[var(--primary-color)]" size={16} />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ícone no hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Flame className="text-[var(--primary-color)]" size={24} />
              </div>
            </div>
          </div>

          {/* Demais experiências - ocultas inicialmente */}
          {showAll &&
            experiences.slice(2).map((experience, index) => (
              <div
                key={index + 2}
                className="relative bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transform transition-transform duration-500 group text-left hover:scale-105 hover:shadow-2xl hover:-translate-y-3 hover:shadow-[var(--primary-color)] z-10"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <Briefcase className="text-[var(--primary-color)]" size={32} />
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--text-color)]">
                      {experience.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2" size={16} />
                      <span>{experience.duration}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">
                  {experience.description}
                </p>

                {/* Conquistas */}
                <div className="mt-6 space-y-2">
                  <h4 className="text-lg font-semibold text-[var(--primary-color)]">
                    Conquistas:
                  </h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center space-x-2 text-[var(--text-color)]">
                        <CheckCircle2 className="text-[var(--primary-color)]" size={16} />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ícone no hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Flame className="text-[var(--primary-color)]" size={24} />
                </div>
              </div>
            ))}
        </div>

        {/* Gradiente no fim para indicar mais conteúdo */}
        {!showAll && experiences.length > 1 && (
          <div className="absolute bottom-16 left-0 w-full h-16 bg-gradient-to-t from-[var(--bg-color)] to-transparent pointer-events-none"></div>
        )}

        {/* Botão de ver mais/ver menos */}
        <div className="mt-12">
          {experiences.length > 1 && (
            <button
              onClick={toggleShowAll}
              className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30 hover:-translate-y-1 transition-all duration-300 transform"
              aria-expanded={showAll}
            >
              {showAll ? "Ver Menos" : "Ver Mais Experiências"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
