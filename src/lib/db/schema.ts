// Database Schema Definition for Jivhala PostgreSQL / Neon

export interface User {
  id: string;
  email?: string;
  name?: string;
  proEntitlement: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Installation {
  id: string;
  installationId: string; // Anonymous device UUID
  userId?: string | null;  // For future account linking
  name: string;
  language: 'mr' | 'hi' | 'en' | 'hinglish';
  avatarId: string;
  timezone: string;
  platform?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Avatar {
  id: string;
  key: string;
  name: string;
  personality: string;
  description: string;
  icon: string;
}

export interface MessageCategory {
  id: string;
  key: string;
  name: string;
  icon: string;
  defaultTime: string;
  enabledByDefault: boolean;
}

export interface MessageItem {
  id: string;
  categoryId: string;
  language: 'mr' | 'hi' | 'en' | 'hinglish';
  text: string;
  secondaryText?: string;
  expression: 'happy' | 'caring' | 'concerned' | 'sleepy' | 'playful' | 'motivational' | 'neutral';
  active: boolean;
}

export interface InstallationMessagePreference {
  id: string;
  installationId: string;
  categoryId: string;
  enabled: boolean;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  installationId: string;
  categoryId: string;
  customMessage?: string;
  scheduledTime: string; // e.g. "13:00"
  timezone: string;
  repeatType: 'daily' | 'weekdays' | 'weekends' | 'custom';
  repeatDays?: number[]; // [0, 1, 2, 3, 4, 5, 6]
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PushSubscriptionRecord {
  id: string;
  installationId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  platform?: string;
  userAgent?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationDelivery {
  id: string;
  installationId: string;
  reminderId?: string;
  messageId?: string;
  scheduledFor: string;
  sentAt?: string;
  status: 'pending' | 'sent' | 'failed' | 'skipped_quiet_hours';
  error?: string;
  createdAt: string;
}

export interface NotificationResponse {
  id: string;
  installationId: string;
  notificationDeliveryId?: string;
  responseType: 'completed' | 'doing_now' | 'snoozed' | 'dismissed';
  createdAt: string;
}

export interface ProInterest {
  id: string;
  installationId: string;
  interested: boolean;
  createdAt: string;
}

// SQL Migration script to create all tables in Neon / PostgreSQL
export const POSTGRES_MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  pro_entitlement BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS installations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id VARCHAR(64) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL DEFAULT 'सखी',
  language VARCHAR(16) NOT NULL DEFAULT 'mr',
  avatar_id VARCHAR(64) NOT NULL DEFAULT 'aaisarkhi',
  timezone VARCHAR(64) NOT NULL DEFAULT 'Asia/Kolkata',
  platform VARCHAR(64),
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS avatars (
  id VARCHAR(64) PRIMARY KEY,
  key VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  personality VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS message_categories (
  id VARCHAR(64) PRIMARY KEY,
  key VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(64) NOT NULL,
  default_time VARCHAR(16) NOT NULL,
  enabled_by_default BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id VARCHAR(64) NOT NULL REFERENCES message_categories(id) ON DELETE CASCADE,
  language VARCHAR(16) NOT NULL,
  text TEXT NOT NULL,
  secondary_text TEXT,
  expression VARCHAR(32) NOT NULL DEFAULT 'caring',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS installation_message_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id VARCHAR(64) NOT NULL REFERENCES installations(installation_id) ON DELETE CASCADE,
  category_id VARCHAR(64) NOT NULL REFERENCES message_categories(id) ON DELETE CASCADE,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(installation_id, category_id)
);

CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id VARCHAR(64) NOT NULL REFERENCES installations(installation_id) ON DELETE CASCADE,
  category_id VARCHAR(64) NOT NULL REFERENCES message_categories(id) ON DELETE CASCADE,
  custom_message TEXT,
  scheduled_time VARCHAR(16) NOT NULL,
  timezone VARCHAR(64) NOT NULL DEFAULT 'Asia/Kolkata',
  repeat_type VARCHAR(32) NOT NULL DEFAULT 'daily',
  repeat_days INT[],
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id VARCHAR(64) NOT NULL REFERENCES installations(installation_id) ON DELETE CASCADE,
  endpoint TEXT UNIQUE NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  platform VARCHAR(64),
  user_agent TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notification_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id VARCHAR(64) NOT NULL REFERENCES installations(installation_id) ON DELETE CASCADE,
  reminder_id UUID REFERENCES reminders(id) ON DELETE SET NULL,
  message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(installation_id, reminder_id, scheduled_for)
);

CREATE TABLE IF NOT EXISTS notification_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id VARCHAR(64) NOT NULL REFERENCES installations(installation_id) ON DELETE CASCADE,
  notification_delivery_id UUID REFERENCES notification_deliveries(id) ON DELETE SET NULL,
  response_type VARCHAR(32) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pro_interest (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installation_id VARCHAR(64) NOT NULL REFERENCES installations(installation_id) ON DELETE CASCADE,
  interested BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(installation_id)
);

CREATE INDEX IF NOT EXISTS idx_installations_id ON installations(installation_id);
CREATE INDEX IF NOT EXISTS idx_reminders_inst ON reminders(installation_id);
CREATE INDEX IF NOT EXISTS idx_push_subs_inst ON push_subscriptions(installation_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_scheduled ON notification_deliveries(scheduled_for, status);
`;
