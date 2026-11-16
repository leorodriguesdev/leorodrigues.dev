import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import {
  breadcrumbLabel,
  breadcrumbSchema,
  personSchema,
} from "@/lib/structuredData";
import AboutPageClient from "./AboutPageClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/about",
    titleKey: "aboutTitle",
    descriptionKey: "aboutDescription",
    keywordsKey: "aboutKeywords",
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const schemas = await Promise.all([
    personSchema(locale),
    breadcrumbSchema(locale, [
      { name: await breadcrumbLabel(locale, "about"), path: "/about" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schemas} />
      <AboutPageClient />
    </>
  );
}
