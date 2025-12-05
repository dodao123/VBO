// app/API/types/gratitude.types.ts
// Type definitions for Gratitude Scales Module

/**
 * Các loại thang đo lòng biết ơn
 */
export type ScaleType = 'GQ6_CHILD' | 'AGS12_TEEN' | 'ADULT_DHARMA';

/**
 * Thông tin về một thang đo
 */
export interface GratitudeScale {
  id: ScaleType;
  name: string;
  name_vi: string;
  description: string | null;
  min_age: number | null;
  max_age: number | null;
  total_questions: number;
  min_score: number;
  max_score: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Một câu hỏi trong thang đo
 */
export interface GratitudeQuestion {
  id: string;
  scale_id: ScaleType;
  order_number: number;
  question_text: string;
  question_text_vi: string;
  reverse_scored: boolean;
  min_score: number;
  max_score: number;
  created_at?: string;
}

/**
 * Mức độ điểm và diễn giải
 */
export interface ScoreLevel {
  id: number;
  scale_id: ScaleType;
  level_name: string;
  level_name_vi: string;
  min_score: number;
  max_score: number;
  description: string;
  description_vi: string;
  suggestions: string[] | null;
  emoji: string | null;
  created_at?: string;
}

/**
 * Thông tin người dùng
 */
export interface GratitudeUser {
  id: string;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  age?: number | null;
  gender?: 'male' | 'female' | 'other' | null;
  occupation?: string | null;
  education_level?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Request body khi tạo user mới
 */
export interface CreateUserRequest {
  full_name: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  occupation?: string;
  education_level?: string;
}

/**
 * Kết quả sau khi hoàn thành bài test
 */
export interface TestResult {
  id: string;
  user_id: string | null;
  scale_id: ScaleType;
  answers: number[];
  total_score: number;
  level_name: string;
  completed_at: string;
  session_id?: string | null;
}

/**
 * Kết quả tính điểm chi tiết
 */
export interface ScaleResult {
  scale: ScaleType;
  totalScore: number;
  level: ScoreLevel;
  interpretedAnswers?: InterpretedAnswer[];
}

/**
 * Câu trả lời đã được xử lý (bao gồm reverse scoring)
 */
export interface InterpretedAnswer {
  questionId: string;
  questionText: string;
  originalScore: number;
  finalScore: number;
  wasReversed: boolean;
}

/**
 * Request body khi submit bài test
 */
export interface SubmitTestRequest {
  scaleId: ScaleType;
  answers: number[];
  userId: string; // Required now
  sessionId?: string;
}

/**
 * Response khi submit thành công
 */
export interface SubmitTestResponse {
  success: boolean;
  result: ScaleResult;
  resultId?: string;
  message?: string;
}

/**
 * Lựa chọn cho câu hỏi (dùng cho UI)
 */
export interface ScaleOption {
  value: number;
  label: string;
  emoji?: string;
  description?: string;
}

/**
 * Cấu hình UI cho từng thang đo
 */
export interface ScaleUIConfig {
  scaleId: ScaleType;
  displayMode: 'single-question' | 'all-questions' | 'paginated';
  showProgressBar: boolean;
  allowBackNavigation: boolean;
  options: ScaleOption[];
  colorScheme: 'child' | 'teen' | 'adult';
}

/**
 * Statistics cho admin/analytics
 */
export interface ScaleStatistics {
  scaleId: ScaleType;
  totalTests: number;
  averageScore: number;
  scoreDistribution: {
    levelName: string;
    count: number;
    percentage: number;
  }[];
  lastUpdated: string;
}

/**
 * Error response
 */
export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}

