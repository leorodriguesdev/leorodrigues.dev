import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (
      sv !== null &&
      typeof sv === "object" &&
      !Array.isArray(sv) &&
      tv !== null &&
      typeof tv === "object" &&
      !Array.isArray(tv)
    ) {
      deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>);
    } else {
      target[key] = sv;
    }
  }
  return target;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const ptMessages = (await import(`../../messages/pt.json`)).default as Record<
    string,
    unknown
  >;

  if (locale === "pt") {
    return { locale, messages: ptMessages };
  }

  const localeMessages = (await import(`../../messages/${locale}.json`))
    .default as Record<string, unknown>;
  const merged = deepMerge(
    JSON.parse(JSON.stringify(ptMessages)) as Record<string, unknown>,
    localeMessages,
  );

  return { locale, messages: merged };
});
