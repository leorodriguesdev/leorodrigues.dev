// src/app/layout.tsx
"use client";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      setIsTransitioning(false);
    }, 500); // Aumenta o tempo de transição para suavidade
  };

  return (
    <html lang="pt-BR" className={`theme-${theme}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500 ${
          isTransitioning ? "fade-transition" : ""
        }`}
      >
        {/* Seletor de Tema */}
        <div className="fixed top-20 right-0 bg-gray-700 text-white p-4 rounded-l-lg shadow-lg z-50">
          <label htmlFor="themeSelector" className="block mb-2 font-semibold">
            Selecione o Tema
          </label>
          <select
            id="themeSelector"
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            <option value="dark">🌙 Escuro</option>
            <option value="light">🌞 Claro</option>
            <option value="minimalBlue">Minimal Blue</option>
            <option value="pastel">Pastel</option>
            <option value="purpleMono">Purple Mono</option>
            <option value="darkYellow">Dark Yellow</option>
            <option value="retroGreen">Retro Green</option>
          </select>
        </div>

        {children}
      </body>
    </html>
  );
}
