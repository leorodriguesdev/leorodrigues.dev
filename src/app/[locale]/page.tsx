import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/pageMetadata";
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
  return <HomePageClient />;
}
