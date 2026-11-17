import { notFound } from "next/navigation";

/**
 * Rotas inexistentes dentro de um idioma (ex.: /en/qualquer-coisa) caem aqui e
 * renderizam `[locale]/not-found.tsx` (traduzida), em vez da 404 da raiz.
 */
export default function CatchAllNotFound() {
  notFound();
}
