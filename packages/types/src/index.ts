export type UserRole = 'customer' | 'admin' | 'staff';

export type BookingStatus = 
  | 'pending'
  | 'otp_pending'
  | 'confirmed'
  | 'assigned'
  | 'in_transit'
  | 'completed'
  | 'cancelled';

export type PropertyType = 
  | '1 BHK'
  | '2 BHK'
  | '3 BHK'
  | '4 BHK'
  | '5+ BHK'
  | 'Office'
  | 'Shop'
  | 'Other';

export type VehicleType = 
  | 'Eicher Tempo'
  | 'Mini Truck'
  | 'Pickup Truck'
  | 'Large Truck'
  | 'Other';

export type PackingType = 
  | 'Plastic Wrapper'
  | 'Wooden Box'
  | 'Paper Box'
  | 'No Packing'
  | 'Full Packing'
  | 'Partial Packing';

export type ItemType = 
  | 'Household Items'
  | 'Electronics'
  | 'Bike'
  | 'Car'
  | 'Furniture'
  | 'Appliances'
  | 'Office Equipment'
  | 'Other';

export type NotificationChannel = 'whatsapp' | 'sms' | 'email' | 'push';
export type NotificationStatus = 'pending' | 'sent' | 'failed';

export interface Profile {
  id: string;
  auth_user_id?: string | null;
  full_name: string;
  email?: string | null;
  phone: string;
  role: UserRole;
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id?: string | null;
  label?: string | null;
  address_line: string;
  area?: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude?: number | null;
  longitude?: number | null;
  place_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AddressSnapshot {
  address_line: string;
  area?: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude?: number | null;
  longitude?: number | null;
  place_id?: string | null;
  floor?: string | number | null;
  contact_person?: string | null;
  contact_phone?: string | null;
  landmark?: string | null;
  has_lift?: boolean | null;
  parking_access?: 'easy' | 'narrow' | 'far' | null;
}

export type ParkingAccess = 'easy' | 'narrow' | 'far';
export type MoveType = 'within_city' | 'intercity' | 'interstate';

export interface BikeDetails {
  make_model?: string;
  cc_engine?: string;
  is_executable?: boolean;
}

export interface CarDetails {
  make_model?: string;
  car_type?: 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury';
  is_working_condition?: boolean;
}

export interface OfficeDetails {
  workstations_count?: number;
  conference_tables?: number;
  server_racks?: number;
}

export interface Booking {
  id: string;
  booking_number: string;
  customer_id?: string | null;
  customer_name: string;
  customer_email?: string | null;
  customer_phone: string;
  alternate_phone?: string | null;

  pickup_address_id?: string | null;
  drop_address_id?: string | null;

  pickup_address_snapshot: AddressSnapshot;
  drop_address_snapshot: AddressSnapshot;

  pickup_date: string;
  pickup_time: string;

  pickup_floor: string;
  drop_floor: string;

  pickup_city: string;
  drop_city: string;

  vehicle_type: VehicleType;
  property_type: PropertyType;

  packing_type: PackingType[];
  items_type: ItemType[];

  bike_details?: BikeDetails | null;
  car_details?: CarDetails | null;
  office_details?: OfficeDetails | null;

  special_requirements?: string | null;

  distance_km?: number | null;
  estimated_price?: number | null;
  final_price?: number | null;

  status: BookingStatus;
  otp_verified: boolean;

  assigned_vehicle_id?: string | null;
  assigned_driver_id?: string | null;
  driver_name?: string | null;
  driver_phone?: string | null;
  vehicle_number?: string | null;

  admin_notes?: string | null;
  created_by?: string | null;
  created_by_role?: UserRole | null;

  created_at: string;
  updated_at: string;

  move_type?: MoveType | null;
}

export interface Vehicle {
  id: string;
  vehicle_number: string;
  vehicle_type: VehicleType;
  vehicle_model: string;
  capacity_kg?: number | null;
  contact_number?: string | null;
  driver_name?: string | null;
  driver_phone?: string | null;
  is_available: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license_number?: string | null;
  vehicle_id?: string | null;
  is_available: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationRecord {
  id: string;
  booking_id?: string | null;
  customer_id?: string | null;
  channel: NotificationChannel;
  recipient: string;
  title?: string | null;
  message: string;
  status: NotificationStatus;
  sent_at?: string | null;
  error_message?: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  actor_name?: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata?: Record<string, any> | null;
  created_at: string;
}

export interface PricingConfig {
  id: string;
  base_price: number;
  per_km_price: number;
  vehicle_type_multipliers: Record<VehicleType, number>;
  floor_price_per_floor: number;
  packing_type_prices: Record<PackingType, number>;
  city_surcharges: Record<string, number>;
  updated_at: string;
}

export interface ServiceArea {
  id: string;
  city: string;
  state: string;
  is_active: boolean;
  created_at: string;
}
