import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";
import ptMessages from "../../messages/pt.json";

export type AppLocale = "pt" | "en" | "es";

type GlobalErrorShape = {
  title: string;
  description: string;
  retry: string;
};

function pick(m: { globalError: GlobalErrorShape }): GlobalErrorShape {
  return m.globalError;
}

/** Cópias para `global-error.tsx` (fora do NextIntlClientProvider). Fonte: `messages/*.json` gerados. */
export const globalErrorCopy: Record<AppLocale, GlobalErrorShape> = {
  pt: pick(ptMessages as { globalError: GlobalErrorShape }),
  en: pick(enMessages as { globalError: GlobalErrorShape }),
  es: pick(esMessages as { globalError: GlobalErrorShape }),
};

const COOKIE_RE = /(?:^|; )NEXT_LOCALE=([^;]*)/;

/** Cookie padrão do `next-intl` middleware (`NEXT_LOCALE`). */
export function readLocaleFromDocumentCookie(): AppLocale {
  if (typeof document === "undefined") {
    return "pt";
  }
  const raw = document.cookie.match(COOKIE_RE)?.[1]?.trim();
  if (raw === "en" || raw === "es" || raw === "pt") {
    return raw;
  }
  return "pt";
}
