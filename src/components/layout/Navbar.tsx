"use client";

import React, { useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion } from "motion/react";
import { AlignJustify, Moon, Sun, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { applyThemeToDocument, type ThemeId } from "@/app/theme/themes";

const HASH_SECTION_IDS = ["contact"] as const;

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const navItems = [
    { nameKey: "home" as const, path: "/", hash: false },
    { nameKey: "services" as const, path: "/services", hash: false },
    { nameKey: "modernization" as const, path: "/services/modernization", hash: false },
    { nameKey: "projects" as const, path: "/projects", hash: false },
    { nameKey: "about" as const, path: "/about", hash: false },
    { nameKey: "contact" as const, path: "/#contact", hash: true },
  ];

  useEffect(() => {
    const root = document.documentElement;
    const detectedDark = root.classList.contains("theme-dark") || (!root.classList.contains("theme-light") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkTheme(detectedDark);
  }, []);

  const applyTheme = (nextTheme: ThemeId) => {
    applyThemeToDocument(nextTheme);
    setIsDarkTheme(nextTheme === "dark");
  };

  const toggleTheme = () => {
    applyTheme(isDarkTheme ? "light" : "dark");
  };

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (path.includes("#")) {
      e.preventDefault();
      const [, hash] = path.split("#");

      const scrollToHash = () => {
        if (!hash) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      };

      if (pathname !== "/" && pathname !== "") {
        router.push(path);
        setTimeout(scrollToHash, 100);
      } else {
        scrollToHash();
      }
      setMobileMenuOpen(false);
    }
  };

  const isHome = pathname === "/" || pathname === "";
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const sectionIds = HASH_SECTION_IDS.filter((id) => document.getElementById(id));
    if (sectionIds.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveSection(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "0px 0px -50% 0px" }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (path: string, hash?: boolean) => {
    if (hash) {
      return isHome && activeSection === path.split("#")[1];
    }
    if (path === "/") {
      return isHome;
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="tracking-tight font-audiowide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary">Leo</span>
              <span className="text-foreground">Rodrigues</span>
              <span className="text-primary">.dev</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative group"
                  onClick={(e) => {
                    if (item.hash) {
                      handleHashClick(e, item.path);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  <span
                    className={`transition-colors ${
                      isActive(item.path, item.hash)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(item.nameKey)}
                  </span>
                  {isActive(item.path, item.hash) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDarkTheme ? "Modo claro" : "Modo escuro"}
                aria-pressed={isDarkTheme}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border bg-background text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <LanguageSwitcher />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkTheme ? "Modo claro" : "Modo escuro"}
              aria-pressed={isDarkTheme}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border bg-background text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 border border-border rounded-lg text-foreground hover:border-primary hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t("toggleMenu")}
            >
              {mobileMenuOpen ? <X size={20} /> : <AlignJustify size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  if (item.hash) {
                    handleHashClick(e, item.path);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className={`block py-3 transition-colors ${
                  isActive(item.path, item.hash)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(item.nameKey)}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
