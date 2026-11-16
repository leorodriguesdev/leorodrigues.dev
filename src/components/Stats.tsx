"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getYearsOfExperience } from "@/lib/experience";

interface StatItemProps {
  end: number | null;
  label: string;
  locale: string;
  suffix?: string;
  prefix?: string;
}

// Refresh from GitHub's rolling one-year contribution count.
const GITHUB_CONTRIBUTIONS_LAST_YEAR = 2461;

function StatItem({ end, label, locale, suffix = "", prefix = "" }: StatItemProps) {
  const hasDecimal = end !== null && end % 1 !== 0;
  const displayValue = end === null
    ? "—"
    : new Intl.NumberFormat(locale, {
        useGrouping: "always",
        minimumFractionDigits: hasDecimal ? 1 : 0,
        maximumFractionDigits: hasDecimal ? 1 : 0,
      }).format(end);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
  const t = useTranslations("stats");
  const locale = useLocale();
  const [commercialRepoCount, setCommercialRepoCount] = useState<number | null>(null);
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
        .catch((error: unknown) => {
          console.error("Failed to load GitHub stats:", error);
          // Manter valores padrão em caso de erro
          setGithubStats({
            linesOfCode: { value: 50, suffix: 'K' },
            publicRepos: 0,
            totalStars: 0,
            followers: 0,
          });
        });
    } else {
      fetch('/api/github-stats')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`GitHub stats request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (typeof data.publicRepos !== "number") {
            throw new Error("GitHub stats response did not include the public repository count");
          }
          setCommercialRepoCount(data.publicRepos);
        })
        .catch((error: unknown) => {
          console.error("Failed to load GitHub public repository count:", error);
          setCommercialRepoCount(null);
        });
    }
  }, [variant]);

  if (variant === 'portfolio') {
    // Versão Portfolio: Estatísticas do GitHub
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatItem 
          end={githubStats.publicRepos} 
          label={t("repos")}
          locale={locale}
          suffix="+"
          key={`repos-${githubStats.publicRepos}`}
        />
        <StatItem 
          end={githubStats.linesOfCode.value} 
          label={t("lines")}
          locale={locale}
          suffix={githubStats.linesOfCode.suffix}
          key={`lines-${githubStats.linesOfCode.value}`}
        />
        <StatItem 
          end={githubStats.totalStars} 
          label={t("stars")}
          locale={locale}
          suffix="+"
          key={`stars-${githubStats.totalStars}`}
        />
        <StatItem 
          end={githubStats.followers} 
          label={t("followers")}
          locale={locale}
          suffix="+"
          key={`followers-${githubStats.followers}`}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      <StatItem
        end={getYearsOfExperience()}
        label={t("years")}
        locale={locale}
        suffix="+"
        key={`years-${getYearsOfExperience()}`}
      />
      <StatItem
        end={commercialRepoCount}
        label={t("repos")}
        locale={locale}
        key={`repos-commercial-${commercialRepoCount}`}
      />
      <StatItem
        end={GITHUB_CONTRIBUTIONS_LAST_YEAR}
        label={t("contributionsLastYear")}
        locale={locale}
        key={`contributions-${GITHUB_CONTRIBUTIONS_LAST_YEAR}`}
      />
    </div>
  );
}



