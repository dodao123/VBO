// app/api/gratitude/scales/[scaleId]/route.ts
// API: GET /api/gratitude/scales/:scaleId - Lấy thông tin một thang đo

import { NextResponse } from 'next/server';
import { GratitudeService } from '@/api/Services/gratitudeService';
import type { ScaleType } from '@/api/types/gratitude.types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ scaleId: string }> }
) {
  try {
    const { scaleId } = await params;
    
    const scale = await GratitudeService.getScaleById(scaleId as ScaleType);
    
    if (!scale) {
      return NextResponse.json(
        {
          success: false,
          error: 'Không tìm thấy thang đo',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: scale,
    });
  } catch (error: any) {
    console.error('Error in GET /api/gratitude/scales/[scaleId]:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Không thể tải thang đo',
      },
      { status: 500 }
    );
  }
}

