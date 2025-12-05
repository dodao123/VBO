// app/Practise/AGS12_TEEN/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GratitudeQuestion } from '@/api/types/gratitude.types';
import UserInfoForm from '@/components/Practise/UserInfoForm';

const SCALE_OPTIONS = [
  { value: 1, label: 'Rất không đúng', color: 'text-red-600' },
  { value: 2, label: 'Không đúng', color: 'text-orange-600' },
  { value: 3, label: 'Bình thường', color: 'text-gray-600' },
  { value: 4, label: 'Đúng', color: 'text-blue-600' },
  { value: 5, label: 'Rất đúng', color: 'text-green-600' },
];

export default function AGS12TeenPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GratitudeQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Không tự động dùng localStorage, luôn yêu cầu nhập thông tin mới
    setLoading(false);
  }, []);

  function handleUserInfoSubmit(newUserId: string) {
    setUserId(newUserId);
    setLoading(true);
    loadQuestions();
  }

  async function loadQuestions() {
    try {
      const response = await fetch('/api/gratitude/scales/AGS12_TEEN/questions');
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.data);
      }
    } catch (err) {
      console.error('Error loading questions:', err);
      alert('Không thể tải câu hỏi. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(questionIndex: number, value: number) {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate tất cả câu đã trả lời
    if (Object.keys(answers).length < questions.length) {
      alert('Vui lòng trả lời tất cả các câu hỏi!');
      return;
    }

    // Chuyển answers object thành array
    const answersArray = questions.map((_, index) => answers[index]);

    setSubmitting(true);
    
    try {
      const response = await fetch('/api/gratitude/scales/AGS12_TEEN/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scaleId: 'AGS12_TEEN',
          answers: answersArray,
          userId: userId,
          sessionId: Date.now().toString(),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        router.push(`/Practise/result?id=${data.resultId}`);
      } else {
        alert('Có lỗi xảy ra: ' + data.error);
        setSubmitting(false);
      }
    } catch (err) {
      console.error('Error submitting test:', err);
      alert('Không thể gửi bài test. Vui lòng thử lại!');
      setSubmitting(false);
    }
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
        <UserInfoForm onSubmit={handleUserInfoSubmit} scaleType="AGS12_TEEN" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🎓</div>
          <p className="text-xl text-gray-700">Đang tải...</p>
        </div>
      </div>
    );
  }

  const progress = (Object.keys(answers).length / questions.length) * 100;
  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
            🎓 Thang Đo Lòng Biết Ơn Vị Thành Niên
          </h1>
          <p className="text-gray-600">
            Trả lời trung thực các câu hỏi dưới đây (không có đúng hay sai)
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Tiến độ: {Object.keys(answers).length} / {questions.length} câu
            </span>
            <span className="text-sm font-semibold text-purple-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`
                bg-white rounded-xl shadow-md p-6 transition-all duration-300
                ${answers[index] ? 'ring-2 ring-purple-300' : ''}
              `}
            >
              {/* Question Number & Text */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-2">
                  Câu {index + 1}
                </span>
                <h3 className="text-lg font-medium text-gray-800">
                  {question.question_text_vi}
                </h3>
              </div>

              {/* Radio Options */}
              <div className="space-y-2">
                {SCALE_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`
                      flex items-center p-3 rounded-lg border-2 cursor-pointer
                      transition-all duration-200
                      ${answers[index] === option.value
                        ? 'bg-purple-50 border-purple-400'
                        : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.value}
                      checked={answers[index] === option.value}
                      onChange={() => handleAnswer(index, option.value)}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`ml-3 font-medium ${option.color}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="sticky bottom-4 bg-white rounded-xl shadow-xl p-6">
            <button
              type="submit"
              disabled={!isComplete || submitting}
              className={`
                w-full py-4 rounded-lg font-bold text-lg transition-all duration-300
                ${isComplete && !submitting
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang xử lý...
                </span>
              ) : isComplete ? (
                '✓ Hoàn thành và xem kết quả'
              ) : (
                `Còn ${questions.length - Object.keys(answers).length} câu chưa trả lời`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

