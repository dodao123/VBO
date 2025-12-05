// app/api/gratitude/users/[userId]/route.ts
// API: GET /api/gratitude/users/:userId - Lấy thông tin user

import { NextResponse } from 'next/server';
import { supabase } from '@/api/Database/supabaseClient';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const { data, error } = await supabase
      .from('gratitude_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Không tìm thấy người dùng',
          },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Error in GET /api/gratitude/users/[userId]:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Không thể tải thông tin người dùng',
      },
      { status: 500 }
    );
  }
}

