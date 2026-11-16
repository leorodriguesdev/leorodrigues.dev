"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAnalytics } from "@/hooks/useAnalytics";

const Footer = () => {
  const { trackEmail } = useAnalytics();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

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
                href="/services"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {tNav("services")}
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
              <Link href="/services" className="block hover:text-primary transition-colors">{t("serviceWeb")}</Link>
              <Link href="/services" className="block hover:text-primary transition-colors">{t("serviceConsulting")}</Link>
              <Link href="/services" className="block hover:text-primary transition-colors">{t("serviceUiux")}</Link>
              <Link href="/services/modernization" className="block hover:text-primary transition-colors">{t("serviceSeo")}</Link>
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
              <a
                href="mailto:contato@leorodrigues.dev"
                onClick={() => trackEmail("footer")}
                className="p-2 border border-border rounded hover:border-primary hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {t("rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
