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
  Database
} from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StructuredData } from '@/components/StructuredData';
import { Link } from "@/i18n/navigation";

export default function ServicesPage() {
  const t = useTranslations("servicesPage");
  const tc = useTranslations("servicesCards");
  const tMeta = useTranslations("metadata");
  const services = [
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
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SEO
        title={tMeta("servicesTitle")}
        description={tMeta("servicesDescription")}
        keywords={tMeta("servicesKeywords")}
      />
      <Breadcrumbs />
      <StructuredData
        type="ProfessionalService"
        data={{
          name: t("structuredName"),
          provider: {
            "@type": "Person",
            name: "Léo Rodrigues",
            url: "https://leorodrigues.dev"
          },
          serviceType: t.raw("structuredServiceTypes") as string[],
          areaServed: "BR"
        }}
      />

      <div className="pb-16">
        <div className="container mx-auto max-w-6xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-card border border-border rounded-lg p-8 space-y-6 hover:border-primary transition-all"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary" size={32} />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      {t("includes")}
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-secondary border border-border rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium"
                    >
                      {t("requestQuote")}
                      <ArrowRight size={16} />
                    </a>
                  </div>
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
                  {t("whyExpTitle")}
                </h3>
                <p className="text-muted-foreground">
                  {t("whyExpDesc")}
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl tracking-tight">
              {t("ctaReadyTitle")} <span className="text-primary">{t("ctaReadyAccent")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("ctaReadySubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="#contact"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 font-medium shadow-lg shadow-primary/20 justify-center"
              >
                {t("ctaContact")}
                <ArrowRight size={20} />
              </a>
              <Link
                href="/projects"
                className="px-8 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                {t("ctaProjects")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
