"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

const FLAG_BY_LOCALE: Record<Locale, string> = {
  pt: "/brasil.png",
  en: "/eua.png",
  es: "/spain.png",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const tLocale = useTranslations("languageSwitcher.locales");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label={t("aria")}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        const label = tLocale(l);
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-label={label}
            aria-pressed={active}
            className={[
              "relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full overflow-hidden transition-all duration-200",
              "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-primary",
              active
                ? "ring-1 ring-inset ring-primary/75 opacity-100 grayscale-0"
                : "opacity-45 grayscale hover:opacity-70 hover:grayscale-[0.45]",
            ].join(" ")}
          >
            <Image
              src={FLAG_BY_LOCALE[l]}
              alt=""
              width={20}
              height={20}
              className="h-full w-full object-cover"
              sizes="20px"
            />
          </button>
        );
      })}
    </div>
  );
}
