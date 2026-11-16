import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import {
  breadcrumbLabel,
  breadcrumbSchema,
} from "@/lib/structuredData";
import SearchConsolePageClient from "./SearchConsolePageClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/search-console",
    titleKey: "searchConsoleTitle",
    descriptionKey: "searchConsoleDescription",
  });
}

export default async function SearchConsolePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const schemas = [
    await breadcrumbSchema(locale, [
      { name: await breadcrumbLabel(locale, "search-console"), path: "/search-console" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <SearchConsolePageClient />
    </>
  );
}
