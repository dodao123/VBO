// app/API/Services/gratitudeService.ts
// Business logic for Gratitude Scales

import { supabase } from '@/api/Database/supabaseClient';
import type {
  ScaleType,
  GratitudeScale,
  GratitudeQuestion,
  ScoreLevel,
  ScaleResult,
  InterpretedAnswer,
  TestResult,
} from '@/api/types/gratitude.types';

/**
 * Service chính để xử lý các thang đo lòng biết ơn
 */
export class GratitudeService {
  /**
   * Lấy tất cả các thang đo có sẵn
   */
  static async getAllScales(): Promise<GratitudeScale[]> {
    const { data, error } = await supabase
      .from('gratitude_scales')
      .select('*')
      .order('min_age', { ascending: true });

    if (error) {
      console.error('Error fetching scales:', error);
      throw new Error('Không thể tải danh sách thang đo');
    }

    return data || [];
  }

  /**
   * Lấy thông tin một thang đo cụ thể
   */
  static async getScaleById(scaleId: ScaleType): Promise<GratitudeScale | null> {
    const { data, error } = await supabase
      .from('gratitude_scales')
      .select('*')
      .eq('id', scaleId)
      .single();

    if (error) {
      console.error('Error fetching scale:', error);
      return null;
    }

    return data;
  }

  /**
   * Lấy tất cả câu hỏi của một thang đo
   */
  static async getQuestionsByScale(scaleId: ScaleType): Promise<GratitudeQuestion[]> {
    const { data, error } = await supabase
      .from('gratitude_questions')
      .select('*')
      .eq('scale_id', scaleId)
      .order('order_number', { ascending: true });

    if (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Không thể tải câu hỏi');
    }

    return data || [];
  }

  /**
   * Lấy các mức độ điểm của một thang đo
   */
  static async getScoreLevels(scaleId: ScaleType): Promise<ScoreLevel[]> {
    const { data, error } = await supabase
      .from('gratitude_score_levels')
      .select('*')
      .eq('scale_id', scaleId)
      .order('min_score', { ascending: true });

    if (error) {
      console.error('Error fetching score levels:', error);
      throw new Error('Không thể tải mức độ điểm');
    }

    return data || [];
  }

  /**
   * Tính điểm cho một bài test
   */
  static async scoreAnswers(
    scaleId: ScaleType,
    answers: number[]
  ): Promise<ScaleResult> {
    // Validate
    const scale = await this.getScaleById(scaleId);
    if (!scale) {
      throw new Error('Thang đo không tồn tại');
    }

    const questions = await this.getQuestionsByScale(scaleId);
    if (questions.length !== answers.length) {
      throw new Error(
        `Số câu trả lời (${answers.length}) không khớp với số câu hỏi (${questions.length})`
      );
    }

    // Tính điểm và xử lý reverse scoring
    const interpretedAnswers: InterpretedAnswer[] = [];
    let totalScore = 0;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const originalScore = answers[i];
      
      // Validate score range
      if (originalScore < question.min_score || originalScore > question.max_score) {
        throw new Error(
          `Điểm câu ${i + 1} (${originalScore}) không hợp lệ. Phải từ ${question.min_score} đến ${question.max_score}`
        );
      }

      // Apply reverse scoring if needed
      let finalScore = originalScore;
      if (question.reverse_scored) {
        // Formula: finalScore = (max + min) - originalScore
        finalScore = (question.max_score + question.min_score) - originalScore;
      }

      totalScore += finalScore;

      interpretedAnswers.push({
        questionId: question.id,
        questionText: question.question_text_vi,
        originalScore,
        finalScore,
        wasReversed: question.reverse_scored,
      });
    }

    // Determine level
    const levels = await this.getScoreLevels(scaleId);
    const level = levels.find(
      (l) => totalScore >= l.min_score && totalScore <= l.max_score
    );

    if (!level) {
      throw new Error('Không tìm thấy mức độ phù hợp với điểm số');
    }

    return {
      scale: scaleId,
      totalScore,
      level,
      interpretedAnswers,
    };
  }

  /**
   * Lưu kết quả test vào database
   */
  static async saveTestResult(
    scaleId: ScaleType,
    answers: number[],
    result: ScaleResult,
    userId: string,
    sessionId?: string
  ): Promise<TestResult> {
    const insertData = {
      scale_id: scaleId,
      answers,
      total_score: result.totalScore,
      level_name: result.level.level_name_vi,
      user_id: userId,
      session_id: sessionId || null,
    };

    const { data, error } = await supabase
      .from('gratitude_test_results')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error saving test result:', error);
      throw new Error('Không thể lưu kết quả');
    }

    return data;
  }

  /**
   * Lấy lịch sử kết quả của một user
   */
  static async getUserResults(
    userId: string,
    scaleId?: ScaleType
  ): Promise<TestResult[]> {
    let query = supabase
      .from('gratitude_test_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (scaleId) {
      query = query.eq('scale_id', scaleId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching user results:', error);
      throw new Error('Không thể tải lịch sử kết quả');
    }

    return data || [];
  }

  /**
   * Lấy kết quả cụ thể theo ID
   */
  static async getResultById(resultId: string): Promise<TestResult | null> {
    const { data, error } = await supabase
      .from('gratitude_test_results')
      .select('*')
      .eq('id', resultId)
      .single();

    if (error) {
      console.error('Error fetching result:', error);
      return null;
    }

    return data;
  }
}

/**
 * Helper functions cho từng thang đo cụ thể
 * (để dễ sử dụng từ client code)
 */

/**
 * Tính điểm cho thang đo GQ-6 (trẻ nhỏ)
 */
export async function calculateGQ6Score(answers: number[]): Promise<ScaleResult> {
  return GratitudeService.scoreAnswers('GQ6_CHILD', answers);
}

/**
 * Tính điểm cho thang đo AGS-12 (vị thành niên)
 */
export async function calculateAGS12Score(answers: number[]): Promise<ScaleResult> {
  return GratitudeService.scoreAnswers('AGS12_TEEN', answers);
}

/**
 * Tính điểm cho thang đo Adult Dharma
 */
export async function calculateAdultGratitudeScore(
  answers: number[]
): Promise<ScaleResult> {
  return GratitudeService.scoreAnswers('ADULT_DHARMA', answers);
}

