// app/Practise/result/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { TestResult, ScoreLevel } from '@/api/types/gratitude.types';
import { GratitudeService } from '@/api/Services/gratitudeService';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resultId = searchParams.get('id');

  const [result, setResult] = useState<TestResult | null>(null);
  const [level, setLevel] = useState<ScoreLevel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resultId) {
      setError('Không tìm thấy ID kết quả');
      setLoading(false);
      return;
    }

    loadResult();
  }, [resultId]);

  async function loadResult() {
    try {
      // Lấy kết quả test
      const response = await fetch(`/api/gratitude/results/${resultId}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Không thể tải kết quả');
      }

      setResult(data.data);

      // Lấy thông tin level detail
      const levels = await GratitudeService.getScoreLevels(data.data.scale_id);
      const matchedLevel = levels.find(
        l => data.data.total_score >= l.min_score && data.data.total_score <= l.max_score
      );
      
      if (matchedLevel) {
        setLevel(matchedLevel);
      }
    } catch (err: any) {
      console.error('Error loading result:', err);
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-center">
          <div className="text-6xl animate-pulse mb-4">✨</div>
          <p className="text-xl text-gray-700">Đang tải kết quả...</p>
        </div>
      </div>
    );
  }

  if (error || !result || !level) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Không tìm thấy kết quả</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link
            href="/Practise"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${getScaleBackground(result.scale_id)}`}>
      <div className="max-w-4xl mx-auto">
        {/* Celebration Animation */}
        <div className="text-center mb-8 animate-bounce">
          <div className="text-7xl mb-4">{level.emoji || '🎉'}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Kết quả của bạn
          </h1>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {/* Score Display */}
          <div className="text-center mb-8 pb-8 border-b">
            <div className="inline-block">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                {result.total_score}
              </div>
              <div className="text-sm text-gray-500">
                điểm (tối đa: {getMaxScore(result.scale_id)})
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <div className="text-center mb-8">
            <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${getLevelColor(result.scale_id)}`}>
              {level.level_name_vi}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              📊 Diễn giải kết quả:
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {level.description_vi}
            </p>
          </div>

          {/* Suggestions */}
          {level.suggestions && level.suggestions.length > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">💡</span>
                Gợi ý thực hành:
              </h3>
              <ul className="space-y-3">
                {level.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 font-bold mr-3 mt-1">•</span>
                    <span className="text-gray-700 flex-1">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dharma-specific content */}
          {result.scale_id === 'ADULT_DHARMA' && (
            <div className="mt-8 bg-orange-50 rounded-xl p-6 border-l-4 border-orange-400">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                🙏 Lời nhắn từ tâm:
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                {getDharmaMessage(result.total_score)}
              </p>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📈 Thông tin chi tiết:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {result.answers.length}
              </div>
              <div className="text-xs text-gray-600">Câu hỏi</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {result.total_score}
              </div>
              <div className="text-xs text-gray-600">Tổng điểm</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((result.total_score / getMaxScore(result.scale_id)) * 100)}%
              </div>
              <div className="text-xs text-gray-600">Hoàn thành</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {new Date(result.completed_at).toLocaleDateString('vi-VN')}
              </div>
              <div className="text-xs text-gray-600">Ngày làm</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/Practise"
            className="flex-1 text-center py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
          >
            ← Làm bài khác
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all"
          >
            🖨️ In kết quả
          </button>
          <Link
            href="/"
            className="flex-1 text-center py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:border-orange-400 transition-all"
          >
            🏠 Về trang chủ
          </Link>
        </div>

        {/* Share Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Chia sẻ kết quả này với bạn bè để cùng nhau phát triển lòng biết ơn! 💝
          </p>
          <div className="flex justify-center gap-4">
            <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}

// Helper functions
function getScaleBackground(scaleId: string): string {
  switch (scaleId) {
    case 'GQ6_CHILD':
      return 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100';
    case 'AGS12_TEEN':
      return 'bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100';
    case 'ADULT_DHARMA':
      return 'bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100';
    default:
      return 'bg-gradient-to-br from-gray-100 to-white';
  }
}

function getLevelColor(scaleId: string): string {
  switch (scaleId) {
    case 'GQ6_CHILD':
      return 'bg-blue-100 text-blue-700';
    case 'AGS12_TEEN':
      return 'bg-purple-100 text-purple-700';
    case 'ADULT_DHARMA':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function getMaxScore(scaleId: string): number {
  switch (scaleId) {
    case 'GQ6_CHILD':
      return 30;
    case 'AGS12_TEEN':
      return 60;
    case 'ADULT_DHARMA':
      return 100;
    default:
      return 100;
  }
}

function getDharmaMessage(score: number): string {
  if (score >= 80) {
    return 'Bạn đang trên con đường thực hành lòng biết ơn sâu sắc. Hãy tiếp tục nuôi dưỡng tâm này, đồng thời chia sẻ và hướng dẫn người khác. Lòng biết ơn của bạn là ánh sáng chiếu rọi cho cộng đồng.';
  } else if (score >= 50) {
    return 'Bạn đã có nền tảng tốt trong thực hành lòng biết ơn. Hãy tiếp tục quán chiếu sâu hơn về duyên khởi, vô ngã và vô thường. Mỗi ngày là cơ hội để phát triển thêm tâm biết ơn.';
  } else {
    return 'Bạn đang bắt đầu hành trình khám phá lòng biết ơn. Đừng nản lòng - mỗi bước đi trên con đường tu học đều quý giá. Hãy bắt đầu từ những điều nhỏ nhất: thân khí, người thân, thức ăn, nơi ở. Từ từ, tâm biết ơn sẽ nở rộ.';
  }
}

