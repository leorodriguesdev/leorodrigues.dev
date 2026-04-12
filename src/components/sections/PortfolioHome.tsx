"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Github, Linkedin, ArrowRight, Code2, Zap, Users } from "lucide-react";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { Link } from "@/i18n/navigation";

export function PortfolioHome() {
  const t = useTranslations("portfolioHome");
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 border border-primary rounded-full text-primary font-medium neon-glow">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl tracking-tight"
            >
              {t("heroTitle")}
              {t("heroTitle").trim() ? " " : null}
              <span className="text-primary font-audiowide">{t("heroAccent")}</span>
              {t("heroTitleEnd").trim() ? ` ${t("heroTitleEnd")}` : null}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <Link
                href="/projects"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 font-medium shadow-lg shadow-primary/20"
              >
                {t("ctaPortfolio")}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                {t("ctaAbout")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center pt-8"
            >
              <a
                href="https://github.com/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              {/* Twitter/X oculto
              <a
                href="https://x.com/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                aria-label="X"
              >
                <Twitter size={24} />
              </a>
              */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <Stats variant="portfolio" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl tracking-tight font-audiowide">
                {t("whyTitle")} <span className="text-primary">{t("whyAccent")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("whySubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-card border border-border rounded-lg space-y-4 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code2 className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl">{t("cardQualityTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("cardQualityDesc")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 bg-card border border-border rounded-lg space-y-4 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl">{t("cardPerfTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("cardPerfDesc")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 bg-card border border-border rounded-lg space-y-4 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl">{t("cardCommTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("cardCommDesc")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Testimonials */}
      <Testimonials />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </>
  );
}
