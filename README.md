# NammaMove — End-to-End Logistics & Packers / Movers Platform

NammaMove is a production-ready, full-stack logistics and packers & movers platform designed for South India (covering **Chennai, Bengaluru, Coimbatore, Madurai, Trichy, Salem, Pondicherry, Hyderabad, Kochi**).

Supports:
1. **Customer Web Application** (Next.js 14/15 App Router, TypeScript, Tailwind CSS, Zod, React Hook Form)
2. **Admin Web Dashboard** (`/admin` - Booking dispatch, vehicle & driver assignment, live status updates, manual booking creation, pricing settings)
3. **Customer Mobile Application** (Expo React Native, Expo Router, TypeScript, Android & iOS ready)
4. **Supabase Backend** (PostgreSQL Relational Schema, Row Level Security, Edge Functions, RPC triggers, Seed data)
5. **OTP Verification & WhatsApp Notifications Integration** (Provider abstraction supporting Twilio, MSG91, WhatsApp Cloud API & local mock development mode)

---

## 📁 Repository Architecture

```text
namma-move/
├── apps/
│   ├── web/                     # Next.js 14 App Router Web & Admin App
│   │   ├── app/                 # Routes: /, /booking, /booking/success, /dashboard, /admin, /services, /about, /contact
│   │   ├── components/          # Reusable UI components (GoogleAddressInput, VehicleCard, BookingProgress, PriceEstimator, Navbar, Footer, AdminLayout)
│   │   ├── lib/                 # Supabase client (browser/server/admin), Pricing algorithm, OTP service, Notification service
│   │   └── e2e/                 # Playwright E2E test suite
│   │
│   └── mobile/                  # Expo React Native App (Android & iOS)
│       ├── app/                 # Expo Router screens ((tabs), booking-wizard.tsx)
│       ├── app.json             # Expo App Manifest
│       └── eas.json             # EAS Build Configuration
│
├── packages/
│   ├── types/                   # Shared TypeScript Interfaces (Booking, Profile, Vehicle, Driver, Address, Notification)
│   └── validation/              # Shared Zod Schemas & Indian Phone Normalizer
│
├── supabase/
│   ├── migrations/              # Production PostgreSQL SQL Migrations
│   │   ├── 001_initial_schema.sql # Enum types & core relational tables
│   │   ├── 002_indexes.sql       # FK & performance indexes
│   │   ├── 003_rls.sql           # Row Level Security Policies
│   │   └── 004_functions.sql     # NM-YYYYMMDD-XXXX booking number RPC & triggers
│   ├── seed.sql                 # Development seed data (admin, vehicles, drivers, sample bookings)
│   └── functions/               # Supabase Edge Functions (send-otp, verify-otp, send-whatsapp)
│
├── .env.example                 # Environment variables template
├── package.json                 # Monorepo workspace configuration
└── README.md
```

---

## 🛠️ Requirements

- **Node.js**: v18.0.0 or higher (Tested on Node.js v22)
- **npm**: 10.0+ / 11.0+
- **Supabase Account**: For PostgreSQL database, Auth & Storage
- **Expo CLI**: For mobile development (`npm install -g expo-cli`)

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` inside `apps/web` and root:

```bash
cp .env.example .env
```

Default local development enables **Mock OTP Mode** (`NEXT_PUBLIC_ENABLE_MOCK_OTP=true`). When testing OTP verification locally, enter `123456`.

### 3. Run Web Application

```bash
npm run dev
```

The Web Application will open at **`http://localhost:3000`**.

- Public Web: `http://localhost:3000`
- Multi-step Booking Flow: `http://localhost:3000/booking`
- Customer Dashboard: `http://localhost:3000/dashboard`
- Admin Operations Portal: `http://localhost:3000/admin`

### 4. Run Mobile Application (Expo)

```bash
npm run dev:mobile
```

Scan the QR code with **Expo Go** on Android/iOS or press `a` for Android emulator / `i` for iOS simulator.

---

## 🗄️ Supabase Setup & SQL Migrations

To connect a new Supabase project:

1. Create a new project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase Dashboard.
3. Execute the SQL migration scripts in order from `supabase/migrations/`:
   - `001_initial_schema.sql` (Creates profiles, addresses, vehicles, drivers, bookings, notifications, audit_logs)
   - `002_indexes.sql` (Creates indexes)
   - `003_rls.sql` (Enforces Row Level Security)
   - `004_functions.sql` (Creates auto `NM-YYYYMMDD-XXXX` booking number generation function and triggers)
4. Execute `supabase/seed.sql` to populate sample vehicles, drivers, and initial admin profile (`gokulseenuvasan31@gmail.com`).
5. Copy your project's `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` into your `.env` file.

---

## 📱 Mobile Build & Production Deployment

### Web Deployment (Vercel / Node-compatible Host)

1. Connect your GitHub repository to Vercel.
2. Set Root Directory to `apps/web`.
3. Add Environment Variables from `.env.example`.
4. Point your domain DNS (`nammamove.in`) CNAME / A records to Vercel.

### Mobile App Build (EAS Build)

```bash
# Install EAS CLI
npm install -g eas-cli

# Build Android APK / Bundle
cd apps/mobile
eas build --platform android --profile preview
```

---

## 🧪 Testing & Verification

Run validation and pricing unit tests:

```bash
npm run test
```

Run Playwright End-to-End tests:

```bash
npx playwright test
```

---

## 🔒 Security & Privacy

- **Row Level Security (RLS)** prevents unauthorized cross-customer data access.
- **Service Role Key** is never exposed to browser or client code.
- **Phone Normalization** ensures valid Indian numbers (`+91XXXXXXXXXX`).
