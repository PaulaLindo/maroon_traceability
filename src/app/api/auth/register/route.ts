import { NextRequest, NextResponse } from 'next/server';
import type { RegistrationData } from '@/core/types/adapter';
import { registerUserWithSupabase } from '@/lib/server/supabaseRegisterUser';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegistrationData;

    if (!body?.email || !body?.password || !body?.name || !body?.role) {
      return NextResponse.json(
        { success: false, error: 'Email, password, name, and role are required.' },
        { status: 400 },
      );
    }

    const result = await registerUserWithSupabase(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status ?? 500 },
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('POST /api/auth/register error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      },
      { status: 500 },
    );
  }
}
