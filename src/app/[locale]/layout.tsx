import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { audiowide, geistMono, geistSans } from "@/app/fonts";
import ThemeProvider from "@/app/theme/ThemeProvider";
import { DEFAULT_THEME, themeInitScript } from "@/app/theme/themes";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { routing } from "@/i18n/routing";
import { getYearsOfExperience } from "@/lib/experience";
import { OG_IMAGE_URL, OG_LOCALES, TWITTER_HANDLE } from "@/lib/pageMetadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Regenera as páginas estáticas 1x/dia (ISR): o "{years}+ anos" vira sozinho em 1º de janeiro, sem novo deploy.
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const titleDefault = t("rootTitle");
  const years = getYearsOfExperience();
  const description = t("rootDescription", { years });
  const keywords = (t.raw("rootKeywords") as string[]) ?? [];

  // Sem `alternates`/`openGraph.url` aqui: canonical e hreflang são definidos por rota
  // (`buildPageMetadata`), senão toda página herdaria o canonical da home.
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
      locale: OG_LOCALES[locale] ?? "pt_BR",
      siteName: t("siteName"),
      title: titleDefault,
      description: t("ogDescription", { years }),
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription", { years }),
      images: [OG_IMAGE_URL],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
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
    <html lang={locale} className={`theme-${DEFAULT_THEME}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
