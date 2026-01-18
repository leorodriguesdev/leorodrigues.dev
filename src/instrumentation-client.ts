// instrumentation-client.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",
  // Configurações adicionais
  beforeSend(event, hint) {
    // Filtrar erros conhecidos ou não críticos
    if (event.exception) {
      const error = hint.originalException;
      // Ignorar erros de rede conhecidos
      if (error instanceof Error && error.message.includes("NetworkError")) {
        return null;
      }
    }
    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
