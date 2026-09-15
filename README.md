# Jivhala ❤️ — "Someone who remembers the little things."
> **"छोट्या छोट्या गोष्टींची काळजी."**

Jivhala is a warm, emotional caring companion PWA that remembers life's small, essential moments (meals, water, rest, breaks, self-care, encouragement). It is NOT a generic reminder app or medical dashboard; it is a loving companion that makes you feel genuinely remembered.

---

## 🌟 Key Features

1. **Anonymous-First & 100% Free**:
   - Zero login or account creation required for onboarding or normal daily usage.
   - Generates a secure anonymous UUID `installationId` stored locally and synced with the backend.
   - Designed with future **Account → Installations → Entitlements** architecture so a future ₹20 Lifetime Pro purchase can follow the user across devices without breaking Free anonymous usage.
2. **Signature Immersive Care Experience (`/care/[notificationId]`)**:
   - Signature WOW feature: when tapping a notification, the app opens directly into a full-screen view where the companion avatar appears close to the viewer (occupying 70–85% of the viewport) looking into the user's eyes with lifelike breathing and blinking animations.
   - 100% privacy: **ZERO camera, microphone, or location access**. Created entirely through responsive vector art, lighting depth, and CSS animations.
   - Immediate emotional response ("आता करतो", "झालं ❤️", "थोड्यावेळाने") and visual celebration.
3. **Real PWA & Offline Support**:
   - Standalone mobile display, portrait orientation, theme color `#FFF9F5`.
   - Native Android installation prompt (`beforeinstallprompt`) and step-by-step iOS Safari "Add to Home Screen" walkthrough.
   - Service worker caching for fast offline shell loading.
4. **Native Web Push Notifications**:
   - Implemented via Web Push API and VAPID protocol with auto-cleanup of expired/unregistered subscriptions (HTTP 404/410).
   - Tapping OS notifications directly opens `/care/[notificationId]`.
5. **Multi-Language Support**:
   - Full native localization in **मराठी (Marathi)**, **हिन्दी (Hindi)**, **English**, and **Hinglish**.
6. **6 Original Illustrated Companions**:
   - आईसारखी (Motherly warmth)
   - प्रेमळ (Loving & sweet)
   - मजेशीर (Playful with glasses)
   - प्रेरणादायी (Inspiring & encouraging)
   - शांत (Calm & meditative)
   - मित्रासारखी (Bestie & casual)
7. **Predefined Caring Messages**:
   - All 7 core categories enabled by default: Morning (08:30), Food (13:00), Water (16:30), Break (18:00), Sleep (22:30), Self Care, and Motivation.
   - 140+ pre-seeded natural caring messages with message rotation to prevent repetition.
8. **Jivhala Pro Preview (`/pro`)**:
   - Non-intrusive "Coming Soon" preview displaying future lifetime features and ₹20 Lifetime pricing with notification interest signup.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom warm HSL tokens and keyframe animations
- **Database**: PostgreSQL / Neon (Mandatory in production runtime; dev store in local development)
- **Push**: `web-push` npm package with VAPID
- **PWA**: Service Worker (`/public/sw.js`), Web App Manifest (`/public/manifest.webmanifest`)
- **Icons**: Lucide React + custom vector illustrations

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- Node.js 20+ (Node v24 recommended)
- npm 10+

### 2. Install Dependencies
```bash
npm install
```

### 3. VAPID Key Generation
Generate a persistent VAPID key pair using `web-push`:
```bash
npx web-push generate-vapid-keys --json
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the generated VAPID keys:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_VAPID_PUBLIC_KEY=<your_public_key>
VAPID_PRIVATE_KEY=<your_private_key>
VAPID_SUBJECT=mailto:care@jivhala.app
CRON_SECRET=<your_cron_secret>
# DATABASE_URL=postgresql://... (Required in production)
```

> **Note**: `.env.local` is ignored in Git and will never be committed. Do not regenerate keys on every build/deployment.

### 5. Run Locally
```bash
npm run dev
# or for production build testing:
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser or mobile emulator.

---

## 🗄️ Database & Schema

In production (e.g. Vercel), `DATABASE_URL` is **mandatory** and connects to Neon or any PostgreSQL instance with SSL support.

The database tables defined in `src/lib/db/schema.ts` include:
- `users`: For future account creation and Lifetime Pro entitlements.
- `installations`: Tracks anonymous device identities, selected language, avatar, and timezone.
- `avatars`: 6 companion identities and personalities.
- `message_categories`: 7 caring reminder categories.
- `messages`: Multi-language message pool with emotional expressions.
- `installation_message_preferences`: Category enablement toggles.
- `reminders`: Scheduled times, repeat types, and custom reminder messages.
- `push_subscriptions`: Endpoints, `p256dh`, and `auth` credentials.
- `notification_deliveries`: Delivery audit trail and deduplication tracking.
- `notification_responses`: User actions ("completed", "doing_now", "snoozed").
- `pro_interest`: Opt-ins for future Jivhala Pro launch alerts.

---

## ⏰ Notification Scheduler & Cron

Automated reminder processing is handled via `GET` or `POST /api/notifications/process`, secured with `CRON_SECRET`.

To trigger manually:
```bash
curl -X POST "http://localhost:3000/api/notifications/process?secret=<your_cron_secret>"
```

The scheduler:
1. Identifies due reminders based on each user's local timezone.
2. Skips sends during Quiet Hours (11:00 PM – 7:30 AM).
3. Selects an unrepeated message from the category pool.
4. Dispatches the Web Push payload to active subscriptions.
5. Records the delivery in PostgreSQL.

---

## ☁️ Vercel Deployment

1. Push code to your Git repository (e.g. GitHub).
2. Import project into Vercel.
3. Add Environment Variables in Vercel Project Settings:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string (`postgresql://...sslmode=require`).
   - `NEXT_PUBLIC_APP_URL`: Your production domain (e.g. `https://jivhala.app`).
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: The public VAPID key.
   - `VAPID_PRIVATE_KEY`: The private VAPID key.
   - `VAPID_SUBJECT`: `mailto:your-email@domain.com`.
   - `CRON_SECRET`: A secure random secret string.
4. Vercel Cron automatically invokes `/api/notifications/process` every minute per `vercel.json`.

---

## 📱 Platform & Browser Notes

- **Android (Chrome / Edge / Firefox)**: Native Web Push and `beforeinstallprompt` PWA installation work seamlessly.
- **iOS (Safari iOS 16.4+)**: Web Push is supported when Jivhala is added to the Home Screen via Safari's "Add to Home Screen" feature.
- **Desktop (Chrome / Edge / Brave / Safari 16+)**: Supported via standalone PWA window and standard Web Push.
