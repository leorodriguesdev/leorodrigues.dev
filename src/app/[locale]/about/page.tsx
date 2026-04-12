"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import { SEO } from '@/components/SEO';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function AboutPage() {
  const t = useTranslations('about');
  const tMeta = useTranslations('metadata');
  const { trackEmail } = useAnalytics();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SEO
        title={tMeta('aboutTitle')}
        description={tMeta('aboutDescription')}
        keywords={tMeta('aboutKeywords')}
      />
      <Breadcrumbs />

      <div className="pb-16">
        <div className="container mx-auto max-w-5xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 mb-20"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 overflow-hidden relative">
              <Image
                src="/avatar.png"
                alt={t('avatarAlt')}
                fill
                className="object-left-top object-cover"
                priority
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl tracking-tight">
                {t('heroTitle')} <span className="text-primary">{t('heroAccent')}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('heroSubtitle')}
              </p>
              <div className="flex gap-4 justify-center pt-4">
                {/* <a
                  href="/cv.pdf"
                  download
                  onClick={() => trackDownload('CV-LeoRodrigues.pdf')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 hover:text-primary-foreground transition-all hover:scale-105 font-medium shadow-lg shadow-primary/20"
                >
                  <Download size={20} />
                  Download CV
                </a> */}
                <a
                  href="mailto:contato@leorodrigues.dev"
                  onClick={trackEmail}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
                >
                  <Mail size={20} />
                  {t('contactBtn')}
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
              {t.rich('bioP1', {
                strong: (chunks) => <strong>{chunks}</strong>,
                span: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t.rich('bioP2', {
                span: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.rich('bioP3', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="text-sm text-muted-foreground mt-6 italic">
              {t('quote')}
              <br />
              {t('quoteAuthor')}
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
