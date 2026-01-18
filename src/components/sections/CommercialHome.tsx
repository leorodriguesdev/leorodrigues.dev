"use client";

import { motion } from "motion/react";
import Link from "next/link";
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

export function CommercialHome() {
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
                Orçamento Grátis
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl tracking-tight"
            >
              Crie Seu <span className="text-primary font-audiowide">Site ou App</span> Profissional
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Desenvolvimento de sites modernos e aplicativos mobile que impulsionam seu negócio. 
              Sites otimizados para Google, apps para iOS e Android. <span className="text-primary">Solicite seu orçamento gratuito.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <Link
                href="#contact"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 font-medium shadow-lg shadow-primary/20"
              >
                Solicitar Orçamento Grátis
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="px-8 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Ver Serviços e Preços
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
                aria-label="WhatsApp"
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
                O Que Eu <span className="text-primary">Desenvolvo</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Soluções completas para sua presença digital
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
                <h3 className="text-2xl font-semibold mb-4">Sites Institucionais</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Site profissional, responsivo e otimizado para Google. Ideal para empresas que querem presença online.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Design moderno e responsivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>SEO otimizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Formulário de contato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Integração com redes sociais</span>
                  </li>
                </ul>
                <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                  Ver detalhes
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
                  Mais Popular
                </span>
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Aplicativos Mobile</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  App nativo para iOS e Android. Ideal para empresas que querem estar na palma da mão dos clientes.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>App para iOS e Android</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Publicação nas lojas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Integração com APIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Suporte e manutenção</span>
                  </li>
                </ul>
                <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                  Ver detalhes
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
                <h3 className="text-2xl font-semibold mb-4">Sistemas Web</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Sistemas completos, e-commerce, dashboards. Soluções personalizadas para seu negócio.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Sistema personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Painel administrativo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>Integrações de pagamento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>API e banco de dados</span>
                  </li>
                </ul>
                <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-2">
                  Ver detalhes
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>

            <div className="text-center pt-8">
              <Link 
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                Solicitar Orçamento Grátis
                <ArrowRight size={20} />
              </Link>
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
                Como <span className="text-primary">Funciona</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Processo simples e transparente do início ao lançamento
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Contato", desc: "Você entra em contato e descreve sua necessidade" },
                { step: "02", title: "Orçamento", desc: "Envio uma proposta detalhada com prazo e investimento" },
                { step: "03", title: "Desenvolvimento", desc: "Desenvolvo seu projeto com atualizações regulares" },
                { step: "04", title: "Entrega", desc: "Seu site ou app é lançado e você recebe treinamento" }
              ].map((item, idx) => (
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
              Investimento <span className="text-primary">Personalizado</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Cada projeto é único e o investimento depende das suas necessidades específicas. 
              Solicite um orçamento personalizado sem compromisso.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-8 md:p-12 max-w-2xl mx-auto space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Orçamento Sob Medida</h3>
              <p className="text-muted-foreground leading-relaxed">
                Não trabalhamos com pacotes fechados. Cada projeto é analisado individualmente, 
                considerando suas necessidades, complexidade, prazo e objetivos. 
                O investimento é calculado de forma justa e transparente, sempre alinhado ao valor entregue.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  Análise Detalhada
                </h4>
                <p className="text-sm text-muted-foreground">
                  Avaliamos seu projeto completo antes de definir o investimento
                </p>
              </div>
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  Transparência Total
                </h4>
                <p className="text-sm text-muted-foreground">
                  Proposta detalhada com escopo, prazos e investimento claros
                </p>
              </div>
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  Sem Compromisso
                </h4>
                <p className="text-sm text-muted-foreground">
                  Orçamento grátis e sem obrigação de contratação
                </p>
              </div>
              <div className="text-left space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={20} />
                  Valor Justo
                </h4>
                <p className="text-sm text-muted-foreground">
                  Investimento proporcional à complexidade e valor entregue
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
            <Link 
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              Solicitar Orçamento Personalizado
              <ArrowRight size={20} />
            </Link>
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
              <h3 className="font-semibold mb-1">Orçamento Grátis</h3>
              <p className="text-sm text-muted-foreground">Sem compromisso</p>
            </div>
            <div>
              <CheckCircle2 className="text-primary mx-auto mb-2" size={32} />
              <h3 className="font-semibold mb-1">3 Meses de Suporte</h3>
              <p className="text-sm text-muted-foreground">Incluso na entrega</p>
            </div>
            <div>
              <CheckCircle2 className="text-primary mx-auto mb-2" size={32} />
              <h3 className="font-semibold mb-1">Código Documentado</h3>
              <p className="text-sm text-muted-foreground">Fácil manutenção</p>
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
