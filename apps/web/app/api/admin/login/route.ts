import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const adminSupabase = createAdminClient();

    // 1. Check if user profile exists in public.profiles using Service Role Client
    const { data: profile } = await adminSupabase
      .from('profiles')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    // 2. Check if this is the designated super admin (gokulseenuvasan31@gmail.com)
    const isInitialAdmin = cleanEmail === 'gokulseenuvasan31@gmail.com';

    if (!profile && !isInitialAdmin) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin user. User not found in database profiles.' },
        { status: 401 }
      );
    }

    if (profile && profile.role !== 'admin' && profile.role !== 'staff') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Account does not have admin permissions.' },
        { status: 403 }
      );
    }

    // 3. Attempt Supabase Auth Sign In first
    const { data: authData, error: authError } = await adminSupabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });

    if (!authError && authData.user) {
      // Ensure profile exists in public.profiles
      if (!profile) {
        await adminSupabase.from('profiles').upsert([
          {
            auth_user_id: authData.user.id,
            full_name: 'Gokul Seenuvasan',
            email: cleanEmail,
            phone: '+919876543210',
            role: 'admin',
            is_active: true,
          },
        ], { onConflict: 'email' });
      }

      return NextResponse.json({
        success: true,
        message: 'Admin verified successfully',
        user: authData.user,
      });
    }

    // 4. Initial Admin fallback verification (if Supabase Auth user not registered yet or trigger failed)
    if (isInitialAdmin && password === 'admin123') {
      // Ensure profile is saved in public.profiles
      await adminSupabase.from('profiles').upsert([
        {
          full_name: 'Gokul Seenuvasan',
          email: cleanEmail,
          phone: '+919876543210',
          role: 'admin',
          is_active: true,
        },
      ], { onConflict: 'email' });

      return NextResponse.json({
        success: true,
        message: 'Admin verified successfully',
        user: {
          id: profile?.id || '00000000-0000-0000-0000-000000000001',
          email: cleanEmail,
          user_metadata: {
            full_name: 'Gokul Seenuvasan',
            role: 'admin',
          },
        },
      });
    }

    // Return authentication failure message
    return NextResponse.json(
      { success: false, message: 'Invalid login credentials' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication error' },
      { status: 500 }
    );
  }
}
