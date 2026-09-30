import test from 'node:test';
import assert from 'node:assert';
import { POST } from '../app/api/admin/login/route';
import { NextRequest } from 'next/server';

test('Admin Login API - Valid Admin Credentials', async () => {
  const req = new NextRequest('http://localhost:3000/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'bookingnammavandi@gmail.com',
      password: 'admin123',
    }),
  });

  const res = await POST(req);
  const data = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.message, 'Admin verified successfully');
  assert.strictEqual(data.user.email, 'bookingnammavandi@gmail.com');
});

test('Admin Login API - Invalid Password', async () => {
  const req = new NextRequest('http://localhost:3000/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'bookingnammavandi@gmail.com',
      password: 'wrongpassword',
    }),
  });

  const res = await POST(req);
  const data = await res.json();

  assert.strictEqual(res.status, 401);
  assert.strictEqual(data.success, false);
  assert.strictEqual(data.message, 'Invalid login credentials');
});

test('Admin Login API - Missing Fields', async () => {
  const req = new NextRequest('http://localhost:3000/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      email: '',
      password: '',
    }),
  });

  const res = await POST(req);
  const data = await res.json();

  assert.strictEqual(res.status, 400);
  assert.strictEqual(data.success, false);
  assert.strictEqual(data.message, 'Email and password are required');
});
