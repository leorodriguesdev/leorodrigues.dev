import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** 404 dentro do layout de idioma: traduzida, com tema, fontes e CSS do site. */
export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("description")}</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
