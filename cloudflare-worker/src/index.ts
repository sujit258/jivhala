export interface Env {
  /**
   * Base URL of the deployed Jivhala Next.js application on Vercel
   * Example: "https://jivhala-sujitjoshi258-gmailcoms-projects.vercel.app"
   */
  JIVHALA_APP_URL: string;

  /**
   * Secret token matching process.env.CRON_SECRET in Vercel
   */
  CRON_SECRET: string;

  /**
   * Environment mode: 'production' | 'development'
   * Defaults to 'production' if not explicitly set
   */
  ENVIRONMENT?: string;

  /**
   * Optional separate development-only secret for manual triggering.
   * If unset or if ENVIRONMENT is 'production', manual triggering is completely disabled (404).
   */
  DEV_MANUAL_TRIGGER_SECRET?: string;
}

const worker = {
  /**
   * Cloudflare Cron Trigger handler
   * Invoked automatically every minute (* * * * *) by Cloudflare Cron Triggers
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(triggerScheduler(env, `cron:${event.cron}`));
  },

  /**
   * HTTP Fetch handler
   * Handles safe health check and strictly protected development-only triggers
   */
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Safe Health Check: GET /health or GET /
    // Never exposes secrets, tokens, or internal URLs
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(
        JSON.stringify(
          {
            status: 'ok',
            service: 'jivhala-cron-scheduler',
            schedule: '* * * * *',
            targetConfigured: Boolean(env.JIVHALA_APP_URL),
            secretConfigured: Boolean(env.CRON_SECRET)
          },
          null,
          2
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    // Manual trigger endpoint:
    // 1. Completely disabled (returns 404) in production or if DEV_MANUAL_TRIGGER_SECRET is unset.
    // 2. In development, strictly requires DEV_MANUAL_TRIGGER_SECRET via Bearer token or ?secret= parameter.
    if (url.pathname === '/trigger') {
      const isProduction = !env.ENVIRONMENT || env.ENVIRONMENT === 'production';
      const devSecret = env.DEV_MANUAL_TRIGGER_SECRET;

      if (isProduction || !devSecret) {
        return new Response('Not Found', { status: 404 });
      }

      const authHeader = request.headers.get('authorization');
      const bearer = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
      const querySecret = url.searchParams.get('secret');

      if (bearer !== devSecret && querySecret !== devSecret) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const result = await triggerScheduler(env, 'manual-dev-http');
      return new Response(JSON.stringify(result, null, 2), {
        status: result.success ? 200 : 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};

export default worker;

/**
 * Dispatches notification processing request to the Jivhala Next.js app on Vercel
 * Never logs or returns secret tokens.
 */
async function triggerScheduler(env: Env, triggerSource: string) {
  const appUrl = (env.JIVHALA_APP_URL || '').trim().replace(/\/+$/, '');
  const secret = (env.CRON_SECRET || '').trim();

  if (!appUrl) {
    console.error('[Cloudflare Worker Error] JIVHALA_APP_URL is not configured in Worker environment.');
    return { success: false, error: 'Target URL is not configured' };
  }

  if (!secret) {
    console.error('[Cloudflare Worker Error] CRON_SECRET is not configured in Worker secrets.');
    return { success: false, error: 'CRON_SECRET is not configured' };
  }

  const targetEndpoint = `${appUrl}/api/notifications/process`;
  const startTime = Date.now();

  try {
    console.log(`[${new Date().toISOString()}] Dispatching cron (${triggerSource})...`);

    const response = await fetch(targetEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Jivhala-Cloudflare-Cron-Scheduler/1.0'
      }
    });

    const elapsedMs = Date.now() - startTime;
    const contentType = response.headers.get('content-type') || '';
    let responseData: unknown;

    if (contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (response.ok) {
      console.log(`[Success] Scheduler returned HTTP ${response.status} in ${elapsedMs}ms`);
      return {
        success: true,
        status: response.status,
        elapsedMs,
        data: responseData
      };
    } else {
      console.error(`[Error] Scheduler returned HTTP ${response.status} in ${elapsedMs}ms`);
      return {
        success: false,
        status: response.status,
        elapsedMs,
        error: responseData
      };
    }
  } catch (error: unknown) {
    const elapsedMs = Date.now() - startTime;
    const message = error instanceof Error ? error.message : 'Network failure';
    console.error(`[Fatal] Network exception after ${elapsedMs}ms:`, message);
    return {
      success: false,
      elapsedMs,
      error: message
    };
  }
}
