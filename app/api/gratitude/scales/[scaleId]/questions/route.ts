// app/api/gratitude/scales/[scaleId]/questions/route.ts
// API: GET /api/gratitude/scales/:scaleId/questions - Lấy câu hỏi của thang đo

import { NextResponse } from 'next/server';
import { GratitudeService } from '@/api/Services/gratitudeService';
import type { ScaleType } from '@/api/types/gratitude.types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ scaleId: string }> }
) {
  try {
    const { scaleId } = await params;
    
    const questions = await GratitudeService.getQuestionsByScale(
      scaleId as ScaleType
    );
    
    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error: any) {
    console.error('Error in GET /api/gratitude/scales/[scaleId]/questions:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Không thể tải câu hỏi',
      },
      { status: 500 }
    );
  }
}

