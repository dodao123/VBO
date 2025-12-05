// app/Practise/GQ6_CHILD/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GratitudeQuestion } from '@/api/types/gratitude.types';
import UserInfoForm from '@/components/Practise/UserInfoForm';

const EMOJI_OPTIONS = [
  { value: 1, emoji: '😠', label: 'Rất không đồng ý', color: 'bg-red-100 hover:bg-red-200 border-red-300' },
  { value: 2, emoji: '🙁', label: 'Không đồng ý', color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
  { value: 3, emoji: '😐', label: 'Không chắc', color: 'bg-gray-100 hover:bg-gray-200 border-gray-300' },
  { value: 4, emoji: '🙂', label: 'Đồng ý', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
  { value: 5, emoji: '😄', label: 'Rất đồng ý', color: 'bg-green-100 hover:bg-green-200 border-green-300' },
];

export default function GQ6ChildPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GratitudeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

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
      const response = await fetch('/api/gratitude/scales/GQ6_CHILD/questions');
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.data);
        setAnswers(new Array(data.data.length).fill(0));
      }
    } catch (err) {
      console.error('Error loading questions:', err);
      alert('Không thể tải câu hỏi. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(value: number) {
    // Animation khi chọn
    setShowAnimation(true);
    
    // Cập nhật câu trả lời
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    // Chuyển sang câu tiếp theo sau animation
    setTimeout(() => {
      setShowAnimation(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Đã trả lời xong, submit
        submitTest(newAnswers);
      }
    }, 600);
  }

  async function submitTest(finalAnswers: number[]) {
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/gratitude/scales/GQ6_CHILD/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scaleId: 'GQ6_CHILD',
          answers: finalAnswers,
          userId: userId,
          sessionId: Date.now().toString(),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Chuyển đến trang kết quả
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

  // Show form if no userId
  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4">
        <UserInfoForm onSubmit={handleUserInfoSubmit} scaleType="GQ6_CHILD" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🧒</div>
          <p className="text-xl text-gray-700">Đang chuẩn bị...</p>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">✨</div>
          <p className="text-xl text-gray-700">Đang tính điểm...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Câu {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`
          bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8
          transform transition-all duration-500
          ${showAnimation ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
        `}>
          {/* Question Text */}
          <div className="text-center mb-12">
            <div className="text-5xl mb-6">🤔</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.question_text_vi}
            </h2>
          </div>

          {/* Emoji Options */}
          <div className="grid grid-cols-5 gap-3 md:gap-4">
            {EMOJI_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`
                  ${option.color}
                  border-2 rounded-2xl p-4 md:p-6
                  transform transition-all duration-200
                  hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-4 focus:ring-blue-300
                  group
                `}
                aria-label={option.label}
              >
                <div className="text-4xl md:text-6xl mb-2 group-hover:animate-bounce">
                  {option.emoji}
                </div>
                <div className="text-xs md:text-sm font-semibold text-gray-700 hidden md:block">
                  {option.label}
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Labels */}
          <div className="md:hidden mt-6 grid grid-cols-5 gap-2 text-center">
            {EMOJI_OPTIONS.map((option) => (
              <div key={option.value} className="text-xs text-gray-600">
                {option.label.split(' ')[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center text-gray-600">
          <p className="text-lg">👆 Chạm vào khuôn mặt bạn cảm thấy phù hợp nhất</p>
        </div>

        {/* Navigation */}
        {currentQuestionIndex > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            >
              ← Câu trước
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

