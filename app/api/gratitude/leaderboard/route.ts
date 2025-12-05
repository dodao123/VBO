// app/api/gratitude/leaderboard/route.ts
// API: GET /api/gratitude/leaderboard - Lấy bảng xếp hạng

import { NextResponse } from 'next/server';
import { supabase } from '@/api/Database/supabaseClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const scaleId = searchParams.get('scale'); // Optional filter by scale
    const limit = parseInt(searchParams.get('limit') || '10');

    // Step 1: Get test results
    let query = supabase
      .from('gratitude_test_results')
      .select('id, total_score, level_name, completed_at, scale_id, user_id')
      .order('total_score', { ascending: false })
      .order('completed_at', { ascending: true })
      .limit(limit);

    // Filter by scale if provided
    if (scaleId) {
      query = query.eq('scale_id', scaleId);
    }

    const { data: results, error: resultsError } = await query;

    if (resultsError) {
      console.error('Error fetching results:', resultsError);
      throw new Error('Không thể tải kết quả: ' + resultsError.message);
    }

    if (!results || results.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Step 2: Get user info for each result
    const userIds = results.map(r => r.user_id).filter(id => id !== null);
    
    const { data: users, error: usersError } = await supabase
      .from('gratitude_users')
      .select('id, full_name, age')
      .in('id', userIds);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      // Continue without user info rather than failing
    }

    // Create a map of users by id
    const userMap = new Map();
    users?.forEach(user => {
      userMap.set(user.id, user);
    });

    // Step 3: Combine data
    const leaderboard = results.map((result, index) => {
      const user = userMap.get(result.user_id);
      return {
        rank: index + 1,
        id: result.id,
        userName: user?.full_name || 'Ẩn danh',
        age: user?.age || null,
        totalScore: result.total_score,
        levelName: result.level_name,
        scaleId: result.scale_id,
        completedAt: result.completed_at,
      };
    });

    return NextResponse.json({
      success: true,
      data: leaderboard,
    });
  } catch (error: any) {
    console.error('Error in GET /api/gratitude/leaderboard:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Không thể tải bảng xếp hạng',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

