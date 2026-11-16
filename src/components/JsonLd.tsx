type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * JSON-LD renderizado no servidor (entra no HTML inicial, visível para crawlers sem JS).
 * `<` é escapado para impedir que um valor feche a tag `<script>`.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
