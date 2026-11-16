import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMetadata } from "@/lib/pageMetadata";
import { breadcrumbSchema, professionalServiceSchema } from "@/lib/structuredData";
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

  const schemas = await Promise.all([
    professionalServiceSchema(locale, {
      name: "Modernização de Sistemas",
      serviceType: [
        "Modernização de sistemas",
        "Refatoração de software",
        "Desenvolvimento web",
        "Desenvolvimento mobile",
      ],
      path: "/services/modernization",
    }),
    breadcrumbSchema(locale, [
      { name: "Modernização", path: "/services/modernization" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schemas} />
      <ModernizationPageClient />
    </>
  );
}
