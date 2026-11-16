"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowRight, Code2, Mail, ShieldCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getYearsOfExperience } from '@/lib/experience';
import { Link } from '@/i18n/navigation';

export default function AboutPageClient() {
  const t = useTranslations('about');
  const years = getYearsOfExperience();
  const { trackEmail } = useAnalytics();

  const principles = [
    {
      title: t('principle1Title'),
      description: t('principle1Desc'),
      icon: Users,
    },
    {
      title: t('principle2Title'),
      description: t('principle2Desc'),
      icon: ShieldCheck,
    },
    {
      title: t('principle3Title'),
      description: t('principle3Desc'),
      icon: Code2,
    },
  ];

  const stack = ["Next.js", "React", "React Native", "Node.js", "TypeScript", "PostgreSQL", "Expo", "Tailwind CSS"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Breadcrumbs />

      <div className="pb-16">
        <div className="container mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-center space-y-6 mb-20"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 overflow-hidden relative">
              <Image
                src="/avatar.png"
                alt={t('avatarAlt')}
                fill
                sizes="128px"
                className="object-left-top object-cover"
                priority
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl tracking-tight">
                {t('heroTitle')} <span className="text-primary">{t('heroAccent', { years })}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="mailto:contato@leorodrigues.dev"
                  onClick={() => trackEmail('about_hero')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                >
                  <Mail size={20} />
                  {t('contactBtn')}
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
                >
                  {t('servicesBtn')}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20 p-8 bg-secondary/50 border border-border rounded-lg"
          >
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t('whoWeAreEyebrow')}</p>
              <h2 className="mt-3 text-3xl md:text-4xl tracking-tight">{t('whoWeAreTitle')}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('whoWeAreText')}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t('principlesEyebrow')}</p>
              <h2 className="mt-3 text-3xl md:text-4xl tracking-tight">{t('principlesTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {principles.map(({ title, description, icon: Icon }) => (
                <div key={title} className="bg-card border border-border rounded-lg p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="mb-8 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t('stackEyebrow')}</p>
              <h2 className="mt-3 text-3xl md:text-4xl tracking-tight">{t('stackTitle')}</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-secondary px-4 py-2 text-sm text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-[180px_1fr] items-center gap-8 rounded-lg border border-border bg-card p-8">
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5">
                <Image
                  src="/avatar.png"
                  alt={t('founderName')}
                  fill
                  className="object-cover object-left-top"
                  sizes="176px"
                />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t('founderEyebrow')}</p>
                <h3 className="mt-3 text-3xl font-semibold">{t('founderName')}</h3>
                <p className="mt-2 text-lg text-primary">{t('founderRole')}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{t('founderBio')}</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
