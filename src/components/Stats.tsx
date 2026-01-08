"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function StatItem({ end, label, suffix = "", prefix = "", duration = 2 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-center p-6 bg-card border border-border rounded-lg hover:border-primary transition-colors"
    >
      <div className="text-4xl md:text-5xl mb-2">
        <span className="text-primary">
          {prefix}{count}{suffix}
        </span>
      </div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <StatItem end={7} label="Anos de Experiência" suffix="+" />
      <StatItem end={97} label="Projetos Concluídos" suffix="+" />
      <StatItem end={31} label="Clientes Satisfeitos" suffix="+" />
      <StatItem end={99} label="Taxa de Satisfação" suffix="%" />
    </div>
  );
}



