import { z } from 'zod';

export const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

export function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  return phone;
}

export const indianPhoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Invalid phone number format')
  .refine(
    (val) => {
      const clean = val.replace(/[\s\-]/g, '');
      return phoneRegex.test(clean);
    },
    { message: 'Please enter a valid 10-digit Indian phone number' }
  );

export const addressSnapshotSchema = z.object({
  address_line: z.string().min(5, 'Address must be at least 5 characters'),
  area: z.string().optional().nullable(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  place_id: z.string().optional().nullable(),
  floor: z.string().default('0'),
  contact_person: z.string().optional().nullable(),
  contact_phone: z.string().optional().nullable(),
});

export const propertyTypeEnum = z.enum([
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  '5+ BHK',
  'Office',
  'Shop',
  'Other',
]);

export const vehicleTypeEnum = z.enum([
  'Eicher Tempo',
  'Mini Truck',
  'Pickup Truck',
  'Large Truck',
  'Other',
]);

export const packingTypeEnum = z.enum([
  'Plastic Wrapper',
  'Wooden Box',
  'Paper Box',
  'No Packing',
  'Full Packing',
  'Partial Packing',
]);

export const itemTypeEnum = z.enum([
  'Household Items',
  'Electronics',
  'Bike',
  'Car',
  'Furniture',
  'Appliances',
  'Office Equipment',
  'Other',
]);

export const bookingStep1Schema = z.object({
  pickup_address: addressSnapshotSchema,
  drop_address: addressSnapshotSchema,
  pickup_floor: z.string().min(1, 'Pickup floor is required'),
  drop_floor: z.string().min(1, 'Drop floor is required'),
});

export const bookingStep2Schema = z.object({
  pickup_date: z
    .string()
    .min(1, 'Pickup date is required')
    .refine(
      (val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(val);
        return selected >= today;
      },
      { message: 'Pickup date cannot be in the past' }
    ),
  pickup_time: z.string().min(1, 'Pickup time is required'),
});

export const bookingStep3Schema = z.object({
  property_type: propertyTypeEnum,
  office_workstations: z.number().optional(),
  office_conference_tables: z.number().optional(),
});

export const bookingStep4Schema = z.object({
  vehicle_type: vehicleTypeEnum,
});

export const bookingStep5Schema = z.object({
  packing_type: z.array(packingTypeEnum).min(1, 'Select at least one packing option'),
});

export const bookingStep6Schema = z.object({
  items_type: z.array(itemTypeEnum).min(1, 'Select at least one item category'),
  bike_details: z
    .object({
      make_model: z.string().optional(),
      cc_engine: z.string().optional(),
    })
    .optional(),
  car_details: z
    .object({
      make_model: z.string().optional(),
      car_type: z.enum(['Hatchback', 'Sedan', 'SUV', 'Luxury']).optional(),
    })
    .optional(),
});

export const bookingStep7Schema = z.object({
  customer_name: z.string().min(2, 'Full name is required'),
  customer_phone: indianPhoneSchema,
  customer_email: z.string().email('Please enter a valid email address'),
  alternate_phone: z.string().optional().nullable(),
  special_requirements: z.string().optional().nullable(),
});

export const otpVerifySchema = z.object({
  phone: indianPhoneSchema,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const completeBookingSchema = bookingStep1Schema
  .merge(bookingStep2Schema)
  .merge(bookingStep3Schema)
  .merge(bookingStep4Schema)
  .merge(bookingStep5Schema)
  .merge(bookingStep6Schema)
  .merge(bookingStep7Schema);

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: indianPhoneSchema,
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const vehicleFormSchema = z.object({
  vehicle_number: z.string().min(4, 'Vehicle number is required'),
  vehicle_type: vehicleTypeEnum,
  vehicle_model: z.string().min(2, 'Vehicle model is required'),
  capacity_kg: z.number().optional().nullable(),
  contact_number: z.string().optional().nullable(),
  driver_name: z.string().optional().nullable(),
  driver_phone: z.string().optional().nullable(),
  is_available: z.boolean().default(true),
  is_active: z.boolean().default(true),
});

export const driverFormSchema = z.object({
  name: z.string().min(2, 'Driver name is required'),
  phone: indianPhoneSchema,
  license_number: z.string().optional().nullable(),
  vehicle_id: z.string().optional().nullable(),
  is_available: z.boolean().default(true),
  is_active: z.boolean().default(true),
});

export const assignVehicleSchema = z.object({
  booking_id: z.string().min(1, 'Booking ID is required'),
  assigned_vehicle_id: z.string().min(1, 'Vehicle is required'),
  vehicle_number: z.string().min(1, 'Vehicle number is required'),
  assigned_driver_id: z.string().optional().nullable(),
  driver_name: z.string().min(2, 'Driver name is required'),
  driver_phone: indianPhoneSchema,
  send_notification: z.boolean().default(true),
});
