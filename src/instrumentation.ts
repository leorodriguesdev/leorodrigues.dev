import * as Sentry from '@sentry/nextjs';
import { sentryBaseOptions } from '@/lib/sentryOptions';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init(sentryBaseOptions);
  }
}

export const onRequestError = Sentry.captureRequestError;
