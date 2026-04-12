"use client";

import { useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl, pathnameWithoutLocale } from "@/lib/siteUrls";

const OG_LOCALE: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export function SEO({
  title: titleProp,
  description: descriptionProp,
  keywords: keywordsProp,
  image = "https://leorodrigues.dev/print.png",
  type = "website",
}: SEOProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("metadata");

  const title = titleProp ?? t("seoDefaultTitle");
  const description = descriptionProp ?? t("seoDefaultDescription");
  const keywords = keywordsProp ?? t("seoDefaultKeywords");

  const url = useMemo(() => {
    const path = pathname === "/" ? "" : pathname;
    if (locale === routing.defaultLocale) {
      return `https://leorodrigues.dev${path || "/"}`;
    }
    if (!path) {
      return `https://leorodrigues.dev/${locale}/`;
    }
    return `https://leorodrigues.dev/${locale}${path.startsWith("/") ? path : `/${path}`}`;
  }, [locale, pathname]);

  const ogLocale = OG_LOCALE[locale] ?? "pt_BR";
  const siteName = t("siteName").trim();
  const authorName = t("authorName");

  useEffect(() => {
    document.title = title;

    const updateMetaTag = (
      property: string,
      content: string,
      isProperty = false
    ) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(
        `meta[${attribute}="${property}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", authorName);
    updateMetaTag("robots", "index, follow");

    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:site_name", siteName, true);
    updateMetaTag("og:locale", ogLocale, true);

    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:creator", "@leorodriguesdev");

    updateMetaTag("theme-color", "#00ff88");

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    const logicalPath = pathnameWithoutLocale(pathname);
    const hreflangSpecs: { lang: string; href: string }[] = [
      { lang: "pt", href: absoluteUrl("pt", logicalPath) },
      { lang: "en", href: absoluteUrl("en", logicalPath) },
      { lang: "es", href: absoluteUrl("es", logicalPath) },
      {
        lang: "x-default",
        href: absoluteUrl(routing.defaultLocale, logicalPath),
      },
    ];

    for (const { lang, href } of hreflangSpecs) {
      let alt = document.querySelector(
        `link[rel="alternate"][hreflang="${lang}"]`,
      ) as HTMLLinkElement;
      if (!alt) {
        alt = document.createElement("link");
        alt.setAttribute("rel", "alternate");
        alt.setAttribute("hreflang", lang);
        document.head.appendChild(alt);
      }
      alt.setAttribute("href", href);
    }
  }, [
    authorName,
    description,
    image,
    keywords,
    ogLocale,
    pathname,
    siteName,
    title,
    type,
    url,
  ]);

  return null;
}
