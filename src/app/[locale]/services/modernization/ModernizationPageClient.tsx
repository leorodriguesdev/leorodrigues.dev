"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  LayoutTemplate,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import { Link } from "@/i18n/navigation";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function ModernizationPageClient() {
  const t = useTranslations("modernizationPage");
  const { trackCtaClick } = useAnalytics();

  const signals = t.raw("signals") as string[];
  const whatItems = t.raw("whatItems") as string[];
  const assessmentItems = t.raw("assessmentItems") as string[];
  const aiUseCases = t.raw("aiUseCases") as string[];
  const processSteps = t.raw("processSteps") as string[];
  const cases = t.raw("cases") as Array<{
    name: string;
    problem: string;
    what: string;
    result: string;
  }>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-16">
        <section className="px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Modernização de sistemas
                </div>
                <h1 className="text-4xl md:text-6xl tracking-tight">
                  {t("heroTitle")} <span className="text-primary">{t("heroAccent")}</span>
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">{t("heroSubtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#contact"
                    onClick={() => trackCtaClick("modernization_quote", "hero")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    {t("ctaPrimary")}
                    <ArrowRight size={18} />
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {t("ctaSecondary")}
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("diagnosisLabel")}</p>
                    <p className="text-xl font-semibold">{t("assessmentTitle")}</p>
                  </div>
                  <Gauge className="h-10 w-10 text-primary" />
                </div>
                <div className="mt-6 space-y-3">
                  {assessmentItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/70 p-4">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={18} />
                      <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-8 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BrainCircuit size={26} />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("aiTitle")}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{t("aiDescription")}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-3">
                {aiUseCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3 rounded-xl border border-border bg-background/80 p-4 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={17} />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl tracking-tight">{t("signalsTitle")}</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {signals.map((signal) => (
                <div key={signal} className="rounded-xl border border-border bg-card p-5">
                  <CheckCircle2 className="mb-4 text-primary" size={22} />
                  <p className="text-sm leading-relaxed text-foreground">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 bg-secondary/30 px-6 py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl tracking-tight">{t("whatTitle")}</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: LayoutTemplate, label: whatItems[0] },
                { icon: Smartphone, label: whatItems[1] },
                { icon: Wrench, label: whatItems[2] },
                { icon: ShieldCheck, label: whatItems[3] },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-border bg-background p-6">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={28} />
                  </div>
                  <p className="text-base text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl tracking-tight">{t("processTitle")}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    0{index + 1}
                  </div>
                  <p className="text-base leading-relaxed text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24 bg-secondary/30 px-6 py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl tracking-tight">{t("casesTitle")}</h2>
            </div>
            <div className="space-y-8">
              {cases.map((caseStudy) => (
                <motion.article
                  key={caseStudy.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border bg-background p-6 md:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <RefreshCcw className="text-primary" size={20} />
                    <h3 className="text-2xl font-semibold">{caseStudy.name}</h3>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-xl border border-dashed border-primary/40 bg-secondary/40 p-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("caseLabels.beforeAfter")}</p>
                      <div className="mt-5 h-44 rounded-lg bg-gradient-to-br from-primary/10 via-secondary to-background flex items-center justify-center text-sm text-muted-foreground">
                        {t("caseLabels.inProgress")}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("caseLabels.problem")}</p>
                        <p className="mt-2 text-muted-foreground">{caseStudy.problem}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("caseLabels.what")}</p>
                        <p className="mt-2 text-muted-foreground">{caseStudy.what}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("caseLabels.result")}</p>
                        <p className="mt-2 text-muted-foreground">{caseStudy.result}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
