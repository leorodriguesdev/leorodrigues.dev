import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import {
  breadcrumbLabel,
  breadcrumbSchema,
  professionalServiceSchema,
} from "@/lib/structuredData";
import ModernizationPageClient from "./ModernizationPageClient";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/services/modernization",
    titleKey: "modernizationTitle",
    descriptionKey: "modernizationDescription",
    keywordsKey: "modernizationKeywords",
  });
}

export default async function ModernizationPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "modernizationPage" });
  const schemas = await Promise.all([
    professionalServiceSchema(locale, {
      name: t("structuredName"),
      serviceType: t.raw("structuredServiceTypes") as string[],
      path: "/services/modernization",
    }),
    breadcrumbSchema(locale, [
      { name: await breadcrumbLabel(locale, "services"), path: "/services" },
      { name: t("breadcrumb"), path: "/services/modernization" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schemas} />
      <ModernizationPageClient />
    </>
  );
}
