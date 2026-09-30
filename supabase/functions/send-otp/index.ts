// Supabase Edge Function: send-otp
// Supports Twilio, MSG91, or local Mock OTP in development

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
    const { phone } = await req.json();

    if (!phone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Phone number is required' }),
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const provider = Deno.env.get('OTP_PROVIDER') || 'mock';
    const enableMockOtp = Deno.env.get('NEXT_PUBLIC_ENABLE_MOCK_OTP') !== 'false';

    let generatedOtp = '123456';
    if (!enableMockOtp) {
      generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    }

    console.log(`[Send-OTP] Provider: ${provider}, Phone: ${phone}, OTP: ${enableMockOtp ? generatedOtp : '******'}`);

    if (provider === 'twilio') {
      const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
      const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
      const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER');
      
      if (accountSid && authToken && twilioPhone) {
        const body = new URLSearchParams({
          To: phone,
          From: twilioPhone,
          Body: `Your NammaVandi OTP code is ${generatedOtp}. Valid for 10 minutes. Do not share it with anyone.`,
        });

        const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error('[Twilio Error]', errText);
        }
      }
    } else if (provider === 'msg91') {
      const authKey = Deno.env.get('MSG91_AUTH_KEY');
      const templateId = Deno.env.get('MSG91_TEMPLATE_ID');
      if (authKey && templateId) {
        await fetch(`https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${phone.replace('+', '')}`, {
          method: 'POST',
          headers: { 'authkey': authKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp: generatedOtp }),
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'OTP sent successfully',
        mockOtp: enableMockOtp ? generatedOtp : undefined,
        cooldownSeconds: 30,
      }),
      { status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Failed to send OTP' }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
});
