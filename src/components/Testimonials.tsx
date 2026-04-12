"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const TESTIMONIAL_KEYS = ["t0", "t1", "t2"] as const;

export function Testimonials() {
  const t = useTranslations("testimonials");
  const tItems = useTranslations("testimonialItems");
  const testimonials: Testimonial[] = TESTIMONIAL_KEYS.map((key) => ({
    name: tItems(`${key}.name`),
    role: tItems(`${key}.role`),
    company: tItems(`${key}.company`),
    content: tItems(`${key}.content`),
    rating: 5,
  }));

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
            {t("title")} <span className="text-primary">{t("titleAccent")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
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
                    {t("roleAt", { role: testimonial.role, company: testimonial.company })}
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

