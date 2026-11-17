import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import {
  organizationSchema,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/structuredData";
import HomePageClient from "./HomePageClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/",
    titleKey: "homeTitle",
    descriptionKey: "homeDescription",
    keywordsKey: "homeKeywords",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const schemas = await Promise.all([
    organizationSchema(locale),
    personSchema(locale),
    websiteSchema(locale),
    professionalServiceSchema(locale),
  ]);

  return (
    <>
      <JsonLd data={schemas} />
      <HomePageClient />
    </>
  );
}
