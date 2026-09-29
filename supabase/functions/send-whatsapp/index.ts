// Supabase Edge Function: send-whatsapp
// Integrates with official WhatsApp Cloud API or SMS provider

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
    const { bookingId, recipientPhone, customerName, vehicleNumber, driverName, driverPhone, pickupCity, dropCity, pickupDate } = await req.json();

    if (!recipientPhone || !bookingId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Recipient phone and booking ID are required' }),
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const token = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');

    const messageText = `🚛 *NammaMove Booking Update*\n\n` +
      `Hello ${customerName || 'Customer'},\n` +
      `Your booking *${bookingId}* has been updated!\n\n` +
      `📍 *Route:* ${pickupCity || 'Pickup'} ➔ ${dropCity || 'Drop'}\n` +
      `📅 *Date:* ${pickupDate || 'Scheduled'}\n` +
      `🚛 *Vehicle:* ${vehicleNumber || 'Assigned'}\n` +
      `👨‍✈️ *Driver:* ${driverName || 'Driver Assigned'} (${driverPhone || 'N/A'})\n\n` +
      `Thank you for trusting NammaMove! Our driver will reach out prior to arrival.`;

    let providerStatus = 'simulated';

    if (token && phoneNumberId) {
      const waRes = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipientPhone.replace('+', ''),
          type: 'text',
          text: { body: messageText },
        }),
      });

      if (waRes.ok) {
        providerStatus = 'sent';
      } else {
        const errJson = await waRes.json();
        console.error('[WhatsApp Cloud API Error]', errJson);
        providerStatus = 'failed';
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: providerStatus === 'sent' ? 'WhatsApp message dispatched successfully' : 'WhatsApp notification simulated (configure WHATSAPP_ACCESS_TOKEN for live sending)',
        providerStatus,
        details: {
          recipient: recipientPhone,
          message: messageText,
        },
      }),
      { status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'WhatsApp notification failed' }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
});
