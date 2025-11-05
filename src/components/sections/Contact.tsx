"use client";

import { motion } from "motion/react";
import { Mail, Award, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { useAnalytics } from '@/hooks/useAnalytics';

const Contact = () => {
  const { trackEmail, trackWhatsApp, trackSocialLink } = useAnalytics();
  return (
    <section id="contact" className="py-32 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary rounded-full text-primary mb-4 neon-glow">
            <Award size={20} />
            <span>Disponível para novos projetos</span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl tracking-tight font-audiowide">
              Pronto Para Transformar <span className="text-primary">Sua Ideia?</span>
        </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Vamos criar algo incrível juntos. Entre em contato para discutir seu próximo projeto e receber uma consultoria gratuita.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contato@leorodrigues.dev"
              onClick={trackEmail}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-medium"
          >
              <Mail size={20} />
              contato@leorodrigues.dev
            </a>
            <a
              href="https://wa.me/555180281270"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsApp}
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-lg hover:border-primary hover:text-primary transition-all hover:scale-105 font-medium"
          >
              <MessageCircle size={20} />
            WhatsApp
            </a>
        </div>

          <div className="flex gap-4 justify-center pt-4">
            <a
              href="https://github.com/leorodriguesdev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialLink('github')}
              className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/leorodriguesdev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialLink('linkedin')}
              className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://x.com/leorodriguesdev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialLink('twitter')}
              className="p-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
              aria-label="Twitter"
              >
              <Twitter size={24} />
            </a>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
