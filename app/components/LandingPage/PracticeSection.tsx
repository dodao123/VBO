"use client";
import React, { useState } from 'react';
import { Great_Vibes, Dancing_Script, Lora, Raleway } from 'next/font/google';
import { Heart, BookOpen, Star, Users, Gift, Sparkles, ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'] });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '600', '700'] });

const practicesTips = [
  {
    id: 1,
    icon: Heart,
    title: "Nhật ký biết ơn hàng ngày",
    description: "Mỗi buổi tối, hãy viết ra 5 điều bạn biết ơn trong ngày. Điều nhỏ nhất cũng có thể là nguồn hạnh phúc lớn.",
    detail: "Cuốn sách 'Trái Tim Biết Ơn' sẽ hướng dẫn bạn cách xây dựng thói quen này một cách dễ dàng và bền vững.Cách gieo trồng hạt giống chánh kiến là nhận thức đúng đắn "
  },
  {
    id: 2,
    icon: Users,
    title: "Bày tỏ lòng biết ơn với người thân",
    description: "Không chỉ nói lời cảm ơn mà  cần suy nghĩ hành động gắn liền với lòng biết ơn để đem lại hạnh phúc",
    detail: "Trong sách có rất nhiều ví dụ cụ thể về cách bày tỏ lòng biết ơn một cách ý nghĩa và sâu sắc."
  },
  {
    id: 3,
    icon: Star,
    title: "Thiền về lòng biết ơn",
    description: "Dành 5-10 phút mỗi ngày để tĩnh tâm và cảm nhận những điều tốt đẹp xung quanh bạn.",
    detail: "Sách chia sẻ 10 hạt giống chánh niệm là 10 bài tập thiền cơ bản đơn giản nhất dặt nền móng giúp bạn phát triền tâm thức biết ơn."
  },
  {
    id: 4,
    icon: Gift,
    title: "Học hiểu Hành Thiện Pháp",
    description: "Thiện pháp là cách nuôi dưỡng trái tim biết ơn của chính bạn.",
    detail: "Phát nguyện từ tâm làm những việc thiện.Xây dựng thói quen làm việc thiện mỗi ngày.Hình thành tính cách biết ơn."
  }
];

const PracticeSection = () => {
  const [selectedTip, setSelectedTip] = useState(0);

  const nextTip = () => {
    setSelectedTip((prev) => (prev + 1) % practicesTips.length);
  };

  const prevTip = () => {
    setSelectedTip((prev) => (prev - 1 + practicesTips.length) % practicesTips.length);
  };

  return (
    <section id="practice" className="w-full py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className={`${greatVibes.className} text-green-600 text-5xl md:text-6xl mb-4`}>
            Thực hành
          </h2>
          <h3 className={`${dancingScript.className} text-gray-700 text-2xl md:text-3xl mb-6 font-medium`}>
            Lòng biết ơn mỗi ngày
          </h3>
          <p className={`${lora.className} text-gray-600 text-lg max-w-3xl mx-auto`}>
            Những gợi ý đơn giản để nuôi dưỡng trái tim biết ơn và sống hạnh phúc hơn mỗi ngày
          </p>
        </div>

        {/* Practice Tips */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 mb-16">
            {practicesTips.map((tip, index) => (
              <div
                key={tip.id}
                onClick={() => setSelectedTip(index)}
                className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-4 ${
                  selectedTip === index 
                    ? 'border-green-400 scale-105' 
                    : 'border-transparent hover:border-green-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-4 rounded-full ${
                    selectedTip === index ? 'bg-green-500' : 'bg-green-100'
                  } transition-colors duration-300`}>
                    <tip.icon className={`w-8 h-8 ${
                      selectedTip === index ? 'text-white' : 'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`${raleway.className} text-xl font-semibold text-gray-800 mb-3`}>
                      {tip.title}
                    </h4>
                    <p className={`${lora.className} text-gray-600 mb-4 leading-relaxed`}>
                      {tip.description}
                    </p>
                    <div className={`${lora.className} text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400`}>
                      <Quote className="w-4 h-4 inline mr-2" />
                      {tip.detail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mb-16">
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-green-400 relative overflow-hidden">
              {/* Current Tip */}
              <div className="flex items-start space-x-4">
                <div className="p-4 rounded-full bg-green-500 transition-colors duration-300">
                  {React.createElement(practicesTips[selectedTip].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div className="flex-1">
                  <h4 className={`${raleway.className} text-lg font-semibold text-gray-800 mb-3`}>
                    {practicesTips[selectedTip].title}
                  </h4>
                  <p className={`${lora.className} text-gray-600 mb-4 leading-relaxed text-sm`}>
                    {practicesTips[selectedTip].description}
                  </p>
                  <div className={`${lora.className} text-xs text-blue-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400`}>
                    <Quote className="w-3 h-3 inline mr-2" />
                    {practicesTips[selectedTip].detail}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevTip}
                title="Lời khuyên trước"
                aria-label="Xem lời khuyên trước"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-green-50 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-green-600" />
              </button>
              
              <button 
                onClick={nextTip}
                title="Lời khuyên tiếp theo"
                aria-label="Xem lời khuyên tiếp theo"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-green-50 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-green-600" />
              </button>
            </div>

            {/* Mobile Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {practicesTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTip(index)}
                  title={`Xem lời khuyên ${index + 1}`}
                  aria-label={`Chuyển đến lời khuyên thứ ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedTip 
                      ? 'bg-green-600 scale-125' 
                      : 'bg-green-200 hover:bg-green-300'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Progress Bar */}
            <div className="mt-4 max-w-xs mx-auto">
              <div className="w-full bg-green-100 rounded-full h-1">
                <div 
                  className={`bg-green-600 h-1 rounded-full transition-all duration-300 ${
                    selectedTip === 0 ? 'w-1/4' :
                    selectedTip === 1 ? 'w-2/4' :
                    selectedTip === 2 ? 'w-3/4' :
                    'w-full'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Book Promotion Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 md:mr-4 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 ">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className={`${greatVibes.className} text-4xl md:text-5xl mb-4`}>
                  Cuốn sách dành cho bạn
                </h3>
                <h4 className={`${dancingScript.className} text-2xl md:text-3xl mb-6 font-medium`}>
                  "Trái Tim Biết Ơn"
                </h4>
                <p className={`${lora.className} text-lg mb-6 leading-relaxed opacity-90`}>
                  Một hành trình khám phá sức mạnh của lòng biết ơn. Cuốn sách không chỉ là những trang viết, 
                  mà là người bạn đồng hành giúp bạn tìm thấy hạnh phúc trong những điều giản đơn nhất.
                </p>
                
                {/* Book Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span className={`${lora.className}`}>69 Kệ thơ thiền ,thể thơ ngũ ngôn tứ tuyệt </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-yellow-300" />
                    <span className={`${lora.className}`}>6 giai đoạn gieo hạt </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-yellow-300" />
                    <span className={`${lora.className}`}>Bài tập thiền Ho'oponopono</span>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className={`${lora.className} text-gray-600 text-lg mb-6`}>
            Hãy bắt đầu hành trình nuôi dưỡng lòng biết ơn từ hôm nay
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className={`${lora.className} text-sm text-gray-500 mt-2 italic`}>
            "Cuốn sách đã thay đổi cách tôi nhìn nhận cuộc sống" - Độc giả
          </p>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;