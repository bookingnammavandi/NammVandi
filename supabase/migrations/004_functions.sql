-- ========================================================
-- NAMMAMOVE - Migration 004: Functions & Triggers
-- ========================================================

-- 1. Auto update updated_at timestamp function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_drivers_updated_at BEFORE UPDATE ON public.drivers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_pricing_updated_at BEFORE UPDATE ON public.pricing_config FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Function to generate unique sequential booking number: NM-YYYYMMDD-XXXX
CREATE OR REPLACE FUNCTION public.generate_booking_number()
RETURNS TEXT AS $$
DECLARE
  date_str TEXT;
  seq_num INT;
  result_booking_num TEXT;
BEGIN
  date_str := to_char(now(), 'YYYYMMDD');
  
  -- Count bookings created today + 1
  SELECT COUNT(*) + 1 INTO seq_num
  FROM public.bookings
  WHERE to_char(created_at, 'YYYYMMDD') = date_str;

  result_booking_num := 'NM-' || date_str || '-' || lpad(seq_num::text, 4, '0');

  -- Ensure uniqueness in case of race conditions
  WHILE EXISTS (SELECT 1 FROM public.bookings WHERE booking_number = result_booking_num) LOOP
    seq_num := seq_num + 1;
    result_booking_num := 'NM-' || date_str || '-' || lpad(seq_num::text, 4, '0');
  END LOOP;

  RETURN result_booking_num;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set booking_number before insert if missing
CREATE OR REPLACE FUNCTION public.set_booking_number_trigger()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_number IS NULL OR NEW.booking_number = '' THEN
    NEW.booking_number := public.generate_booking_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_booking_number
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_booking_number_trigger();

-- 3. Function to handle profile auto-creation on Auth Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (auth_user_id, full_name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'NammaMove Customer'),
    NEW.email,
    COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer')
  )
  ON CONFLICT (phone) DO UPDATE
  SET auth_user_id = EXCLUDED.auth_user_id,
      email = COALESCE(EXCLUDED.email, public.profiles.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Audit Log Trigger for Bookings
CREATE OR REPLACE FUNCTION public.audit_booking_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    IF OLD.status IS DISTINCT FROM NEW.status OR OLD.assigned_vehicle_id IS DISTINCT FROM NEW.assigned_vehicle_id THEN
      INSERT INTO public.audit_logs (actor_name, action, entity_type, entity_id, metadata)
      VALUES (
        'System/Admin',
        'UPDATE_BOOKING_STATUS',
        'booking',
        NEW.id::text,
        jsonb_build_object(
          'old_status', OLD.status,
          'new_status', NEW.status,
          'assigned_vehicle', NEW.vehicle_number,
          'driver_name', NEW.driver_name
        )
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_audit_booking_changes
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_booking_changes();
