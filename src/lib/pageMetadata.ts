import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { absoluteUrl, languageAlternates } from "@/lib/siteUrls";
import { getYearsOfExperience } from "@/lib/experience";

export const OG_IMAGE_URL = "https://leorodrigues.dev/print.png";
export const TWITTER_HANDLE = "@leorodriguesdev";

export const OG_LOCALES: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

type PageMetadataOptions = {
  locale: string;
  /** Caminho lógico sem prefixo de locale: `/`, `/about`, `/services`. */
  path: string;
  /** Chaves do namespace `metadata` em `messages/`. */
  titleKey: string;
  descriptionKey: string;
  keywordsKey?: string;
  noIndex?: boolean;
};

/**
 * Metadata por rota gerada no servidor: title, description, canonical e hreflang
 * da própria página (o layout não define canonical para não vazar o da home).
 * Os títulos em `messages/` já incluem a marca, por isso `title.absolute`.
 */
export async function buildPageMetadata({
  locale,
  path,
  titleKey,
  descriptionKey,
  keywordsKey,
  noIndex = false,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  // Valores ICU disponíveis em qualquer chave de metadata (ex.: "{years}+ anos").
  const values = { years: getYearsOfExperience() };
  const title = t(titleKey, values);
  const description = t(descriptionKey, values);
  const url = absoluteUrl(locale, path);

  return {
    title: { absolute: title },
    description,
    ...(keywordsKey ? { keywords: t(keywordsKey) } : {}),
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale] ?? "pt_BR",
      url,
      siteName: t("siteName"),
      title,
      description,
      images: [
        { url: OG_IMAGE_URL, width: 1200, height: 630, alt: t("ogImageAlt") },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
