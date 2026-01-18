import * as Sentry from '@sentry/nextjs';
import { captureRequestError } from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      enabled: process.env.NODE_ENV === 'production',
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      enabled: process.env.NODE_ENV === 'production',
    });
  }
}

export async function onRequestError(
  err: Error,
  request: {
    path: string;
    method: string;
    headers: Record<string, string>;
  },
  context: {
    routerKind: string;
    routePath: string;
  }
) {
  captureRequestError(
    err,
    {
      path: request.path,
      method: request.method,
      headers: request.headers,
    },
    {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: 'app',
    }
  );
}
