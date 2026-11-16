import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/pageMetadata";
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
  return <SearchConsolePageClient />;
}
