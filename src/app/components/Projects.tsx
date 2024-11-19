// components/Projects.tsx
"use client";

import React, { useContext, useMemo, useState } from "react";
import Image from "next/image";
import { AppContext } from "@/context/AppContext";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string; // Se houver um link
}

const Projects = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p>Carregando...</p>;
  }

  const { projects, loading, error } = context;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <p>Carregando projetos...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar os projetos: {error}</p>;
  }

  // Ordenar os projetos se necessário (por exemplo, por data ou outro critério)
  const sortedProjects = useMemo(() => {
    return projects.slice().sort((a, b) => b.id - a.id); // Exemplo: ordenação decrescente por ID
  }, [projects]);

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-10 text-[var(--primary-color)] font-audiowide">
          Projetos Destacados
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Conheça alguns dos projetos mais inovadores e dinâmicos que desenvolvi, combinando design e tecnologia para soluções de ponta.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {sortedProjects.map((project: Project) => (
            <div
              key={project.id}
              className="relative group bg-[var(--bg-card)] rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-[var(--primary-color)] duration-500"
            >
              {/* Imagem e Título do Projeto */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Imagem do projeto ${project.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute bottom-4 left-4 bg-[var(--bg-card)] bg-opacity-80 px-3 py-1 rounded-lg text-[var(--primary-color)] text-lg font-semibold shadow-md">
                  {project.title}
                </div>
              </div>

              {/* Overlay animado com conteúdo */}
              <div className="absolute inset-0 bg-[var(--bg-color)] border-4 border-[var(--primary-color)] rounded-2xl bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center">
                <h3 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">{project.title}</h3>
                <p className="text-lg mb-4 text-[var(--text-color)]">{project.description}</p>
                <button
                  onClick={openModal}
                  className="inline-block bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all duration-300 cursor-pointer"
                >
                  Ver Mais &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--bg-card)] p-6 rounded-lg max-w-lg mx-auto text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">
              Detalhes em Desenvolvimento
            </h3>
            <p className="text-lg text-[var(--text-color)]">
              Os detalhes deste projeto ainda estão em desenvolvimento. Em breve, mais informações estarão disponíveis.
            </p>
            <button
              onClick={closeModal}
              className="mt-6 bg-[var(--primary-color)] text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
