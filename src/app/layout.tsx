
import type { Metadata } from "next";
import ThemeProvider from "@/app/theme/ThemeProvider"; 
import { Analytics } from '@vercel/analytics/react'


export const metadata: Metadata = {
  title: "Leorodrigues.dev",
  description: "Leorodrigues.dev - Portfólio",
  openGraph: {
    title: "Leorodrigues.dev - Portfólio",
    description: `O desenvolvedor que vai fortalecer sua presença online...`,
    url: "https://leorodrigues.dev",
    images: ["https://leorodrigues.dev/print.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leorodrigues.dev - Portfólio",
    description: `O desenvolvedor que vai fortalecer sua presença online...`,
    images: ["https://leorodrigues.dev/print.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
      <Analytics />
    </ThemeProvider>
  );
}
