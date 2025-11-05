"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Algo deu errado!</h2>
            <p className="text-muted-foreground">
              Um erro inesperado ocorreu. Nossa equipe foi notificada.
            </p>
            <Button onClick={reset} className="mt-4">
              Tentar novamente
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}

