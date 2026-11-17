"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { 
  Smartphone, 
  Globe, 
  Code2, 
  ArrowRight, 
  CheckCircle2,
  MessageCircle,
  RefreshCcw
} from "lucide-react";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import Contact from "@/components/sections/Contact";
import { Link } from "@/i18n/navigation";
import { useAnalytics } from "@/hooks/useAnalytics";

export function CommercialHome() {
  const t = useTranslations("commercialHome");
  const { trackCtaClick, trackWhatsApp } = useAnalytics();
  const steps = [
    { step: "01", title: t("step1Title"), desc: t("step1Desc") },
    { step: "02", title: t("step2Title"), desc: t("step2Desc") },
    { step: "03", title: t("step3Title"), desc: t("step3Desc") },
    { step: "04", title: t("step4Title"), desc: t("step4Desc") },
  ];
  return (
    <>
      {/* Hero Section */}
      {/* Desktop: ocupa a tela toda; pt = altura da navbar fixa + respiro, pb = mesmo respiro, então o conteúdo fica centralizado na área visível abaixo da navbar. */}
      <section className="relative flex min-h-0 items-center justify-center overflow-hidden px-6 pb-16 pt-28 sm:min-h-svh sm:pb-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-primary/10 blur-[120px]" />
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-5xl space-y-6 text-center"
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
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl leading-[1.08] tracking-tight sm:text-5xl md:text-7xl"
            >
              {t("heroLine1")} <span className="text-primary">{t("heroAccent")}</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-2xl"
            >
              {t("heroSubtitle")} <span className="text-primary">{t("heroSubtitleAccent")}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-stretch justify-center gap-3 pt-5 sm:flex-row sm:items-center sm:gap-4"
            >
              <a
                href="#contact"
                onClick={() => trackCtaClick("quote", "hero")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary/90"
              >
                {t("ctaQuote")}
                <ArrowRight size={20} />
              </a>
              <Link
                href="/services"
                onClick={() => trackCtaClick("services", "hero")}
                className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3.5 transition-colors hover:bg-secondary"
              >
                {t("ctaServices")}
              </Link>
            </motion.div>

            <p className="hidden text-sm text-muted-foreground sm:block">{t("heroTrustLine")}</p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden justify-center pt-2 sm:flex"
            >
              <a
                href="https://wa.me/555194389658"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("hero")}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label={t("whatsappAria")}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
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
              <h2 className="text-4xl md:text-5xl tracking-tight">
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
                onClick={() => trackCtaClick("quote", "services_preview")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                {t("ctaQuote")}
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modernization Spotlight */}
      <section className="bg-secondary/30 px-6 py-24 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center"
          >
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t("modernizeEyebrow")}</p>
              <h2 className="text-4xl md:text-5xl tracking-tight">
                {t("modernizeTitle")} <span className="text-primary">{t("modernizeAccent")}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">{t("modernizeSubtitle")}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {[t("modernizeSignal1"), t("modernizeSignal2"), t("modernizeSignal3")].map((signal) => (
                  <span key={signal} className="rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                    {signal}
                  </span>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  href="/services/modernization"
                  onClick={() => trackCtaClick("modernization_details", "services_preview")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:gap-3 hover:bg-primary/90"
                >
                  {t("modernizeCta")}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t("modernizePanelLabel")}</p>
                  <h3 className="text-2xl font-semibold">{t("modernizePanelTitle")}</h3>
                </div>
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <RefreshCcw size={22} />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: t("modernizeMetric1"), value: t("modernizeValue1") },
                  { label: t("modernizeMetric2"), value: t("modernizeValue2") },
                  { label: t("modernizeMetric3"), value: t("modernizeValue3") },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/70 p-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl tracking-tight">
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
            <h2 className="text-4xl md:text-5xl tracking-tight">
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
              onClick={() => trackCtaClick("custom_quote", "pricing")}
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
