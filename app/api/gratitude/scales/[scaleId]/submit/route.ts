// app/api/gratitude/scales/[scaleId]/submit/route.ts
// API: POST /api/gratitude/scales/:scaleId/submit - Submit bài test và nhận kết quả

import { NextResponse } from 'next/server';
import { GratitudeService } from '@/api/Services/gratitudeService';
import type { ScaleType, SubmitTestRequest } from '@/api/types/gratitude.types';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ scaleId: string }> }
) {
  try {
    const { scaleId } = await params;
    const body: SubmitTestRequest = await request.json();
    
    // Validate input
    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu câu trả lời không hợp lệ',
        },
        { status: 400 }
      );
    }

    if (!body.userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Thiếu thông tin người dùng',
        },
        { status: 400 }
      );
    }

    // Calculate score
    const result = await GratitudeService.scoreAnswers(
      scaleId as ScaleType,
      body.answers
    );

    // Save to database
    const savedResult = await GratitudeService.saveTestResult(
      scaleId as ScaleType,
      body.answers,
      result,
      body.userId,
      body.sessionId
    );

    return NextResponse.json({
      success: true,
      result,
      resultId: savedResult.id,
      message: 'Đã lưu kết quả thành công',
    });
  } catch (error: any) {
    console.error('Error in POST /api/gratitude/scales/[scaleId]/submit:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Không thể xử lý bài test',
        details: error,
      },
      { status: 500 }
    );
  }
}

