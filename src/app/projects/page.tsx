"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Code2, ExternalLink, Github, Calendar } from 'lucide-react';

import { projectsData } from '@/data/projectsData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';

type FilterOption = 'all' | 'website' | 'mobile' | 'api';

export default function AllProjectsPage() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tech stack tags
  const allTechTags = Array.from(
    new Set(projectsData.flatMap(p => p.techStack))
  ).sort();

  // Filter projects by type and tag
  const filtered = projectsData
    .filter(p => {
      const typeMatch = filter === 'all' ? true : p.type === filter;
      const tagMatch = selectedTag ? p.techStack.includes(selectedTag) : true;
      return typeMatch && tagMatch;
    })
    .reverse();

  // Contagem de projetos por categoria
  const projectCounts = {
    all: projectsData.length,
    website: projectsData.filter(p => p.type === 'website').length,
    mobile: projectsData.filter(p => p.type === 'mobile').length,
    api: projectsData.filter(p => p.type === 'api').length,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SEO
        title="Projetos | Leo Rodrigues"
        description="Portfolio de projetos desenvolvidos por Leo Rodrigues. Aplicações web, mobile e sistemas full stack usando React, Next.js, TypeScript e Node.js."
      />

      <div className="pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 mb-16"
          >
            <h1 className="text-4xl md:text-5xl tracking-tight">
              Meus <span className="text-primary">Projetos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma coleção dos projetos que desenvolvi, desde aplicações web completas até experimentações com novas tecnologias
            </p>
          </motion.div>

          {/* Filter by Type */}
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
      >
            <div className="flex flex-wrap gap-3 justify-center">
              {(['all', 'website', 'mobile', 'api'] as FilterOption[]).map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    setFilter(btn);
                    setSelectedTag(null);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === btn
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border border-border hover:border-primary"
                }`}
            >
                  {btn === 'all'
                    ? `Todos (${projectCounts.all})`
                    : btn === 'website'
                    ? `Websites (${projectCounts.website})`
                    : btn === 'api'
                    ? `API (${projectCounts.api})`
                    : `Apps (${projectCounts.mobile})`}
            </button>
          ))}
            </div>
        </motion.div>

          {/* Filter by Tech Tags */}
          {allTechTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                    selectedTag === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border border-border hover:border-primary"
                  }`}
                >
                  Todas as Tecnologias
                </button>
                {allTechTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary border border-border hover:border-primary"
                    }`}
              >
                    {tag}
              </button>
            ))}
              </div>
          </motion.div>
        )}

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="h-full bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                  {/* Project Image/Preview */}
                  <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Code2 className="text-primary/40" size={48} />
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(project.date).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {project.type === 'website'
                          ? 'Site / Web'
                          : project.type === 'api'
                          ? 'Sistema / API'
                          : 'App / Mobile'}
                      </span>
                    </div>

                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-secondary border border-border rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-3 py-1 bg-secondary border border-border rounded text-sm text-muted-foreground">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Link
                        href={`/projects/${project.id}?title=${project.title}`}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center"
                      >
                        Ver Detalhes
                      </Link>
                      {project.sourceCodeUrl && (
                        <a
                          href={project.sourceCodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.links?.website && (
                        <a
                          href={project.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
          </div>
              </motion.div>
            ))}
          </div>

          {/* No projects message */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Code2 className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground">
                Nenhum projeto encontrado com essa tecnologia.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
