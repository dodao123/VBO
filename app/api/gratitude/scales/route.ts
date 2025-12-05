// app/api/gratitude/scales/route.ts
// API: GET /api/gratitude/scales - Lấy danh sách tất cả thang đo

import { NextResponse } from 'next/server';
import { GratitudeService } from '@/api/Services/gratitudeService';

export async function GET() {
  try {
    const scales = await GratitudeService.getAllScales();
    
    return NextResponse.json({
      success: true,
      data: scales,
    });
  } catch (error: any) {
    console.error('Error in GET /api/gratitude/scales:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Không thể tải danh sách thang đo',
      },
      { status: 500 }
    );
  }
}

