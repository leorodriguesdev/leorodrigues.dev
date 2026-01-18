"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { StructuredData } from "./StructuredData";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  
  const pathSegments = pathname.split("/").filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    ...pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { name, url: path };
    }),
  ];

  const structuredData = {
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://leorodrigues.dev${item.url}`,
    })),
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <>
      <StructuredData type="BreadcrumbList" data={structuredData} />
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto max-w-6xl px-6 py-4 pt-24"
      >
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    href={item.url}
                    className="hover:text-primary transition-colors"
                  >
                    <Home size={16} />
                  </Link>
                ) : (
                  <>
                    <ChevronRight size={16} />
                    {isLast ? (
                      <span className="text-foreground font-medium">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.url}
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
