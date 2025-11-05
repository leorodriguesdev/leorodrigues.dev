"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Maria Silva",
    role: "CEO",
    company: "Tech Innovations",
    content: "Leo é um profissional excepcional. Entregou nosso projeto antes do prazo e superou todas as expectativas. Seu conhecimento técnico e atenção aos detalhes são impressionantes.",
    rating: 5
  },
  {
    name: "Carlos Santos",
    role: "Product Manager",
    company: "Digital Solutions",
    content: "Trabalhar com Leo foi uma experiência incrível. Ele não apenas desenvolveu a aplicação, mas também contribuiu com ideias valiosas que melhoraram significativamente o produto final.",
    rating: 5
  },
  {
    name: "Ana Costa",
    role: "CTO",
    company: "Startup Brasil",
    content: "Profissional altamente qualificado e comprometido. Leo tem uma habilidade única de transformar requisitos complexos em soluções elegantes e eficientes. Recomendo fortemente!",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-32 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl tracking-tight font-audiowide">
            O Que Dizem os <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback de clientes e parceiros que confiaram no meu trabalho
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 bg-background border border-border rounded-lg hover:border-primary transition-colors"
            >
              <Quote className="absolute top-6 right-6 text-primary/20" size={32} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary" size={16} />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 relative z-10">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div>{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

