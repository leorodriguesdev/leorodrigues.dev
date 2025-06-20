// src/app/projects/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useMediaQuery } from 'react-responsive';

import { projectsData, Project } from '@/data/projectsData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ------------------------------------------------------------- */
/* animações utilitárias                                         */
const fadeUp = { hidden:{opacity:0,y:40}, show:{opacity:1,y:0} };
const stagger = { show:{transition:{staggerChildren:0.1}} };

type LayoutOption  = 'list' | 'card';
type FilterOption  = 'all'  | 'website' | 'mobile' | 'api';
/* ------------------------------------------------------------- */

export default function AllProjectsPage() {
  /* estado ---------------------------------------------------------------- */
  const [filter , setFilter ] = useState<FilterOption>('all');
  const [layout , setLayout ] = useState<LayoutOption>('card');
  const  isMobile            = useMediaQuery({ maxWidth: 767 });

  useEffect(()=>{ if (isMobile) setLayout('list'); },[isMobile]);

  const filtered = projectsData.filter(p => filter==='all' ? true : p.type===filter).reverse();

  // Contagem de projetos por categoria
  const projectCounts = {
    all: projectsData.length,
    website: projectsData.filter(p => p.type === 'website').length,
    mobile: projectsData.filter(p => p.type === 'mobile').length,
    api: projectsData.filter(p => p.type === 'api').length,
  };

  /* helpers de render ------------------------------------------------------ */
  const Card = (p:Project)=>(
    <motion.div
      variants={fadeUp}
      className="bg-[var(--bg-card)] rounded-3xl overflow-hidden shadow-lg hover:shadow-[var(--primary-color)] transition"
    >
      <Link href={`/projects/${p.id}?title=${p.title}`} className="no-underline">
        <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable>
          <div className="relative w-full h-48">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </Tilt>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold font-audiowide text-[var(--primary-color)] mb-1">
            {p.title}
          </h3>
          <span className="text-xs opacity-70">
            {p.type==='website' ? 'Site / Web' : p.type==='api' ? 'Sistema / API' :'App / Mobile'}
          </span>

          <p className="mt-4 text-sm line-clamp-3">{p.description}</p>

          <motion.span
            whileHover={{scale:1.05}}
            className="inline-block mt-6 text-sm font-semibold text-[var(--primary-color)]"
          >
            Ver Detalhes →
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );

  const ListItem = (p:Project)=>(
    <motion.div
      variants={fadeUp}
      className="bg-[var(--bg-card)] rounded-3xl shadow-lg hover:shadow-[var(--primary-color)] transition overflow-hidden w-full md:w-4/5"
    >
      {/* passar o titulo do projeto como parametro  */}
      <Link href={`/projects/${p.id}?title=${p.title}`} className="no-underline">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 h-48 md:h-auto">
            <Image src={p.image} alt={p.title} fill className="object-contain" />
          </div>

          <div className="p-6 flex flex-col justify-center gap-2">
            <h3 className="text-xl font-bold font-audiowide text-[var(--primary-color)]">
              {p.title}
            </h3>
            <span className="text-xs opacity-70">
              {p.type==='website' ? 'Site / Web' : 'App / Mobile'}
            </span>
            <p className="text-sm line-clamp-3">{p.description}</p>

            <span
              className="text-sm font-semibold text-[var(--primary-color)] mt-2"
            >
              Ver Detalhes →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  /* JSX -------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <Navbar />

      {/* swirl neon atrás do título */}
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 flex justify-center -z-10">
          <motion.div
            initial={{opacity:0,scale:0.3}}
            animate={{opacity:0.12,scale:2.2,rotate:360}}
            transition={{duration:20,repeat:Infinity,ease:'linear'}}
            className="w-96 h-96 rounded-full bg-[var(--primary-color)] blur-3xl"
          />
        </div>

        <motion.header
          variants={stagger}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 text-center"
        >
          <motion.h1 variants={fadeUp}
            className="text-5xl font-extrabold mb-6 font-audiowide text-[var(--primary-color)]">
            Todos os Projetos
          </motion.h1>

          <motion.p variants={fadeUp}
            className="mx-auto max-w-3xl text-xl mb-14">
            Conheça websites e apps desenvolvidos – cada um com desafios,
            tecnologias e resultados únicos.
          </motion.p>
        </motion.header>
      </div>

      {/* controles ---------------------------------------------------------- */}
      <motion.div
        variants={stagger} initial="hidden" animate="show"
        className="container mx-auto px-4 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        {/* filtro */}
        <motion.div variants={fadeUp} className="flex gap-2">
          {(['all','website','mobile','api'] as FilterOption[]).map(btn=>(
            <button key={btn}
              onClick={()=>setFilter(btn)}
              className={`
                px-4 py-2 text-sm rounded-md border transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                ${ filter===btn
                  ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)] hover:shadow-lg hover:shadow-[var(--primary-color)]/30'
                  : 'border-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 hover:shadow-lg'
                }`}
            >
              {btn==='all'?`Todos (${projectCounts.all})`:btn==='website'?`Websites (${projectCounts.website})`:btn==='api'?`API (${projectCounts.api})`:`Apps (${projectCounts.mobile})`}
            </button>
          ))}
        </motion.div>

        {/* layout toggle (desktop) */}
        {!isMobile && (
          <motion.div variants={fadeUp} className="inline-flex" role="group">
            {(['list','card'] as LayoutOption[]).map(btn=>(
              <button key={btn}
                onClick={()=>setLayout(btn)}
                className={`
                  px-4 py-2 text-sm font-medium border border-[var(--primary-color)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                  ${layout===btn
                    ? 'bg-[var(--primary-color)] text-white hover:shadow-lg hover:shadow-[var(--primary-color)]/30'
                    : 'bg-transparent hover:bg-[var(--primary-color)]/10 hover:shadow-lg'
                  }
                  ${btn==='list' ? 'rounded-l-md' : 'rounded-r-md -ml-px'}
                `}
              >
                {btn==='list'?'Lista':'Grade'}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* grid/lista de projetos ------------------------------------------- */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 pb-24"
      >
        {layout==='list' ? (
          <div className="flex flex-col items-center gap-8">
            {filtered.map(ListItem)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(Card)}
          </div>
        )}
      </motion.section>

      <Footer />
    </div>
  );
}
