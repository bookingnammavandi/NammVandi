import { VehicleType, PackingType, PropertyType } from '@namma-move/types';

export interface EstimatePriceInput {
  pickupCity: string;
  dropCity: string;
  vehicleType: VehicleType;
  propertyType: PropertyType;
  packingTypes: PackingType[];
  pickupFloor: string | number;
  dropFloor: string | number;
  estimatedDistanceKm?: number;
}

export interface PriceBreakdown {
  basePrice: number;
  distanceKm: number;
  distanceCharge: number;
  vehicleMultiplier: number;
  floorCharge: number;
  packingCharge: number;
  totalEstimatedPrice: number;
  disclaimer: string;
}

const VEHICLE_MULTIPLIERS: Record<VehicleType, number> = {
  'Mini Truck': 1.0,
  'Pickup Truck': 1.3,
  'Eicher Tempo': 1.7,
  'Large Truck': 2.5,
  'Other': 1.2,
};

const PACKING_PRICES: Record<PackingType, number> = {
  'No Packing': 0,
  'Plastic Wrapper': 400,
  'Paper Box': 500,
  'Wooden Box': 1000,
  'Partial Packing': 800,
  'Full Packing': 1800,
};

export function calculateEstimatedPrice(input: EstimatePriceInput): PriceBreakdown {
  const basePrice = 1500;
  const perKmPrice = 40;

  // Intercity vs Local distance heuristic fallback if Google Maps API key isn't set
  let distanceKm = input.estimatedDistanceKm || 25;
  if (input.pickupCity.toLowerCase() !== input.dropCity.toLowerCase() && !input.estimatedDistanceKm) {
    distanceKm = 350; // Default inter-city distance estimate
  }

  const vehicleMultiplier = VEHICLE_MULTIPLIERS[input.vehicleType] || 1.0;
  const distanceCharge = Math.round(distanceKm * perKmPrice * vehicleMultiplier);

  const pFloor = parseInt(String(input.pickupFloor), 10) || 0;
  const dFloor = parseInt(String(input.dropFloor), 10) || 0;
  const floorCharge = (pFloor + dFloor) * 250;

  const packingCharge = input.packingTypes.reduce((sum, p) => sum + (PACKING_PRICES[p] || 0), 0);

  const totalEstimatedPrice = Math.round(basePrice + distanceCharge + floorCharge + packingCharge);

  return {
    basePrice,
    distanceKm,
    distanceCharge,
    vehicleMultiplier,
    floorCharge,
    packingCharge,
    totalEstimatedPrice,
    disclaimer: 'Estimated price. Final price will be confirmed by NammaVandi operational team.',
  };
}
