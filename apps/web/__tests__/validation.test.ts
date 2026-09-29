import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import { normalizePhoneNumber, phoneRegex } from '@namma-move/validation';

describe('Validation Helpers Test Suite', () => {
  it('should normalize 10-digit Indian phone numbers to +91 format', () => {
    assert.strictEqual(normalizePhoneNumber('9876543210'), '+919876543210');
    assert.strictEqual(normalizePhoneNumber('919876543210'), '+919876543210');
    assert.strictEqual(normalizePhoneNumber('+919876543210'), '+919876543210');
  });

  it('should validate Indian mobile numbers correctly', () => {
    assert.strictEqual(phoneRegex.test('9876543210'), true);
    assert.strictEqual(phoneRegex.test('8876543210'), true);
    assert.strictEqual(phoneRegex.test('1234567890'), false);
    assert.strictEqual(phoneRegex.test('98765'), false);
  });
});
