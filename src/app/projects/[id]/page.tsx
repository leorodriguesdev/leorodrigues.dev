// src/app/projects/[id]/page.tsx
import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";

type ProjectDetailProps = {
  params: {
    id: string;
  };
};

// É importante usar uma função server ou default export
export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  // O "id" vem como string. Convertendo para número (se seus IDs são number)
  const projectId = parseInt(params.id, 10);

  // Tenta encontrar o projeto com base no ID
  const project = projectsData.find((p) => p.id === projectId);

  // Se não encontrou, redireciona para 404
  if (!project) {
    // Podemos usar notFound() para gerar a página de 404 do Next
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--primary-color)] font-audiowide">
          {project.title}
        </h1>

        <p className="mb-8 text-lg text-gray-400">
          {/* Mostrando o tipo e a data, por exemplo */}
          {project.type === "website" ? "Site / Web" : "App / Mobile"} |{" "}
          <span className="opacity-80">
            {new Date(project.date).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>

        {/* Imagem em destaque */}
        <div className="w-full h-64 md:h-96 relative mb-10 rounded-lg overflow-hidden shadow-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Descrição detalhada */}
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
            Descrição
          </h2>
          <p className="mb-6">{project.description}</p>

          {/* Principais Destaques */}
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
            Principais Destaques
          </h2>
          <ul className="list-disc list-inside mb-6 ml-4 md:ml-8">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="mb-2">
                {item}
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-[var(--bg-card)] px-3 py-1 rounded-full text-sm border border-[var(--primary-color)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
