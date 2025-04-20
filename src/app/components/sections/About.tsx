// components/Projects.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)] py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-10 text-[var(--primary-color)] font-audiowide">
          Sobre mim
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Aqui você encontrará informações sobre mim e minha jornada na programação.
        </p>


        {/* Start About Section */}

        <Link href={`/about`}>
          <button className="inline-block bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all duration-300 cursor-pointer">
            Saber mais &rarr;
          </button>
        </Link>

        {/* End About Section */}

      </div>

    </section>
  );
};

export default About;