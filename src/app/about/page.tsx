"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import { Download, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import { SEO } from '@/components/SEO';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function AboutPage() {
  const { trackDownload, trackEmail } = useAnalytics();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SEO
        title="Sobre Mim | Leo Rodrigues"
        description="Conheça Leo Rodrigues, Desenvolvedor Full Stack com 6+ anos de experiência em React, Next.js, TypeScript e Node.js. Especializado em criar aplicações web modernas e escaláveis."
      />

      <div className="pt-24 pb-16">
        <div className="container mx-auto max-w-5xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 mb-20"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 overflow-hidden relative">
              <Image
                src="/avatar.jpeg"
                alt="Leonardo Rodrigues"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl tracking-tight">
                Sobre <span className="text-primary">Mim</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Desenvolvedor Full Stack apaixonado por criar soluções web inovadoras e de alta qualidade
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <a
                  href="/cv.pdf"
                  download
                  onClick={() => trackDownload('CV-LeoRodrigues.pdf')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 hover:text-primary-foreground transition-all hover:scale-105 font-medium shadow-lg shadow-primary/20"
                >
                  <Download size={20} />
                  Download CV
                </a>
                <a
                  href="mailto:contato@leorodrigues.dev"
                  onClick={trackEmail}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                >
                  <Mail size={20} />
                  Contato
                </a>
              </div>
            </div>
            </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20 p-8 bg-secondary/50 border border-border rounded-lg"
          >
            <p className="text-muted-foreground leading-relaxed mb-4">
              Olá! Meu nome é <strong>Leonardo Rodrigues</strong> e sou um desenvolvedor full stack apaixonado por transformar ideias em soluções digitais robustas e eficientes. Com <span className="text-primary">mais de 6 anos de experiência</span> no mercado, atuo com foco em desenvolvimento web e mobile, utilizando as mais modernas tecnologias para construir produtos de alta qualidade.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Minha jornada profissional inclui passagens por empresas como a <span className="text-primary">IBM, Banco do Brasil e Banco Sicredi</span>, atualmente contribuo para o <span className="text-primary">Sistema FIERGS</span>, onde tenho a oportunidade de participar de <span className="text-primary">todo o ciclo de desenvolvimento de projetos</span>, desde a concepção e prototipagem até o deploy e manutenção. Essa experiência me proporcionou uma visão 360º do processo de desenvolvimento, me permitindo entregar soluções completas e eficazes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sou movido pela paixão em resolver <strong>problemas complexos</strong> e aprimorar minhas <strong>habilidades</strong>. Para mim, o desenvolvimento de software transcende o código; é sobre entender o <strong>usuário</strong> e criar <strong>soluções intuitivas e impactantes</strong>. Estou sempre em busca de novos <strong>desafios</strong> e oportunidades para contribuir com minha expertise em <strong>projetos inovadores</strong> e equipes colaborativas.
            </p>
            <p className="text-sm text-muted-foreground mt-6 italic">
              &quot;Quanto mais estudo, mais sinto que minha mente nisso é insaciável.&quot; - Ada Lovelace, a inventora da programação.
            </p>
          </motion.div>

          {/* Experience Section */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div id="experience" className="scroll-mt-24">
              <Experience />
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
        <Education />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
