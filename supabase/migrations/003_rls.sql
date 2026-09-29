-- ========================================================
-- NAMMAMOVE - Migration 003: Row Level Security (RLS)
-- ========================================================

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  current_role user_role;
BEGIN
  SELECT role INTO current_role
  FROM public.profiles
  WHERE auth_user_id = auth.uid();
  
  RETURN (current_role = 'admin' OR current_role = 'staff');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- PROFILES RLS
-- --------------------------------------------------------
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = auth_user_id OR public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = auth_user_id OR public.is_admin());

CREATE POLICY "Allow authenticated profile creation"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- --------------------------------------------------------
-- ADDRESSES RLS
-- --------------------------------------------------------
CREATE POLICY "Users can view own addresses"
  ON public.addresses FOR SELECT
  USING (
    user_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Users can insert own addresses"
  ON public.addresses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own addresses"
  ON public.addresses FOR UPDATE
  USING (
    user_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid())
    OR public.is_admin()
  );

-- --------------------------------------------------------
-- BOOKINGS RLS
-- --------------------------------------------------------
-- Allow anyone (guest or registered) to create a booking
CREATE POLICY "Anyone can insert booking"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Customers can view bookings by customer_id or phone match
CREATE POLICY "Customers and admins can view bookings"
  ON public.bookings FOR SELECT
  USING (
    customer_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid())
    OR customer_phone IN (SELECT phone FROM public.profiles WHERE auth_user_id = auth.uid())
    OR public.is_admin()
  );

-- Admins can update bookings
CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  USING (public.is_admin() OR customer_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid()));

-- --------------------------------------------------------
-- VEHICLES RLS
-- --------------------------------------------------------
CREATE POLICY "Public read vehicles"
  ON public.vehicles FOR SELECT
  USING (true);

CREATE POLICY "Admins manage vehicles"
  ON public.vehicles FOR ALL
  USING (public.is_admin());

-- --------------------------------------------------------
-- DRIVERS RLS
-- --------------------------------------------------------
CREATE POLICY "Public read active drivers"
  ON public.drivers FOR SELECT
  USING (true);

CREATE POLICY "Admins manage drivers"
  ON public.drivers FOR ALL
  USING (public.is_admin());

-- --------------------------------------------------------
-- NOTIFICATIONS RLS
-- --------------------------------------------------------
CREATE POLICY "Users view own notifications"
  ON public.notifications FOR SELECT
  USING (
    customer_id IN (SELECT id FROM public.profiles WHERE auth_user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Admins create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------
-- CONTACT MESSAGES RLS
-- --------------------------------------------------------
CREATE POLICY "Anyone can send contact message"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins view and edit contact messages"
  ON public.contact_messages FOR ALL
  USING (public.is_admin());

-- --------------------------------------------------------
-- AUDIT LOGS RLS
-- --------------------------------------------------------
CREATE POLICY "Admins read audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "System insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- --------------------------------------------------------
-- PRICING & SERVICE AREAS RLS
-- --------------------------------------------------------
CREATE POLICY "Public read pricing config"
  ON public.pricing_config FOR SELECT
  USING (true);

CREATE POLICY "Admins edit pricing config"
  ON public.pricing_config FOR ALL
  USING (public.is_admin());

CREATE POLICY "Public read service areas"
  ON public.service_areas FOR SELECT
  USING (true);

CREATE POLICY "Admins manage service areas"
  ON public.service_areas FOR ALL
  USING (public.is_admin());
