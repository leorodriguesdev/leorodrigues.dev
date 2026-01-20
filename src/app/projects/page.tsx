"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Code2, ExternalLink, Github, Calendar, ChevronDown, X } from 'lucide-react';

import { projectsData } from '@/data/projectsData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SafeImage } from '@/components/SafeImage';

type FilterOption = 'all' | 'website' | 'mobile' | 'api';

export default function AllProjectsPage() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTechTags, setShowAllTechTags] = useState(false);

  // Get all unique tech stack tags with usage count
  const techTagsWithCount = useMemo(() => {
    const tagCount: Record<string, number> = {};
    projectsData.forEach(p => {
      p.techStack.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Most used tags (top 8)
  const popularTags = techTagsWithCount.slice(0, 8).map(t => t.tag);
  const allTechTags = techTagsWithCount.map(t => t.tag);

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
        title="Projetos | Apps Mobile e Sites Desenvolvidos | Léo Rodrigues"
        description="Portfolio de projetos desenvolvidos por Léo Rodrigues. Aplicativos mobile React Native, sites Next.js, sistemas full stack. Veja casos de sucesso em desenvolvimento mobile e web."
        keywords="projetos React Native, projetos mobile, projetos Next.js, portfolio desenvolvedor, casos de sucesso desenvolvimento mobile"
      />
      <Breadcrumbs />

      <div className="pb-16">
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
              <div className="space-y-4">
                {/* Mobile: Select dropdown */}
                <div className="md:hidden">
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Filtrar por Tecnologia
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTag || ''}
                      onChange={(e) => setSelectedTag(e.target.value || null)}
                      className="w-full px-4 py-2.5 bg-card border border-border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm cursor-pointer"
                    >
                      <option value="">Todas as Tecnologias</option>
                      {allTechTags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={20} />
                  </div>
                </div>

                {/* Desktop: Compact view with popular tags */}
                <div className="hidden md:block">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setSelectedTag(null)}
                      className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                        selectedTag === null
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary border border-border hover:border-primary"
                      }`}
                    >
                      Todas
                    </button>
                    {popularTags.map((tag) => (
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
                    {!showAllTechTags && allTechTags.length > popularTags.length && (
                      <button
                        onClick={() => setShowAllTechTags(true)}
                        className="px-4 py-2 rounded-lg bg-secondary border border-border hover:border-primary transition-colors text-sm text-muted-foreground"
                      >
                        +{allTechTags.length - popularTags.length} mais
                      </button>
                    )}
                  </div>

                  {/* Expanded view with all tags */}
                  {showAllTechTags && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">Todas as tecnologias</span>
                        <button
                          onClick={() => setShowAllTechTags(false)}
                          className="px-3 py-1.5 rounded-lg bg-secondary border border-border hover:border-primary hover:bg-secondary/80 transition-all flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground group"
                        >
                          <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                          Fechar
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {allTechTags
                          .filter(tag => !popularTags.includes(tag))
                          .map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              className={`px-3 py-1.5 rounded-lg transition-colors text-xs ${
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
                </div>

                {/* Selected tag indicator */}
                {selectedTag && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-muted-foreground">Filtrado por:</span>
                    <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-medium border border-primary/20">
                      {selectedTag}
                    </span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="p-1.5 rounded-lg hover:bg-secondary border border-transparent hover:border-border transition-all text-muted-foreground hover:text-foreground group"
                      aria-label="Remover filtro"
                    >
                      <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                  </motion.div>
                )}
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
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <Code2 className="text-primary/40" size={48} />
                    )}
                    {project.companyLogo && project.companyLogo.trim() !== "" && (
                      <div className="absolute top-3 right-3 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-lg border border-border/50">
                        <SafeImage
                          src={project.companyLogo}
                          alt={`${project.title} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                          unoptimized={project.companyLogo.endsWith('.svg')}
                        />
                      </div>
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
