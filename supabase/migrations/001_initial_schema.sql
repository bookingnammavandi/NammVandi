-- ========================================================
-- NAMMAMOVE - Migration 001: Initial Schema
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enum Types
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'staff');

CREATE TYPE booking_status AS ENUM (
  'pending',
  'otp_pending',
  'confirmed',
  'assigned',
  'in_transit',
  'completed',
  'cancelled'
);

CREATE TYPE vehicle_type AS ENUM (
  'Eicher Tempo',
  'Mini Truck',
  'Pickup Truck',
  'Large Truck',
  'Other'
);

CREATE TYPE property_type AS ENUM (
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  '5+ BHK',
  'Office',
  'Shop',
  'Other'
);

CREATE TYPE packing_type AS ENUM (
  'Plastic Wrapper',
  'Wooden Box',
  'Paper Box',
  'No Packing',
  'Full Packing',
  'Partial Packing'
);

CREATE TYPE item_type AS ENUM (
  'Household Items',
  'Electronics',
  'Bike',
  'Car',
  'Furniture',
  'Appliances',
  'Office Equipment',
  'Other'
);

CREATE TYPE notification_channel AS ENUM ('whatsapp', 'sms', 'email', 'push');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed');

-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Addresses Table
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  label TEXT,
  address_line TEXT NOT NULL,
  area TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  place_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Vehicles Table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_number TEXT NOT NULL UNIQUE,
  vehicle_type vehicle_type NOT NULL,
  vehicle_model TEXT NOT NULL,
  capacity_kg INT,
  contact_number TEXT,
  driver_name TEXT,
  driver_phone TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Drivers Table
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  license_number TEXT,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Bookings Table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  alternate_phone TEXT,

  pickup_address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
  drop_address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,

  pickup_address_snapshot JSONB NOT NULL,
  drop_address_snapshot JSONB NOT NULL,

  pickup_date DATE NOT NULL,
  pickup_time TEXT NOT NULL,

  pickup_floor TEXT NOT NULL DEFAULT '0',
  drop_floor TEXT NOT NULL DEFAULT '0',

  pickup_city TEXT NOT NULL,
  drop_city TEXT NOT NULL,

  vehicle_type vehicle_type NOT NULL,
  property_type property_type NOT NULL,

  packing_type TEXT[] NOT NULL DEFAULT '{}',
  items_type TEXT[] NOT NULL DEFAULT '{}',

  bike_details JSONB,
  car_details JSONB,
  office_details JSONB,

  special_requirements TEXT,

  distance_km NUMERIC(10,2),
  estimated_price NUMERIC(10,2),
  final_price NUMERIC(10,2),

  status booking_status NOT NULL DEFAULT 'pending',
  otp_verified BOOLEAN NOT NULL DEFAULT false,

  assigned_vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  assigned_driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
  driver_name TEXT,
  driver_phone TEXT,
  vehicle_number TEXT,

  admin_notes TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_by_role user_role DEFAULT 'customer',

  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Notifications Table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  channel notification_channel NOT NULL,
  recipient TEXT NOT NULL,
  title TEXT,
  message TEXT NOT NULL,
  status notification_status NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Contact Messages Table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Audit Logs Table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  actor_name TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Pricing Config Table
CREATE TABLE public.pricing_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  base_price NUMERIC(10,2) NOT NULL DEFAULT 1500.00,
  per_km_price NUMERIC(10,2) NOT NULL DEFAULT 40.00,
  vehicle_type_multipliers JSONB NOT NULL DEFAULT '{"Eicher Tempo": 1.5, "Mini Truck": 1.0, "Pickup Truck": 1.2, "Large Truck": 2.2, "Other": 1.0}'::jsonb,
  floor_price_per_floor NUMERIC(10,2) NOT NULL DEFAULT 200.00,
  packing_type_prices JSONB NOT NULL DEFAULT '{"Plastic Wrapper": 300, "Wooden Box": 800, "Paper Box": 400, "No Packing": 0, "Full Packing": 1500, "Partial Packing": 700}'::jsonb,
  city_surcharges JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Service Areas Table
CREATE TABLE public.service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
