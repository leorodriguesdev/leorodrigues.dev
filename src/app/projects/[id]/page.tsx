import { notFound } from "next/navigation";
import { projectsData } from "@/data/projectsData";
import React from "react";
import Image from "next/image";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Aguarda ambos os parâmetros
  const resolvedParams = await params;
  await searchParams; // se não usar, apenas aguarde para satisfazer o tipo
  const { id } = resolvedParams;
  const projectId = parseInt(id, 10);

  const project = projectsData.find((p) => p.id === projectId);
  if (!project) {
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
          <Image
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
