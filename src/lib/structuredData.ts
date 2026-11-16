import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/siteUrls";

const SITE_URL = "https://leorodrigues.dev";
const PERSON_ID = `${SITE_URL}/#person`;
const CONTACT_EMAIL = "contato@leorodrigues.dev";
const SAME_AS = [
  "https://github.com/leorodriguesdev",
  "https://linkedin.com/in/leorodriguesdev",
];

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
];

type Schema = Record<string, unknown>;

export async function personSchema(locale: string): Promise<Schema> {
  const t = await getTranslations({ locale, namespace: "structuredData" });
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Léo Rodrigues",
    jobTitle: t("personJobTitle"),
    description: t("personDescription"),
    url: SITE_URL,
    image: `${SITE_URL}/avatar.png`,
    email: CONTACT_EMAIL,
    sameAs: SAME_AS,
    knowsAbout: PERSON_KNOWS_ABOUT,
  };
}

export async function websiteSchema(locale: string): Promise<Schema> {
  const t = await getTranslations({ locale, namespace: "structuredData" });
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("websiteName"),
    description: t("websiteDescription"),
    url: absoluteUrl(locale, "/"),
    inLanguage: locale,
    author: { "@id": PERSON_ID },
  };
}

type ProfessionalServiceOverrides = {
  name?: string;
  serviceType?: string[];
  path?: string;
};

export async function professionalServiceSchema(
  locale: string,
  overrides: ProfessionalServiceOverrides = {},
): Promise<Schema> {
  const t = await getTranslations({ locale, namespace: "structuredData" });
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: overrides.name ?? t("professionalServiceName"),
    url: absoluteUrl(locale, overrides.path ?? "/"),
    email: CONTACT_EMAIL,
    image: `${SITE_URL}/print.png`,
    provider: { "@id": PERSON_ID },
    founder: { "@id": PERSON_ID },
    areaServed: { "@type": "Country", name: t("countryBrasil") },
    serviceType: overrides.serviceType ?? [
      t("serviceWeb"),
      t("serviceMobile"),
      t("serviceFull"),
      t("serviceConsulting"),
    ],
    sameAs: SAME_AS,
  };
}

type BreadcrumbItem = {
  name: string;
  /** Caminho lógico sem locale. */
  path: string;
};

/** Trilha a partir da home; os nomes das rotas fixas vêm do namespace `breadcrumbs`. */
export async function breadcrumbSchema(
  locale: string,
  items: BreadcrumbItem[],
): Promise<Schema> {
  const t = await getTranslations({ locale, namespace: "breadcrumbs" });
  const trail = [{ name: t("home"), path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export async function breadcrumbLabel(locale: string, key: string): Promise<string> {
  const t = await getTranslations({ locale, namespace: "breadcrumbs" });
  return t(key);
}
