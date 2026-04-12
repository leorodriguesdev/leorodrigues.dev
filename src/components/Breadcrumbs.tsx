"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Home, ChevronRight } from "lucide-react";
import { StructuredData } from "./StructuredData";

const ROUTE_SEGMENTS = new Set([
  "about",
  "projects",
  "services",
  "search-console",
]);

function toAbsoluteUrl(locale: string, pathname: string): string {
  const base = "https://leorodrigues.dev";
  const path = pathname === "/" ? "" : pathname;
  if (locale === routing.defaultLocale) {
    return `${base}${path || "/"}`;
  }
  if (!path) {
    return `${base}/${locale}/`;
  }
  return `${base}/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("breadcrumbs");

  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [
    { name: t("home"), href: "/" },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      let name: string;
      if (ROUTE_SEGMENTS.has(segment)) {
        name = t(segment as "about" | "projects" | "services" | "search-console");
      } else if (/^\d+$/.test(segment)) {
        name = segment;
      } else {
        name = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      return { name, href };
    }),
  ];

  const structuredData = {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(locale, item.href === "/" ? "/" : item.href),
    })),
  };

  if (items.length <= 1) {
    return null;
  }

  return (
    <>
      <StructuredData type="BreadcrumbList" data={structuredData} />
      <nav
        aria-label={t("navAria")}
        className="container mx-auto max-w-6xl px-6 py-4 pt-24"
      >
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                    aria-label={t("home")}
                  >
                    <Home size={16} aria-hidden />
                  </Link>
                ) : (
                  <>
                    <ChevronRight size={16} aria-hidden />
                    {isLast ? (
                      <span className="text-foreground font-medium">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
