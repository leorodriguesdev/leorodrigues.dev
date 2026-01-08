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
    name: "Adriano Machado",
    role: "CEO",
    company: "OnStart Tecnologia",
    content: "Léo é um profissional excepcional. Entregou nosso projeto antes do prazo e superou todas as expectativas. Colocou nossa empresa no mapa de empresas de tecnologia do Brasil.",
    rating: 5
  },
  {
    name: "Vivian Oliveira",
    role: "Scrum Master ",
    company: "Serasa Experian",
    content: "Trabalhar com o Léo está sendo incrível! Ele é proativo, eficiente e comunicador, resolve problemas com muita rapidez. É um profissional comprometido com resultados e engajado com pessoas, sempre pronto para ajudar, ouvir e apoiar. Está sempre buscando mais conhecimento e qualificação para tornar-se um profissional ainda mais gabaritado.",
    rating: 5
  },
  {
    name: "Bianca Cabral",
    role: "UX Designer",
    company: "FIERGS",
    content: "Se tivesse que resumir em uma palavra como é trabalhar com o Leonardo, seria parceria. Leo tem um olhar afiado para produto e negócio, e sempre leva o trabalho do designer a sério: respeita, recebe feedbacks com maturidade e faz questão de incluir minhas considerações. Sua comunicação é assertiva, consegue alinhar ideias com clareza e a colaboração acontece de verdade. Além da competência técnica, contribui para um ambiente leve, produtivo e centrado em resultado.",
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

