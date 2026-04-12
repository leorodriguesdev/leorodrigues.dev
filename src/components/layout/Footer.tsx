"use client";

import React from "react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Github, Linkedin, Mail, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useVisitorIntent } from "@/hooks/useVisitorIntent";

const Footer = () => {
  const { intent, setIntent } = useVisitorIntent();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const handleSwitchVersion = () => {
    const currentIntent = intent || "commercial";
    const newIntent = currentIntent === "portfolio" ? "commercial" : "portfolio";
    setIntent(newIntent);
    if (pathname === "/" || pathname === "") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  const getNextIntent = () => {
    const currentIntent = intent || "commercial";
    return currentIntent === "portfolio" ? "commercial" : "portfolio";
  };

  const isHome = pathname === "/" || pathname === "";

  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="tracking-tight font-audiowide">
              <span className="text-primary">Leo</span>
              <span className="text-foreground">Rodrigues</span>
              <span className="text-primary">.dev</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-primary font-medium">{t("quickLinks")}</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav("home")}
              </Link>
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav("about")}
              </Link>
              <Link
                href="/projects"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav("projects")}
              </Link>
              <Link
                href="/#contact"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav("contact")}
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-primary font-medium">{t("servicesTitle")}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t("serviceWeb")}</p>
              <p>{t("serviceConsulting")}</p>
              <p>{t("serviceUiux")}</p>
              <p>{t("serviceSeo")}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-primary font-medium">{t("social")}</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              {/* Twitter/X oculto
              <a
                href="https://x.com/leorodriguesdev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              */}
              <a
                href="mailto:contato@leorodrigues.dev"
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {t("rights", { year: new Date().getFullYear() })}
            </p>
            {isHome && (
              <button
                type="button"
                onClick={handleSwitchVersion}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                <RefreshCw size={16} />
                {getNextIntent() === "portfolio"
                  ? t("switchToPortfolio")
                  : t("switchToCommercial")}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
