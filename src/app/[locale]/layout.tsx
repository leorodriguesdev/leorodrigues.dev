import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { audiowide, geistMono, geistSans } from "@/app/fonts";
import ThemeProvider from "@/app/theme/ThemeProvider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/siteUrls";

const ogLocales: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const titleDefault = t("rootTitle");
  const description = t("rootDescription");
  const keywords = (t.raw("rootKeywords") as string[]) ?? [];
  const homePath = "/";
  const canonical = absoluteUrl(locale, homePath);

  return {
    metadataBase: new URL("https://leorodrigues.dev"),
    title: {
      default: titleDefault,
      template: t("titleTemplate"),
    },
    description,
    keywords,
    authors: [{ name: t("authorName"), url: "https://leorodrigues.dev" }],
    creator: t("authorName"),
    publisher: t("authorName"),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale] ?? "pt_BR",
      url: canonical,
      siteName: t("siteName"),
      title: titleDefault,
      description: t("ogDescription"),
      images: [
        {
          url: "https://leorodrigues.dev/print.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["https://leorodrigues.dev/print.png"],
      creator: "@leorodriguesdev",
      site: "@leorodriguesdev",
    },
    alternates: {
      canonical,
      languages: languageAlternates(homePath),
    },
    verification: {
      google: "MCCPSESPM5MMVGw-lXb_pL40db1Z6VMT",
    },
    category: "technology",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="theme-figmaNeon" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <GoogleAnalytics />
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
