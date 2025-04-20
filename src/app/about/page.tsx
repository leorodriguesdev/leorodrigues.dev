// src/app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import Experience from '@/app/components/sections/Experience';
import Education   from '@/app/components/sections/Education';

export default function AboutPage() {
  /* animações reutilizáveis */
  const fadeUp  = { hidden:{opacity:0,y:40}, show:{opacity:1,y:0} };
  const stagger = { show:{transition:{staggerChildren:0.12}} };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] mt-0">
      <Navbar />

      {/* HERO – Foto + Texto ------------------------------------------------ */}
      <section className="min-h-screen relative flex flex-col justify-center items-center">
        {/* swirl animado sutil atrás da foto */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{opacity:0, scale:0.4}}
            animate={{opacity:0.15, scale:2.4, rotate:180}}
            transition={{duration:18, repeat:Infinity, ease:'linear'}}
            className="w-96 h-96 rounded-full bg-[var(--primary-color)] blur-3xl"
            style={{left:'50%',top:'50%',translate:'-50% -50%'}}
          />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:flex-row items-center gap-12 relative z-10 l mt-28 lg:mt-0"
        >
          {/* FOTO com tilt 3D ---------------------------------------------- */}
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            glareEnable
            glareBorderRadius="9999px"
          >
            <motion.div variants={fadeUp}>
              <Image
                src="/avatar.jpeg"
                alt="Leonardo Rodrigues"
                width={320}
                height={320}
                priority
                className="rounded-full border-4 border-[var(--primary-color)] shadow-x"
              />
            </motion.div>
          </Tilt>

          {/* TEXTO ---------------------------------------------------------- */}
          <motion.div variants={fadeUp} className="max-w-xl text-center lg:text-left">
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight font-audiowide">
              <span className="text-[var(--primary-color)]">Sobre&nbsp;</span>mim
            </h1>

            <p className="text-lg leading-relaxed mb-8 mx-3">
              Sou <strong>Leonardo Rodrigues</strong>, desenvolvedor full‑stack especializado
              em&nbsp;
              <span className="text-[var(--primary-color)]">React / Next.js</span> &
              <span className="text-[var(--primary-color)]"> React Native / Expo </span>.  
              Amo transformar ideias em experiências digitais <em>fora da curva</em>,
              misturando código limpo, UI de alto impacto e performance fina — seja
              em <u>apps mobile</u> ou plataformas web escaláveis.
            </p>

            {/* CTA ---------------------------------------------------------- */}
            <motion.div
              whileHover={{scale:1.05}}
              whileTap={{scale:0.97}}
              className="inline-block"
            >
              <a
                href="#experience"
                className="flex px-8 py-3 no-underline rounded-full font-semibold bg-[var(--primary-color)] text-white hover:bg-opacity-90 hover:text-black transition"
              >
                Ver minha jornada <span className='pt-1 pl-1'><svg className="size-4 text-[var(--bg-color)] animate-bounce" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* LINHA DO TEMPO DE EXPERIÊNCIA & EDUCAÇÃO -------------------------- */}
      <section id="experience">
        <Experience />
        <Education />
      </section>

      <Footer />
    </div>
  );
}
