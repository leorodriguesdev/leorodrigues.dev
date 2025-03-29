"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive"; // Importando react-responsive
import { projectsData } from "@/data/projectsData"; 
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

type LayoutOption = "list" | "card";
type FilterOption = "all" | "website" | "mobile";

export default function AllProjectsPage() {
  // Filtro de projetos
  const [filter, setFilter] = useState<FilterOption>("all");

  // Layout atual
  const [layout, setLayout] = useState<LayoutOption>("card");

  // Verifica se a tela é mobile (<= 767px)
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Sempre que for mobile, forçamos "lista"
  useEffect(() => {
    if (isMobile) {
      setLayout("list");
    }
  }, [isMobile]);

  // Filtra os projetos de acordo com o estado `filter`
  const filteredData = projectsData.filter((project) => {
    if (filter === "all") return true;
    return project.type === filter;
  });

  // Renderiza cada projeto em formato “card” (bloco)
  const renderProjectAsCard = (project: any) => (
    <div
      key={project.id}
      className="bg-[var(--bg-card)] rounded-xl shadow-lg p-6 hover:shadow-[var(--primary-color)] hover:-translate-y-2 transition-transform"
    >
      <Link href={`/projects/${project.id}`} className="no-underline hover:no-underline">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform"
            />
          </div>
          <h2 className="text-xl font-bold text-[var(--primary-color)] mb-2 font-audiowide">
            {project.title}
          </h2>
          <span className="text-sm mb-2 font-medium text-[var(--text-color)] opacity-70">
            {project.type === "website" ? "Site / Web" : "App / Mobile"}
          </span>
          <p className="text-sm text-[var(--text-color)] mb-4 line-clamp-3">
            {project.description}
          </p>
          <span className="text-sm font-semibold text-[var(--primary-color)]">
            Ver Detalhes
          </span>
        </div>
      </Link>
    </div>
  );

  // Renderiza cada projeto no estilo lista (imagem esquerda, texto à direita)
  // Em telas pequenas: flex-col (imagem em cima), em telas md+ flex-row
  const renderProjectAsList = (project: any) => (
    <div
      key={project.id}
      className="
        bg-[var(--bg-card)] rounded-xl shadow-lg hover:shadow-[var(--primary-color)]
        hover:-translate-y-2 transition-transform overflow-hidden
        w-full md:w-2/3 min-w-[300px]
      "
    >
      <Link href={`/projects/${project.id}`} className="no-underline hover:no-underline">
        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="relative overflow-hidden w-full md:w-1/2 h-48 md:h-auto">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform hover:scale-110"
            />
          </div>
          <div className="flex flex-col justify-center p-4 w-full md:w-1/2">
            <h2 className="text-xl font-bold text-[var(--primary-color)] mb-2 font-audiowide">
              {project.title}
            </h2>
            <span className="text-sm mb-2 font-medium text-[var(--text-color)] opacity-70">
              {project.type === "website" ? "Site / Web" : "App / Mobile"}
            </span>
            <p className="text-sm text-[var(--text-color)] mb-4 line-clamp-3">
              {project.description}
            </p>
            <span className="text-sm font-semibold text-[var(--primary-color)]">
              Ver Detalhes
            </span>
          </div>
        </div>
      </Link>
    </div>
  );

  // Decide como renderizar os projetos com base no layout
  const renderProjects = () => {
    if (layout === "list") {
      // Exibe em modo lista
      return (
        <div className="flex flex-col items-center gap-6">
          {filteredData.map(renderProjectAsList)}
        </div>
      );
    } else {
      // layout === "card"
      // Exibe em modo blocos (grid responsivo)
      return (
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map(renderProjectAsCard)}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <Navbar />

      <main className="container mx-auto py-16 px-4">
        <h1 className="text-5xl font-bold mb-8 text-[var(--primary-color)] font-audiowide text-center">
          Todos os Projetos
        </h1>
        <p className="mb-8 text-xl max-w-3xl mx-auto text-center">
          Conheça todos os projetos desenvolvidos, sejam eles websites ou aplicativos mobile, cada um com suas particularidades, tecnologias e destaques.
        </p>

        {/* Barra de opções (Filtro e Layout) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 px-2">
          
          {/* Filtro */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md border text-sm ${
                filter === "all"
                  ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                  : "bg-transparent border-[var(--primary-color)] text-[var(--text-color)]"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("website")}
              className={`px-4 py-2 rounded-md border text-sm ${
                filter === "website"
                  ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                  : "bg-transparent border-[var(--primary-color)] text-[var(--text-color)]"
              }`}
            >
              Websites
            </button>
            <button
              onClick={() => setFilter("mobile")}
              className={`px-4 py-2 rounded-md border text-sm ${
                filter === "mobile"
                  ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                  : "bg-transparent border-[var(--primary-color)] text-[var(--text-color)]"
              }`}
            >
              Apps
            </button>
          </div>

          {/* Layout (só aparece se NÃO for mobile) */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center" role="group">
                <button
                  onClick={() => setLayout("list")}
                  className={`
                    px-4 py-2 text-sm font-medium border border-[var(--primary-color)]
                    ${
                      layout === "list"
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-transparent text-[var(--text-color)]"
                    }
                    rounded-l-md focus:z-10 focus:outline-none
                  `}
                >
                  Lista
                </button>
                <button
                  onClick={() => setLayout("card")}
                  className={`
                    px-4 py-2 text-sm font-medium border border-[var(--primary-color)] border-l-0
                    ${
                      layout === "card"
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-transparent text-[var(--text-color)]"
                    }
                    rounded-r-md focus:z-10 focus:outline-none
                  `}
                >
                  Grade
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Renderiza projetos de acordo com o layout */}
        {renderProjects()}
      </main>

      <Footer />
    </div>
  );
}
