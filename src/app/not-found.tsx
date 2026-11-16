import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
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
  );
}
