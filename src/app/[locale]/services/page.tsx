import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import {
  breadcrumbLabel,
  breadcrumbSchema,
  professionalServiceSchema,
} from "@/lib/structuredData";
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
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const schemas = await Promise.all([
    professionalServiceSchema(locale, {
      name: t("structuredName"),
      serviceType: t.raw("structuredServiceTypes") as string[],
      path: "/services",
    }),
    breadcrumbSchema(locale, [
      { name: await breadcrumbLabel(locale, "services"), path: "/services" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schemas} />
      <ServicesPageClient />
    </>
  );
}
