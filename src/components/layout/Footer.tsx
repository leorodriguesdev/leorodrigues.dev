"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Github, Linkedin, Twitter, Mail, RefreshCw } from 'lucide-react';
import { useVisitorIntent } from '@/hooks/useVisitorIntent';

const Footer = () => {
  const { intent, setIntent } = useVisitorIntent();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitchVersion = () => {
    // Considera null como "commercial" (padrão)
    const currentIntent = intent || "commercial";
    const newIntent = currentIntent === "portfolio" ? "commercial" : "portfolio";
    setIntent(newIntent);
    // Se estiver na homepage, força re-render
    if (pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  // Calcula qual versão será exibida após o clique (destino)
  const getNextIntent = () => {
    const currentIntent = intent || "commercial";
    return currentIntent === "portfolio" ? "commercial" : "portfolio";
  };

  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="tracking-tight font-audiowide">
              <span className="text-primary">Leo</span>
              <span className="text-foreground">Rodrigues</span>
              <span className="text-primary">.dev</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Desenvolvedor Full Stack criando experiências web e mobile modernas e de alta performance.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-primary font-medium">Links Rápidos</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                Sobre
              </Link>
              <Link href="/projects" className="block text-muted-foreground hover:text-primary transition-colors">
                Projetos
              </Link>
              <Link href="/#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contato
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-primary font-medium">Serviços</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Desenvolvimento Web</p>
              <p>Consultoria Técnica</p>
              <p>UI/UX Design</p>
              <p>Otimização SEO</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-primary font-medium">Social</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:contato@leorodrigues.dev"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} LeoRodrigues.dev - Todos os direitos reservados | Desenvolvido com React & Next.js
            </p>
            {pathname === "/" && (
              <button
                onClick={handleSwitchVersion}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                <RefreshCw size={16} />
                Ver versão {getNextIntent() === "portfolio" ? "Portfólio" : "Comercial"}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
