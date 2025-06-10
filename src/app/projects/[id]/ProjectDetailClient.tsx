'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ImageGallery from './components/ImagesGallery';
import { Project } from '@/data/projectsData';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function ProjectDetailClient({ 
  project, 
  titleFromUrl 
}: { 
  project: Project; 
  titleFromUrl?: string; 
}) {
  // Usar o título da URL se disponível, senão usar o título do projeto
  const displayTitle = titleFromUrl || project.title;

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <Navbar />

      <div className="relative pt-32 pb-10">
        <div className="absolute inset-0 -z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 0.12, scale: 2.2, rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="w-[420px] h-[420px] rounded-full bg-[var(--primary-color)] blur-3xl"
          />
        </div>

        {/* botao para voltar */}
        <motion.div
          variants={fadeUp}
          className="container mx-auto px-4 mb-8"
        >
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--primary-color)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 group"
          >
            <motion.svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: -2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </motion.svg>
            <span className="font-medium">Voltar aos Projetos</span>
          </Link>
        </motion.div>

        <motion.header
          variants={stagger}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold font-audiowide text-[var(--primary-color)]"
          >
            {displayTitle}
          </motion.h1>

          {project.companyLogo && (
            <motion.div variants={fadeUp} className="relative w-40 h-16 md:h-20 rounded-lg overflow-hidden">
              <Image
                src={project.companyLogo}
                alt="Logo da empresa"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          )}
        </motion.header>
      </div>

      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <motion.p variants={fadeUp} className="text-lg text-gray-400 mb-6">
          {project.type === 'website' ? 'Site / Web' : 'App / Mobile'} |{' '}
          <span className="opacity-80">
            {new Date(project.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </motion.p>

        {(project.status || project.sourceCodeUrl) && (
          <motion.div variants={fadeUp} className="text-sm text-gray-300 mb-10 space-y-1">
            {project.status && <p><b>Status:</b> {project.status}</p>}
            {project.sourceCodeUrl && (
              <p>
                <b>Código Fonte:</b>{' '}
                <a
                  href={project.sourceCodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-[var(--primary-color)] hover:text-[var(--accent-color)] hover:scale-105 transition-all duration-300 transform inline-block"
                >
                  ver repositório
                </a>
              </p>
            )}
          </motion.div>
        )}
      </motion.section>

      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <ImageGallery
          images={project.images?.length ? project.images : [project.image]}
          projectTitle={displayTitle}
        />
      </motion.section>

      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 max-w-4xl mt-16 pb-24"
      >
        <motion.h2 variants={fadeUp} className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
          Descrição
        </motion.h2>
        <motion.p variants={fadeUp} className="mb-8 leading-relaxed">
          {project.description}
        </motion.p>

        <motion.h2 variants={fadeUp} className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
          Principais Destaques
        </motion.h2>
        <motion.ul variants={fadeUp} className="list-disc list-inside mb-8 space-y-2">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </motion.ul>

        <motion.h2 variants={fadeUp} className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
          Tech Stack
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-12">
          {project.techStack.map((t, i) => (
            <span key={i} className="bg-[var(--bg-card)] px-3 py-1 rounded-full text-sm border border-[var(--primary-color)]">
              {t}
            </span>
          ))}
        </motion.div>

        <ProjectLinks project={project} />
      </motion.section>

      <Footer />
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.links) return null;
  const { website, playStore, appStore } = project.links;

  return (
    <motion.div variants={fadeUp} className="space-x-4 text-center">
      {website && (
        <a href={website} target="_blank" rel="noreferrer" className="inline-block bg-[var(--primary-color)] text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 hover:text-black hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30 hover:-translate-y-1 transition-all duration-300 transform">
          Acessar Site
        </a>
      )}
      {playStore && (
        <a href={playStore} target="_blank" rel="noreferrer" className="inline-block bg-green-500 px-6 py-2 rounded-full text-white font-bold hover:bg-green-600 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 transition-all duration-300 transform">
          Play Store
        </a>
      )}
      {appStore && (
        <a href={appStore} target="_blank" rel="noreferrer" className="inline-block bg-blue-500 px-6 py-2 rounded-full text-white font-bold hover:bg-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 transform">
          App Store
        </a>
      )}
    </motion.div>
  );
}
