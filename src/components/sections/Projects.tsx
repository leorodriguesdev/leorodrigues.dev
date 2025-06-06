// components/Projects.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";


const projects = [
  {
    title: "dev.finances",
    description: "Aplicação de controle financeiro desenvolvida com HTML, CSS e JavaScript puro, permitindo registrar e visualizar entradas, saídas e saldo total.",
    image: "/projects/dev-finances/web.png",
  },
  {
    title: "Clone Spotify",
    description: "Landing page clone do Spotify desenvolvida com HTML, CSS e Bootstrap para treinar responsividade, carrossel de destaques e organização de seções promocionais.",
    image: "/projects/clonespotify/clone-spotify-desktop.png",
  },
  {
    title: "Finans",
    description: "Landing page moderna e responsiva para uma solução de finanças pessoais. Desenvolvido com HTML, CSS e Bootstrap para apresentar recursos e benefícios do produto de forma clara e atraente.",
    image: "/projects/finans/finans-desktop.png",
  }
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-10 text-[var(--primary-color)] font-audiowide">
          Projetos Destacados
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Conheça alguns dos projetos mais inovadores e dinâmicos que desenvolvi, combinando design e tecnologia para soluções de ponta.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
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
              <div className="absolute inset-0 bg-[var(--bg-color)] border-4 border-[var(--primary-color)] rounded-2xl bg-opacity-80 opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center">
                <h3 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">{project.title}</h3>
                <p className="text-lg mb-4 text-[var(--text-color)]">{project.description}</p>
                <Link href={`/projects`}>
                <button className="inline-block bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all duration-300 cursor-pointer">
                  Ver Mais &rarr;
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;