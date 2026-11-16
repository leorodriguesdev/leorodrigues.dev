"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Palette } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  DEFAULT_THEME,
  THEME_IDS,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/app/theme/themes";

type ThemeProviderProps = {
  children: ReactNode;
};

const themes: { id: ThemeId; name: string; icon: string }[] = [
  { id: "figmaNeon", name: "Midnight Neon", icon: "/FigmaNeon.svg" },
  { id: "dark", name: "Dark Green", icon: "/MidnightNeon.svg" },
  { id: "light", name: "Ocean Breeze", icon: "/OceanBreeze.svg" },
  { id: "minimalBlue", name: "Minimal Blue", icon: "/MinimalBlue.svg" },
  { id: "pastel", name: "Pastel Grey", icon: "/PastelGrey.svg" },
  { id: "purpleMono", name: "Purple Mono", icon: "/PurpleMono.svg" },
  { id: "darkYellow", name: "Dark Yellow", icon: "/DarkYellow.svg" },
  { id: "retroGreen", name: "Retro Green", icon: "/RetroGreen.svg" },
];

function readStoredTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const t = useTranslations("theme");
  // `null` até montar: o tema inicial já foi aplicado no <html> por `themeInitScript`,
  // então não reaplicamos nada antes de ler o valor salvo (evita flash do tema padrão).
  const [theme, setTheme] = useState<ThemeId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const { trackThemeChange } = useAnalytics();

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  /** Portais (ex.: Vaul Drawer) montam no body fora do wrapper; variáveis CSS precisam estar no <html>. */
  useLayoutEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    for (const id of THEME_IDS) {
      root.classList.remove(`theme-${id}`);
    }
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeId) => {
    trackThemeChange(newTheme);
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {
        // Armazenamento indisponível (modo privado): o tema vale só para esta sessão.
      }
      setIsTransitioning(false);
      setIsSelectorVisible(false);
    }, 500);
  };

  const activeTheme = theme ?? DEFAULT_THEME;

  return (
    <div
      className={`
        transition-colors duration-500 min-h-screen
        ${isTransitioning ? "fade-transition" : ""}
      `}
    >
      <div
        className={`
          fixed top-20 right-0 z-50
          transition-transform duration-500
          ${isSelectorVisible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          type="button"
          onClick={() => setIsSelectorVisible(!isSelectorVisible)}
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-[--primary-color] text-white p-3 rounded-l-full focus:outline-none"
          aria-label={t("openSelector")}
        >
          <span className="absolute h-6 w-6 top-3 left-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-45"></span>
          </span>
          <Palette size={24} />
        </button>

        <div
          className="w-40 bg-[--primary-color] text-[--text-color] p-4 rounded-l-lg shadow-lg"
          onMouseEnter={() => setIsSelectorVisible(true)}
          onMouseLeave={() => setIsSelectorVisible(false)}
        >
          <span id="themeSelector" className="block mb-2 font-semibold text-xs">
            {t("selectTheme")}
          </span>
          <div className="space-y-2">
            {themes.map((themeOption) => (
              <button
                type="button"
                key={themeOption.id}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`
                  flex items-center text-xs p-1 w-full
                  rounded-lg transition-colors
                  ${activeTheme === themeOption.id
                    ? "bg-[--primary-color] text-white border-2 hover:bg-[--primary-color]"
                    : "bg-[--bg-color] text-[--text-color] hover:bg-[--secondary-color] hover:text-white border-2"
                  }
                `}
              >
                <Image
                  src={themeOption.icon}
                  alt={themeOption.name}
                  width={20}
                  height={20}
                  className="mr-3"
                />
                {themeOption.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
