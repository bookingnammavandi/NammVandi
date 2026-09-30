import './setup';
import test from 'node:test';
import assert from 'node:assert';
import { GET, POST, PUT, DELETE } from '../app/api/admin/vehicles/route';
import { NextRequest } from 'next/server';

let createdVehicleId: string | null = null;
const testVehicleNumber = `TN ${Math.floor(10 + Math.random() * 89)} XY ${Math.floor(1000 + Math.random() * 8999)}`;

test('Vehicles API Suite - GET /api/admin/vehicles (PASS)', async () => {
  const req = new NextRequest('http://localhost:3000/api/admin/vehicles', { method: 'GET' });
  const res = await GET(req);
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
  assert.strictEqual(Array.isArray(data.data), true);
});

test('Vehicles API Suite - POST /api/admin/vehicles - Missing Required Fields (FAIL)', async () => {
  // Test 1: Missing vehicle_number
  const req1 = new NextRequest('http://localhost:3000/api/admin/vehicles', {
    method: 'POST',
    body: JSON.stringify({
      vehicle_type: 'Eicher Tempo',
      vehicle_model: 'Eicher Pro 2059',
    }),
  });
  const res1 = await POST(req1);
  const data1 = await res1.json();

  assert.strictEqual(res1.status, 400);
  assert.strictEqual(data1.success, false);
  assert.strictEqual(data1.message, 'Vehicle registration number is required');

  // Test 2: Missing vehicle_type
  const req2 = new NextRequest('http://localhost:3000/api/admin/vehicles', {
    method: 'POST',
    body: JSON.stringify({
      vehicle_number: 'TN 99 AB 9999',
      vehicle_model: 'Eicher Pro 2059',
    }),
  });
  const res2 = await POST(req2);
  const data2 = await res2.json();

  assert.strictEqual(res2.status, 400);
  assert.strictEqual(data2.success, false);
  assert.strictEqual(data2.message, 'Vehicle type category is required');

  // Test 3: Missing vehicle_model
  const req3 = new NextRequest('http://localhost:3000/api/admin/vehicles', {
    method: 'POST',
    body: JSON.stringify({
      vehicle_number: 'TN 99 AB 9999',
      vehicle_type: 'Eicher Tempo',
    }),
  });
  const res3 = await POST(req3);
  const data3 = await res3.json();

  assert.strictEqual(res3.status, 400);
  assert.strictEqual(data3.success, false);
  assert.strictEqual(data3.message, 'Vehicle model is required');
});

test('Vehicles API Suite - POST /api/admin/vehicles - Add New Vehicle to Supabase DB (PASS)', async () => {
  const req = new NextRequest('http://localhost:3000/api/admin/vehicles', {
    method: 'POST',
    body: JSON.stringify({
      vehicle_number: testVehicleNumber,
      vehicle_type: 'Mini Truck',
      vehicle_model: 'Tata Ace Gold EV',
      capacity_kg: 1200,
      driver_name: 'Test Driver Kumar',
      driver_phone: '+919988776655',
      contact_number: '+919988776655',
      is_available: true,
      is_active: true,
    }),
  });

  const res = await POST(req);
  const data = await res.json();

  assert.strictEqual(res.status, 201);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.message, 'Vehicle added successfully');
  assert.strictEqual(data.data.vehicle_number, testVehicleNumber.toUpperCase());
  assert.strictEqual(data.data.driver_name, 'Test Driver Kumar');
  assert.ok(data.data.id, 'Vehicle ID should be returned from DB');

  createdVehicleId = data.data.id;
});

test('Vehicles API Suite - PUT /api/admin/vehicles - Missing or Invalid Vehicle ID (FAIL)', async () => {
  // Missing ID
  const req1 = new NextRequest('http://localhost:3000/api/admin/vehicles', {
    method: 'PUT',
    body: JSON.stringify({
      driver_name: 'New Driver',
    }),
  });
  const res1 = await PUT(req1);
  const data1 = await res1.json();

  assert.strictEqual(res1.status, 400);
  assert.strictEqual(data1.success, false);
  assert.strictEqual(data1.message, 'Vehicle ID is required for update');

  // Non-existent ID
  const fakeId = '00000000-0000-0000-0000-000000000000';
  const req2 = new NextRequest('http://localhost:3000/api/admin/vehicles', {
    method: 'PUT',
    body: JSON.stringify({
      id: fakeId,
      driver_name: 'Ghost Driver',
    }),
  });
  const res2 = await PUT(req2);
  const data2 = await res2.json();

  assert.strictEqual(res2.status, 404);
  assert.strictEqual(data2.success, false);
  assert.strictEqual(data2.message, `Vehicle with ID ${fakeId} not found`);
});

test('Vehicles API Suite - PUT /api/admin/vehicles - Edit Vehicle Row in Supabase DB (PASS)', async () => {
  assert.ok(createdVehicleId, 'Created vehicle ID must exist for update test');

  const req = new NextRequest('http://localhost:3000/api/admin/vehicles', {
    method: 'PUT',
    body: JSON.stringify({
      id: createdVehicleId,
      vehicle_model: 'Tata Ace Gold Ultra',
      capacity_kg: 1800,
      driver_name: 'Updated Driver Velu',
      driver_phone: '+919988776600',
      is_available: false,
    }),
  });

  const res = await PUT(req);
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.message, 'Vehicle updated successfully');
  assert.strictEqual(data.data.driver_name, 'Updated Driver Velu');
  assert.strictEqual(data.data.capacity_kg, 1800);
  assert.strictEqual(data.data.is_available, false);
});

test('Vehicles API Suite - DELETE /api/admin/vehicles - Delete Vehicle Row (PASS & FAIL)', async () => {
  // FAIL case: Invalid ID
  const fakeId = '00000000-0000-0000-0000-000000000000';
  const reqFail = new NextRequest(`http://localhost:3000/api/admin/vehicles?id=${fakeId}`, {
    method: 'DELETE',
  });
  const resFail = await DELETE(reqFail);
  const dataFail = await resFail.json();

  assert.strictEqual(resFail.status, 404);
  assert.strictEqual(dataFail.success, false);

  // PASS case: Delete created vehicle
  assert.ok(createdVehicleId, 'Created vehicle ID must exist for delete test');
  const reqPass = new NextRequest(`http://localhost:3000/api/admin/vehicles?id=${createdVehicleId}`, {
    method: 'DELETE',
  });
  const resPass = await DELETE(reqPass);
  const dataPass = await resPass.json();

  assert.strictEqual(resPass.status, 200);
  assert.strictEqual(dataPass.success, true);
  assert.strictEqual(dataPass.message, 'Vehicle deleted successfully');
});
