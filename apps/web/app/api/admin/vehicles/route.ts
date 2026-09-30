import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { data: vehicles, error } = await supabase
      .from('vehicles')
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
      data: vehicles || [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      vehicle_number,
      vehicle_type,
      vehicle_model,
      capacity_kg,
      contact_number,
      driver_name,
      driver_phone,
      is_available = true,
      is_active = true,
    } = body;

    // Validation for missing required fields
    if (!vehicle_number || !vehicle_number.trim()) {
      return NextResponse.json(
        { success: false, message: 'Vehicle registration number is required' },
        { status: 400 }
      );
    }

    if (!vehicle_type || !vehicle_type.trim()) {
      return NextResponse.json(
        { success: false, message: 'Vehicle type category is required' },
        { status: 400 }
      );
    }

    if (!vehicle_model || !vehicle_model.trim()) {
      return NextResponse.json(
        { success: false, message: 'Vehicle model is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const newVehicle = {
      vehicle_number: vehicle_number.trim().toUpperCase(),
      vehicle_type: vehicle_type.trim(),
      vehicle_model: vehicle_model.trim(),
      capacity_kg: capacity_kg ? Number(capacity_kg) : 1000,
      contact_number: contact_number || driver_phone || null,
      driver_name: driver_name ? driver_name.trim() : null,
      driver_phone: driver_phone ? driver_phone.trim() : null,
      is_available: Boolean(is_available),
      is_active: Boolean(is_active),
    };

    const { data, error } = await supabase
      .from('vehicles')
      .insert([newVehicle])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Vehicle added successfully',
        data,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to add vehicle' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateFields } = body;

    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json(
        { success: false, message: 'Vehicle ID is required for update' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Verify existing vehicle first
    const { data: existing, error: findError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('id', id.trim())
      .maybeSingle();

    if (findError || !existing) {
      return NextResponse.json(
        { success: false, message: `Vehicle with ID ${id} not found` },
        { status: 404 }
      );
    }

    // Clean up fields to update
    const cleanedUpdates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updateFields.vehicle_number !== undefined) {
      if (!updateFields.vehicle_number.trim()) {
        return NextResponse.json(
          { success: false, message: 'Vehicle number cannot be empty' },
          { status: 400 }
        );
      }
      cleanedUpdates.vehicle_number = updateFields.vehicle_number.trim().toUpperCase();
    }

    if (updateFields.vehicle_type !== undefined) cleanedUpdates.vehicle_type = updateFields.vehicle_type;
    if (updateFields.vehicle_model !== undefined) cleanedUpdates.vehicle_model = updateFields.vehicle_model;
    if (updateFields.capacity_kg !== undefined) cleanedUpdates.capacity_kg = Number(updateFields.capacity_kg);
    if (updateFields.contact_number !== undefined) cleanedUpdates.contact_number = updateFields.contact_number;
    if (updateFields.driver_name !== undefined) cleanedUpdates.driver_name = updateFields.driver_name;
    if (updateFields.driver_phone !== undefined) cleanedUpdates.driver_phone = updateFields.driver_phone;
    if (updateFields.is_available !== undefined) cleanedUpdates.is_available = Boolean(updateFields.is_available);
    if (updateFields.is_active !== undefined) cleanedUpdates.is_active = Boolean(updateFields.is_active);

    const { data, error } = await supabase
      .from('vehicles')
      .update(cleanedUpdates)
      .eq('id', id.trim())
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
      message: 'Vehicle updated successfully',
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to update vehicle' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch (e) {
        // query param was main source
      }
    }

    if (!id || typeof id !== 'string' || !id.trim()) {
      return NextResponse.json(
        { success: false, message: 'Vehicle ID is required for deletion' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: existing, error: findError } = await supabase
      .from('vehicles')
      .select('id')
      .eq('id', id.trim())
      .maybeSingle();

    if (findError || !existing) {
      return NextResponse.json(
        { success: false, message: `Vehicle with ID ${id} not found` },
        { status: 404 }
      );
    }

    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id.trim());

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Vehicle deleted successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to delete vehicle' },
      { status: 500 }
    );
  }
}
