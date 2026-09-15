// Database client and persistence layer for Jivhala
// In production (Vercel), PostgreSQL / Neon is strictly mandatory.
// In development, an in-memory repository is provided only if DATABASE_URL is not supplied.

import { Pool } from 'pg';
import {
  Installation,
  MessageCategory,
  Reminder,
  PushSubscriptionRecord,
  NotificationDelivery,
  NotificationResponse,
  POSTGRES_MIGRATION_SQL
} from './schema';
import { SEED_AVATARS, SEED_CATEGORIES, SEED_MESSAGES } from './seed-data';

const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;

if (isProduction && !databaseUrl && process.env.NEXT_PHASE !== 'phase-production-build') {
  // Strict rule: PostgreSQL/Neon is mandatory in production runtime.
  console.warn('[DB Warning] Neon PostgreSQL connection string (DATABASE_URL / POSTGRES_URL) is required in production.');
}

let pgPool: Pool | null = null;

if (databaseUrl) {
  pgPool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false }
  });
}

// Ensure database tables exist in PostgreSQL
let dbInitialized = false;
export async function ensurePostgresTables() {
  if (!pgPool || dbInitialized) return;
  try {
    await pgPool.query(POSTGRES_MIGRATION_SQL);
    dbInitialized = true;
    console.log('[DB] PostgreSQL tables verified.');
  } catch (err) {
    console.error('[DB] Failed to initialize PostgreSQL tables:', err);
    throw err;
  }
}

// ================= DEV IN-MEMORY STORE (DEVELOPMENT ONLY) =================
interface DevStorage {
  installations: Map<string, Installation>;
  reminders: Map<string, Reminder>;
  subscriptions: Map<string, PushSubscriptionRecord>;
  preferences: Map<string, { installationId: string; categoryId: string; enabled: boolean }>;
  deliveries: Map<string, NotificationDelivery>;
  responses: Map<string, NotificationResponse>;
  proInterest: Set<string>;
}

const devStore: DevStorage = {
  installations: new Map(),
  reminders: new Map(),
  subscriptions: new Map(),
  preferences: new Map(),
  deliveries: new Map(),
  responses: new Map(),
  proInterest: new Set()
};

// ================= DATA ACCESS METHODS =================

export async function getInstallation(installationId: string): Promise<Installation | null> {
  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query(
      `SELECT installation_id as "installationId", user_id as "userId", name, language, avatar_id as "avatarId", timezone, platform, user_agent as "userAgent", created_at as "createdAt", updated_at as "updatedAt" FROM installations WHERE installation_id = $1`,
      [installationId]
    );
    return res.rows[0] || null;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  return devStore.installations.get(installationId) || null;
}

export async function upsertInstallation(data: {
  installationId: string;
  name: string;
  language: 'mr' | 'hi' | 'en' | 'hinglish';
  avatarId: string;
  timezone: string;
  platform?: string;
  userAgent?: string;
}): Promise<Installation> {
  const now = new Date().toISOString();

  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query(
      `INSERT INTO installations (installation_id, name, language, avatar_id, timezone, platform, user_agent, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (installation_id)
       DO UPDATE SET
         name = EXCLUDED.name,
         language = EXCLUDED.language,
         avatar_id = EXCLUDED.avatar_id,
         timezone = EXCLUDED.timezone,
         platform = COALESCE(EXCLUDED.platform, installations.platform),
         user_agent = COALESCE(EXCLUDED.user_agent, installations.user_agent),
         updated_at = NOW()
       RETURNING installation_id as "installationId", user_id as "userId", name, language, avatar_id as "avatarId", timezone, platform, user_agent as "userAgent", created_at as "createdAt", updated_at as "updatedAt"`,
      [data.installationId, data.name, data.language, data.avatarId, data.timezone, data.platform || null, data.userAgent || null]
    );
    return res.rows[0];
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const existing = devStore.installations.get(data.installationId);
  const updated: Installation = {
    id: existing?.id || `inst-${Date.now()}`,
    installationId: data.installationId,
    name: data.name,
    language: data.language,
    avatarId: data.avatarId,
    timezone: data.timezone,
    platform: data.platform || existing?.platform,
    userAgent: data.userAgent || existing?.userAgent,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  devStore.installations.set(data.installationId, updated);
  return updated;
}

export async function getCategories(): Promise<MessageCategory[]> {
  return SEED_CATEGORIES;
}

export async function getAvatars() {
  return SEED_AVATARS;
}

export async function getReminders(installationId: string): Promise<Reminder[]> {
  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query(
      `SELECT id, installation_id as "installationId", category_id as "categoryId", custom_message as "customMessage",
              scheduled_time as "scheduledTime", timezone, repeat_type as "repeatType", repeat_days as "repeatDays",
              enabled, created_at as "createdAt", updated_at as "updatedAt"
       FROM reminders WHERE installation_id = $1 ORDER BY scheduled_time ASC`,
      [installationId]
    );
    return res.rows;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  return Array.from(devStore.reminders.values())
    .filter((r) => r.installationId === installationId)
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
}

export async function saveReminder(reminder: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<Reminder> {
  const now = new Date().toISOString();
  const id = reminder.id || `rem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query(
      `INSERT INTO reminders (id, installation_id, category_id, custom_message, scheduled_time, timezone, repeat_type, repeat_days, enabled, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       ON CONFLICT (id)
       DO UPDATE SET
         category_id = EXCLUDED.category_id,
         custom_message = EXCLUDED.custom_message,
         scheduled_time = EXCLUDED.scheduled_time,
         timezone = EXCLUDED.timezone,
         repeat_type = EXCLUDED.repeat_type,
         repeat_days = EXCLUDED.repeat_days,
         enabled = EXCLUDED.enabled,
         updated_at = NOW()
       RETURNING id, installation_id as "installationId", category_id as "categoryId", custom_message as "customMessage",
                 scheduled_time as "scheduledTime", timezone, repeat_type as "repeatType", repeat_days as "repeatDays",
                 enabled, created_at as "createdAt", updated_at as "updatedAt"`,
      [id, reminder.installationId, reminder.categoryId, reminder.customMessage || null, reminder.scheduledTime, reminder.timezone, reminder.repeatType, reminder.repeatDays || null, reminder.enabled]
    );
    return res.rows[0];
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const existing = devStore.reminders.get(id);
  const saved: Reminder = {
    id,
    installationId: reminder.installationId,
    categoryId: reminder.categoryId,
    customMessage: reminder.customMessage,
    scheduledTime: reminder.scheduledTime,
    timezone: reminder.timezone,
    repeatType: reminder.repeatType,
    repeatDays: reminder.repeatDays,
    enabled: reminder.enabled,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  devStore.reminders.set(id, saved);
  return saved;
}

export async function deleteReminder(reminderId: string, installationId: string): Promise<boolean> {
  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query('DELETE FROM reminders WHERE id = $1 AND installation_id = $2', [reminderId, installationId]);
    return (res.rowCount ?? 0) > 0;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const r = devStore.reminders.get(reminderId);
  if (r && r.installationId === installationId) {
    devStore.reminders.delete(reminderId);
    return true;
  }
  return false;
}

export async function savePushSubscription(data: {
  installationId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  platform?: string;
  userAgent?: string;
}): Promise<PushSubscriptionRecord> {
  const now = new Date().toISOString();
  const id = `sub-${Date.now()}`;

  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query(
      `INSERT INTO push_subscriptions (installation_id, endpoint, p256dh, auth, platform, user_agent, active, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, TRUE, NOW())
       ON CONFLICT (endpoint)
       DO UPDATE SET
         installation_id = EXCLUDED.installation_id,
         p256dh = EXCLUDED.p256dh,
         auth = EXCLUDED.auth,
         platform = EXCLUDED.platform,
         user_agent = EXCLUDED.user_agent,
         active = TRUE,
         updated_at = NOW()
       RETURNING id, installation_id as "installationId", endpoint, p256dh, auth, platform, user_agent as "userAgent", active, created_at as "createdAt", updated_at as "updatedAt"`,
      [data.installationId, data.endpoint, data.p256dh, data.auth, data.platform || null, data.userAgent || null]
    );
    return res.rows[0];
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const record: PushSubscriptionRecord = {
    id,
    installationId: data.installationId,
    endpoint: data.endpoint,
    p256dh: data.p256dh,
    auth: data.auth,
    platform: data.platform,
    userAgent: data.userAgent,
    active: true,
    createdAt: now,
    updatedAt: now
  };
  devStore.subscriptions.set(data.endpoint, record);
  return record;
}

export async function deactivatePushSubscription(endpoint: string): Promise<void> {
  if (pgPool) {
    await ensurePostgresTables();
    await pgPool.query('UPDATE push_subscriptions SET active = FALSE, updated_at = NOW() WHERE endpoint = $1', [endpoint]);
    return;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const sub = devStore.subscriptions.get(endpoint);
  if (sub) {
    sub.active = false;
    sub.updatedAt = new Date().toISOString();
  }
}

export async function getActivePushSubscriptions(installationId?: string): Promise<PushSubscriptionRecord[]> {
  if (pgPool) {
    await ensurePostgresTables();
    let query = 'SELECT id, installation_id as "installationId", endpoint, p256dh, auth, platform, user_agent as "userAgent", active FROM push_subscriptions WHERE active = TRUE';
    const params: string[] = [];
    if (installationId) {
      query += ' AND installation_id = $1';
      params.push(installationId);
    }
    const res = await pgPool.query(query, params);
    return res.rows;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const all = Array.from(devStore.subscriptions.values()).filter((s) => s.active);
  if (installationId) {
    return all.filter((s) => s.installationId === installationId);
  }
  return all;
}

// Next message selector with rotation to avoid immediate repetition
export function getNextMessage(options: {
  installationId: string;
  categoryId: string;
  language: 'mr' | 'hi' | 'en' | 'hinglish';
  recentlyUsedMessageTexts?: string[];
}) {
  const { categoryId, language, recentlyUsedMessageTexts = [] } = options;
  const candidates = SEED_MESSAGES.filter(
    (m) => m.categoryId === categoryId && m.language === language
  );

  if (candidates.length === 0) {
    // Fallback to Marathi or any message for category
    const fallback = SEED_MESSAGES.find((m) => m.categoryId === categoryId) || SEED_MESSAGES[0];
    return fallback;
  }

  // Filter out recently used messages
  const fresh = candidates.filter((m) => !recentlyUsedMessageTexts.includes(m.text));
  const pool = fresh.length > 0 ? fresh : candidates;
  const selected = pool[Math.floor(Math.random() * pool.length)];
  return selected;
}

export async function saveProInterest(installationId: string): Promise<void> {
  if (pgPool) {
    await ensurePostgresTables();
    await pgPool.query(
      `INSERT INTO pro_interest (installation_id, interested) VALUES ($1, TRUE)
       ON CONFLICT (installation_id) DO UPDATE SET interested = TRUE`,
      [installationId]
    );
    return;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  devStore.proInterest.add(installationId);
}

export async function isProInterested(installationId: string): Promise<boolean> {
  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query('SELECT interested FROM pro_interest WHERE installation_id = $1', [installationId]);
    return res.rows.length > 0 && res.rows[0].interested;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  return devStore.proInterest.has(installationId);
}

export async function hasNotificationBeenDelivered(
  installationId: string,
  reminderId: string,
  scheduledFor: string
): Promise<boolean> {
  if (pgPool) {
    await ensurePostgresTables();
    const res = await pgPool.query(
      `SELECT id FROM notification_deliveries WHERE installation_id = $1 AND reminder_id = $2 AND scheduled_for = $3 AND status = 'sent'`,
      [installationId, reminderId, scheduledFor]
    );
    return res.rows.length > 0;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  return Array.from(devStore.deliveries.values()).some(
    (d) => d.installationId === installationId && d.reminderId === reminderId && d.scheduledFor === scheduledFor && d.status === 'sent'
  );
}

export async function recordNotificationDelivery(delivery: {
  installationId: string;
  reminderId?: string;
  scheduledFor: string;
  status: 'sent' | 'failed' | 'skipped_quiet_hours';
  error?: string;
}): Promise<void> {
  if (pgPool) {
    await ensurePostgresTables();
    await pgPool.query(
      `INSERT INTO notification_deliveries (installation_id, reminder_id, scheduled_for, sent_at, status, error)
       VALUES ($1, $2, $3, NOW(), $4, $5)
       ON CONFLICT (installation_id, reminder_id, scheduled_for) DO UPDATE SET
         status = EXCLUDED.status,
         sent_at = NOW(),
         error = EXCLUDED.error`,
      [delivery.installationId, delivery.reminderId || null, delivery.scheduledFor, delivery.status, delivery.error || null]
    );
    return;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const id = `del-${Date.now()}`;
  devStore.deliveries.set(id, {
    id,
    installationId: delivery.installationId,
    reminderId: delivery.reminderId,
    scheduledFor: delivery.scheduledFor,
    sentAt: new Date().toISOString(),
    status: delivery.status,
    error: delivery.error,
    createdAt: new Date().toISOString()
  });
}

export async function recordNotificationResponse(response: {
  installationId: string;
  notificationDeliveryId?: string;
  responseType: 'completed' | 'doing_now' | 'snoozed' | 'dismissed';
}): Promise<void> {
  if (pgPool) {
    await ensurePostgresTables();
    await pgPool.query(
      `INSERT INTO notification_responses (installation_id, notification_delivery_id, response_type) VALUES ($1, $2, $3)`,
      [response.installationId, response.notificationDeliveryId || null, response.responseType]
    );
    return;
  }

  if (isProduction) {
    throw new Error('DATABASE_URL is required for PostgreSQL / Neon in production.');
  }

  const id = `res-${Date.now()}`;
  devStore.responses.set(id, {
    id,
    installationId: response.installationId,
    notificationDeliveryId: response.notificationDeliveryId,
    responseType: response.responseType,
    createdAt: new Date().toISOString()
  });
}
