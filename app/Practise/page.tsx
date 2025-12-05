// app/Practise/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { GratitudeScale } from '@/api/types/gratitude.types';
import Navbar from '@/components/LandingPage/Navbar';
import Footer from '@/components/LandingPage/Footer';

export default function PractisePage() {
  const [scales, setScales] = useState<GratitudeScale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadScales() {
      try {
        const response = await fetch('/api/gratitude/scales');
        const data = await response.json();
        
        if (data.success) {
          setScales(data.data);
        } else {
          setError(data.error || 'Không thể tải danh sách thang đo');
        }
      } catch (err) {
        console.error('Error loading scales:', err);
        setError('Đã xảy ra lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    }

    loadScales();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Lỗi</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 ">
      
      <Navbar />
      <div className="max-w-6xl mx-auto pt-28">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
            🙏 Đo Lường Lòng Biết Ơn
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Chọn bài trắc nghiệm phù hợp với độ tuổi và nhu cầu của bạn để khám phá 
            mức độ lòng biết ơn trong cuộc sống.
          </p>
        </div>

        {/* Scale Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {scales.map((scale) => (
            <ScaleCard key={scale.id} scale={scale} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            💡 Lòng biết ơn là gì?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lòng biết ơn là khả năng nhận biết và trân trọng những điều tốt đẹp trong cuộc sống,
            từ những việc nhỏ nhất đến những ơn huệ lớn lao. Nghiên cứu khoa học cho thấy
            lòng biết ơn giúp tăng hạnh phúc, cải thiện sức khỏe tinh thần và tạo dựng
            các mối quan hệ tích cực hơn.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">😊</div>
              <h3 className="font-semibold text-gray-800 mb-1">Hạnh phúc</h3>
              <p className="text-sm text-gray-600">
                Tăng cảm giác hài lòng và niềm vui trong cuộc sống
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🧘</div>
              <h3 className="font-semibold text-gray-800 mb-1">Sức khỏe</h3>
              <p className="text-sm text-gray-600">
                Giảm stress, cải thiện giấc ngủ và tăng cường miễn dịch
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">❤️</div>
              <h3 className="font-semibold text-gray-800 mb-1">Quan hệ</h3>
              <p className="text-sm text-gray-600">
                Xây dựng mối quan hệ tốt đẹp và gắn kết hơn
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ScaleCard({ scale }: { scale: GratitudeScale }) {
  // Icon và màu sắc cho từng thang đo
  const config = getScaleConfig(scale.id);

  return (
    <Link href={`/Practise/${scale.id}`}>
      <div className={`
        bg-white rounded-2xl shadow-lg p-8 h-full
        border-2 border-transparent
        ${config.borderHoverClass} hover:shadow-2xl
        transition-all duration-300 transform hover:-translate-y-2
        cursor-pointer
      `}>
        {/* Icon */}
        <div className="text-6xl mb-4 text-center">
          {config.icon}
        </div>

        {/* Age Range */}
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${config.badgeClass}`}>
          {scale.min_age && scale.max_age
            ? `${scale.min_age}-${scale.max_age} tuổi`
            : scale.min_age
            ? `Từ ${scale.min_age} tuổi`
            : 'Mọi lứa tuổi'}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {scale.name_vi}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          {scale.description || scale.name}
        </p>

        {/* Stats */}
        <div className="flex justify-between text-xs text-gray-500 border-t pt-4">
          <span>📝 {scale.total_questions} câu hỏi</span>
          <span>⏱️ ~{Math.ceil(scale.total_questions / 2)} phút</span>
        </div>

        {/* Button */}
        <button className={`
          w-full mt-4 py-3 rounded-lg font-semibold text-white
          ${config.buttonClass}
          transition-colors duration-200
        `}>
          Bắt đầu làm bài →
        </button>
      </div>
    </Link>
  );
}

function getScaleConfig(scaleId: string) {
  switch (scaleId) {
    case 'GQ6_CHILD':
      return {
        icon: '🧒',
        badgeClass: 'bg-blue-100 text-blue-700',
        borderHoverClass: 'hover:border-blue-400',
        buttonClass: 'bg-blue-500 hover:bg-blue-600',
      };
    case 'AGS12_TEEN':
      return {
        icon: '🎓',
        badgeClass: 'bg-purple-100 text-purple-700',
        borderHoverClass: 'hover:border-purple-400',
        buttonClass: 'bg-purple-500 hover:bg-purple-600',
      };
    case 'ADULT_DHARMA':
      return {
        icon: '🙏',
        badgeClass: 'bg-orange-100 text-orange-700',
        borderHoverClass: 'hover:border-orange-400',
        buttonClass: 'bg-orange-500 hover:bg-orange-600',
      };
    default:
      return {
        icon: '📋',
        badgeClass: 'bg-gray-100 text-gray-700',
        borderHoverClass: 'hover:border-gray-400',
        buttonClass: 'bg-gray-500 hover:bg-gray-600',
      };
  }
}

