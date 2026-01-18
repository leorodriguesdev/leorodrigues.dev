"use client";

import { motion } from "motion/react";
import Link from "next/link";
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

const services = [
  {
    id: "mobile-development",
    title: "Desenvolvimento Mobile",
    icon: Smartphone,
    description: "Criação de aplicativos nativos para iOS e Android usando React Native e Expo. Apps performáticos, escaláveis e com experiência de usuário excepcional.",
    features: [
      "Apps nativos iOS e Android",
      "React Native e Expo",
      "Integração com APIs",
      "Publicação nas lojas",
      "Manutenção e suporte",
      "Performance otimizada"
    ],
    technologies: ["React Native", "Expo", "TypeScript", "JavaScript"],
    keywords: "desenvolvedor React Native, desenvolvedor mobile, desenvolvedor Expo, app mobile, desenvolvimento de aplicativos"
  },
  {
    id: "web-development",
    title: "Desenvolvimento Web",
    icon: Globe,
    description: "Sites e aplicações web modernas com Next.js, React e TypeScript. Performance otimizada, SEO avançado e experiência de usuário de alta qualidade.",
    features: [
      "Sites responsivos",
      "Aplicações web modernas",
      "SEO otimizado",
      "Performance otimizada",
      "PWA (Progressive Web Apps)",
      "Integração com APIs"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    keywords: "desenvolvedor Next.js, desenvolvedor web, desenvolvedor React, site moderno, desenvolvimento web"
  },
  {
    id: "full-stack-development",
    title: "Desenvolvimento Full Stack",
    icon: Code2,
    description: "Soluções completas do frontend ao backend. APIs RESTful, bancos de dados, autenticação e integrações. Sistemas escaláveis e robustos.",
    features: [
      "APIs RESTful",
      "Backend Node.js",
      "Bancos de dados",
      "Autenticação e segurança",
      "Integrações de terceiros",
      "Arquitetura escalável"
    ],
    technologies: ["Node.js", "TypeScript", "Express", "PostgreSQL", "MongoDB"],
    keywords: "desenvolvedor full stack, desenvolvedor Node.js, API REST, backend, desenvolvimento full stack"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SEO
        title="Serviços de Desenvolvimento | Criar Site e App Mobile | Léo Rodrigues"
        description="Serviços de desenvolvimento mobile com React Native, desenvolvimento web com Next.js e desenvolvimento full stack. Criação de apps iOS/Android, sites modernos e sistemas. Orçamento grátis. 7+ anos de experiência."
        keywords="criar site, fazer site, desenvolvimento de site, criar app, desenvolvimento de app, site profissional, app mobile, orçamento site, orçamento app, serviços desenvolvimento mobile, serviços desenvolvimento web, desenvolvedor React Native contratar, desenvolvedor Next.js contratar, desenvolvimento de apps, desenvolvimento de sites"
      />
      <Breadcrumbs />
      <StructuredData
        type="ProfessionalService"
        data={{
          name: "Serviços de Desenvolvimento Mobile e Web",
          provider: {
            "@type": "Person",
            name: "Léo Rodrigues",
            url: "https://leorodrigues.dev"
          },
          serviceType: [
            "Desenvolvimento Mobile",
            "Desenvolvimento Web",
            "Desenvolvimento Full Stack"
          ],
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
              Serviços de <span className="text-primary">Desenvolvimento</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluções completas em desenvolvimento mobile, web e full stack. 
              Criando aplicativos, sites e sistemas que impulsionam resultados.
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
                      Inclui:
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
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-medium"
                    >
                      Solicitar Orçamento
                      <ArrowRight size={16} />
                    </Link>
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
              Por Que Escolher <span className="text-primary">Meus Serviços?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Cpu className="text-primary" size={24} />
                  Tecnologias Modernas
                </h3>
                <p className="text-muted-foreground">
                  Uso das tecnologias mais atuais e eficientes do mercado: React Native, Expo, Next.js, TypeScript e Node.js.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Database className="text-primary" size={24} />
                  7+ Anos de Experiência
                </h3>
                <p className="text-muted-foreground">
                  Mais de 7 anos desenvolvendo aplicativos e sites para empresas como IBM, Banco do Brasil e Banco Sicredi.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={24} />
                  Código de Qualidade
                </h3>
                <p className="text-muted-foreground">
                  Código limpo, bem documentado e seguindo as melhores práticas da indústria. TypeScript e testes são padrão.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ArrowRight className="text-primary" size={24} />
                  Entrega Rápida
                </h3>
                <p className="text-muted-foreground">
                  Metodologia ágil, comunicação constante e entregas dentro do prazo. Seu projeto no ar mais rápido.
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
              Pronto para <span className="text-primary">Começar Seu Projeto?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Entre em contato e vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="#contact"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 font-medium shadow-lg shadow-primary/20 justify-center"
              >
                Entre em Contato
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/projects"
                className="px-8 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Ver Projetos
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
