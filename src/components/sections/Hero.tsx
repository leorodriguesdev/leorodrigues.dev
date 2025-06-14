// components/Hero.tsx
"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
  const keywords = [
    "JavaScript", "TypeScript", "React", "React Native", "Next.js",
    "Node.js", "Tailwind CSS", "UI/UX", "Front-end", "Back-end",
    "APIs", "Firebase", "Design Responsivo", "Web Apps", "Mobile Apps",
    "SEO", "Performance", "Mobile", "UX/UI", "Design",
    "Mobile Apps", "Firebase", "APIs", "Integrações", "E-commerce",
    "Web Apps", "Mobile Apps", "SEO",
    "Performance", "Mobile", "UX/UI", "Design", "Mobile Apps",
    "Firebase", "APIs", "E-commerce",
  ];

  return (
    <section className="relative flex flex-col h-[90vh] justify-center items-center text-center bg-[var(--bg-color)] text-[var(--text-color)] pt-24">
      {/* Hero Content */}
      <div className="w-full mx-auto space-y-6">
  <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mt-48 px-10 pt-24">
    Olá, sou <br />
    <span className="text-[var(--primary-color)] font-audiowide">
      Leonardo Rodrigues
    </span>
  </h1>

  <p className="mt-4 text-lg md:text-xl text-[var(--text-color)] max-w-3xl mx-auto px-10">
    O desenvolvedor que vai fortalecer sua presença online e impulsionar resultados 
    através de <span className="text-[var(--primary-color)]">sites</span>,{" "}
    <span className="text-[var(--primary-color)]">aplicativos móveis</span> e{" "}
    <span className="text-[var(--primary-color)]">sistemas web</span>. <br />
    Quer transformar suas ideias em realidade?
  </p>

  <Link href="#contact">
    <span className="mt-6 inline-block bg-[var(--primary-color)] text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-color)]/30 hover:-translate-y-1 cursor-pointer transform">
      Bora Conversar
    </span>
  </Link>

  <div className="overflow-hidden w-full mt-10 mb-10">
    <div className="flex space-x-6 animate-scroll min-w-[200%]">
      {[...keywords, ...keywords].map((keyword, index) => (
        <span
          key={index}
          className="text-2xl md:text-4xl font-semibold text-[var(--primary-color)] whitespace-nowrap mt-24 mb-48"
        >
          • {keyword}
        </span>
      ))}
    </div>
  </div>
</div>

    </section>
  );
};

export default Hero;
