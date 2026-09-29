-- ========================================================
-- NAMMAMOVE - Seed Data
-- ========================================================

-- 1. Service Areas
INSERT INTO public.service_areas (city, state, is_active) VALUES
  ('Chennai', 'Tamil Nadu', true),
  ('Coimbatore', 'Tamil Nadu', true),
  ('Bengaluru', 'Karnataka', true),
  ('Madurai', 'Tamil Nadu', true),
  ('Trichy', 'Tamil Nadu', true),
  ('Salem', 'Tamil Nadu', true),
  ('Pondicherry', 'Puducherry', true),
  ('Hyderabad', 'Telangana', true),
  ('Kochi', 'Kerala', true)
ON CONFLICT (city) DO NOTHING;

-- 2. Initial Admin Profile
INSERT INTO public.profiles (id, full_name, email, phone, role, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Gokul Seenuvasan',
  'gokulseenuvasan31@gmail.com',
  '+919876543210',
  'admin',
  true
) ON CONFLICT (phone) DO UPDATE SET role = 'admin', email = 'gokulseenuvasan31@gmail.com';

-- 3. Vehicles
INSERT INTO public.vehicles (id, vehicle_number, vehicle_type, vehicle_model, capacity_kg, contact_number, driver_name, driver_phone, is_available, is_active) VALUES
  ('11111111-1111-1111-1111-111111111111', 'TN 01 AB 1234', 'Eicher Tempo', 'Eicher Pro 2059', 3500, '+919876512345', 'Rajesh Kumar', '+919876512345', true, true),
  ('22222222-2222-2222-2222-222222222222', 'TN 02 CD 5678', 'Mini Truck', 'Tata Ace Gold', 850, '+919876523456', 'Senthil Nathan', '+919876523456', true, true),
  ('33333333-3333-3333-3333-333333333333', 'TN 03 EF 9012', 'Pickup Truck', 'Mahindra Bolero Pickup', 1500, '+919876534567', 'Karthik Murugan', '+919876534567', true, true),
  ('44444444-4444-4444-4444-444444444444', 'TN 04 GH 3456', 'Large Truck', 'Ashok Leyland Dost', 5000, '+919876545678', 'Manikandan V', '+919876545678', true, true)
ON CONFLICT (vehicle_number) DO NOTHING;

-- 4. Drivers
INSERT INTO public.drivers (id, name, phone, license_number, vehicle_id, is_available, is_active) VALUES
  ('55555555-5555-5555-5555-555555555555', 'Rajesh Kumar', '+919876512345', 'TN-01-2018-009876', '11111111-1111-1111-1111-111111111111', true, true),
  ('66666666-6666-6666-6666-666666666666', 'Senthil Nathan', '+919876523456', 'TN-02-2019-005432', '22222222-2222-2222-2222-222222222222', true, true),
  ('77777777-7777-7777-7777-777777777777', 'Karthik Murugan', '+919876534567', 'TN-03-2020-001234', '33333333-3333-3333-3333-333333333333', true, true)
ON CONFLICT (phone) DO NOTHING;

-- 5. Pricing Configuration
INSERT INTO public.pricing_config (id, base_price, per_km_price, vehicle_type_multipliers, floor_price_per_floor, packing_type_prices) VALUES
(
  '88888888-8888-8888-8888-888888888888',
  1500.00,
  40.00,
  '{"Mini Truck": 1.0, "Pickup Truck": 1.3, "Eicher Tempo": 1.7, "Large Truck": 2.5, "Other": 1.2}'::jsonb,
  250.00,
  '{"No Packing": 0, "Plastic Wrapper": 400, "Paper Box": 500, "Wooden Box": 1000, "Partial Packing": 800, "Full Packing": 1800}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 6. Sample Bookings
INSERT INTO public.bookings (
  id, booking_number, customer_name, customer_email, customer_phone,
  pickup_address_snapshot, drop_address_snapshot,
  pickup_date, pickup_time, pickup_floor, drop_floor,
  pickup_city, drop_city, vehicle_type, property_type,
  packing_type, items_type, distance_km, estimated_price, final_price, status, otp_verified,
  assigned_vehicle_id, assigned_driver_id, driver_name, driver_phone, vehicle_number
) VALUES
(
  'a1111111-1111-1111-1111-111111111111',
  'NM-20261012-0001',
  'Arun Vijay',
  'arun.v@example.com',
  '+919812345678',
  '{"address_line": "12, Anna Salai, T. Nagar", "city": "Chennai", "state": "Tamil Nadu", "pincode": "600017", "floor": "2"}'::jsonb,
  '{"address_line": "45, RS Puram Main Rd", "city": "Coimbatore", "state": "Tamil Nadu", "pincode": "641002", "floor": "1"}'::jsonb,
  '2026-10-12', '10:00 AM', '2', '1',
  'Chennai', 'Coimbatore', 'Eicher Tempo', '2 BHK',
  ARRAY['Plastic Wrapper', 'Paper Box'], ARRAY['Household Items', 'Electronics', 'Furniture'],
  500.00, 24500.00, 24000.00, 'assigned', true,
  '11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555',
  'Rajesh Kumar', '+919876512345', 'TN 01 AB 1234'
),
(
  'b2222222-2222-2222-2222-222222222222',
  'NM-20261015-0002',
  'Priya Sharma',
  'priya.s@example.com',
  '+919823456789',
  '{"address_line": "88, Indiranagar 100ft Rd", "city": "Bengaluru", "state": "Karnataka", "pincode": "560038", "floor": "0"}'::jsonb,
  '{"address_line": "104, Koramangala 4th Block", "city": "Bengaluru", "state": "Karnataka", "pincode": "560034", "floor": "3"}'::jsonb,
  '2026-10-15', '08:30 AM', '0', '3',
  'Bengaluru', 'Bengaluru', 'Mini Truck', '1 BHK',
  ARRAY['Full Packing'], ARRAY['Household Items', 'Appliances'],
  12.50, 3200.00, 3200.00, 'confirmed', true,
  NULL, NULL, NULL, NULL, NULL
),
(
  'c3333333-3333-3333-3333-333333333333',
  'NM-20261020-0003',
  'Deepak Raj',
  'deepak.r@example.com',
  '+919834567890',
  '{"address_line": "15, KK Nagar 7th St", "city": "Madurai", "state": "Tamil Nadu", "pincode": "625020", "floor": "1"}'::jsonb,
  '{"address_line": "72, Cantonment Rd", "city": "Trichy", "state": "Tamil Nadu", "pincode": "620001", "floor": "2"}'::jsonb,
  '2026-10-20', '02:00 PM', '1', '2',
  'Madurai', 'Trichy', 'Pickup Truck', '3 BHK',
  ARRAY['Wooden Box', 'Plastic Wrapper'], ARRAY['Household Items', 'Bike', 'Electronics'],
  135.00, 9800.00, NULL, 'pending', false,
  NULL, NULL, NULL, NULL, NULL
)
ON CONFLICT (booking_number) DO NOTHING;

-- 7. Sample Contact Messages
INSERT INTO public.contact_messages (name, email, phone, subject, message, status) VALUES
  ('Kavitha Sundaram', 'kavitha@example.com', '+919944556677', 'House Shifting Enquiry', 'Hi, I want to relocate a 3 BHK house from Chennai to Salem next month. Please provide a quote.', 'unread'),
  ('Sanjay Raman', 'sanjay@example.com', '+919955667788', 'Office Relocation', 'We are shifting our 40-workstation office in Indiranagar Bengaluru. Do you provide packing material?', 'read')
ON CONFLICT DO NOTHING;
