"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

interface StructuredDataProps {
  type:
    | "Person"
    | "WebSite"
    | "Article"
    | "CreativeWork"
    | "ProfessionalService"
    | "LocalBusiness"
    | "BreadcrumbList";
  data: Record<string, unknown>;
}

/** Termos técnicos estáveis no schema (vocabulário de stack; não dependem de UI). */
const PERSON_KNOWS_ABOUT = [
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
  "Android Development",
] as const;

export function StructuredData({ type, data }: StructuredDataProps) {
  const t = useTranslations("structuredData");
  const locale = useLocale();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `structured-data-${type}`;

    const base = "https://leorodrigues.dev";
    const projectsPath =
      locale === routing.defaultLocale
        ? `${base}/projects`
        : `${base}/${locale}/projects`;
    const searchTemplate = `${projectsPath}?search={search_term_string}`;

    const serviceTypes = [
      t("serviceWeb"),
      t("serviceMobile"),
      t("serviceFull"),
      t("serviceConsulting"),
    ];

    let structuredData: Record<string, unknown> = {};

    if (type === "Person") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Léo Rodrigues",
        jobTitle: t("personJobTitle"),
        url: base,
        email: "contato@leorodrigues.dev",
        sameAs: [
          "https://github.com/leorodriguesdev",
          "https://linkedin.com/in/leorodriguesdev",
          // "https://x.com/leorodriguesdev",
        ],
        knowsAbout: [...PERSON_KNOWS_ABOUT],
        description: t("personDescription"),
        ...data,
      };
    } else if (type === "WebSite") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: t("websiteName"),
        url: base,
        description: t("websiteDescription"),
        author: {
          "@type": "Person",
          name: "Léo Rodrigues",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: searchTemplate,
          },
          "query-input": "required name=search_term_string",
        },
        ...data,
      };
    } else if (type === "ProfessionalService") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: t("professionalServiceName"),
        provider: {
          "@type": "Person",
          name: "Léo Rodrigues",
          url: base,
          email: "contato@leorodrigues.dev",
        },
        areaServed: "BR",
        serviceType: serviceTypes,
        ...data,
      };
    } else if (type === "CreativeWork") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        ...data,
      };
    } else if (type === "LocalBusiness") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: t("localBusinessName"),
        image: `${base}/avatar.png`,
        "@id": base,
        url: base,
        description: t("localBusinessDescription"),
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
          ...(data.address as object),
        },
        geo: data.geo
          ? {
              "@type": "GeoCoordinates",
              ...(data.geo as object),
            }
          : undefined,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
        sameAs: [
          "https://github.com/leorodriguesdev",
          "https://linkedin.com/in/leorodriguesdev",
          // "https://x.com/leorodriguesdev",
        ],
        areaServed: {
          "@type": "Country",
          name: t("countryBrasil"),
        },
        serviceType: serviceTypes,
        ...data,
      };
    } else if (type === "BreadcrumbList") {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.itemListElement || [],
        ...data,
      };
    }

    script.text = JSON.stringify(structuredData);

    const existing = document.getElementById(`structured-data-${type}`);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      document.getElementById(`structured-data-${type}`)?.remove();
    };
  }, [type, data, locale, t]);

  return null;
}
