-- ========================================================
-- NAMMAMOVE - Migration 002: Indexes for Performance
-- ========================================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_auth_user_id ON public.profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Addresses indexes
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_city ON public.addresses(city);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_booking_number ON public.bookings(booking_number);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_phone ON public.bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON public.bookings(pickup_date);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_city ON public.bookings(pickup_city);
CREATE INDEX IF NOT EXISTS idx_bookings_drop_city ON public.bookings(drop_city);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- Vehicles & Drivers indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_vehicle_type ON public.vehicles(vehicle_type);
CREATE INDEX IF NOT EXISTS idx_vehicles_is_available ON public.vehicles(is_available);
CREATE INDEX IF NOT EXISTS idx_drivers_vehicle_id ON public.drivers(vehicle_id);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_booking_id ON public.notifications(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_customer_id ON public.notifications(customer_id);

-- Audit Logs indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_id ON public.audit_logs(entity_id);
