'use client';

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ImageGallery from './components/ImagesGallery';
import { Project, projectsData } from '@/data/projectsData';
import Link from 'next/link';
import { SEO } from '@/components/SEO';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SafeImage } from '@/components/SafeImage';

export default function ProjectDetailClient({ 
  project, 
  titleFromUrl 
}: { 
  project: Project; 
  titleFromUrl?: string; 
}) {
  const displayTitle = titleFromUrl || project.title;
  const { trackProjectView, trackOutboundLink, trackProjectClick } = useAnalytics();

  useEffect(() => {
    trackProjectView(project.title);
  }, [project.title, trackProjectView]);

  // Get other projects for suggestions (2 most recent by ID, excluding current)
  const otherProjects = projectsData
    .filter(p => p.id !== project.id)
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SEO
        title={`${displayTitle} - Léo Rodrigues Portfolio`}
        description={project.description}
        keywords={project.techStack.join(", ")}
        type="article"
      />

      <div className="pt-24 pb-16">
        <div className="container mx-auto max-w-5xl px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
        >
          <Link 
            href="/projects" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
              <ArrowLeft size={20} />
              Voltar aos Projetos
          </Link>
        </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-12"
          >
            <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  {project.companyLogo && project.companyLogo.trim() !== "" && (
                    <div className="flex-shrink-0">
                      <SafeImage
                        src={project.companyLogo}
                        alt={`${project.title} logo`}
                        width={60}
                        height={60}
                        className="object-contain rounded-lg border border-border p-2 bg-card"
                        unoptimized={project.companyLogo.endsWith('.svg')}
                      />
                    </div>
                  )}
                  <h1 className="text-3xl md:text-4xl tracking-tight">
                    {displayTitle}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
            {new Date(project.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
                      day: 'numeric'
            })}
          </span>
                  <span>
                    {project.type === 'website'
                      ? 'Site / Web'
                      : project.type === 'api'
                      ? 'Sistema / API'
                      : 'App / Mobile'}
                  </span>
                  {project.status && (
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary">
                      {project.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
            {project.sourceCodeUrl && (
                <a
                  href={project.sourceCodeUrl}
                  target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutboundLink(`project-${project.id}-github`)}
                    className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    <Github size={24} />
                  </a>
                )}
                {project.links?.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutboundLink(`project-${project.id}-website`)}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={20} />
                    Acessar Site
                  </a>
                )}
                {project.links?.playStore && (
                  <a
                    href={project.links.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Play Store
                  </a>
                )}
                {project.links?.appStore && (
                  <a
                    href={project.links.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    App Store
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project Image/Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
      >
        <ImageGallery
          images={project.images?.length ? project.images : [project.image]}
          projectTitle={displayTitle}
        />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
      >
            <h2 className="text-2xl mb-4 tracking-tight">Descrição</h2>
            <p className="text-muted-foreground leading-relaxed">
          {project.description}
            </p>
          </motion.div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl mb-6 tracking-tight">Principais Destaques</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-muted-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl mb-6 tracking-tight">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="px-5 py-3 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                >
                  {tech}
                </motion.div>
          ))}
            </div>
          </motion.div>

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-12 border-t border-border"
            >
              <h2 className="text-2xl mb-6 tracking-tight">Outros Projetos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {otherProjects.map((otherProject) => (
                  <Link
                    key={otherProject.id}
                    href={`/projects/${otherProject.id}?title=${otherProject.title}`}
                    onClick={() => trackProjectClick(otherProject.id, otherProject.title)}
                    className="group p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {otherProject.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4 text-sm">
                      {otherProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {otherProject.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-secondary border border-border rounded text-sm"
                        >
                          {tech}
            </span>
          ))}
                    </div>
                  </Link>
                ))}
              </div>
        </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
