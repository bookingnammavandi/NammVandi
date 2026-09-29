// Supabase Edge Function: verify-otp

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return new Response(
        JSON.stringify({ success: false, error: 'Phone and OTP are required' }),
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const enableMockOtp = Deno.env.get('NEXT_PUBLIC_ENABLE_MOCK_OTP') !== 'false';

    let isVerified = false;

    if (enableMockOtp && (otp === '123456' || otp === '999999')) {
      isVerified = true;
    } else {
      // In production, match stored session token / Redis / Supabase auth OTP
      isVerified = otp.length === 6;
    }

    if (!isVerified) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or expired OTP' }),
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Phone number verified successfully',
        verified_phone: phone,
      }),
      { status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'OTP verification failed' }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
});
