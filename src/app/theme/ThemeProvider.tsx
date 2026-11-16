"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { DEFAULT_THEME, THEME_IDS, THEME_STORAGE_KEY, isThemeId, type ThemeId } from "@/app/theme/themes";

type ThemeProviderProps = {
  children: ReactNode;
};

function readStoredTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeId | null>(null);

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  useLayoutEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    for (const id of THEME_IDS) {
      root.classList.remove(`theme-${id}`);
    }
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
