import { routing, type Locale } from "@/i18n/routing";

const BASE = "https://leorodrigues.dev" as const;

/**
 * Caminho lógico sem prefixo de locale: `/`, `/about`, `/projects/5`.
 * Compatível com `usePathname()` do `createNavigation` (`as-needed`).
 */
export function pathnameWithoutLocale(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  const first = segments[0];
  if (
    routing.locales.includes(first as Locale) &&
    first !== routing.defaultLocale
  ) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/** URL absoluta canônica do site para um locale e caminho lógico. */
export function absoluteUrl(locale: string, path: string): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return normalized ? `${BASE}${normalized}` : `${BASE}/`;
  }
  return normalized ? `${BASE}/${locale}${normalized}` : `${BASE}/${locale}`;
}

/** Mapa `hreflang` → URL para um mesmo recurso em pt/en/es (+ x-default). */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const loc of routing.locales) {
    map[loc] = absoluteUrl(loc, path);
  }
  map["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return map;
}
