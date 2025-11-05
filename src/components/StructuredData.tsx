"use client";

import { useEffect } from "react";

interface StructuredDataProps {
  type: "Person" | "WebSite" | "Article" | "CreativeWork" | "ProfessionalService";
  data: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `structured-data-${type}`;
    
    let structuredData = {};

    if (type === "Person") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Leo Rodrigues",
        jobTitle: "Full Stack Developer",
        url: "https://leorodrigues.dev",
        email: "contato@leorodrigues.dev",
        sameAs: [
          "https://github.com/leorodriguesdev",
          "https://linkedin.com/in/leorodriguesdev",
          "https://x.com/leorodriguesdev"
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Web Development",
          "Full Stack Development",
          "Frontend Development",
          "Backend Development",
          "Mobile Development",
          "React Native"
        ],
        description: "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Criando aplicações web modernas, rápidas e escaláveis.",
        ...data
      };
    } else if (type === "WebSite") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "LeoRodrigues.dev",
        url: "https://leorodrigues.dev",
        description: "Portfolio profissional de Leo Rodrigues - Desenvolvedor Full Stack especializado em React, Next.js e TypeScript",
        author: {
          "@type": "Person",
          name: "Leo Rodrigues"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://leorodrigues.dev/projects?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        ...data
      };
    } else if (type === "ProfessionalService") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Desenvolvimento Full Stack",
        provider: {
          "@type": "Person",
          name: "Leo Rodrigues",
          url: "https://leorodrigues.dev",
          email: "contato@leorodrigues.dev"
        },
        areaServed: "BR",
        serviceType: [
          "Desenvolvimento Web",
          "Desenvolvimento Mobile",
          "Desenvolvimento Full Stack",
          "Consultoria em Desenvolvimento"
        ],
        ...data
      };
    } else if (type === "CreativeWork") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        ...data
      };
    }

    script.text = JSON.stringify(structuredData);
    
    // Remove existing script if present
    const existing = document.getElementById(`structured-data-${type}`);
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(`structured-data-${type}`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
}



