// components/Education.tsx
"use client";

import React, { useMemo, useState, useRef } from "react";
import { Award, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

const EDUCATION_KEYS = ["ed0", "ed1", "ed2", "ed3"] as const;

const Education = () => {
  const t = useTranslations("education");
  const ti = useTranslations("educationItems");
  const educationData = useMemo(
    () =>
      EDUCATION_KEYS.map((k) => ({
        title: ti(`${k}.title`),
        institution: ti(`${k}.institution`),
        year: ti(`${k}.year`),
        description: ti(`${k}.description`),
      })),
    [ti]
  );

  const [showAll, setShowAll] = useState(false);
  const educationRef = useRef<HTMLElement>(null);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (showAll && educationRef.current) {
      // Ao fechar, faz scroll para o topo da seção de educação
      educationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="education"
      ref={educationRef}
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center relative">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)] font-audiowide">
          {t("title")}
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">{t("subtitle")}</p>

        <div className="flex flex-col items-center space-y-12 max-w-4xl mx-auto relative">
          {/* Primeira Educação */}
          <div
            className="relative bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transform transition-transform duration-500 group text-left hover:scale-105 hover:shadow-2xl hover:-translate-y-3 hover:shadow-[var(--primary-color)] z-30"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <GraduationCap className="text-[var(--primary-color)]" size={32} />
              <div>
                <h3 className="text-2xl font-semibold text-[var(--text-color)]">
                  {educationData[0].title}
                </h3>
                <span className="block text-sm text-gray-500">{educationData[0].institution}</span>
                <span className="block text-sm text-gray-500">{educationData[0].year}</span>
              </div>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">
              {educationData[0].description}
            </p>

            {/* Ícone de Certificação no Hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Award className="text-[var(--primary-color)]" size={24} />
            </div>
          </div>

          {/* Segunda Educação - Metade Visível com Opacidade Reduzida */}
          <div className="relative -mt-12">
            <div
              className={`bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transform transition-transform duration-500 group text-left ${
                !showAll
                  ? "opacity-50 blur-sm"
                  : "opacity-100 blur-0"
              } hover:scale-105 hover:opacity-100 hover:blur-0 hover:h-auto hover:-translate-y-3 hover:shadow-[var(--primary-color)] z-20`}
              style={
                !showAll
                  ? { height: "220px", overflow: "hidden" } // Ajuste a altura conforme necessário para mostrar metade
                  : {}
              }
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <GraduationCap className="text-[var(--primary-color)]" size={32} />
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-color)]">
                    {educationData[1].title}
                  </h3>
                  <span className="block text-sm text-gray-500">{educationData[1].institution}</span>
                  <span className="block text-sm text-gray-500">{educationData[1].year}</span>
                </div>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">
                {educationData[1].description}
              </p>

              {/* Ícone de Certificação no Hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Award className="text-[var(--primary-color)]" size={24} />
              </div>
            </div>
          </div>

          {/* Demais Educations - Ocultas inicialmente */}
          {showAll &&
            educationData.slice(2).map((education, index) => (
              <div
                key={index + 2}
                className="relative bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transform transition-transform duration-500 group text-left hover:scale-105 hover:shadow-2xl hover:-translate-y-3 hover:shadow-[var(--primary-color)] z-10"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <GraduationCap className="text-[var(--primary-color)]" size={32} />
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--text-color)]">
                      {education.title}
                    </h3>
                    <span className="block text-sm text-gray-500">{education.institution}</span>
                    <span className="block text-sm text-gray-500">{education.year}</span>
                  </div>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">
                  {education.description}
                </p>

                {/* Ícone de Certificação no Hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Award className="text-[var(--primary-color)]" size={24} />
                </div>
              </div>
            ))}
        </div>

        {/* Gradiente Indicativo */}
        {!showAll && educationData.length > 1 && (
          <div className="absolute bottom-16 left-0 w-full h-16 bg-gradient-to-t from-[var(--bg-color)] to-transparent pointer-events-none"></div>
        )}

        {/* Botão de ver mais ou ver menos */}
        <div className="mt-12">
          {educationData.length > 1 && (
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

export default Education;
