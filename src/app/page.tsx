// src/app/page.tsx
import Head from "next/head";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>Conta Dev</title>
        <meta name="description" content="Cuide do software. A gente cuida da contabilidade!" />
      </Head>
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />

        <Footer />
      </div>
    </>
  );
}
