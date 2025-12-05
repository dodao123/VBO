// app/Practise/ADULT_DHARMA/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GratitudeQuestion } from '@/api/types/gratitude.types';
import UserInfoForm from '@/components/Practise/UserInfoForm';

const DHARMA_OPTIONS = [
  { value: 1, label: 'Rất không đúng', icon: '😠' },
  { value: 2, label: 'Không đúng', icon: '🙁' },
  { value: 3, label: 'Trung lập', icon: '😐' },
  { value: 4, label: 'Đúng', icon: '🙂' },
  { value: 5, label: 'Rất đúng', icon: '😄' },
];

export default function AdultDharmaPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GratitudeQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Không tự động dùng localStorage, luôn yêu cầu nhập thông tin mới
    setLoading(false);
  }, []);

  function handleUserInfoSubmit(newUserId: string) {
    setUserId(newUserId);
    setShowIntro(false);
    setLoading(true);
    loadQuestions();
  }

  async function loadQuestions() {
    try {
      const response = await fetch('/api/gratitude/scales/ADULT_DHARMA/questions');
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

    if (Object.keys(answers).length < questions.length) {
      alert('Vui lòng trả lời tất cả các câu hỏi!');
      return;
    }

    const answersArray = questions.map((_, index) => answers[index]);

    setSubmitting(true);
    
    try {
      const response = await fetch('/api/gratitude/scales/ADULT_DHARMA/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scaleId: 'ADULT_DHARMA',
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

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
        <div className="max-w-2xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-4">
            <div className="text-5xl mb-3">🙏</div>
            <h1 className="text-2xl font-bold text-orange-600 mb-2">
              Thang Đo Lòng Biết Ơn - Hướng Tu Tập Phật Pháp
            </h1>
          </div>

          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="leading-relaxed">
              <strong>Kính chào Quý đạo hữu,</strong> Thang đo này giúp chúng ta nhìn sâu vào thực hành lòng biết ơn 
              trong cuộc sống tu học hằng ngày. Đây là cơ hội để tự quán chiếu và nhận diện những khía cạnh cần phát triển.
            </p>
            <div className="bg-orange-50 p-3 rounded-lg my-3">
              <p className="text-xs font-semibold mb-1">Lưu ý khi thực hành:</p>
              <ul className="text-xs space-y-1 ml-4">
                <li>• Trả lời với tâm thái bình thản, không phán xét</li>
                <li>• Dựa vào thực tế tu tập của bạn trong 1-2 tháng gần đây</li>
                <li>• Không có câu trả lời đúng hay sai</li>
              </ul>
            </div>
          </div>
        </div>

        <UserInfoForm onSubmit={handleUserInfoSubmit} scaleType="ADULT_DHARMA" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
        <div className="text-center">
          <div className="text-6xl animate-pulse mb-4">🙏</div>
          <p className="text-xl text-gray-700">Đang tải...</p>
        </div>
      </div>
    );
  }

  const progress = (Object.keys(answers).length / questions.length) * 100;
  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
            🙏 Thang Đo Lòng Biết Ơn - Phật Pháp
          </h1>
          <p className="text-gray-600">
            20 câu hỏi về thực hành lòng biết ơn trong tu học
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 bg-white rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Tiến độ: {Object.keys(answers).length} / {questions.length} câu
            </span>
            <span className="text-sm font-semibold text-orange-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-400 to-amber-500 h-3 rounded-full transition-all duration-300"
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
                bg-white rounded-xl shadow-md p-6 border-l-4 transition-all duration-300
                ${answers[index] ? 'border-orange-400' : 'border-gray-200'}
              `}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-3">
                  Câu {index + 1} / {questions.length}
                </span>
                <h3 className="text-lg font-medium text-gray-800 leading-relaxed">
                  {question.question_text_vi}
                </h3>
              </div>

              {/* Slider Style Options */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-2 text-xs text-gray-500">
                  <span>Rất không đúng</span>
                  <span>Rất đúng</span>
                </div>
                <div className="flex items-center gap-2">
                  {DHARMA_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`
                        flex-1 text-center p-4 rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:scale-105
                        ${answers[index] === option.value
                          ? 'bg-orange-100 border-orange-400 shadow-lg'
                          : 'bg-gray-50 border-gray-200 hover:border-orange-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.value}
                        checked={answers[index] === option.value}
                        onChange={() => handleAnswer(index, option.value)}
                        className="sr-only"
                      />
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-xs font-medium text-gray-700">
                        {option.value}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="sticky bottom-4 bg-white rounded-xl shadow-2xl p-6">
            {isComplete && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <p className="text-green-700 font-medium">
                  ✓ Bạn đã hoàn thành tất cả câu hỏi. Sẵn sàng xem kết quả!
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={!isComplete || submitting}
              className={`
                w-full py-4 rounded-lg font-bold text-lg transition-all duration-300
                ${isComplete && !submitting
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 shadow-lg'
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
                '🙏 Hoàn thành và xem kết quả'
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

