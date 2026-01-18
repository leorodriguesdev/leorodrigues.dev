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
  const hasDecimal = end % 1 !== 0;

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      if (hasDecimal) {
        // Para valores decimais, mostrar com 1 casa decimal
        const current = progress * end;
        setCount(Math.round(current * 10) / 10);
      } else {
        setCount(Math.floor(progress * end));
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Garantir valor final exato
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible, hasDecimal]);

  const displayValue = hasDecimal ? count.toFixed(1) : count;

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
          {prefix}{displayValue}{suffix}
        </span>
      </div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  );
}

interface StatsProps {
  variant?: 'commercial' | 'portfolio';
}

export function Stats({ variant = 'commercial' }: StatsProps) {
  const [githubStats, setGithubStats] = useState({
    linesOfCode: { value: 50, suffix: 'K' },
    publicRepos: 0,
    totalStars: 0,
    followers: 0,
  });

  useEffect(() => {
    if (variant === 'portfolio') {
      // Buscar dados do GitHub para versão portfolio
      fetch('/api/github-stats')
        .then(res => res.json())
        .then(data => {
          setGithubStats({
            linesOfCode: {
              value: data.linesOfCode || 50, // Manter decimal se houver
              suffix: data.suffix || 'K'
            },
            publicRepos: data.ownReposCount || data.publicRepos || 0,
            totalStars: data.totalStars || 0,
            followers: data.followers || 0,
          });
        })
        .catch(() => {
          // Manter valores padrão em caso de erro
          setGithubStats({
            linesOfCode: { value: 50, suffix: 'K' },
            publicRepos: 0,
            totalStars: 0,
            followers: 0,
          });
        });
    } else {
      // Para versão comercial, buscar apenas linhas de código
      fetch('/api/github-stats')
        .then(res => res.json())
        .then(data => {
          setGithubStats(prev => ({
            ...prev,
            linesOfCode: {
              value: data.linesOfCode || 50, // Manter decimal se houver
              suffix: data.suffix || 'K'
            },
          }));
        })
        .catch(() => {
          // Manter valor padrão
        });
    }
  }, [variant]);

  if (variant === 'portfolio') {
    // Versão Portfolio: Estatísticas do GitHub
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatItem 
          end={githubStats.publicRepos} 
          label="Repositórios GitHub" 
          suffix="+"
          key={`repos-${githubStats.publicRepos}`}
        />
        <StatItem 
          end={githubStats.linesOfCode.value} 
          label="Linhas de Código" 
          suffix={githubStats.linesOfCode.suffix}
          key={`lines-${githubStats.linesOfCode.value}`}
        />
        <StatItem 
          end={githubStats.totalStars} 
          label="Stars no GitHub" 
          suffix="+"
          key={`stars-${githubStats.totalStars}`}
        />
        <StatItem 
          end={githubStats.followers} 
          label="Seguidores GitHub" 
          suffix="+"
          key={`followers-${githubStats.followers}`}
        />
      </div>
    );
  }

  // Versão Commercial: Estatísticas atuais
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <StatItem end={7} label="Anos de Experiência" suffix="+" />
      <StatItem end={97} label="Projetos Concluídos" suffix="+" />
      <StatItem 
        end={githubStats.linesOfCode.value} 
        label="Linhas de Código" 
        suffix={githubStats.linesOfCode.suffix}
        key={`lines-${githubStats.linesOfCode.value}`}
      />
      <StatItem end={99} label="Taxa de Satisfação" suffix="%" />
    </div>
  );
}



