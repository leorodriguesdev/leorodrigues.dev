"use client";

import { ReactNode, useEffect, useState } from "react";
import { Palette } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAnalytics } from "@/hooks/useAnalytics";

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const t = useTranslations("theme");
  const [theme, setTheme] = useState("figmaNeon");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const { trackThemeChange } = useAnalytics();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Se não houver tema salvo, usar figmaNeon como padrão
      setTheme("figmaNeon");
      localStorage.setItem("theme", "figmaNeon");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    trackThemeChange(newTheme);
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      setIsTransitioning(false);
      setIsSelectorVisible(false);
    }, 500);
  };

  const themes = [
    { id: "figmaNeon", name: "Midnight Neon", icon: "/FigmaNeon.svg" },
    { id: "dark", name: "Dark Green", icon: "/MidnightNeon.svg" },
    { id: "light", name: "Ocean Breeze", icon: "/OceanBreeze.svg" },
    { id: "minimalBlue", name: "Minimal Blue", icon: "/MinimalBlue.svg" },
    { id: "pastel", name: "Pastel Grey", icon: "/PastelGrey.svg" },
    { id: "purpleMono", name: "Purple Mono", icon: "/PurpleMono.svg" },
    { id: "darkYellow", name: "Dark Yellow", icon: "/DarkYellow.svg" },
    { id: "retroGreen", name: "Retro Green", icon: "/RetroGreen.svg" },
  ];

  const LoadingScreen = () => {
    const [displayText, setDisplayText] = useState("");
    const fullText = "Leorodrigues.dev ";
    const firstPart = "Leo";
    const secondPart = "Rodrigues";
    const firstPartEnd = firstPart.length;
    const secondPartEnd = firstPartEnd + secondPart.length;

    useEffect(() => {
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }, []);

    const renderText = () => {
      const length = displayText.length;
      const cursorColor =
        length <= firstPartEnd ? "var(--primary-color)" :
          length <= secondPartEnd ? "var(--text-color)" :
            "var(--primary-color)";

      return (
        <>
          {/* Primeira parte: Leo */}
          {length > 0 && (
            <span style={{ color: "var(--primary-color)" }}>
              {displayText.substring(0, Math.min(length, firstPartEnd))}
            </span>
          )}

          {/* Segunda parte: Rodrigues */}
          {length > firstPartEnd && (
            <span style={{ color: "var(--text-color)" }}>
              {displayText.substring(firstPartEnd, Math.min(length, secondPartEnd))}
            </span>
          )}

          {/* Terceira parte: .dev */}
          {length > secondPartEnd && (
            <span style={{ color: "var(--primary-color)" }}>
              {displayText.substring(secondPartEnd)}
            </span>
          )}

          {/* Cursor */}
          <span style={{ color: cursorColor }}>|</span>
        </>
      );
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[--bg-color] z-50">
        <h1 className="sm:text-6xl text-4xl font-bold font-audiowide">
          {renderText()}
        </h1>
      </div>
    );
  };

  return (
    <div
      className={`
        theme-${theme}
        transition-colors duration-500 min-h-screen
        ${isTransitioning ? "fade-transition" : ""}
      `}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
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
              <span
                id="themeSelector"
                className="block mb-2 font-semibold text-xs"
              >
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
                      ${theme === themeOption.id
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
        </>
      )}
    </div>
  );
}
