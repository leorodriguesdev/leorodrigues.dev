import type { init } from "@sentry/nextjs";

/**
 * Opções comuns aos inits do Sentry (Node, Edge e browser).
 *
 * `dataCollection`: no SDK v11, deixar sem valor passa a coletar cookies, corpos HTTP e
 * dados de usuário por padrão. Fixamos o baseline restritivo que tínhamos no v10
 * (sem `sendDefaultPii`) para não ampliar a coleta de dados pessoais (LGPD).
 * Cabeçalhos e query params continuam como antes, com valores sensíveis filtrados pelo SDK.
 */
export const sentryBaseOptions = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpBodies: [],
  },
} satisfies Parameters<typeof init>[0];
