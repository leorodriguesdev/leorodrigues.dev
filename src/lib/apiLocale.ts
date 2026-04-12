import { routing, type Locale } from "@/i18n/routing";
import {
  buildProjects,
  type Project,
  type ProjectCopy,
} from "@/data/projectsData";
import ptMessages from "../../messages/pt.json";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

const supported = new Set<string>(routing.locales);

const byLocale: Record<Locale, typeof ptMessages> = {
  pt: ptMessages,
  en: enMessages,
  es: esMessages,
};

export type ApiCopy = {
  contactSuccess: string;
  contactError: string;
  searchAllOk: string;
  searchSomeFail: string;
  searchRec2: string;
  searchRec3: string;
  searchRec4: string;
};

function isLocale(value: string): value is Locale {
  return supported.has(value);
}

/**
 * Locale para rotas `app/api/*`: `?locale=pt|en|es` tem prioridade, depois
 * `Accept-Language`, depois `defaultLocale` (pt).
 */
export function resolveApiLocale(request: Request): Locale {
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("locale")?.toLowerCase();
  if (fromQuery && isLocale(fromQuery)) {
    return fromQuery;
  }

  const accept = request.headers.get("accept-language");
  if (accept) {
    for (const part of accept.split(",")) {
      const tag = part.split(";")[0]?.trim().toLowerCase();
      if (!tag) continue;
      const primary = tag.split("-")[0] ?? "";
      if (primary && isLocale(primary)) {
        return primary;
      }
    }
  }

  return routing.defaultLocale;
}

export function getApiCopy(locale: Locale): ApiCopy {
  const raw = byLocale[locale].api;
  if (!raw || typeof raw !== "object") {
    throw new Error(`Missing api namespace for locale ${locale}`);
  }
  return raw as ApiCopy;
}

export function getProjectsForApiLocale(locale: Locale): Project[] {
  const items = (
    byLocale[locale] as { projects?: { items?: Record<string, ProjectCopy> } }
  ).projects?.items;
  return buildProjects(items);
}
