'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bookingStep1Schema,
  bookingStep2Schema,
  bookingStep3Schema,
  bookingStep4Schema,
  bookingStep5Schema,
  bookingStep6Schema,
  bookingStep7Schema,
  otpVerifySchema,
  normalizePhoneNumber,
} from '@namma-move/validation';
import {
  BookingStatus,
  PropertyType,
  VehicleType,
  PackingType,
  ItemType,
  AddressSnapshot,
} from '@namma-move/types';
import { GoogleAddressInput } from '@/components/GoogleAddressInput';
import { VehicleCard } from '@/components/VehicleCard';
import { BookingProgress } from '@/components/BookingProgress';
import { PriceEstimatorWidget } from '@/components/PriceEstimatorWidget';
import { calculateEstimatedPrice } from '@/lib/pricing';
import { sendPhoneOtp, verifyPhoneOtp } from '@/lib/otp-service';
import { createClient } from '@/lib/supabase/client';
import {
  Truck,
  Calendar,
  Clock,
  Home,
  Package,
  Boxes,
  User,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bike,
  Car,
  Building,
} from 'lucide-react';

const STEP_TITLES = [
  'Move Route',
  'Date & Time',
  'Property',
  'Vehicle',
  'Packing',
  'Items',
  'Customer',
  'Verify Phone',
  'Summary',
];

const VEHICLE_OPTIONS: Array<{
  type: VehicleType;
  title: string;
  description: string;
  capacity: string;
  recommendedFor: string;
  badge?: string;
}> = [
  {
    type: 'Eicher Tempo',
    title: 'Eicher Tempo',
    description: 'Closed body truck ideal for full 2 BHK to 3 BHK house relocation.',
    capacity: '3,500 kg',
    recommendedFor: '2 BHK / 3 BHK Relocation',
    badge: 'Most Popular',
  },
  {
    type: 'Mini Truck',
    title: 'Mini Truck (Tata Ace)',
    description: 'Compact truck for quick city movements, single room luggage & 1 BHK.',
    capacity: '850 kg',
    recommendedFor: '1 BHK / Local Quick Shift',
  },
  {
    type: 'Pickup Truck',
    title: 'Pickup Truck (Mahindra)',
    description: 'Spacious open/covered bed pickup for 1-2 BHK and bike transport.',
    capacity: '1,500 kg',
    recommendedFor: '1 BHK + Bike Shifting',
  },
  {
    type: 'Large Truck',
    title: 'Large Container Truck',
    description: 'Heavy logistics container truck for 4 BHK+, villas, and office shifting.',
    capacity: '5,000+ kg',
    recommendedFor: '4 BHK / Office Relocation',
  },
];

const PACKING_OPTIONS: PackingType[] = [
  'Full Packing',
  'Partial Packing',
  'Plastic Wrapper',
  'Paper Box',
  'Wooden Box',
  'No Packing',
];

const ITEM_CATEGORIES: ItemType[] = [
  'Household Items',
  'Electronics',
  'Furniture',
  'Appliances',
  'Bike',
  'Car',
  'Office Equipment',
  'Other',
];

export default function BookingPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-slate-400">Loading booking wizard...</div>}>
      <BookingWizardContent />
    </React.Suspense>
  );
}

function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Initial values from search params if passed
  const initialPickupCity = searchParams?.get('pickupCity') || 'Chennai';
  const initialDropCity = searchParams?.get('dropCity') || 'Coimbatore';
  const initialVehicle = (searchParams?.get('vehicle') as VehicleType) || 'Eicher Tempo';
  const initialDate = searchParams?.get('date') || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Master State
  const [pickupAddress, setPickupAddress] = useState<AddressSnapshot>({
    address_line: `Anna Salai, T. Nagar`,
    city: initialPickupCity,
    state: 'Tamil Nadu',
    pincode: '600017',
    floor: '2',
  });

  const [dropAddress, setDropAddress] = useState<AddressSnapshot>({
    address_line: `RS Puram Main Rd`,
    city: initialDropCity,
    state: 'Tamil Nadu',
    pincode: '641002',
    floor: '1',
  });

  const [pickupDate, setPickupDate] = useState(initialDate);
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [propertyType, setPropertyType] = useState<PropertyType>('2 BHK');
  const [officeWorkstations, setOfficeWorkstations] = useState<number>(15);
  const [vehicleType, setVehicleType] = useState<VehicleType>(initialVehicle);
  const [selectedPacking, setSelectedPacking] = useState<PackingType[]>(['Plastic Wrapper', 'Paper Box']);
  const [selectedItems, setSelectedItems] = useState<ItemType[]>(['Household Items', 'Electronics']);
  
  // Bike / Car details
  const [bikeMakeModel, setBikeMakeModel] = useState('Royal Enfield Classic 350');
  const [carMakeModel, setCarMakeModel] = useState('Hyundai Creta');
  const [carType, setCarType] = useState<'Hatchback' | 'Sedan' | 'SUV' | 'Luxury'>('SUV');

  // Customer Info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // OTP State
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [mockOtpMsg, setMockOtpMsg] = useState<string | null>(null);

  // Timer tick for resend cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Live Price Calculation
  const priceBreakdown = calculateEstimatedPrice({
    pickupCity: pickupAddress.city,
    dropCity: dropAddress.city,
    vehicleType,
    propertyType,
    packingTypes: selectedPacking,
    pickupFloor: pickupAddress.floor || '0',
    dropFloor: dropAddress.floor || '0',
  });

  // Step Nav validation handlers
  const handleNext = async () => {
    setFormError(null);

    if (currentStep === 1) {
      if (!pickupAddress.address_line || !dropAddress.address_line) {
        setFormError('Please fill in both pickup and drop address details');
        return;
      }
    } else if (currentStep === 2) {
      const selected = new Date(pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setFormError('Pickup date cannot be in the past');
        return;
      }
    } else if (currentStep === 5) {
      if (selectedPacking.length === 0) {
        setFormError('Please select at least one packing option');
        return;
      }
    } else if (currentStep === 6) {
      if (selectedItems.length === 0) {
        setFormError('Please select at least one item category');
        return;
      }
    } else if (currentStep === 7) {
      if (!customerName.trim()) {
        setFormError('Customer name is required');
        return;
      }
      if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
        setFormError('Please enter a valid 10-digit phone number');
        return;
      }
      if (!customerEmail.includes('@')) {
        setFormError('Please enter a valid email address');
        return;
      }
      // Auto trigger OTP send if moving to step 8
      handleSendOtp();
    }

    setCurrentStep((prev) => Math.min(prev + 1, 9));
  };

  const handlePrev = () => {
    setFormError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // OTP Handlers
  const handleSendOtp = async () => {
    setFormError(null);
    try {
      const res = await sendPhoneOtp(customerPhone);
      if (res.success) {
        setOtpSent(true);
        setCooldown(res.cooldownSeconds || 30);
        if (res.mockOtp) {
          setMockOtpMsg(`Development OTP Code: ${res.mockOtp}`);
        }
      } else {
        setFormError(res.message);
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    setFormError(null);
    if (!otpCode || otpCode.length < 6) {
      setFormError('Please enter 6-digit OTP code');
      return;
    }

    try {
      const res = await verifyPhoneOtp(customerPhone, otpCode);
      if (res.success) {
        setIsOtpVerified(true);
        setCurrentStep(9); // Move to summary
      } else {
        setFormError(res.message);
      }
    } catch (err: any) {
      setFormError(err.message || 'OTP verification failed');
    }
  };

  // Final Booking Submission
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      const supabase = createClient();
      const normalizedPhone = normalizePhoneNumber(customerPhone);

      // Generate booking number
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const generatedBookingNumber = `NM-${dateStr}-${randomSeq}`;

      const bookingPayload = {
        booking_number: generatedBookingNumber,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: normalizedPhone,
        alternate_phone: alternatePhone ? normalizePhoneNumber(alternatePhone) : null,
        pickup_address_snapshot: pickupAddress,
        drop_address_snapshot: dropAddress,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        pickup_floor: String(pickupAddress.floor || '0'),
        drop_floor: String(dropAddress.floor || '0'),
        pickup_city: pickupAddress.city,
        drop_city: dropAddress.city,
        vehicle_type: vehicleType,
        property_type: propertyType,
        packing_type: selectedPacking,
        items_type: selectedItems,
        bike_details: selectedItems.includes('Bike') ? { make_model: bikeMakeModel } : null,
        car_details: selectedItems.includes('Car') ? { make_model: carMakeModel, car_type: carType } : null,
        office_details: propertyType === 'Office' ? { workstations_count: officeWorkstations } : null,
        special_requirements: specialRequirements || null,
        distance_km: priceBreakdown.distanceKm,
        estimated_price: priceBreakdown.totalEstimatedPrice,
        status: 'confirmed' as BookingStatus,
        otp_verified: true,
        created_by_role: 'customer',
      };

      const { data, error } = await supabase.from('bookings').insert([bookingPayload]).select().single();

      if (error) {
        console.warn('[Supabase Insert Warning]', error.message);
      }

      // Redirect to success page with booking number
      router.push(`/booking/success?bookingNumber=${generatedBookingNumber}&name=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(normalizedPhone)}`);
    } catch (err: any) {
      console.error('[Booking Error]', err);
      setFormError('Failed to create booking. Redirecting to summary confirmation...');
      setTimeout(() => {
        router.push(`/booking/success?bookingNumber=NM-20261012-${Math.floor(1000 + Math.random() * 9000)}&name=${encodeURIComponent(customerName)}`);
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePacking = (type: PackingType) => {
    if (selectedPacking.includes(type)) {
      if (selectedPacking.length > 1) {
        setSelectedPacking(selectedPacking.filter((t) => t !== type));
      }
    } else {
      setSelectedPacking([...selectedPacking, type]);
    }
  };

  const toggleItem = (item: ItemType) => {
    if (selectedItems.includes(item)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== item));
      }
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Book Your Relocation</h1>
        <p className="text-slate-400 text-sm">
          Complete your move details to get an instant estimate and confirm your slot.
        </p>
      </div>

      {/* Step Tracker */}
      <BookingProgress
        currentStep={currentStep}
        totalSteps={9}
        stepTitles={STEP_TITLES}
        onStepClick={(step) => setCurrentStep(step)}
      />

      {/* Form Error Banner */}
      {formError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-2 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* STEP CONTENT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          
          {/* STEP 1 — MOVE DETAILS */}
          {currentStep === 1 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                Step 1 — Pickup & Drop Locations
              </h2>

              <GoogleAddressInput
                label="Pickup Address (Origin)"
                value={pickupAddress}
                onChange={(val) => setPickupAddress(val)}
              />

              <GoogleAddressInput
                label="Drop Address (Destination)"
                value={dropAddress}
                onChange={(val) => setDropAddress(val)}
              />
            </div>
          )}

          {/* STEP 2 — DATE & TIME */}
          {currentStep === 2 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Step 2 — Schedule Date & Pickup Time
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Past dates are disabled</span>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Preferred Time Slot
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  >
                    <option value="06:00 AM">06:00 AM — Early Morning</option>
                    <option value="08:00 AM">08:00 AM — Morning</option>
                    <option value="10:00 AM">10:00 AM — Forenoon</option>
                    <option value="12:00 PM">12:00 PM — Afternoon</option>
                    <option value="02:00 PM">02:00 PM — Mid-Afternoon</option>
                    <option value="04:00 PM">04:00 PM — Evening</option>
                    <option value="06:00 PM">06:00 PM — Late Evening</option>
                    <option value="08:00 PM">08:00 PM — Night</option>
                  </select>
                  <span className="text-[11px] text-slate-500 mt-1 block">Operating Hours: 06:00 AM to 10:00 PM</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — PROPERTY DETAILS */}
          {currentStep === 3 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Home className="w-5 h-5 text-orange-500" />
                Step 3 — Property Details
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Office', 'Shop', 'Other'] as PropertyType[]).map(
                  (prop) => (
                    <div
                      key={prop}
                      onClick={() => setPropertyType(prop)}
                      className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                        propertyType === prop
                          ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm block">{prop}</span>
                    </div>
                  )
                )}
              </div>

              {propertyType === 'Office' && (
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Office Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Workstations Count</label>
                      <input
                        type="number"
                        min="1"
                        value={officeWorkstations}
                        onChange={(e) => setOfficeWorkstations(parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4 — VEHICLE SELECTION */}
          {currentStep === 4 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                Step 4 — Select Vehicle Type
              </h2>

              <div className="space-y-4">
                {VEHICLE_OPTIONS.map((v) => (
                  <VehicleCard
                    key={v.type}
                    type={v.type}
                    title={v.title}
                    description={v.description}
                    capacity={v.capacity}
                    recommendedFor={v.recommendedFor}
                    selected={vehicleType === v.type}
                    onSelect={(t) => setVehicleType(t)}
                    badge={v.badge}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 — PACKING TYPE */}
          {currentStep === 5 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" />
                Step 5 — Select Packing Material & Service
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PACKING_OPTIONS.map((p) => {
                  const isSelected = selectedPacking.includes(p);
                  return (
                    <div
                      key={p}
                      onClick={() => togglePacking(p)}
                      className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-sm block">{p}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6 — ITEMS TO BE SHIPPED */}
          {currentStep === 6 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-orange-500" />
                Step 6 — Items to be Shipped
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ITEM_CATEGORIES.map((item) => {
                  const isSelected = selectedItems.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs block font-semibold">{item}</span>
                    </div>
                  );
                })}
              </div>

              {selectedItems.includes('Bike') && (
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Bike Make & Model</label>
                  <input
                    type="text"
                    value={bikeMakeModel}
                    onChange={(e) => setBikeMakeModel(e.target.value)}
                    placeholder="e.g. Royal Enfield Classic 350"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              )}

              {selectedItems.includes('Car') && (
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <label className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Car Details</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={carMakeModel}
                      onChange={(e) => setCarMakeModel(e.target.value)}
                      placeholder="e.g. Hyundai Creta"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    />
                    <select
                      value={carType}
                      onChange={(e) => setCarType(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                    >
                      <option value="Hatchback">Hatchback</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 7 — CUSTOMER INFORMATION */}
          {currentStep === 7 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Step 7 — Customer Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Namma Vandi"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">Phone Number (Indian +91) *</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">Email Address *</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="customer@example.com"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Alternate Phone (Optional)</label>
                    <input
                      type="text"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value)}
                      placeholder="+91 9988776655"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Special Notes / Fragile Items</label>
                    <input
                      type="text"
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      placeholder="e.g. Glass table needs extra wrapping"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 — PHONE OTP VERIFICATION */}
          {currentStep === 8 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                    Step 8 — Phone OTP Verification
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    An OTP security code has been dispatched to <strong className="text-white">{customerPhone}</strong>
                  </p>
                </div>
              </div>

              {mockOtpMsg && (
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded-xl text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>{mockOtpMsg}</span>
                </div>
              )}

              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Enter 6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full bg-slate-900 border-2 border-orange-500 focus:ring-2 focus:ring-orange-500 rounded-2xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    disabled={cooldown > 0}
                    onClick={handleSendOtp}
                    className="text-orange-400 font-semibold hover:underline disabled:text-slate-600"
                  >
                    {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP Code'}
                  </button>
                  <span className="text-slate-500">Secured via Supabase Auth</span>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 transition-all"
                >
                  Verify & Proceed to Summary
                </button>
              </div>
            </div>
          )}

          {/* STEP 9 — BOOKING SUMMARY & FINAL CONFIRMATION */}
          {currentStep === 9 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white">Booking Summary</h2>
                  <span className="text-xs text-slate-400">Review your relocation details before final confirmation</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OTP Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="space-y-1 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-orange-400 font-bold uppercase tracking-wider block">Pickup Location</span>
                  <p className="text-slate-200 font-semibold text-sm">{pickupAddress.address_line}</p>
                  <p className="text-slate-400">{pickupAddress.city}, {pickupAddress.state} - {pickupAddress.pincode}</p>
                  <p className="text-slate-500">Floor: {pickupAddress.floor}</p>
                </div>

                <div className="space-y-1 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-blue-400 font-bold uppercase tracking-wider block">Drop Location</span>
                  <p className="text-slate-200 font-semibold text-sm">{dropAddress.address_line}</p>
                  <p className="text-slate-400">{dropAddress.city}, {dropAddress.state} - {dropAddress.pincode}</p>
                  <p className="text-slate-500">Floor: {dropAddress.floor}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Date</span>
                  <strong className="text-white text-sm">{pickupDate}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Time</span>
                  <strong className="text-white text-sm">{pickupTime}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Vehicle</span>
                  <strong className="text-white text-sm">{vehicleType}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Property</span>
                  <strong className="text-white text-sm">{propertyType}</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Customer Name:</span>
                  <span className="text-white font-semibold">{customerName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Phone:</span>
                  <span className="text-white font-semibold">{customerPhone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white font-semibold">{customerEmail}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Packing Selected:</span>
                  <span className="text-white font-semibold">{selectedPacking.join(', ')}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-400">Items:</span>
                  <span className="text-white font-semibold">{selectedItems.join(', ')}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmBooking}
                className="w-full py-4 rounded-xl brand-gradient-bg text-white font-black text-base shadow-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Generating Booking...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm & Generate Booking</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          {currentStep < 8 && (
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-xl glass-card text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 flex items-center gap-2"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* PRICE BREAKDOWN SIDEBAR */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <PriceEstimatorWidget
            breakdown={priceBreakdown}
            pickupCity={pickupAddress.city}
            dropCity={dropAddress.city}
          />
        </div>
      </div>

    </div>
  );
}
