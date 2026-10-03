// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   bookingStep1Schema,
//   bookingStep2Schema,
//   bookingStep3Schema,
//   bookingStep4Schema,
//   bookingStep5Schema,
//   bookingStep6Schema,
//   bookingStep7Schema,
//   otpVerifySchema,
//   normalizePhoneNumber,
// } from '@namma-move/validation';
// import {
//   BookingStatus,
//   PropertyType,
//   VehicleType,
//   PackingType,
//   ItemType,
//   AddressSnapshot,
// } from '@namma-move/types';
// import { GoogleAddressInput } from '@/components/GoogleAddressInput';
// import { VehicleCard } from '@/components/VehicleCard';
// import { BookingProgress } from '@/components/BookingProgress';
// import { PriceEstimatorWidget } from '@/components/PriceEstimatorWidget';
// import { calculateEstimatedPrice } from '@/lib/pricing';
// import { sendPhoneOtp, verifyPhoneOtp } from '@/lib/otp-service';
// import { createClient } from '@/lib/supabase/client';
// import {
//   Truck,
//   Calendar,
//   Clock,
//   Home,
//   Package,
//   Boxes,
//   User,
//   ShieldCheck,
//   ArrowRight,
//   ArrowLeft,
//   CheckCircle2,
//   AlertCircle,
//   Sparkles,
//   Bike,
//   Car,
//   Building,
// } from 'lucide-react';

// const STEP_TITLES = [
//   'Move Route',
//   'Date & Time',
//   'Property',
//   'Vehicle',
//   'Packing',
//   'Items',
//   'Customer',
//   'Verify Phone',
//   'Summary',
// ];

// const VEHICLE_OPTIONS: Array<{
//   type: VehicleType;
//   title: string;
//   description: string;
//   capacity: string;
//   recommendedFor: string;
//   badge?: string;
// }> = [
//   {
//     type: 'Eicher Tempo',
//     title: 'Eicher Tempo',
//     description: 'Closed body truck ideal for full 2 BHK to 3 BHK house relocation.',
//     capacity: '3,500 kg',
//     recommendedFor: '2 BHK / 3 BHK Relocation',
//     badge: 'Most Popular',
//   },
//   {
//     type: 'Mini Truck',
//     title: 'Mini Truck (Tata Ace)',
//     description: 'Compact truck for quick city movements, single room luggage & 1 BHK.',
//     capacity: '850 kg',
//     recommendedFor: '1 BHK / Local Quick Shift',
//   },
//   {
//     type: 'Pickup Truck',
//     title: 'Pickup Truck (Mahindra)',
//     description: 'Spacious open/covered bed pickup for 1-2 BHK and bike transport.',
//     capacity: '1,500 kg',
//     recommendedFor: '1 BHK + Bike Shifting',
//   },
//   {
//     type: 'Large Truck',
//     title: 'Large Container Truck',
//     description: 'Heavy logistics container truck for 4 BHK+, villas, and office shifting.',
//     capacity: '5,000+ kg',
//     recommendedFor: '4 BHK / Office Relocation',
//   },
// ];

// const PACKING_OPTIONS: PackingType[] = [
//   'Full Packing',
//   'Partial Packing',
//   'Plastic Wrapper',
//   'Paper Box',
//   'Wooden Box',
//   'No Packing',
// ];

// const ITEM_CATEGORIES: ItemType[] = [
//   'Household Items',
//   'Electronics',
//   'Furniture',
//   'Appliances',
//   'Bike',
//   'Car',
//   'Office Equipment',
//   'Other',
// ];

// export default function BookingPage() {
//   return (
//     <React.Suspense fallback={<div className="p-12 text-center text-slate-400">Loading booking wizard...</div>}>
//       <BookingWizardContent />
//     </React.Suspense>
//   );
// }

// function BookingWizardContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formError, setFormError] = useState<string | null>(null);

//   // Initial values from search params if passed
//   const initialPickupCity = searchParams?.get('pickupCity') || 'Chennai';
//   const initialDropCity = searchParams?.get('dropCity') || 'Coimbatore';
//   const initialVehicle = (searchParams?.get('vehicle') as VehicleType) || 'Eicher Tempo';
//   const initialDate = searchParams?.get('date') || new Date(Date.now() + 86400000).toISOString().split('T')[0];

//   // Master State
//   const [pickupAddress, setPickupAddress] = useState<AddressSnapshot>({
//     address_line: `Anna Salai, T. Nagar`,
//     city: initialPickupCity,
//     state: 'Tamil Nadu',
//     pincode: '600017',
//     floor: '2',
//   });

//   const [dropAddress, setDropAddress] = useState<AddressSnapshot>({
//     address_line: `RS Puram Main Rd`,
//     city: initialDropCity,
//     state: 'Tamil Nadu',
//     pincode: '641002',
//     floor: '1',
//   });

//   const [pickupDate, setPickupDate] = useState(initialDate);
//   const [pickupTime, setPickupTime] = useState('10:00 AM');
//   const [propertyType, setPropertyType] = useState<PropertyType>('2 BHK');
//   const [officeWorkstations, setOfficeWorkstations] = useState<number>(15);
//   const [vehicleType, setVehicleType] = useState<VehicleType>(initialVehicle);
//   const [selectedPacking, setSelectedPacking] = useState<PackingType[]>(['Plastic Wrapper', 'Paper Box']);
//   const [selectedItems, setSelectedItems] = useState<ItemType[]>(['Household Items', 'Electronics']);

//   // Bike / Car details
//   const [bikeMakeModel, setBikeMakeModel] = useState('Royal Enfield Classic 350');
//   const [carMakeModel, setCarMakeModel] = useState('Hyundai Creta');
//   const [carType, setCarType] = useState<'Hatchback' | 'Sedan' | 'SUV' | 'Luxury'>('SUV');

//   // Customer Info
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [alternatePhone, setAlternatePhone] = useState('');
//   const [specialRequirements, setSpecialRequirements] = useState('');

//   // OTP State
//   const [otpCode, setOtpCode] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [cooldown, setCooldown] = useState(0);
//   const [mockOtpMsg, setMockOtpMsg] = useState<string | null>(null);

//   // Timer tick for resend cooldown
//   useEffect(() => {
//     if (cooldown > 0) {
//       const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [cooldown]);

//   // Live Price Calculation
//   const priceBreakdown = calculateEstimatedPrice({
//     pickupCity: pickupAddress.city,
//     dropCity: dropAddress.city,
//     vehicleType,
//     propertyType,
//     packingTypes: selectedPacking,
//     pickupFloor: pickupAddress.floor || '0',
//     dropFloor: dropAddress.floor || '0',
//   });

//   // Step Nav validation handlers
//   const handleNext = async () => {
//     setFormError(null);

//     if (currentStep === 1) {
//       if (!pickupAddress.address_line || !dropAddress.address_line) {
//         setFormError('Please fill in both pickup and drop address details');
//         return;
//       }
//     } else if (currentStep === 2) {
//       const selected = new Date(pickupDate);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (selected < today) {
//         setFormError('Pickup date cannot be in the past');
//         return;
//       }
//     } else if (currentStep === 5) {
//       if (selectedPacking.length === 0) {
//         setFormError('Please select at least one packing option');
//         return;
//       }
//     } else if (currentStep === 6) {
//       if (selectedItems.length === 0) {
//         setFormError('Please select at least one item category');
//         return;
//       }
//     } else if (currentStep === 7) {
//       if (!customerName.trim()) {
//         setFormError('Customer name is required');
//         return;
//       }
//       if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
//         setFormError('Please enter a valid 10-digit phone number');
//         return;
//       }
//       if (!customerEmail.includes('@')) {
//         setFormError('Please enter a valid email address');
//         return;
//       }
//       // Auto trigger OTP send if moving to step 8
//       handleSendOtp();
//     }

//     setCurrentStep((prev) => Math.min(prev + 1, 9));
//   };

//   const handlePrev = () => {
//     setFormError(null);
//     setCurrentStep((prev) => Math.max(prev - 1, 1));
//   };

//   // OTP Handlers
//   const handleSendOtp = async () => {
//     setFormError(null);
//     try {
//       const res = await sendPhoneOtp(customerPhone);
//       if (res.success) {
//         setOtpSent(true);
//         setCooldown(res.cooldownSeconds || 30);
//         if (res.mockOtp) {
//           setMockOtpMsg(`Development OTP Code: ${res.mockOtp}`);
//         }
//       } else {
//         setFormError(res.message);
//       }
//     } catch (err: any) {
//       setFormError(err.message || 'Failed to send OTP');
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setFormError(null);
//     if (!otpCode || otpCode.length < 6) {
//       setFormError('Please enter 6-digit OTP code');
//       return;
//     }

//     try {
//       const res = await verifyPhoneOtp(customerPhone, otpCode);
//       if (res.success) {
//         setIsOtpVerified(true);
//         setCurrentStep(9); // Move to summary
//       } else {
//         setFormError(res.message);
//       }
//     } catch (err: any) {
//       setFormError(err.message || 'OTP verification failed');
//     }
//   };

//   // Final Booking Submission
//   const handleConfirmBooking = async () => {
//     setIsSubmitting(true);
//     setFormError(null);

//     try {
//       const supabase = createClient();
//       const normalizedPhone = normalizePhoneNumber(customerPhone);

//       // Generate booking number
//       const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
//       const randomSeq = Math.floor(1000 + Math.random() * 9000);
//       const generatedBookingNumber = `NM-${dateStr}-${randomSeq}`;

//       const bookingPayload = {
//         booking_number: generatedBookingNumber,
//         customer_name: customerName,
//         customer_email: customerEmail,
//         customer_phone: normalizedPhone,
//         alternate_phone: alternatePhone ? normalizePhoneNumber(alternatePhone) : null,
//         pickup_address_snapshot: pickupAddress,
//         drop_address_snapshot: dropAddress,
//         pickup_date: pickupDate,
//         pickup_time: pickupTime,
//         pickup_floor: String(pickupAddress.floor || '0'),
//         drop_floor: String(dropAddress.floor || '0'),
//         pickup_city: pickupAddress.city,
//         drop_city: dropAddress.city,
//         vehicle_type: vehicleType,
//         property_type: propertyType,
//         packing_type: selectedPacking,
//         items_type: selectedItems,
//         bike_details: selectedItems.includes('Bike') ? { make_model: bikeMakeModel } : null,
//         car_details: selectedItems.includes('Car') ? { make_model: carMakeModel, car_type: carType } : null,
//         office_details: propertyType === 'Office' ? { workstations_count: officeWorkstations } : null,
//         special_requirements: specialRequirements || null,
//         distance_km: priceBreakdown.distanceKm,
//         estimated_price: priceBreakdown.totalEstimatedPrice,
//         status: 'confirmed' as BookingStatus,
//         otp_verified: true,
//         created_by_role: 'customer',
//       };

//       const { data, error } = await supabase.from('bookings').insert([bookingPayload]).select().single();

//       if (error) {
//         console.warn('[Supabase Insert Warning]', error.message);
//       }

//       // Redirect to success page with booking number
//       router.push(`/booking/success?bookingNumber=${generatedBookingNumber}&name=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(normalizedPhone)}`);
//     } catch (err: any) {
//       console.error('[Booking Error]', err);
//       setFormError('Failed to create booking. Redirecting to summary confirmation...');
//       setTimeout(() => {
//         router.push(`/booking/success?bookingNumber=NM-20261012-${Math.floor(1000 + Math.random() * 9000)}&name=${encodeURIComponent(customerName)}`);
//       }, 1200);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePacking = (type: PackingType) => {
//     if (selectedPacking.includes(type)) {
//       if (selectedPacking.length > 1) {
//         setSelectedPacking(selectedPacking.filter((t) => t !== type));
//       }
//     } else {
//       setSelectedPacking([...selectedPacking, type]);
//     }
//   };

//   const toggleItem = (item: ItemType) => {
//     if (selectedItems.includes(item)) {
//       if (selectedItems.length > 1) {
//         setSelectedItems(selectedItems.filter((i) => i !== item));
//       }
//     } else {
//       setSelectedItems([...selectedItems, item]);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

//       {/* Page Header */}
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl sm:text-4xl font-black text-white">Book Your Relocation</h1>
//         <p className="text-slate-400 text-sm">
//           Complete your move details to get an instant estimate and confirm your slot.
//         </p>
//       </div>

//       {/* Step Tracker */}
//       <BookingProgress
//         currentStep={currentStep}
//         totalSteps={9}
//         stepTitles={STEP_TITLES}
//         onStepClick={(step) => setCurrentStep(step)}
//       />

//       {/* Form Error Banner */}
//       {formError && (
//         <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-2 text-xs">
//           <AlertCircle className="w-4 h-4 flex-shrink-0" />
//           <span>{formError}</span>
//         </div>
//       )}

//       {/* STEP CONTENT CONTAINER */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         <div className="lg:col-span-8 space-y-6">

//           {/* STEP 1 — MOVE DETAILS */}
//           {currentStep === 1 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <Truck className="w-5 h-5 text-orange-500" />
//                 Step 1 — Pickup & Drop Locations
//               </h2>

//               <GoogleAddressInput
//                 label="Pickup Address (Origin)"
//                 value={pickupAddress}
//                 onChange={(val) => setPickupAddress(val)}
//               />

//               <GoogleAddressInput
//                 label="Drop Address (Destination)"
//                 value={dropAddress}
//                 onChange={(val) => setDropAddress(val)}
//               />
//             </div>
//           )}

//           {/* STEP 2 — DATE & TIME */}
//           {currentStep === 2 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-orange-500" />
//                 Step 2 — Schedule Date & Pickup Time
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-sm font-semibold text-slate-300 mb-2 block">
//                     Pickup Date
//                   </label>
//                   <input
//                     type="date"
//                     min={new Date().toISOString().split('T')[0]}
//                     value={pickupDate}
//                     onChange={(e) => setPickupDate(e.target.value)}
//                     className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
//                   />
//                   <span className="text-[11px] text-slate-500 mt-1 block">Past dates are disabled</span>
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold text-slate-300 mb-2 block">
//                     Preferred Time Slot
//                   </label>
//                   <select
//                     value={pickupTime}
//                     onChange={(e) => setPickupTime(e.target.value)}
//                     className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
//                   >
//                     <option value="06:00 AM">06:00 AM — Early Morning</option>
//                     <option value="08:00 AM">08:00 AM — Morning</option>
//                     <option value="10:00 AM">10:00 AM — Forenoon</option>
//                     <option value="12:00 PM">12:00 PM — Afternoon</option>
//                     <option value="02:00 PM">02:00 PM — Mid-Afternoon</option>
//                     <option value="04:00 PM">04:00 PM — Evening</option>
//                     <option value="06:00 PM">06:00 PM — Late Evening</option>
//                     <option value="08:00 PM">08:00 PM — Night</option>
//                   </select>
//                   <span className="text-[11px] text-slate-500 mt-1 block">Operating Hours: 06:00 AM to 10:00 PM</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 3 — PROPERTY DETAILS */}
//           {currentStep === 3 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <Home className="w-5 h-5 text-orange-500" />
//                 Step 3 — Property Details
//               </h2>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {(['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Office', 'Shop', 'Other'] as PropertyType[]).map(
//                   (prop) => (
//                     <div
//                       key={prop}
//                       onClick={() => setPropertyType(prop)}
//                       className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
//                         propertyType === prop
//                           ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow'
//                           : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
//                       }`}
//                     >
//                       <span className="text-sm block">{prop}</span>
//                     </div>
//                   )
//                 )}
//               </div>

//               {propertyType === 'Office' && (
//                 <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
//                   <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Office Details</h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-xs text-slate-400 mb-1 block">Workstations Count</label>
//                       <input
//                         type="number"
//                         min="1"
//                         value={officeWorkstations}
//                         onChange={(e) => setOfficeWorkstations(parseInt(e.target.value) || 0)}
//                         className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* STEP 4 — VEHICLE SELECTION */}
//           {currentStep === 4 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <Truck className="w-5 h-5 text-orange-500" />
//                 Step 4 — Select Vehicle Type
//               </h2>

//               <div className="space-y-4">
//                 {VEHICLE_OPTIONS.map((v) => (
//                   <VehicleCard
//                     key={v.type}
//                     type={v.type}
//                     title={v.title}
//                     description={v.description}
//                     capacity={v.capacity}
//                     recommendedFor={v.recommendedFor}
//                     selected={vehicleType === v.type}
//                     onSelect={(t) => setVehicleType(t)}
//                     badge={v.badge}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* STEP 5 — PACKING TYPE */}
//           {currentStep === 5 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <Package className="w-5 h-5 text-orange-500" />
//                 Step 5 — Select Packing Material & Service
//               </h2>

//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {PACKING_OPTIONS.map((p) => {
//                   const isSelected = selectedPacking.includes(p);
//                   return (
//                     <div
//                       key={p}
//                       onClick={() => togglePacking(p)}
//                       className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
//                         isSelected
//                           ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow'
//                           : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
//                       }`}
//                     >
//                       <span className="text-sm block">{p}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* STEP 6 — ITEMS TO BE SHIPPED */}
//           {currentStep === 6 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <Boxes className="w-5 h-5 text-orange-500" />
//                 Step 6 — Items to be Shipped
//               </h2>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {ITEM_CATEGORIES.map((item) => {
//                   const isSelected = selectedItems.includes(item);
//                   return (
//                     <div
//                       key={item}
//                       onClick={() => toggleItem(item)}
//                       className={`cursor-pointer p-4 rounded-xl border text-center transition-all ${
//                         isSelected
//                           ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow'
//                           : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
//                       }`}
//                     >
//                       <span className="text-xs block font-semibold">{item}</span>
//                     </div>
//                   );
//                 })}
//               </div>

//               {selectedItems.includes('Bike') && (
//                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
//                   <label className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Bike Make & Model</label>
//                   <input
//                     type="text"
//                     value={bikeMakeModel}
//                     onChange={(e) => setBikeMakeModel(e.target.value)}
//                     placeholder="e.g. Royal Enfield Classic 350"
//                     className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
//                   />
//                 </div>
//               )}

//               {selectedItems.includes('Car') && (
//                 <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
//                   <label className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Car Details</label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     <input
//                       type="text"
//                       value={carMakeModel}
//                       onChange={(e) => setCarMakeModel(e.target.value)}
//                       placeholder="e.g. Hyundai Creta"
//                       className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
//                     />
//                     <select
//                       value={carType}
//                       onChange={(e) => setCarType(e.target.value as any)}
//                       className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
//                     >
//                       <option value="Hatchback">Hatchback</option>
//                       <option value="Sedan">Sedan</option>
//                       <option value="SUV">SUV</option>
//                       <option value="Luxury">Luxury</option>
//                     </select>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* STEP 7 — CUSTOMER INFORMATION */}
//           {currentStep === 7 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <User className="w-5 h-5 text-orange-500" />
//                 Step 7 — Customer Details
//               </h2>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs text-slate-300 font-semibold mb-1 block">Full Name *</label>
//                   <input
//                     type="text"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     placeholder="Namma Vandi"
//                     className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-slate-300 font-semibold mb-1 block">Phone Number (Indian +91) *</label>
//                     <input
//                       type="text"
//                       value={customerPhone}
//                       onChange={(e) => setCustomerPhone(e.target.value)}
//                       placeholder="9876543210"
//                       className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs text-slate-300 font-semibold mb-1 block">Email Address *</label>
//                     <input
//                       type="email"
//                       value={customerEmail}
//                       onChange={(e) => setCustomerEmail(e.target.value)}
//                       placeholder="customer@example.com"
//                       className="w-full bg-slate-900 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-slate-400 mb-1 block">Alternate Phone (Optional)</label>
//                     <input
//                       type="text"
//                       value={alternatePhone}
//                       onChange={(e) => setAlternatePhone(e.target.value)}
//                       placeholder="+91 9988776655"
//                       className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-xs text-slate-400 mb-1 block">Special Notes / Fragile Items</label>
//                     <input
//                       type="text"
//                       value={specialRequirements}
//                       onChange={(e) => setSpecialRequirements(e.target.value)}
//                       placeholder="e.g. Glass table needs extra wrapping"
//                       className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 8 — PHONE OTP VERIFICATION */}
//           {currentStep === 8 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <div className="flex items-center justify-between border-b border-slate-800 pb-4">
//                 <div>
//                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                     <ShieldCheck className="w-5 h-5 text-orange-500" />
//                     Step 8 — Phone OTP Verification
//                   </h2>
//                   <p className="text-xs text-slate-400 mt-1">
//                     An OTP security code has been dispatched to <strong className="text-white">{customerPhone}</strong>
//                   </p>
//                 </div>
//               </div>

//               {mockOtpMsg && (
//                 <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded-xl text-xs flex items-center gap-2">
//                   <Sparkles className="w-4 h-4 flex-shrink-0" />
//                   <span>{mockOtpMsg}</span>
//                 </div>
//               )}

//               <div className="space-y-4 max-w-sm">
//                 <div>
//                   <label className="text-xs font-semibold text-slate-300 mb-1 block">
//                     Enter 6-Digit OTP Code
//                   </label>
//                   <input
//                     type="text"
//                     maxLength={6}
//                     value={otpCode}
//                     onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
//                     placeholder="123456"
//                     className="w-full bg-slate-900 border-2 border-orange-500 focus:ring-2 focus:ring-orange-500 rounded-2xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white outline-none"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between text-xs">
//                   <button
//                     type="button"
//                     disabled={cooldown > 0}
//                     onClick={handleSendOtp}
//                     className="text-orange-400 font-semibold hover:underline disabled:text-slate-600"
//                   >
//                     {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP Code'}
//                   </button>
//                   <span className="text-slate-500">Secured via Supabase Auth</span>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleVerifyOtp}
//                   className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 transition-all"
//                 >
//                   Verify & Proceed to Summary
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* STEP 9 — BOOKING SUMMARY & FINAL CONFIRMATION */}
//           {currentStep === 9 && (
//             <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
//               <div className="flex items-center justify-between pb-4 border-b border-slate-800">
//                 <div>
//                   <h2 className="text-2xl font-black text-white">Booking Summary</h2>
//                   <span className="text-xs text-slate-400">Review your relocation details before final confirmation</span>
//                 </div>
//                 <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                   <CheckCircle2 className="w-3.5 h-3.5" /> OTP Verified
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
//                 <div className="space-y-1 bg-slate-900 p-4 rounded-xl border border-slate-800">
//                   <span className="text-orange-400 font-bold uppercase tracking-wider block">Pickup Location</span>
//                   <p className="text-slate-200 font-semibold text-sm">{pickupAddress.address_line}</p>
//                   <p className="text-slate-400">{pickupAddress.city}, {pickupAddress.state} - {pickupAddress.pincode}</p>
//                   <p className="text-slate-500">Floor: {pickupAddress.floor}</p>
//                 </div>

//                 <div className="space-y-1 bg-slate-900 p-4 rounded-xl border border-slate-800">
//                   <span className="text-blue-400 font-bold uppercase tracking-wider block">Drop Location</span>
//                   <p className="text-slate-200 font-semibold text-sm">{dropAddress.address_line}</p>
//                   <p className="text-slate-400">{dropAddress.city}, {dropAddress.state} - {dropAddress.pincode}</p>
//                   <p className="text-slate-500">Floor: {dropAddress.floor}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
//                 <div>
//                   <span className="text-slate-500 block">Date</span>
//                   <strong className="text-white text-sm">{pickupDate}</strong>
//                 </div>
//                 <div>
//                   <span className="text-slate-500 block">Time</span>
//                   <strong className="text-white text-sm">{pickupTime}</strong>
//                 </div>
//                 <div>
//                   <span className="text-slate-500 block">Vehicle</span>
//                   <strong className="text-white text-sm">{vehicleType}</strong>
//                 </div>
//                 <div>
//                   <span className="text-slate-500 block">Property</span>
//                   <strong className="text-white text-sm">{propertyType}</strong>
//                 </div>
//               </div>

//               <div className="space-y-2 text-xs">
//                 <div className="flex justify-between border-b border-slate-800 pb-2">
//                   <span className="text-slate-400">Customer Name:</span>
//                   <span className="text-white font-semibold">{customerName}</span>
//                 </div>
//                 <div className="flex justify-between border-b border-slate-800 pb-2">
//                   <span className="text-slate-400">Phone:</span>
//                   <span className="text-white font-semibold">{customerPhone}</span>
//                 </div>
//                 <div className="flex justify-between border-b border-slate-800 pb-2">
//                   <span className="text-slate-400">Email:</span>
//                   <span className="text-white font-semibold">{customerEmail}</span>
//                 </div>
//                 <div className="flex justify-between border-b border-slate-800 pb-2">
//                   <span className="text-slate-400">Packing Selected:</span>
//                   <span className="text-white font-semibold">{selectedPacking.join(', ')}</span>
//                 </div>
//                 <div className="flex justify-between pb-2">
//                   <span className="text-slate-400">Items:</span>
//                   <span className="text-white font-semibold">{selectedItems.join(', ')}</span>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 disabled={isSubmitting}
//                 onClick={handleConfirmBooking}
//                 className="w-full py-4 rounded-xl brand-gradient-bg text-white font-black text-base shadow-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
//               >
//                 {isSubmitting ? (
//                   <span>Generating Booking...</span>
//                 ) : (
//                   <>
//                     <CheckCircle2 className="w-5 h-5" />
//                     <span>Confirm & Generate Booking</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Navigation Controls */}
//           {currentStep < 8 && (
//             <div className="flex items-center justify-between pt-4">
//               <button
//                 type="button"
//                 onClick={handlePrev}
//                 disabled={currentStep === 1}
//                 className="px-5 py-2.5 rounded-xl glass-card text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" /> Previous
//               </button>

//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-7 py-3 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow hover:opacity-95 flex items-center gap-2"
//               >
//                 Next Step <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//         </div>

//         {/* PRICE BREAKDOWN SIDEBAR */}
//         <div className="lg:col-span-4 sticky top-28 space-y-4">
//           <PriceEstimatorWidget
//             breakdown={priceBreakdown}
//             pickupCity={pickupAddress.city}
//             dropCity={dropAddress.city}
//           />
//         </div>
//       </div>

//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { normalizePhoneNumber } from '@namma-move/validation';
import {
  BookingStatus, PropertyType, VehicleType, PackingType, ItemType, AddressSnapshot,
} from '@namma-move/types';
import { VehicleCard } from '@/components/VehicleCard';
import { BookingProgress } from '@/components/BookingProgress';
import { PriceEstimatorWidget } from '@/components/PriceEstimatorWidget';
import { LocationFields, FieldError, normFloor } from '@/components/LocationFields';
import { MoveTypeChips } from '@/components/MoveTypeChips';
import { suggestMoveType, MoveType } from '@/lib/moveType';
import { calculateEstimatedPrice } from '@/lib/pricing';
import { sendPhoneOtp, verifyPhoneOtp } from '@/lib/otp-service';
import { createClient } from '@/lib/supabase/client';
import {
  Truck, Calendar, Home, Package, Boxes, User, ShieldCheck, ArrowRight, ArrowLeft,
  CheckCircle2, AlertCircle, Sparkles, Lock, Minus, Plus, Check
} from 'lucide-react';

const STEP_TITLES = ['Move Route', 'Date & Time', 'Property', 'Vehicle', 'Packing', 'Items', 'Customer', 'Verify Phone', 'Summary'];

const VEHICLE_OPTIONS: Array<{ type: VehicleType; title: string; description: string; capacity: string; recommendedFor: string }> = [
  { type: 'Eicher Tempo', title: 'Eicher Tempo', description: 'Closed body truck ideal for full 2 BHK to 3 BHK house relocation.', capacity: '3,500 kg', recommendedFor: '2 BHK / 3 BHK Relocation' },
  { type: 'Mini Truck', title: 'Mini Truck (Tata Ace)', description: 'Compact truck for quick city movements, single room luggage & 1 BHK.', capacity: '850 kg', recommendedFor: '1 BHK / Local Quick Shift' },
  { type: 'Pickup Truck', title: 'Pickup Truck (Mahindra)', description: 'Spacious open/covered bed pickup for 1-2 BHK and bike transport.', capacity: '1,500 kg', recommendedFor: '1 BHK + Bike Shifting' },
  { type: 'Large Truck', title: 'Large Container Truck', description: 'Heavy logistics container truck for 4 BHK+, villas, and office shifting.', capacity: '5,000+ kg', recommendedFor: '4 BHK / Office Relocation' },
];

// Sample prices. Replace with your real PricingConfig values.
// const PACKING_INFO: Record<PackingType, { price: number; desc: string }> = {
//   'Full Packing': { price: 3500, desc: 'Everything wrapped and boxed' },
//   'Partial Packing': { price: 1800, desc: 'Fragile items only' },
//   'Plastic Wrapper': { price: 400, desc: 'Furniture and appliances' },
//   'Paper Box': { price: 500, desc: 'Boxes for loose items' },
//   'Wooden Box': { price: 1200, desc: 'Strong crates for fragile goods' },
//   'No Packing': { price: 0, desc: 'You pack, we move' },
// };

const PACKING_INFO: Record<PackingType, { price: number; desc: string; bestFor: string }> = {
  'Full Packing': { price: 3500, desc: 'Everything wrapped and boxed', bestFor: 'Whole-house moves, 2 BHK and above' },
  'Partial Packing': { price: 1800, desc: 'Fragile items only', bestFor: 'Glass, crockery, TV, decor' },
  'Plastic Wrapper': { price: 400, desc: 'Furniture and appliances', bestFor: 'Sofa, bed, mattress, fridge, washing machine' },
  'Paper Box': { price: 500, desc: 'Boxes for loose items', bestFor: 'Clothes, books, kitchen items' },
  'Wooden Box': { price: 1200, desc: 'Strong crates for fragile goods', bestFor: 'Glass tables, antiques, valuables, long trips' },
  'No Packing': { price: 0, desc: 'You pack, we move', bestFor: 'You have already packed everything' },
};

const RECOMMENDED_PACKING: Record<PropertyType, PackingType[]> = {
  '1 BHK': ['Partial Packing', 'Paper Box'],
  '2 BHK': ['Full Packing'],
  '3 BHK': ['Full Packing'],
  '4 BHK': ['Full Packing', 'Wooden Box'],
  '5+ BHK': ['Full Packing', 'Wooden Box'],
  Office: ['Paper Box', 'Plastic Wrapper'],
  Shop: ['Paper Box', 'Plastic Wrapper'],
  Other: ['Partial Packing'],
};
const PACKING_OPTIONS = Object.keys(PACKING_INFO) as PackingType[];

const ITEM_CATEGORIES: ItemType[] = ['Household Items', 'Electronics', 'Furniture', 'Appliances', 'Bike', 'Car', 'Office Equipment', 'Other'];
const ITEM_CATALOG: Record<string, string[]> = {
  'Household Items': ['Chair', 'Cot (Kattil)', 'Bed', 'Mattress', 'Table', 'Cupboard (Almirah)', 'Gas stove', 'Kitchen utensils box', 'Cartons / boxes', 'Fan'],
  Electronics: ['TV', 'Computer / Laptop', 'Music system', 'Set-top box', 'Inverter / UPS', 'Printer'],
  Furniture: ['Sofa', 'Dining table', 'Wardrobe', 'Bookshelf', 'TV stand', 'Study table', 'Dressing table', 'Shoe rack'],
  Appliances: ['Washing machine', 'Refrigerator', 'Microwave', 'AC', 'Water purifier', 'Mixer / Grinder', 'Geyser', 'Cooler'],
  Bike: ['Motorbike', 'Scooter', 'Bicycle'],
  Car: ['Car'],
  'Office Equipment': ['Desk', 'Office chair', 'Computer', 'Printer', 'Filing cabinet', 'Conference table', 'Server rack'],
  Other: [],
};

const SLOTS: Array<[string, string, number]> = [
  ['06:00 AM', 'Early morning', 6], ['08:00 AM', 'Morning', 8], ['10:00 AM', 'Forenoon', 10],
  ['12:00 PM', 'Afternoon', 12], ['02:00 PM', 'Mid-afternoon', 14], ['04:00 PM', 'Evening', 16],
  ['06:00 PM', 'Late evening', 18], ['08:00 PM', 'Night', 20],
];

// const HOUR_GROUPS = [
//   { title: 'Midnight to early morning', range: '12 AM – 5 AM', start: 0 },
//   { title: 'Morning', range: '6 AM – 11 AM', start: 6 },
//   { title: 'Afternoon', range: '12 PM – 5 PM', start: 12 },
//   { title: 'Evening & night', range: '6 PM – 11 PM', start: 18 },
// ];
const HOUR_GROUPS = [
  { title: 'Midnight', range: '12–5 AM', start: 0 },
  { title: 'Morning', range: '6–11 AM', start: 6 },
  { title: 'Afternoon', range: '12–5 PM', start: 12 },
  { title: 'Evening', range: '6–11 PM', start: 18 },
];

const HOUR_NOTE: Record<number, string> = { 0: 'Midnight', 12: 'Noon' };
const MINUTES = [0, 15, 30, 45];
const LEAD_MINUTES = 120; // notice needed before pickup (same ~2h rule as before)

const hourLabel = (h: number) => `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`;
const formatTime = (h: number, m: number) =>
  `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;

const SUGGESTED_VEHICLE: Record<PropertyType, VehicleType> = {
  '1 BHK': 'Pickup Truck', '2 BHK': 'Eicher Tempo', '3 BHK': 'Eicher Tempo', '4 BHK': 'Large Truck',
  '5+ BHK': 'Large Truck', Office: 'Large Truck', Shop: 'Pickup Truck', Other: 'Eicher Tempo',
};

const localDate = (offsetDays = 0) => {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

const emptyAddress = (city: string): AddressSnapshot => ({
  address_line: '', city, state: '', pincode: '', floor: '', landmark: '', has_lift: null, parking_access: null,
});

export default function BookingPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-slate-400">Loading...</div>}>
      <BookingWizardContent />
    </React.Suspense>
  );
}

function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialPickupCity = searchParams?.get('pickupCity') || '';
  const initialDropCity = searchParams?.get('dropCity') || '';
  const paramVehicle = searchParams?.get('vehicle') as VehicleType | null;
  const initialDate = searchParams?.get('date') || localDate(1);

  const [pickupAddress, setPickupAddress] = useState<AddressSnapshot>(emptyAddress(initialPickupCity));
  const [dropAddress, setDropAddress] = useState<AddressSnapshot>(emptyAddress(initialDropCity));
  const [moveType, setMoveType] = useState<MoveType | null>(null);
  const [moveTypeTouched, setMoveTypeTouched] = useState(false);
  useEffect(() => {
    if (!moveTypeTouched) setMoveType(suggestMoveType(pickupAddress, dropAddress));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupAddress.city, dropAddress.city, moveTypeTouched]);

  const [pickupDate, setPickupDate] = useState(initialDate);
  // const [pickupTime, setPickupTime] = useState('');
  const [pickupHour, setPickupHour] = useState<number | null>(null);
  const [pickupMinute, setPickupMinute] = useState(0);
  const pickupTime = pickupHour === null ? '' : formatTime(pickupHour, pickupMinute); // same "06:00 PM" format as before
  const [propertyType, setPropertyType] = useState<PropertyType>('2 BHK');
  const [officeWorkstations, setOfficeWorkstations] = useState<number>(15);
  const [vehicleType, setVehicleType] = useState<VehicleType>(paramVehicle || 'Eicher Tempo');
  const [selectedPacking, setSelectedPacking] = useState<PackingType[]>([]);
  // const [selectedItems, setSelectedItems] = useState<ItemType[]>([]);
  const [propertyOtherDetails, setPropertyOtherDetails] = useState('');

const [itemQty, setItemQty] = useState<Record<string, number>>({});
const [itemTab, setItemTab] = useState<ItemType>('Household Items');
const [customName, setCustomName] = useState('');
  const [bikeMakeModel, setBikeMakeModel] = useState('');
  const [carMakeModel, setCarMakeModel] = useState('');
  const [carType, setCarType] = useState<'Hatchback' | 'Sedan' | 'SUV' | 'Luxury'>('SUV');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  const [otpCode, setOtpCode] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [mockOtpMsg, setMockOtpMsg] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown > 0) {
      const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown]);

  // Time slots: block past slots when the date is today
  // const isToday = pickupDate === localDate(0);
  // const isPast = (h: number) => isToday && h <= new Date().getHours() + 2;
  // useEffect(() => {
  //   const cur = SLOTS.find(([t]) => t === pickupTime);
  //   if (!cur || isPast(cur[2])) {
  //     const first = SLOTS.find(([, , h]) => !isPast(h));
  //     setPickupTime(first ? first[0] : '');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pickupDate]);

  const isToday = pickupDate === localDate(0);
  const slotPast = (h: number, m: number) => {
    if (!isToday) return false;
    const n = new Date();
    return h * 60 + m < n.getHours() * 60 + n.getMinutes() + LEAD_MINUTES;
  };
  const hourPast = (h: number) => slotPast(h, 45);
  const firstFreeMinute = (h: number) => MINUTES.find((m) => !slotPast(h, m)) ?? 0;
  const allHoursPast = isToday && Array.from({ length: 24 }, (_, h) => h).every(hourPast);

  useEffect(() => {
    if (pickupHour !== null && !hourPast(pickupHour)) {
      if (slotPast(pickupHour, pickupMinute)) setPickupMinute(firstFreeMinute(pickupHour));
      return;
    }
    const h = Array.from({ length: 24 }, (_, i) => i).find((x) => !hourPast(x));
    if (h === undefined) { setPickupHour(null); setPickupMinute(0); }
    else { setPickupHour(h); setPickupMinute(firstFreeMinute(h)); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupDate]);

  const pickHour = (h: number) => {
    setPickupHour(h);
    if (slotPast(h, pickupMinute)) setPickupMinute(firstFreeMinute(h));
  };

  const [periodTab, setPeriodTab] = useState(0);
useEffect(() => {
  if (pickupHour !== null) setPeriodTab(Math.floor(pickupHour / 6));
}, [pickupHour]);

const itemKey = (c: string, n: string) => `${c}::${n}`;
const itemList = Object.entries(itemQty).map(([k, qty]) => {
  const [category, name] = k.split('::');
  return { category: category as ItemType, name, qty };
});
const selectedItems = Array.from(new Set(itemList.map((i) => i.category))) as ItemType[];
const totalQty = itemList.reduce((s, i) => s + i.qty, 0);
const categoryCount = (c: string) => itemList.filter((i) => i.category === c).reduce((s, i) => s + i.qty, 0);
const rowsFor = (c: string) => {
  const base = ITEM_CATALOG[c] ?? [];
  const custom = itemList.filter((i) => i.category === c && !base.includes(i.name)).map((i) => i.name);
  return [...base, ...custom];
};
const setQty = (c: string, n: string, q: number) =>
  setItemQty((prev) => {
    const next = { ...prev };
    const k = itemKey(c, n);
    if (q <= 0) delete next[k];
    else next[k] = Math.min(q, 99);
    return next;
  });
const addCustom = () => {
  const n = customName.trim();
  if (!n) return;
  setQty(itemTab, n, (itemQty[itemKey(itemTab, n)] || 0) + 1);
  setCustomName('');
};

  const priceBreakdown = calculateEstimatedPrice({
    pickupCity: pickupAddress.city,
    dropCity: dropAddress.city,
    vehicleType,
    propertyType,
    packingTypes: currentStep < 5 || selectedPacking.length === 0 ? ['No Packing'] : selectedPacking,
    pickupFloor: normFloor(pickupAddress.floor),
    dropFloor: normFloor(dropAddress.floor),
  });

  const goTo = (n: number) => {
    setCurrentStep(n);
    setMaxStep((m) => Math.max(m, n));
  };

  const validateAddress = (a: AddressSnapshot, p: 'pickup' | 'drop') => {
    const e: Record<string, string> = {};
    if (a.address_line.trim().length < 5) e[`${p}.address_line`] = 'Enter your street and door number';
    if (!a.city) e[`${p}.city`] = 'Select a city';
    if (!/^\d{6}$/.test(a.pincode)) e[`${p}.pincode`] = 'Enter a 6-digit pincode';
    if (!/^(g|ground|\d{1,2})$/i.test(String(a.floor ?? '').trim())) e[`${p}.floor`] = 'Enter floor, e.g. 2 or Ground';
    else if (normFloor(a.floor) !== '0' && typeof a.has_lift !== 'boolean') e[`${p}.has_lift`] = 'Select Yes or No';
    if (!a.parking_access) e[`${p}.parking_access`] = 'Select parking access';
    return e;
  };

  const handleNext = async () => {
    setFormError(null);
    setErrors({});

    if (currentStep === 1) {
      const e = { ...validateAddress(pickupAddress, 'pickup'), ...validateAddress(dropAddress, 'drop') };
      if (Object.keys(e).length) return setErrors(e);
    } else if (currentStep === 2) {
      if (!pickupTime) return setFormError('Pick a time slot, or choose another date');
    } else if (currentStep === 3) {
  if (propertyType === 'Other' && propertyOtherDetails.trim().length < 5)
    return setErrors({ property: 'Describe your property, e.g. godown, 2 rooms, 1st floor' });
}else if (currentStep === 5) {
      if (selectedPacking.length === 0) return setFormError('Please select a packing option');
    } else if (currentStep === 6) {
  if (itemList.length === 0) return setFormError('Add at least one item to move');    } else if (currentStep === 7) {
      const e: Record<string, string> = {};
      if (customerName.trim().length < 2) e.name = 'Enter your full name';
      if (!/^[6-9]\d{9}$/.test(customerPhone.replace(/\D/g, '').slice(-10))) e.phone = 'Enter a valid 10-digit mobile number';
      if (customerEmail && !/^\S+@\S+\.\S+$/.test(customerEmail)) e.email = 'Enter a valid email';
      if (Object.keys(e).length) return setErrors(e);
      const sent = await handleSendOtp();
      if (!sent) return;
    }
    goTo(Math.min(currentStep + 1, 9));
  };

  const handlePrev = () => {
    setFormError(null);
    setErrors({});
    setCurrentStep((p) => Math.max(p - 1, 1));
  };

  const handleSendOtp = async (): Promise<boolean> => {
    setFormError(null);
    try {
      const res = await sendPhoneOtp(customerPhone);
      if (!res.success) {
        setFormError(res.message);
        return false;
      }
      setCooldown(res.cooldownSeconds || 30);
      if (res.mockOtp && process.env.NODE_ENV !== 'production') setMockOtpMsg(`Development OTP Code: ${res.mockOtp}`);
      return true;
    } catch (err: any) {
      setFormError(err.message || 'Failed to send OTP');
      return false;
    }
  };

  const handleVerifyOtp = async () => {
    setFormError(null);
    if (otpCode.length < 6) return setFormError('Please enter the 6-digit OTP');
    try {
      const res = await verifyPhoneOtp(customerPhone, otpCode);
      if (res.success) {
        setIsOtpVerified(true);
        goTo(9);
      } else setFormError(res.message);
    } catch (err: any) {
      setFormError(err.message || 'OTP verification failed');
    }
  };

  const handleConfirmBooking = async () => {
    if (!isOtpVerified) return setFormError('Please verify your phone first');
    setIsSubmitting(true);
    setFormError(null);
    try {
      const supabase = createClient();
      const normalizedPhone = normalizePhoneNumber(customerPhone);
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      // TODO: generate booking number and set otp_verified on the server, not in the browser
      const bookingNumber = `NM-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;

      const payload = {
        booking_number: bookingNumber,
        customer_name: customerName.trim(),
        customer_email: customerEmail || null,
        customer_phone: normalizedPhone,
        alternate_phone: alternatePhone ? normalizePhoneNumber(alternatePhone) : null,
        pickup_address_snapshot: pickupAddress,
        drop_address_snapshot: dropAddress,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        pickup_floor: normFloor(pickupAddress.floor),
        drop_floor: normFloor(dropAddress.floor),
        pickup_city: pickupAddress.city,
        drop_city: dropAddress.city,
        move_type: moveType,
        vehicle_type: vehicleType,
        property_type: propertyType,
        packing_type: selectedPacking,
        property_other_details: propertyType === 'Other' ? propertyOtherDetails.trim() : null,

        items_type: selectedItems,
        items_detail: itemList,
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

      const { error } = await supabase.from('bookings').insert([payload]).select().single();
      if (error) {
        console.error('[Booking insert]', error.message);
        setFormError('Could not save your booking. Please try again or call us.');
        return; // do NOT go to the success page
      }
      router.push(`/booking/success?bookingNumber=${bookingNumber}&name=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(normalizedPhone)}`);
    } catch (err) {
      console.error('[Booking Error]', err);
      setFormError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pickProperty = (p: PropertyType) => {
    setPropertyType(p);
    setVehicleType(SUGGESTED_VEHICLE[p]);
  };

  // const togglePacking = (t: PackingType) => {
  //   if (t === 'No Packing') return setSelectedPacking(['No Packing']);
  //   const without = selectedPacking.filter((x) => x !== 'No Packing');
  //   setSelectedPacking(without.includes(t) ? without.filter((x) => x !== t) : [...without, t]);
  // };

  const togglePacking = (t: PackingType) => {
  if (t === 'No Packing') {
    return setSelectedPacking(selectedPacking.includes(t) ? [] : ['No Packing']);
  }
  const without = selectedPacking.filter((x) => x !== 'No Packing'); // picking any packing unticks "No Packing"
  setSelectedPacking(without.includes(t) ? without.filter((x) => x !== t) : [...without, t]);
};

const packingTotal = selectedPacking.reduce((s, p) => s + PACKING_INFO[p].price, 0);
const recommendedPacking = RECOMMENDED_PACKING[propertyType] ?? [];

  // const toggleItem = (i: ItemType) =>
  //   setSelectedItems(selectedItems.includes(i) ? selectedItems.filter((x) => x !== i) : [...selectedItems, i]);

  const inputCls = (bad?: string) =>
    `w-full bg-slate-900 border ${bad ? 'border-red-500' : 'border-slate-700'} focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white outline-none`;
  const chipCls = (on: boolean) =>
    `cursor-pointer p-4 rounded-xl border text-center transition-all ${on ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-glow' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
    }`;
  const EditBtn = ({ step }: { step: number }) => (
    <button type="button" onClick={() => setCurrentStep(step)} className="text-orange-400 text-xs hover:underline">Edit</button>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Book Your Relocation</h1>
        <p className="text-slate-400 text-sm">Complete your move details to get an instant estimate and confirm your slot.</p>
      </div>

      <BookingProgress
        currentStep={currentStep}
        totalSteps={9}
        stepTitles={STEP_TITLES}
        onStepClick={(s) => {
          if (s <= maxStep && !(s === 9 && !isOtpVerified)) setCurrentStep(s);
        }}
      />

      {formError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-2 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="glass-card p-5 rounded-3xl space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" /> Step 1 — Pickup & Drop Locations
              </h2>
              <MoveTypeChips value={moveType} onChange={(t) => { setMoveType(t); setMoveTypeTouched(true); }} />
              <LocationFields
                label="Pickup address"
                value={pickupAddress}
                onChange={setPickupAddress}
                errors={{
                  address_line: errors['pickup.address_line'], city: errors['pickup.city'], pincode: errors['pickup.pincode'],
                  floor: errors['pickup.floor'], has_lift: errors['pickup.has_lift'], parking_access: errors['pickup.parking_access'],
                }}
              />
              <LocationFields
                label="Drop address"
                value={dropAddress}
                onChange={setDropAddress}
                errors={{
                  address_line: errors['drop.address_line'], city: errors['drop.city'], pincode: errors['drop.pincode'],
                  floor: errors['drop.floor'], has_lift: errors['drop.has_lift'], parking_access: errors['drop.parking_access'],
                }}
              />
              {pickupAddress.city && dropAddress.city && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200">
                  <strong className="text-white">{pickupAddress.city} to {dropAddress.city}</strong>
                  <span className="text-slate-400"> · {priceBreakdown.distanceKm} km</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {/* {currentStep === 2 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" /> Step 2 — Schedule Date & Pickup Time
              </h2>
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Pickup date</label>
                <input type="date" min={localDate(0)} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={inputCls()} />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Preferred time slot</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SLOTS.map(([t, name, h]) => (
                    <button
                      key={t} type="button" disabled={isPast(h)} onClick={() => setPickupTime(t)}
                      className={`p-3 rounded-xl border text-sm text-left transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                        pickupTime === t ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      {t}<span className="block text-xs text-slate-500">{name}</span>
                    </button>
                  ))}
                </div>
                {isToday && SLOTS.every(([, , h]) => isPast(h)) && (
                  <p className="text-xs text-amber-400 mt-2">No slots left today. Please pick another date.</p>
                )}
              </div>
            </div>
          )} */}

          {/* {currentStep === 2 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" /> Step 2 — Schedule Date & Pickup Time
              </h2>

              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">Pickup date</label>
                <input type="date" min={localDate(0)} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={inputCls()} />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-300 block">Pickup hour</label>
                {HOUR_GROUPS.map((g) => (
                  <div key={g.title} role="group" aria-label={g.title}>
                    <p className="text-xs font-semibold text-slate-300 mb-2">
                      {g.title} <span className="text-slate-500 font-normal">{g.range}</span>
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {Array.from({ length: 6 }, (_, i) => g.start + i).map((h) => (
                        <button
                          key={h} type="button" disabled={hourPast(h)} aria-pressed={pickupHour === h} onClick={() => pickHour(h)}
                          className={`p-2.5 rounded-xl border text-sm text-center transition-all disabled:opacity-30 disabled:cursor-not-allowed ${pickupHour === h ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                        >
                          {hourLabel(h)}
                          <span className="block text-[11px] text-slate-500 min-h-[14px]">{HOUR_NOTE[h] ?? ''}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {allHoursPast && <p className="text-xs text-amber-400">No slots left today. Please pick another date.</p>}
              </div>

              {pickupHour !== null && (
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-1 block">
                    Exact minutes <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-2">Skip this if the hour is fine. We'll use :00.</p>
                  <div className="grid grid-cols-4 gap-2 max-w-sm">
                    {MINUTES.map((m) => (
                      <button
                        key={m} type="button" disabled={slotPast(pickupHour, m)} aria-pressed={pickupMinute === m} onClick={() => setPickupMinute(m)}
                        className={`p-2.5 rounded-xl border text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed ${pickupMinute === m ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-300'
                          }`}
                      >
                        :{String(m).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {pickupTime && (
                <p className="text-sm text-slate-300 border-t border-slate-800 pt-4" aria-live="polite">
                  Pickup time: <strong className="text-orange-400">{pickupTime}</strong>
                </p>
              )}
            </div>
          )} */}

          {currentStep === 2 && (
  <div className="glass-card p-5 rounded-3xl space-y-4">
    <h2 className="text-xl font-bold text-white flex items-center gap-2">
      <Calendar className="w-5 h-5 text-orange-500" /> Step 2 — Schedule Date & Pickup Time
    </h2>

    <div>
      <label className="text-sm font-semibold text-slate-300 mb-1.5 block">Pickup date</label>
      <input type="date" min={localDate(0)} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={inputCls()} />
    </div>

    <div>
      <label className="text-sm font-semibold text-slate-300 mb-1.5 block">Pickup hour</label>

      {/* Period tabs */}
      <div className="grid grid-cols-4 gap-1.5 mb-2" role="tablist">
        {HOUR_GROUPS.map((g, i) => {
          const allPast = Array.from({ length: 6 }, (_, k) => g.start + k).every(hourPast);
          return (
            <button
              key={g.title} type="button" role="tab" aria-selected={periodTab === i} disabled={allPast}
              onClick={() => setPeriodTab(i)}
              className={`py-1.5 rounded-lg border text-center leading-tight transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                periodTab === i ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              <span className="block text-xs">{g.title}</span>
              <span className="block text-[10px] text-slate-500">{g.range}</span>
            </button>
          );
        })}
      </div>

      {/* Hours for the active tab only */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => HOUR_GROUPS[periodTab].start + i).map((h) => (
          <button
            key={h} type="button" disabled={hourPast(h)} aria-pressed={pickupHour === h} onClick={() => pickHour(h)}
            className={`py-2 rounded-lg border text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
              pickupHour === h ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
            }`}
          >
            {hourLabel(h)}
          </button>
        ))}
      </div>
      {allHoursPast && <p className="text-xs text-amber-400 mt-2">No slots left today. Please pick another date.</p>}
    </div>

    {/* Minutes + summary on one row */}
    {pickupHour !== null && (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-800 pt-3">
        <span className="text-xs text-slate-400">Minutes <span className="text-slate-600">(optional)</span></span>
        <div className="flex gap-1.5">
          {MINUTES.map((m) => (
            <button
              key={m} type="button" disabled={slotPast(pickupHour, m)} aria-pressed={pickupMinute === m} onClick={() => setPickupMinute(m)}
              className={`px-3 py-1.5 rounded-lg border text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                pickupMinute === m ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              :{String(m).padStart(2, '0')}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-slate-300" aria-live="polite">
          <strong className="text-orange-400">{pickupTime}</strong>
        </span>
      </div>
    )}
  </div>
)}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Home className="w-5 h-5 text-orange-500" /> Step 3 — Property Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Office', 'Shop', 'Other'] as PropertyType[]).map((prop) => (
                  <div key={prop} onClick={() => pickProperty(prop)} className={chipCls(propertyType === prop)}>
                    <span className="text-sm block">{prop}</span>
                  </div>
                ))}
              </div>
              {propertyType === 'Office' && (
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Workstations count</label>
                  <input type="number" min="1" value={officeWorkstations} onChange={(e) => setOfficeWorkstations(parseInt(e.target.value) || 0)} className={inputCls()} />
                </div>
              )}

               {propertyType === 'Other' && (
      <div>
        <label className="text-sm font-semibold text-slate-300 mb-1.5 block">Describe your property *</label>
        <textarea
          rows={3} maxLength={300} value={propertyOtherDetails}
          onChange={(e) => setPropertyOtherDetails(e.target.value)}
          placeholder="e.g. Godown with 2 rooms, 1st floor, no lift, narrow lane"
          className={`${inputCls(errors.property)} resize-none`}
        />
        <div className="flex justify-between mt-1">
          <FieldError msg={errors.property} />
          <span className="text-[11px] text-slate-500 ml-auto">{propertyOtherDetails.length}/300</span>
        </div>
      </div>
    )}
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" /> Step 4 — Select Vehicle Type
              </h2>
              {(pickupAddress.parking_access === 'narrow' || dropAddress.parking_access === 'narrow') && (
                <p className="text-xs text-amber-400">You told us a street is narrow. Large trucks may not fit.</p>
              )}
              <div className="space-y-4">
                {VEHICLE_OPTIONS.map((v) => (
                  <VehicleCard
                    key={v.type} type={v.type} title={v.title} description={v.description} capacity={v.capacity}
                    recommendedFor={v.recommendedFor} selected={vehicleType === v.type} onSelect={(t) => setVehicleType(t)}
                    badge={SUGGESTED_VEHICLE[propertyType] === v.type ? `Recommended for ${propertyType}` : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {/* {currentStep === 5 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" /> Step 5 — Select Packing Material & Service
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKING_OPTIONS.map((p) => (
                  <div key={p} onClick={() => togglePacking(p)} className={`${chipCls(selectedPacking.includes(p))} text-left`}>
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">{p}</span>
                      <span className="text-sm text-orange-400">{PACKING_INFO[p].price ? `+ ₹${PACKING_INFO[p].price.toLocaleString('en-IN')}` : '₹0'}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">{PACKING_INFO[p].desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {currentStep === 5 && (
  <div className="glass-card p-5 rounded-3xl space-y-4">
    <div>
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Package className="w-5 h-5 text-orange-500" /> Step 5 — Select Packing Material & Service
      </h2>
      <p className="text-xs text-slate-400 mt-1">Choose one or more. “No Packing” clears the others.</p>
    </div>

    {recommendedPacking.length > 0 && (
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs">
        <span className="text-slate-300">
          For <strong className="text-white">{propertyType}</strong> we suggest:{' '}
          <span className="text-orange-400">{recommendedPacking.join(' + ')}</span>
        </span>
        <button type="button" onClick={() => setSelectedPacking(recommendedPacking)} className="text-orange-400 font-semibold hover:underline">
          Use suggestion
        </button>
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group" aria-label="Packing options">
      {PACKING_OPTIONS.map((p) => {
        const on = selectedPacking.includes(p);
        const rec = recommendedPacking.includes(p);
        return (
          <button
            key={p} type="button" role="checkbox" aria-checked={on} onClick={() => togglePacking(p)}
            className={`text-left p-3 rounded-xl border transition-all ${
              on ? 'bg-orange-500/15 border-orange-500' : 'bg-slate-900/60 border-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center ${
                on ? 'bg-orange-500 border-orange-500' : 'border-slate-600'
              }`}>
                {on && <Check className="w-3 h-3 text-white" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-semibold ${on ? 'text-white' : 'text-slate-300'}`}>{p}</span>
                  <span className="text-sm text-orange-400 whitespace-nowrap">
                    {PACKING_INFO[p].price ? `+ ₹${PACKING_INFO[p].price.toLocaleString('en-IN')}` : '₹0'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{PACKING_INFO[p].desc}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Best for: {PACKING_INFO[p].bestFor}</p>
                {rec && (
                  <span className="inline-block mt-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                    Recommended for {propertyType}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>

    {selectedPacking.includes('Full Packing') && selectedPacking.length > 1 && !selectedPacking.includes('No Packing') && (
      <p className="text-xs text-amber-400">Full Packing already includes wrapping and boxes. The extra options may not be needed.</p>
    )}

    {/* Selected total */}
    <div className="border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between gap-2">
      <div className="text-xs text-slate-400 min-w-0">
        {selectedPacking.length === 0
          ? 'Nothing selected yet.'
          : <>{selectedPacking.length} selected: <span className="text-slate-200">{selectedPacking.join(', ')}</span></>}
      </div>
      <div className="text-sm text-slate-300">
        Packing total <strong className="text-orange-400 text-lg ml-1">₹{packingTotal.toLocaleString('en-IN')}</strong>
      </div>
    </div>
  </div>
)}

          {/* STEP 6 */}
          {/* {currentStep === 6 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-orange-500" /> Step 6 — Items to be Shipped
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ITEM_CATEGORIES.map((item) => (
                  <div key={item} onClick={() => toggleItem(item)} className={chipCls(selectedItems.includes(item))}>
                    <span className="text-xs block font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              {selectedItems.includes('Bike') && (
                <div>
                  <label className="text-xs text-orange-400 font-bold uppercase tracking-wider block mb-1">Bike make & model</label>
                  <input value={bikeMakeModel} onChange={(e) => setBikeMakeModel(e.target.value)} placeholder="e.g. Royal Enfield Classic 350" className={inputCls()} />
                </div>
              )}
              {selectedItems.includes('Car') && (
                <div className="space-y-2">
                  <label className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Car details</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input value={carMakeModel} onChange={(e) => setCarMakeModel(e.target.value)} placeholder="e.g. Hyundai Creta" className={inputCls()} />
                    <select value={carType} onChange={(e) => setCarType(e.target.value as any)} className={inputCls()}>
                      <option>Hatchback</option><option>Sedan</option><option>SUV</option><option>Luxury</option>
                    </select>
                  </div>
                  <p className="text-xs text-slate-400">Car transport is usually a separate vehicle. Our team will confirm it with you.</p>
                </div>
              )}
            </div>
          )} */}

          {currentStep === 6 && (
  <div className="glass-card p-5 rounded-3xl space-y-4">
    <div>
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Boxes className="w-5 h-5 text-orange-500" /> Step 6 — Items to be Shipped
      </h2>
      <p className="text-xs text-slate-400 mt-1">Pick a category, then set how many of each item you are moving.</p>
    </div>

    {/* Category tabs with count badges */}
    <div className="flex flex-wrap gap-1.5" role="tablist">
      {ITEM_CATEGORIES.map((c) => (
        <button
          key={c} type="button" role="tab" aria-selected={itemTab === c} onClick={() => setItemTab(c)}
          className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
            itemTab === c ? 'bg-orange-500/20 border-orange-500 text-white font-bold' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
          }`}
        >
          {c}
          {categoryCount(c) > 0 && (
            <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[10px] font-bold">
              {categoryCount(c)}
            </span>
          )}
        </button>
      ))}
    </div>

    {/* Item rows with quantity */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {rowsFor(itemTab).map((name) => {
        const q = itemQty[itemKey(itemTab, name)] || 0;
        return (
          <div
            key={name}
            className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-all ${
              q > 0 ? 'bg-orange-500/10 border-orange-500/60' : 'bg-slate-900 border-slate-700'
            }`}
          >
            <span className={`text-sm ${q > 0 ? 'text-white font-semibold' : 'text-slate-300'}`}>{name}</span>
            {q === 0 ? (
              <button type="button" onClick={() => setQty(itemTab, name, 1)}
                className="px-3 py-1 rounded-lg border border-slate-600 text-xs text-orange-400 hover:border-orange-500">
                Add
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button type="button" aria-label={`Decrease ${name}`} onClick={() => setQty(itemTab, name, q - 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-white hover:border-orange-500">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-white" aria-live="polite">{q}</span>
                <button type="button" aria-label={`Increase ${name}`} onClick={() => setQty(itemTab, name, q + 1)}
                  className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-white hover:border-orange-500">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Custom item */}
    <div className="flex gap-2">
      <input
        value={customName} onChange={(e) => setCustomName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
        placeholder={itemTab === 'Other' ? 'Type an item, e.g. Piano' : `Not listed? Add another ${itemTab.toLowerCase()} item`}
        className={inputCls()}
      />
      <button type="button" onClick={addCustom}
        className="px-4 rounded-xl border border-orange-500 text-orange-400 text-sm font-semibold hover:bg-orange-500/10 whitespace-nowrap">
        Add item
      </button>
    </div>

    {/* Selected summary */}
    <div className="border-t border-slate-800 pt-3 text-xs">
      {totalQty === 0 ? (
        <span className="text-slate-500">No items added yet.</span>
      ) : (
        <p className="text-slate-300">
          <strong className="text-orange-400">{totalQty} item{totalQty > 1 ? 's' : ''}</strong>
          <span className="text-slate-400 line-clamp-2"> {itemList.map((i) => `${i.name} ×${i.qty}`).join(', ')}</span>
        </p>
      )}
    </div>

    {selectedItems.includes('Bike') && (
      <div>
        <label className="text-xs text-orange-400 font-bold block mb-1">Bike make & model</label>
        <input value={bikeMakeModel} onChange={(e) => setBikeMakeModel(e.target.value)} placeholder="e.g. Royal Enfield Classic 350" className={inputCls()} />
      </div>
    )}
    {selectedItems.includes('Car') && (
      <div className="space-y-2">
        <label className="text-xs text-orange-400 font-bold block">Car details</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={carMakeModel} onChange={(e) => setCarMakeModel(e.target.value)} placeholder="e.g. Hyundai Creta" className={inputCls()} />
          <select value={carType} onChange={(e) => setCarType(e.target.value as any)} className={inputCls()}>
            <option>Hatchback</option><option>Sedan</option><option>SUV</option><option>Luxury</option>
          </select>
        </div>
        <p className="text-xs text-slate-400">Car transport is usually a separate vehicle. Our team will confirm it with you.</p>
      </div>
    )}
  </div>
)}

          {/* STEP 7 */}
          {currentStep === 7 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" /> Step 7 — Customer Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300 font-semibold mb-1 block">Full name *</label>
                  <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Ramesh Kumar" className={inputCls(errors.name)} />
                  <FieldError msg={errors.name} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">Mobile number (+91) *</label>
                    <input inputMode="numeric" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="98765 43210" className={inputCls(errors.phone)} />
                    <FieldError msg={errors.phone} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold mb-1 block">Email (optional)</label>
                    <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="name@gmail.com" className={inputCls(errors.email)} />
                    <FieldError msg={errors.email} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Alternate phone (optional)</label>
                    <input inputMode="numeric" value={alternatePhone} onChange={(e) => setAlternatePhone(e.target.value)} placeholder="99887 76655" className={inputCls()} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Special notes / fragile items</label>
                    <input value={specialRequirements} onChange={(e) => setSpecialRequirements(e.target.value)} placeholder="e.g. Glass table needs extra wrapping" className={inputCls()} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 */}
          {currentStep === 8 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-500" /> Step 8 — Verify your phone
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  We sent a 6-digit code to <strong className="text-white">{customerPhone}</strong>{' '}
                  <button type="button" onClick={() => setCurrentStep(7)} className="text-orange-400 hover:underline">Change number</button>
                </p>
              </div>
              {mockOtpMsg && process.env.NODE_ENV !== 'production' && (
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded-xl text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> <span>{mockOtpMsg}</span>
                </div>
              )}
              <div className="space-y-4 max-w-sm">
                <input
                  inputMode="numeric" maxLength={6} value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="------"
                  className="w-full bg-slate-900 border-2 border-orange-500 rounded-2xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white outline-none"
                />
                <div className="flex items-center justify-between text-xs">
                  <button type="button" disabled={cooldown > 0} onClick={handleSendOtp} className="text-orange-400 font-semibold hover:underline disabled:text-slate-600">
                    {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
                  </button>
                  <span className="text-slate-500 flex items-center gap-1"><Lock className="w-3 h-3" /> Secure verification</span>
                </div>
                <button type="button" onClick={handleVerifyOtp} className="w-full py-3.5 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow">
                  Verify and continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 9 */}
          {currentStep === 9 && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-white">Booking Summary</h2>
                  <span className="text-xs text-slate-400">Review your details before confirming</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Phone verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {([['Pickup', pickupAddress, 'text-orange-400'], ['Drop', dropAddress, 'text-blue-400']] as const).map(([name, a, color]) => (
                  <div key={name} className="space-y-1 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between"><span className={`${color} font-bold uppercase tracking-wider`}>{name}</span><EditBtn step={1} /></div>
                    <p className="text-slate-200 font-semibold text-sm">{a.address_line}</p>
                    {a.landmark && <p className="text-slate-400">Near {a.landmark}</p>}
                    <p className="text-slate-400">{a.city}, {a.state} - {a.pincode}</p>
                    <p className="text-slate-500">
                      {normFloor(a.floor) === '0' ? 'Ground floor' : `Floor ${normFloor(a.floor)}`}
                      {typeof a.has_lift === 'boolean' && ` · Lift: ${a.has_lift ? 'Yes' : 'No'}`}
                      {` · Parking: ${a.parking_access === 'easy' ? 'Easy' : a.parking_access === 'narrow' ? 'Narrow street' : '50m+ walk'}`}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
                <div><span className="text-slate-500 block">Date <EditBtn step={2} /></span><strong className="text-white text-sm">{pickupDate}</strong></div>
                <div><span className="text-slate-500 block">Time</span><strong className="text-white text-sm">{pickupTime}</strong></div>
                <div><span className="text-slate-500 block">Vehicle <EditBtn step={4} /></span><strong className="text-white text-sm">{vehicleType}</strong></div>
                <div><span className="text-slate-500 block">Property <EditBtn step={3} /></span><strong className="text-white text-sm">{propertyType}</strong></div>
              </div>

              {/* <div className="space-y-2 text-xs">
                {[
                  ['Distance', `${priceBreakdown.distanceKm} km`],
                  ['Name', customerName],
                  ['Phone', customerPhone],
                  ...(customerEmail ? [['Email', customerEmail]] : []),
                  ...(alternatePhone ? [['Alternate phone', alternatePhone]] : []),
                  ['Packing', selectedPacking.join(', ')],
                  ['Items', selectedItems.join(', ')],
                  ...(specialRequirements ? [['Notes', specialRequirements]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{k}</span><span className="text-white font-semibold text-right">{v}</span>
                  </div>
                ))}
              </div>  */}
              <div className="space-y-2 text-xs">
  {[
    ['Distance', `${priceBreakdown.distanceKm} km`],
    ['Name', customerName],
    ['Phone', customerPhone],
    ...(customerEmail ? [['Email', customerEmail]] : []),
    ...(alternatePhone ? [['Alternate phone', alternatePhone]] : []),
    ...(propertyType === 'Other' && propertyOtherDetails.trim()
      ? [['Property details', propertyOtherDetails.trim()]]
      : []),
    ['Packing', selectedPacking.join(', ')],
    ['Items', itemList.map((i) => `${i.name} ×${i.qty}`).join(', ')],
    ...(specialRequirements ? [['Notes', specialRequirements]] : []),
  ].map(([k, v]) => (
    <div key={k} className="flex justify-between gap-4 border-b border-slate-800 pb-2">
      <span className="text-slate-400 flex-shrink-0">{k}</span>
      <span className="text-white font-semibold text-right break-words min-w-0">{v}</span>
    </div>
  ))}
</div>

              <p className="text-xs text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> No payment now. Pay after service. Price includes GST.
              </p>
              <button
                type="button" disabled={isSubmitting} onClick={handleConfirmBooking}
                className="w-full py-4 rounded-xl brand-gradient-bg text-white font-black text-base shadow-glow flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? 'Saving your booking...' : (<><CheckCircle2 className="w-5 h-5" /> Confirm Booking</>)}
              </button>
            </div>
          )}

          {currentStep < 8 && (
            <div className="flex items-center justify-between pt-4">
              <button type="button" onClick={handlePrev} disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-xl glass-card text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 disabled:opacity-30 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button type="button" onClick={handleNext}
                className="px-7 py-3 rounded-xl brand-gradient-bg text-white font-bold text-sm shadow-glow flex items-center gap-2">
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
          {currentStep < 5 && (
            <p className="text-xs text-slate-400">Starting estimate. It updates as you choose vehicle and packing.</p>
          )}
          <PriceEstimatorWidget breakdown={priceBreakdown} pickupCity={pickupAddress.city} dropCity={dropAddress.city} />
        </div>
      </div>
    </div>
  );
}