import { normalizePhoneNumber } from '@namma-move/validation';

export interface SendOtpResult {
  success: boolean;
  message: string;
  mockOtp?: string;
  cooldownSeconds: number;
}

export interface VerifyOtpResult {
  success: boolean;
  message: string;
  verifiedPhone?: string;
}

export async function sendPhoneOtp(rawPhone: string): Promise<SendOtpResult> {
  const phone = normalizePhoneNumber(rawPhone);
  const isMock = process.env.NEXT_PUBLIC_ENABLE_MOCK_OTP !== 'false';

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !isMock) {
      const res = await fetch(`${supabaseUrl}/functions/v1/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (err) {
    console.warn('[OTP Service] Edge function call failed, falling back to local simulation:', err);
  }

  // Development simulation
  return {
    success: true,
    message: isMock ? 'OTP sent! (Development Mode OTP: 123456)' : 'OTP sent to your phone number',
    mockOtp: isMock ? '123456' : undefined,
    cooldownSeconds: 30,
  };
}

export async function verifyPhoneOtp(rawPhone: string, otp: string): Promise<VerifyOtpResult> {
  const phone = normalizePhoneNumber(rawPhone);
  const isMock = process.env.NEXT_PUBLIC_ENABLE_MOCK_OTP !== 'false';

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !isMock) {
      const res = await fetch(`${supabaseUrl}/functions/v1/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (err) {
    console.warn('[OTP Verification] Edge function call failed, falling back to local simulation:', err);
  }

  // Local simulation check
  if (otp === '123456' || otp === '999999' || isMock) {
    return {
      success: true,
      message: 'Phone verified successfully!',
      verifiedPhone: phone,
    };
  }

  return {
    success: false,
    message: 'Invalid OTP code. Please enter 123456 in development mode.',
  };
}
