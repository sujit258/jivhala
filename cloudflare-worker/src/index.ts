export interface Env {
  /**
   * Base URL of the deployed Jivhala Next.js application on Vercel
   * Example: "https://jivhala-sujitjoshi258-gmailcoms-projects.vercel.app" or custom domain
   */
  JIVHALA_APP_URL: string;

  /**
   * Secret token matching process.env.CRON_SECRET in Vercel
   */
  CRON_SECRET: string;
}

export default {
  /**
   * Cloudflare Cron Trigger handler
   * Invoked automatically every minute (* * * * *)
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(triggerScheduler(env, `cron:${event.cron}`));
  },

  /**
   * HTTP Fetch handler
   * Useful for manual triggers, health checks, and dashboard testing
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check endpoint: GET /health or GET /
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(
        JSON.stringify(
          {
            status: 'ok',
            service: 'jivhala-cron-scheduler',
            schedule: '* * * * *',
            targetConfigured: Boolean(env.JIVHALA_APP_URL),
            secretConfigured: Boolean(env.CRON_SECRET),
            targetUrl: env.JIVHALA_APP_URL || '(not configured)'
          },
          null,
          2
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Manual test trigger endpoint: GET or POST /trigger
    if (url.pathname === '/trigger') {
      const result = await triggerScheduler(env, 'manual-http');
      return new Response(JSON.stringify(result, null, 2), {
        status: result.success ? 200 : 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};

/**
 * Dispatches notification processing request to the Jivhala Next.js app on Vercel
 */
async function triggerScheduler(env: Env, triggerSource: string) {
  const appUrl = (env.JIVHALA_APP_URL || '').trim().replace(/\/+$/, '');
  const secret = (env.CRON_SECRET || '').trim();

  if (!appUrl) {
    const err = '[Cloudflare Worker Error] JIVHALA_APP_URL is not configured in Worker environment.';
    console.error(err);
    return { success: false, error: err };
  }

  if (!secret) {
    const err = '[Cloudflare Worker Error] CRON_SECRET is not configured in Worker secrets.';
    console.error(err);
    return { success: false, error: err };
  }

  const targetEndpoint = `${appUrl}/api/notifications/process`;
  const startTime = Date.now();

  try {
    console.log(`[${new Date().toISOString()}] Dispatching cron (${triggerSource}) to ${targetEndpoint}...`);

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
      console.log(
        `[Success] Jivhala scheduler returned HTTP ${response.status} in ${elapsedMs}ms:`,
        JSON.stringify(responseData)
      );
      return {
        success: true,
        status: response.status,
        elapsedMs,
        data: responseData
      };
    } else {
      console.error(
        `[Error] Jivhala scheduler returned HTTP ${response.status} in ${elapsedMs}ms:`,
        JSON.stringify(responseData)
      );
      return {
        success: false,
        status: response.status,
        elapsedMs,
        error: responseData
      };
    }
  } catch (error: unknown) {
    const elapsedMs = Date.now() - startTime;
    const message = error instanceof Error ? error.message : 'Unknown network failure';
    console.error(`[Fatal] Network exception invoking ${targetEndpoint} after ${elapsedMs}ms:`, message);
    return {
      success: false,
      elapsedMs,
      error: message
    };
  }
}
