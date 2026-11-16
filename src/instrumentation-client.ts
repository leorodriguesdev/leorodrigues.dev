// instrumentation-client.ts
import * as Sentry from "@sentry/nextjs";
import { sentryBaseOptions } from "@/lib/sentryOptions";

Sentry.init({
  ...sentryBaseOptions,
  beforeSend(event, hint) {
    // Ignorar erros de rede conhecidos (conexão do visitante), que não são bugs do site.
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof Error && error.message.includes("NetworkError")) {
        return null;
      }
    }
    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
