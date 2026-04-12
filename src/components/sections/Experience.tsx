// components/Experience.tsx
"use client";

import React, { useMemo, useState, useRef } from "react";
import { Briefcase, Calendar, CheckCircle2, Flame } from "lucide-react";
import { useTranslations } from "next-intl";

const EXPERIENCE_KEYS = [
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
] as const;

const Experience = () => {
  const t = useTranslations("experience");
  const ti = useTranslations("experienceItems");
  const experiences = useMemo(
    () =>
      EXPERIENCE_KEYS.map((k) => ({
        title: ti(`${k}.title`),
        duration: ti(`${k}.duration`),
        description: ti(`${k}.description`),
        achievements: ti.raw(`${k}.achievements`) as string[],
      })),
    [ti]
  );

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
          {t("title")}
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">{t("subtitle")}</p>

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
              <h4 className="text-lg font-semibold text-[var(--primary-color)]">
                {t("achievements")}
              </h4>
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
                <h4 className="text-lg font-semibold text-[var(--primary-color)]">
                {t("achievements")}
              </h4>
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
                    {t("achievements")}
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
              {showAll ? t("showLess") : t("showMore")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
