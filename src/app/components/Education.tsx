// components/Education.tsx
"use client";

import React, { useContext, useMemo } from "react";
import { FaCertificate, FaGraduationCap } from "react-icons/fa";
import { AppContext } from "@/context/AppContext";

const Education = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p>Carregando...</p>;
  }

  const { education, loading, error } = context;

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar os dados: {error}</p>;
  }

  const sortedEducationData = useMemo(() => {
    return education.slice().sort((a, b) => {
      return parseInt(b.year) - parseInt(a.year);
    });
  }, [education]);

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)] font-audiowide">
          Educação e Certificações
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Formação acadêmica e certificações que fortalecem minhas habilidades e conhecimentos na área de tecnologia.
        </p>

        <div className="space-y-12 max-w-4xl mx-auto">
          {sortedEducationData.map((education) => (
            <div
              key={education.id}
              className="relative bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl group text-left"
            >
              <div className="flex items-center space-x-4">
                <FaGraduationCap className="text-[var(--primary-color)] text-4xl" />
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-color)]">
                    {education.title}
                  </h3>
                  <span className="block text-sm text-gray-500">
                    {education.institution}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {education.year}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-color)]">
                {education.description}
              </p>
              {/* Ícone de certificação no hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <FaCertificate className="text-[var(--primary-color)] text-3xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
