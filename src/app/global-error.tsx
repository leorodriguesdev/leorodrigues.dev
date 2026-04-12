"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import {
  globalErrorCopy,
  readLocaleFromDocumentCookie,
  type AppLocale,
} from "@/lib/globalErrorCopy";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<AppLocale>("pt");

  useLayoutEffect(() => {
    setLocale(readLocaleFromDocumentCookie());
  }, []);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const t = globalErrorCopy[locale];

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-bold">{t.title}</h2>
            <p className="text-muted-foreground">{t.description}</p>
            <Button onClick={reset} className="mt-4">
              {t.retry}
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
