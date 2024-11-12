// components/Education.tsx
"use client";

import React from "react";
import { FaCertificate, FaGraduationCap } from "react-icons/fa";

const educationData = [
  {
    title: "Especialização em Desenvolvimento de Software com React, React Native e NodeJs",
    institution: "Rocketseat",
    year: "2023",
    description: "Especialização em desenvolvimento web com React, desenvolvimento de aplicações móveis em React native e node js como tecnologia para o backend.",
  },
  {
    title: "Tecnólogo, Análise e desenvolvimento de sistemas",
    institution: "Universidade Estácio de Sá",
    year: "2022",
    description: "Certificação avançada em desenvolvimento de aplicações React.",
  },
  {
    title: "Programação Web",
    institution: "IFRS - Instituto Federal do Rio Grande do Sul",
    year: "2020",
    description: "Atividades e grupos: Desenvolve e mantém projetos para a web. Utiliza linguagens de programação, banco de dados e recursos para a segurança da informação. Utiliza recursos de imagens, vídeos, animações, linguagens de marcação e folha de estilo para desenvolvimento web.",
  },
];

const Education = () => {
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
          {educationData.map((education, index) => (
            <div
              key={index}
              className="relative bg-[var(--bg-card)] rounded-xl shadow-lg p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl group text-left"
            >
              <div className="flex items-center space-x-4">
                <FaGraduationCap className="text-[var(--primary-color)] text-4xl" />
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-color)]">{education.title}</h3>
                  <span className="block text-sm text-gray-500">{education.institution}</span>
                  <span className="block text-sm text-gray-500">{education.year}</span>
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
