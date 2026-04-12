"use client";

import React, { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion } from "motion/react";
import { AlignJustify, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useVisitorIntent } from "@/hooks/useVisitorIntent";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { intent } = useVisitorIntent();

  const baseNavItems = [
    { nameKey: "home" as const, path: "/", hash: false },
    { nameKey: "about" as const, path: "/about", hash: false },
    { nameKey: "skills" as const, path: "/#skills", hash: true },
    { nameKey: "projects" as const, path: "/projects", hash: false },
    { nameKey: "contact" as const, path: "/#contact", hash: true },
  ];

  const navItems =
    intent === "portfolio"
      ? baseNavItems
      : [
          ...baseNavItems.slice(0, 2),
          { nameKey: "services" as const, path: "/services", hash: false },
          ...baseNavItems.slice(2),
        ];

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (path.includes("#")) {
      e.preventDefault();
      const [, hash] = path.split("#");

      if (pathname !== "/" && pathname !== "") {
        router.push(path);
        setTimeout(() => {
          const element = document.querySelector(hash ? `#${hash}` : "");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(hash ? `#${hash}` : "");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string, hash?: boolean) => {
    if (hash) {
      if (pathname === "/" || pathname === "") {
        const hashValue = path.split("#")[1];
        if (hashValue) {
          const element = document.querySelector(`#${hashValue}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
          }
        }
      }
      return false;
    }
    if (path === "/") {
      return pathname === "/" || pathname === "";
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
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 border border-border rounded-lg text-foreground hover:border-primary hover:text-secondary transition-all"
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
