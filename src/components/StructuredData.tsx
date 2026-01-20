"use client";

import { useEffect } from "react";

interface StructuredDataProps {
  type: "Person" | "WebSite" | "Article" | "CreativeWork" | "ProfessionalService" | "LocalBusiness" | "BreadcrumbList";
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
        name: "Léo Rodrigues",
        jobTitle: "Mobile & Full Stack Developer",
        url: "https://leorodrigues.dev",
        email: "contato@leorodrigues.dev",
        sameAs: [
          "https://github.com/leorodriguesdev",
          "https://linkedin.com/in/leorodriguesdev",
          "https://x.com/leorodriguesdev"
        ],
        knowsAbout: [
          "React",
          "React Native",
          "Expo",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Web Development",
          "Full Stack Development",
          "Frontend Development",
          "Backend Development",
          "Mobile Development",
          "iOS Development",
          "Android Development"
        ],
        description: "Desenvolvedor Mobile e Full Stack especializado em React Native, Expo, Next.js e TypeScript. Criando aplicativos móveis e aplicações web modernas, rápidas e escaláveis.",
        ...data
      };
    } else if (type === "WebSite") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Leorodrigues.dev ",
        url: "https://leorodrigues.dev",
        description: "Portfolio profissional de Léo Rodrigues - Desenvolvedor Mobile e Full Stack especializado em React Native, Expo, Next.js e TypeScript",
        author: {
          "@type": "Person",
          name: "Léo Rodrigues"
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
          name: "Léo Rodrigues",
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
    } else if (type === "LocalBusiness") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Léo Rodrigues - Desenvolvedor Mobile e Full Stack",
        image: "https://leorodrigues.dev/avatar.png",
        "@id": "https://leorodrigues.dev",
        url: "https://leorodrigues.dev",
        description: "Desenvolvedor Mobile especialista em React Native e Expo, e Full Stack com React, Next.js e Node.js. Criando aplicativos móveis e aplicações web modernas.",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
          ...(data.address as object)
        },
        geo: data.geo ? {
          "@type": "GeoCoordinates",
          ...(data.geo as object)
        } : undefined,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00"
        },
        sameAs: [
          "https://github.com/leorodriguesdev",
          "https://linkedin.com/in/leorodriguesdev",
          "https://x.com/leorodriguesdev"
        ],
        areaServed: {
          "@type": "Country",
          name: "Brasil"
        },
        serviceType: [
          "Desenvolvimento Mobile",
          "Desenvolvimento Web",
          "Desenvolvimento Full Stack",
          "Consultoria em Desenvolvimento"
        ],
        ...data
      };
    } else if (type === "BreadcrumbList") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.itemListElement || [],
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



