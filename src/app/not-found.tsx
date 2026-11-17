import Link from "next/link";
import { DEFAULT_THEME } from "@/app/theme/themes";
import "@/styles/globals.css";

/**
 * 404 de último recurso, fora do layout de idioma (o root layout não renderiza
 * <html>/<body>, por isso este arquivo precisa declará-los). A 404 normal do site
 * é `[locale]/not-found.tsx`.
 */
export default function RootNotFound() {
  return (
    <html lang="pt" className={`theme-${DEFAULT_THEME}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">404</p>
            <h1 className="mt-4 text-4xl font-semibold">Página não encontrada</h1>
            <p className="mt-3 text-muted-foreground">
              A página que você tentou acessar não existe ou foi movida.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Voltar para a home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
