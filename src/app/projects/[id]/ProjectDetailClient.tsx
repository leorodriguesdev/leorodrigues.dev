// src/app/projects/[id]/ProjectDetailClient.tsx
'use client';

import React            from 'react';
import Image            from 'next/image';
import { motion }       from 'framer-motion';
import Tilt             from 'react-parallax-tilt';

import Navbar  from '@/app/components/layout/Navbar';
import Footer  from '@/app/components/layout/Footer';
import { Project } from '@/data/projectsData';

/* ------------------------ animações utilitárias ------------------------ */
const fadeUp  = { hidden:{opacity:0,y:40}, show:{opacity:1,y:0} };
const stagger = { show:{transition:{staggerChildren:0.12}} };
/* ---------------------------------------------------------------------- */

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <Navbar />

      {/* swirl neon (mesma vibe do list‑page) ---------------------------- */}
      <div className="relative pt-32 pb-10">
        <div className="absolute inset-0 -z-10 flex justify-center">
          <motion.div
            initial={{opacity:0,scale:0.3}}
            animate={{opacity:0.12,scale:2.2,rotate:360}}
            transition={{duration:22,repeat:Infinity,ease:'linear'}}
            className="w-[420px] h-[420px] rounded-full bg-[var(--primary-color)] blur-3xl"
          />
        </div>

        {/* cabeçalho ------------------------------------------------------ */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <motion.h1 variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold font-audiowide text-[var(--primary-color)]">
            {project.title}
          </motion.h1>

          {project.companyLogo && (
            <motion.div variants={fadeUp}
              className="relative w-40 h-16 md:h-20">
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

      {/* meta info (tipo / data / status) -------------------------------- */}
      <motion.section
        variants={stagger}
        initial="hidden" animate="show"
        className="container mx-auto px-4"
      >
        <motion.p variants={fadeUp}
          className="text-lg text-gray-400 mb-6">
          {project.type === 'website' ? 'Site / Web' : 'App / Mobile'} | 
          <span className="opacity-80">
            {new Date(project.date).toLocaleDateString('pt-BR', {
              year:'numeric', month:'long', day:'numeric'
            })}
          </span>
        </motion.p>

        { (project.status || project.sourceCodeUrl) && (
          <motion.div variants={fadeUp}
            className="text-sm text-gray-300 mb-10 space-y-1">
            {project.status && <p><b>Status:</b> {project.status}</p>}
            {project.sourceCodeUrl && (
              <p>
                <b>Código Fonte:</b>{' '}
                <a href={project.sourceCodeUrl} target="_blank" rel="noreferrer"
                   className="underline text-[var(--primary-color)] hover:text-[var(--accent-color)]">
                  ver repositório
                </a>
              </p>
            )}
          </motion.div>
        )}
      </motion.section>

      {/* galeria --------------------------------------------------------- */}
      <motion.section
        variants={stagger}
        initial="hidden" animate="show"
        className="container mx-auto px-4"
      >
        <ImagesGallery project={project}/>
      </motion.section>

      {/* descrição / highlights / stack / links -------------------------- */}
      <motion.section
        variants={stagger}
        initial="hidden" animate="show"
        className="container mx-auto px-4 max-w-4xl mt-16 pb-24"
      >
        {/* descrição */}
        <motion.h2 variants={fadeUp}
          className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
          Descrição
        </motion.h2>
        <motion.p variants={fadeUp} className="mb-8 leading-relaxed">
          {project.description}
        </motion.p>

        {/* highlights */}
        <motion.h2 variants={fadeUp}
          className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
          Principais Destaques
        </motion.h2>
        <motion.ul variants={fadeUp}
          className="list-disc list-inside mb-8 space-y-2">
          {project.highlights.map((h,i)=><li key={i}>{h}</li>)}
        </motion.ul>

        {/* stack */}
        <motion.h2 variants={fadeUp}
          className="text-2xl font-semibold mb-4 text-[var(--primary-color)]">
          Tech Stack
        </motion.h2>
        <motion.div variants={fadeUp}
          className="flex flex-wrap gap-2 mb-12">
          {project.techStack.map((t,i)=>(
            <span key={i}
              className="bg-[var(--bg-card)] px-3 py-1 rounded-full text-sm border border-[var(--primary-color)]">
              {t}
            </span>
          ))}
        </motion.div>

        {/* links */}
        <ProjectLinks project={project}/>
      </motion.section>

      <Footer/>
    </div>
  );
}

/* ----------------------------- Galeria --------------------------------- */
function ImagesGallery({ project }: { project: Project }) {
  const imgs = project.images?.length ? project.images : [project.image];

  return (
    <motion.div variants={stagger}
      className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* destaque */}
      <motion.div variants={fadeUp} className="col-span-1 md:col-span-2">
        <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable>
          <div className="relative h-80 md:h-[26rem] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={imgs[0]}
              alt={`${project.title} destaque`}
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width:1200px) 66vw, 800px"
            />
          </div>
        </Tilt>
      </motion.div>

      {/* extras */}
      {imgs.slice(1).map((url,idx)=>(
        <motion.div key={idx} variants={fadeUp}>
          <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable>
            <div className="relative h-52 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={url}
                alt={`${project.title} extra ${idx+1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="33vw"
              />
            </div>
          </Tilt>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ------------------------------ Links ---------------------------------- */
function ProjectLinks({ project }: { project: Project }) {
  if (!project.links) return null;
  const { website, playStore, appStore } = project.links;

  return (
    <motion.div variants={fadeUp} className="space-x-4 text-center">
      {website && (
        <a href={website} target="_blank" rel="noreferrer"
           className="inline-block bg-[var(--primary-color)] text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition">
          Acessar Site
        </a>
      )}
      {playStore && (
        <a href={playStore} target="_blank" rel="noreferrer"
           className="inline-block bg-green-500 px-6 py-2 rounded-full text-white font-bold hover:bg-green-600 transition">
          Play Store
        </a>
      )}
      {appStore && (
        <a href={appStore} target="_blank" rel="noreferrer"
           className="inline-block bg-blue-500 px-6 py-2 rounded-full text-white font-bold hover:bg-blue-600 transition">
          App Store
        </a>
      )}
    </motion.div>
  );
}
