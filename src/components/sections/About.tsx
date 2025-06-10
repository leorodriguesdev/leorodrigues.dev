// components/Projects.tsx
'use client';

import React from "react";
import Link from "next/link";
import { motion } from 'framer-motion';

const About = () => {

  const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4">
      <div className="container mx-auto text-center">
        <motion.div variants={fadeUp} className="max-w-xl text-center mb-10 lg:mb-0 mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight font-audiowide">
            <span className="text-[var(--primary-color)]">Sobre&nbsp;</span>mim
          </h1>
          <p className="text-lg leading-relaxed mb-8 mx-3">
            Sou movido pela paixão em resolver <strong>problemas complexos</strong> e aprimorar minhas <strong>habilidades</strong>. Para mim, o desenvolvimento de software transcende o código; é sobre entender o <strong>usuário</strong> e criar <strong>soluções intuitivas e impactantes</strong>. Estou sempre em busca de novos <strong>desafios</strong> e oportunidades para contribuir com minha expertise em <strong>projetos inovadores</strong> e equipes colaborativas.
          </p>
          <p className="text-sm leading-relaxed mx-3">
          &quot;A função de um bom software é fazer o complexo parecer simples.&quot; 
          </p>
          <p className="text-sm leading-relaxed mb-8 mx-3">
          Grady Booch
          </p>
        </motion.div>
        {/* Start About Section */}

        <Link href={`/about`}>
          <button className="inline-block bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-lg font-bold hover:bg-opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer transform">
            Saber mais &rarr;
          </button>
        </Link>

        {/* End About Section */}

      </div>

    </section>
  );
};

export default About;