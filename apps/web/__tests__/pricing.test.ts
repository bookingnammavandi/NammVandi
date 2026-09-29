import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateEstimatedPrice } from '../lib/pricing';

describe('Pricing Engine Test Suite', () => {
  it('should calculate base price and multipliers correctly', () => {
    const result = calculateEstimatedPrice({
      pickupCity: 'Chennai',
      dropCity: 'Chennai',
      vehicleType: 'Eicher Tempo',
      propertyType: '2 BHK',
      packingTypes: ['Plastic Wrapper'],
      pickupFloor: '2',
      dropFloor: '1',
      estimatedDistanceKm: 20,
    });

    assert.strictEqual(result.basePrice, 1500);
    assert.strictEqual(result.vehicleMultiplier, 1.7);
    assert.strictEqual(result.floorCharge, 750); // (2 + 1) * 250
    assert.strictEqual(result.packingCharge, 400); // Plastic wrapper
    assert.ok(result.totalEstimatedPrice > 1500);
    assert.ok(result.disclaimer.includes('Estimated price'));
  });

  it('should apply intercity default distance when distance is missing', () => {
    const result = calculateEstimatedPrice({
      pickupCity: 'Chennai',
      dropCity: 'Coimbatore',
      vehicleType: 'Mini Truck',
      propertyType: '1 BHK',
      packingTypes: ['No Packing'],
      pickupFloor: '0',
      dropFloor: '0',
    });

    assert.ok(result.distanceKm > 50);
  });
});
