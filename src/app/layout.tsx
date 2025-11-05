
import type { Metadata } from "next";
import ThemeProvider from "@/app/theme/ThemeProvider"; 
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GoogleAnalytics from '@/components/GoogleAnalytics';


export const metadata: Metadata = {
  metadataBase: new URL('https://leorodrigues.dev'),
  title: {
    default: "Leo Rodrigues - Desenvolvedor Full Stack | React, Next.js & TypeScript",
    template: "%s | Leo Rodrigues"
  },
  description: "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Criando aplicações web modernas, rápidas e escaláveis. Disponível para projetos freelance e oportunidades.",
  keywords: [
    "desenvolvedor web",
    "full stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "desenvolvedor frontend",
    "desenvolvedor backend",
    "portfolio desenvolvedor",
    "programador web",
    "desenvolvimento web moderno",
    "desenvolvedor React",
    "desenvolvedor Node.js",
    "freelance developer",
    "desenvolvedor brasileiro"
  ],
  authors: [{ name: "Leo Rodrigues", url: "https://leorodrigues.dev" }],
  creator: "Leo Rodrigues",
  publisher: "Leo Rodrigues",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://leorodrigues.dev",
    siteName: "LeoRodrigues.dev",
    title: "Leo Rodrigues - Desenvolvedor Full Stack | React, Next.js & TypeScript",
    description: "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Criando aplicações web modernas, rápidas e escaláveis. Disponível para projetos freelance.",
    images: [
      {
        url: "https://leorodrigues.dev/print.png",
        width: 1200,
        height: 630,
        alt: "Leo Rodrigues - Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leo Rodrigues - Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Criando aplicações web modernas, rápidas e escaláveis.",
    images: ["https://leorodrigues.dev/print.png"],
    creator: "@leorodriguesdev",
    site: "@leorodriguesdev",
  },
  alternates: {
    canonical: "https://leorodrigues.dev",
  },
  verification: {
    // Adicionar depois quando tiver os códigos:
    // google: "seu-codigo-google",
    // yandex: "seu-codigo-yandex",
    // bing: "seu-codigo-bing",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <GoogleAnalytics />
      {children}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
