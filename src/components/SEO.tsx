"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export function SEO({
  title = "Leo Rodrigues - Desenvolvedor Full Stack | React, Next.js & TypeScript",
  description = "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Criando aplicações web modernas, rápidas e escaláveis. Disponível para projetos freelance e oportunidades.",
  keywords = "desenvolvedor web, full stack developer, React developer, Next.js, TypeScript, desenvolvedor frontend, desenvolvedor backend, portfolio desenvolvedor, programador web, desenvolvimento web moderno",
  image = "https://leorodrigues.dev/print.png",
  type = "website"
}: SEOProps) {
  const pathname = usePathname();
  const url = `https://leorodrigues.dev${pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "Leo Rodrigues");
    updateMetaTag("robots", "index, follow");

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:site_name", "LeoRodrigues.dev", true);
    updateMetaTag("og:locale", "pt_BR", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:creator", "@leorodriguesdev");

    // Additional SEO tags
    updateMetaTag("theme-color", "#00ff88");

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

  }, [title, description, keywords, image, type, url]);

  return null;
}



