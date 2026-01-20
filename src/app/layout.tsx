
import type { Metadata } from "next";
import ThemeProvider from "@/app/theme/ThemeProvider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GoogleAnalytics from '@/components/GoogleAnalytics';


export const metadata: Metadata = {
  metadataBase: new URL('https://leorodrigues.dev'),
  title: {
    default: "Desenvolvedor React Native e Mobile | Léo Rodrigues - Apps e Sites Modernos",
    template: "%s | Léo Rodrigues"
  },
  description: "Desenvolvedor Mobile especialista em React Native e Expo. Criando apps nativos para iOS e Android, sites com Next.js e sistemas full stack. 7+ anos de experiência. Disponível para projetos.",
  keywords: [
    // React Native e Mobile (prioridade)
    "desenvolvedor react native",
    "desenvolvedor mobile",
    "react native developer",
    "mobile developer",
    "desenvolvedor expo",
    "expo developer",
    "desenvolvedor mobile react native",
    "desenvolvedor app mobile",
    "mobile app developer",
    "react native especialista",
    "desenvolvedor mobile brasil",

    // Comercial - Criação de Sites e Apps
    "criar site",
    "fazer site",
    "desenvolvimento de site",
    "criar app",
    "desenvolvimento de app",
    "site profissional",
    "app mobile",
    "orçamento site",
    "orçamento app",
    "criar aplicativo",
    "desenvolvimento de aplicativo",
    "site para empresa",
    "app para empresa",

    // Full Stack e Web
    "desenvolvedor full stack",
    "full stack developer",
    "desenvolvedor web",
    "desenvolvedor frontend",
    "desenvolvedor backend",

    // Tecnologias específicas
    "React",
    "React Native",
    "Expo",
    "Next.js",
    "Vite",
    "Node.js",
    "TypeScript",
    "JavaScript",

    // Especializações
    "desenvolvedor React",
    "desenvolvedor Next.js",
    "desenvolvedor Node.js",
    "desenvolvedor TypeScript",
    "desenvolvedor JavaScript",

    // Long-tail (mais fácil de rankear)
    "desenvolvedor react native expo",
    "desenvolvedor mobile react native expo",
    "contratar desenvolvedor react native",
    "desenvolvedor full stack react native",
    "desenvolvedor mobile e web",
    "desenvolvedor react native freelance",
    "desenvolvedor mobile especialista",
    "criar site profissional",
    "fazer app mobile",
    "desenvolvedor para contratar",

    // Outros
    "portfolio desenvolvedor",
    "programador web",
    "desenvolvimento mobile",
    "desenvolvimento web moderno",
    "freelance developer",
    "desenvolvedor brasileiro",

    // Brand
    "leorodrigues.dev",
    "leorodrigues.com.br",
    "leorodrigues.net",
    "leorodrigues.org",
    "leorodrigues.io",
    "leorodrigues.tech",
    "leorodrigues.space",
    "leorodrigues.club",
    "leorodrigues.me",
    "leorodrigues.info",
    "leorodrigues.com",
    "leorodriguesdev",
    "leo rodrigues",
    "Léo Rodrigues",
    "Léo Rodrigues dev",
    "Léo Rodrigues developer",
    "Léo Rodrigues react native",
    "Léo Rodrigues mobile",
  ],
  authors: [{ name: "Léo Rodrigues", url: "https://leorodrigues.dev" }],
  creator: "Léo Rodrigues",
  publisher: "Léo Rodrigues",
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
    siteName: "Leorodrigues.dev ",
    title: "Desenvolvedor React Native e Mobile | Léo Rodrigues - Apps e Sites Modernos",
    description: "Desenvolvedor Mobile especialista em React Native e Expo. Criando apps nativos para iOS e Android, sites com Next.js e sistemas full stack. 7+ anos de experiência.",
    images: [
      {
        url: "https://leorodrigues.dev/print.png",
        width: 1200,
        height: 630,
        alt: "Léo Rodrigues - Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desenvolvedor React Native e Mobile | Léo Rodrigues",
    description: "Desenvolvedor Mobile especialista em React Native e Expo. Apps nativos iOS/Android, sites Next.js e sistemas full stack. 7+ anos de experiência.",
    images: ["https://leorodrigues.dev/print.png"],
    creator: "@leorodriguesdev",
    site: "@leorodriguesdev",
  },
  alternates: {
    canonical: "https://leorodrigues.dev",
  },
  verification: {
    google: "MCCPSESPM5MMVGw-lXb_pL40db1Z6VMT",
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
