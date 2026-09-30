import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bookings || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, driver_name, driver_phone, vehicle_number, assigned_vehicle_id, assigned_driver_id, final_price } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status) updatePayload.status = status;
    if (driver_name !== undefined) updatePayload.driver_name = driver_name;
    if (driver_phone !== undefined) updatePayload.driver_phone = driver_phone;
    if (vehicle_number !== undefined) updatePayload.vehicle_number = vehicle_number;
    if (assigned_vehicle_id !== undefined) updatePayload.assigned_vehicle_id = assigned_vehicle_id;
    if (assigned_driver_id !== undefined) updatePayload.assigned_driver_id = assigned_driver_id;
    if (final_price !== undefined) updatePayload.final_price = final_price;

    const { data, error } = await supabase
      .from('bookings')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to update booking' },
      { status: 500 }
    );
  }
}
