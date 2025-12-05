// app/api/gratitude/users/route.ts
// API: POST /api/gratitude/users - Tạo user mới

import { NextResponse } from 'next/server';
import { supabase } from '@/api/Database/supabaseClient';
import type { CreateUserRequest } from '@/api/types/gratitude.types';

export async function POST(request: Request) {
  try {
    const body: CreateUserRequest = await request.json();

    // Validate required fields
    if (!body.full_name || body.full_name.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Vui lòng nhập họ tên',
        },
        { status: 400 }
      );
    }

    // Insert user
    const { data, error } = await supabase
      .from('gratitude_users')
      .insert({
        full_name: body.full_name.trim(),
        email: body.email || null,
        phone: body.phone || null,
        age: body.age || null,
        gender: body.gender || null,
        occupation: body.occupation || null,
        education_level: body.education_level || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw new Error('Không thể tạo thông tin người dùng');
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Đã lưu thông tin thành công',
    });
  } catch (error: any) {
    console.error('Error in POST /api/gratitude/users:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Có lỗi xảy ra',
      },
      { status: 500 }
    );
  }
}

