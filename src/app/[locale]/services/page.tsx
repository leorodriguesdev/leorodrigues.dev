import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/pageMetadata";
import ServicesPageClient from "./ServicesPageClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/services",
    titleKey: "servicesTitle",
    descriptionKey: "servicesDescription",
    keywordsKey: "servicesKeywords",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesPageClient />;
}
