// app/api/gratitude/results/[resultId]/route.ts
// API: GET /api/gratitude/results/:resultId - Xem lại kết quả đã lưu

import { NextResponse } from 'next/server';
import { GratitudeService } from '@/api/Services/gratitudeService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ resultId: string }> }
) {
  try {
    const { resultId } = await params;
    
    const result = await GratitudeService.getResultById(resultId);
    
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: 'Không tìm thấy kết quả',
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error in GET /api/gratitude/results/[resultId]:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Không thể tải kết quả',
      },
      { status: 500 }
    );
  }
}

