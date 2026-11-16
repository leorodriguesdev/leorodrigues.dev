export const THEME_IDS = [
  "figmaNeon",
  "dark",
  "light",
  "minimalBlue",
  "pastel",
  "purpleMono",
  "darkYellow",
  "retroGreen",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME: ThemeId = "figmaNeon";

export const THEME_STORAGE_KEY = "theme";

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" && (THEME_IDS as readonly string[]).includes(value)
  );
}

/**
 * Executado inline no <head>, antes da primeira pintura, para aplicar o tema salvo
 * sem flash e sem depender de hidratação (substitui a antiga tela de carregamento).
 */
export const themeInitScript = `(function(){try{var ids=${JSON.stringify(
  THEME_IDS,
)};var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(!t||ids.indexOf(t)<0)return;var c=document.documentElement.classList;for(var i=0;i<ids.length;i++)c.remove("theme-"+ids[i]);c.add("theme-"+t);}catch(e){}})();`;
