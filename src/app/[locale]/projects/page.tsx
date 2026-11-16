import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import {
  breadcrumbLabel,
  breadcrumbSchema,
} from "@/lib/structuredData";
import ProjectsPageClient from "./ProjectsPageClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/projects",
    titleKey: "projectsListTitle",
    descriptionKey: "projectsListDescription",
    keywordsKey: "projectsListKeywords",
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const schemas = [
    await breadcrumbSchema(locale, [
      { name: await breadcrumbLabel(locale, "projects"), path: "/projects" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ProjectsPageClient />
    </>
  );
}
