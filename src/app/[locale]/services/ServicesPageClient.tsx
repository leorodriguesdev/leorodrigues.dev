"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { 
  Smartphone, 
  Globe, 
  Code2, 
  ArrowRight, 
  CheckCircle2,
  Cpu,
  Database,
  RefreshCcw
} from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Contact from '@/components/sections/Contact';
import { Link } from "@/i18n/navigation";
import { useAnalytics } from '@/hooks/useAnalytics';
import { getYearsOfExperience } from '@/lib/experience';

export default function ServicesPageClient() {
  const t = useTranslations("servicesPage");
  const years = getYearsOfExperience();
  const { trackCtaClick } = useAnalytics();
  const tc = useTranslations("servicesCards");
  const services = [
    {
      id: "system-modernization",
      title: tc("modernizationTitle"),
      icon: RefreshCcw,
      description: tc("modernizationDesc"),
      features: [
        tc("modernizationF1"),
        tc("modernizationF2"),
        tc("modernizationF3"),
        tc("modernizationF4"),
      ],
      technologies: ["Next.js", "React", "Node.js", "APIs", "Banco de dados"],
      href: "/services/modernization",
      featured: true,
    },
    {
      id: "mobile-development",
      title: tc("mobileTitle"),
      icon: Smartphone,
      description: tc("mobileDesc"),
      features: [
        tc("mobileF1"),
        tc("mobileF2"),
        tc("mobileF3"),
        tc("mobileF4"),
        tc("mobileF5"),
        tc("mobileF6"),
      ],
      technologies: ["React Native", "Expo", "TypeScript", "JavaScript"],
      href: "#contact",
      featured: false,
    },
    {
      id: "web-development",
      title: tc("webTitle"),
      icon: Globe,
      description: tc("webDesc"),
      features: [
        tc("webF1"),
        tc("webF2"),
        tc("webF3"),
        tc("webF4"),
        tc("webF5"),
        tc("webF6"),
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      href: "#contact",
      featured: false,
    },
    {
      id: "full-stack-development",
      title: tc("fullTitle"),
      icon: Code2,
      description: tc("fullDesc"),
      features: [
        tc("fullF1"),
        tc("fullF2"),
        tc("fullF3"),
        tc("fullF4"),
        tc("fullF5"),
        tc("fullF6"),
      ],
      technologies: ["Node.js", "TypeScript", "Express", "PostgreSQL", "MongoDB"],
      href: "#contact",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Breadcrumbs />

      <div className="pb-16">
        <div className="container mx-auto max-w-6xl px-6">
          {/* Header */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-center space-y-6 mb-20"
          >
            <h1 className="text-4xl md:text-5xl tracking-tight">
              {t("heroTitle")} <span className="text-primary">{t("heroAccent")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isFeatured = service.featured;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className={`group flex h-full flex-col rounded-2xl border bg-card p-6 md:p-8 transition-all ${
                    isFeatured
                      ? "md:col-span-2 xl:col-span-3 border-primary/80 bg-primary/5 shadow-[0_0_0_1px_rgba(124,255,178,0.18)]"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {isFeatured ? (
                    <>
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 md:h-16 md:w-16">
                          <Icon className="text-primary" size={30} />
                        </div>
                        <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                          {t("featuredBadge")}
                        </span>
                      </div>
                      <div className="grid flex-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <div className="space-y-5">
                          <div className="space-y-3">
                            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                              {service.title}
                            </h2>
                            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                              {service.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech) => (
                              <span key={tech} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <Link
                            href="/services/modernization"
                            onClick={() => trackCtaClick(`quote_${service.id}`, "services_card")}
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90"
                          >
                            {t("modernizationCta")}
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                        <div className="rounded-xl border border-border/80 bg-background/70 p-5 md:p-6">
                          <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            {t("includes")}
                          </h3>
                          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={16} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 md:h-16 md:w-16">
                        <Icon className="text-primary" size={26} />
                      </div>
                      <div className="flex-1 space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{service.title}</h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                      </div>
                      <div className="mt-6 space-y-3">
                        <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t("includes")}</h3>
                        <ul className="space-y-2.5">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={15} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 border-t border-border pt-5">
                        <div className="mb-4 flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span key={tech} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          href={service.href}
                          onClick={() => trackCtaClick(`quote_${service.id}`, "services_card")}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
                        >
                          {t("requestQuote")}
                          <ArrowRight size={16} />
                        </a>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Why Choose Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-secondary/50 border border-border rounded-lg p-8 md:p-12 mb-20"
          >
            <h2 className="text-3xl md:text-4xl tracking-tight mb-6 text-center">
              {t("whyTitle")} <span className="text-primary">{t("whyAccent")}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Cpu className="text-primary" size={24} />
                  {t("whyModernTitle")}
                </h3>
                <p className="text-muted-foreground">
                  {t("whyModernDesc")}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Database className="text-primary" size={24} />
                  {t("whyExpTitle", { years })}
                </h3>
                <p className="text-muted-foreground">
                  {t("whyExpDesc", { years })}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={24} />
                  {t("whyQualityTitle")}
                </h3>
                <p className="text-muted-foreground">
                  {t("whyQualityDesc")}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-primary" size={24} />
                  {t("whyFastTitle")}
                </h3>
                <p className="text-muted-foreground">
                  {t("whyFastDesc")}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <Contact />

      <Footer />
    </div>
  );
}
