"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { 
  Smartphone, 
  Globe, 
  Code2, 
  ArrowRight, 
  CheckCircle2,
  MessageCircle
} from "lucide-react";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import Contact from "@/components/sections/Contact";
import { Link } from "@/i18n/navigation";

export function CommercialHome() {
  const t = useTranslations("commercialHome");
  const steps = [
    { step: "01", title: t("step1Title"), desc: t("step1Desc") },
    { step: "02", title: t("step2Title"), desc: t("step2Desc") },
    { step: "03", title: t("step3Title"), desc: t("step3Desc") },
    { step: "04", title: t("step4Title"), desc: t("step4Desc") },
  ];
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
              {t("heroLine1")} <span className="text-primary font-audiowide">{t("heroAccent")}</span>{" "}
              {t("heroLine2")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              {t("heroSubtitle")} <span className="text-primary">{t("heroSubtitleAccent")}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <a
                href="#contact"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 font-medium shadow-lg shadow-primary/20"
              >
                {t("ctaQuote")}
                <ArrowRight size={20} />
              </a>
              <Link
                href="/services"
                className="px-8 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                {t("ctaServices")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center pt-8"
            >
              <a
                href="https://wa.me/555194389658"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                aria-label={t("whatsappAria")}
              >
                <MessageCircle size={24} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <Stats variant="commercial" />
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="services" className="py-32 px-6">
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
                {t("whatIDevTitle")} <span className="text-primary">{t("whatIDevAccent")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t("whatIDevSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Site Institucional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{t("institutionalTitle")}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("institutionalDesc")}
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("institutionalB1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("institutionalB2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("institutionalB3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("institutionalB4")}</span>
                  </li>
                </ul>
                <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                  {t("viewDetails")}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* App Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card border-2 border-primary rounded-lg p-8 hover:border-primary/80 transition-all relative"
              >
                <span className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                  {t("popularBadge")}
                </span>
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{t("mobileTitle")}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("mobileDesc")}
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("mobileB1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("mobileB2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("mobileB3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("mobileB4")}</span>
                  </li>
                </ul>
                <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                  {t("viewDetails")}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Sistema Web */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Code2 className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{t("systemsTitle")}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("systemsDesc")}
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("systemsB1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("systemsB2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("systemsB3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{t("systemsB4")}</span>
                  </li>
                </ul>
                <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                  {t("viewDetails")}
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            <div className="text-center pt-8">
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                {t("ctaQuote")}
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl tracking-tight font-audiowide">
                {t("howTitle")} <span className="text-primary">{t("howAccent")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("howSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl tracking-tight font-audiowide">
                {t("investTitle")} <span className="text-primary">{t("investAccent")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t("investSubtitle")}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-8 md:p-12 max-w-2xl mx-auto space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{t("budgetTitle")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("budgetDesc")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  {t("featAnalysisTitle")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("featAnalysisDesc")}
                </p>
              </div>
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  {t("featTransparencyTitle")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("featTransparencyDesc")}
                </p>
              </div>
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  {t("featNoCommitTitle")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("featNoCommitDesc")}
                </p>
              </div>
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  {t("featFairTitle")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("featFairDesc")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              {t("ctaCustomQuote")}
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 text-center"
          >
            <div>
              <CheckCircle2 className="text-primary mx-auto mb-2" size={32} />
              <h3 className="font-semibold mb-1">{t("guarantee1Title")}</h3>
              <p className="text-sm text-muted-foreground">{t("guarantee1Sub")}</p>
            </div>
            <div>
              <CheckCircle2 className="text-primary mx-auto mb-2" size={32} />
              <h3 className="font-semibold mb-1">{t("guarantee2Title")}</h3>
              <p className="text-sm text-muted-foreground">{t("guarantee2Sub")}</p>
            </div>
            <div>
              <CheckCircle2 className="text-primary mx-auto mb-2" size={32} />
              <h3 className="font-semibold mb-1">{t("guarantee3Title")}</h3>
              <p className="text-sm text-muted-foreground">{t("guarantee3Sub")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </>
  );
}
