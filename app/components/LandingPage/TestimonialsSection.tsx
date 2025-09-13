"use client";
import React, { useState, useEffect } from 'react';
import { Great_Vibes, Dancing_Script, Allura, Raleway, Lora } from 'next/font/google';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '700'] });
const allura = Allura({ subsets: ['latin'], weight: '400' });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '600'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'] });

const testimonials = [
  {
    id: 1,
    title: "Trái tim biết ơn",
    content: `Ai cũng mong muốn con mình sống một cuộc đời hạnh phúc, nhưng tiếc thay, không phải cha mẹ nào cũng hiểu cốt lõi của một cuộc sống hạnh phúc thực sự chính là đạo đức và sự tử tế. Mỗi người cần phải sống có trách nhiệm, yêu thương và từ bi với mọi người xung quanh.

Đưa Phật pháp đến với một người trưởng thành đã khó, đến với một đứa trẻ lại càng khó hơn. Con trẻ thích sự trầm bổng và ngọt ngào của thơ ca. Vậy sao không tìm cho con những vần thơ có tính giáo dục cao mà vẫn giữ được nét hồn hậu, đáng yêu phù hợp với trẻ?

Lời khuyên ngay lúc này của tôi: Hãy để mỗi trẻ nhỏ có một cuốn sách gối đầu giường là tập thơ trong trẻo, hồn nhiên để những vần thơ ấy nâng bước lòng con đến gần hơn với Phật pháp và giữ cho tâm hồn trẻ những nét thánh thiện, trong sáng.`,
    author: "TS. Nguyễn Mạnh Hùng",
    position: "Người Sáng lập kiêm Chủ Tịch\nCông Ty Cổ phần Sách Thái Hà"
  },
  {
    id: 2,
    title: "Mùa Tri Ân",
    content: `Bốn mùa Xuân Hạ - Thu - Đông nay mình có thêm một mùa - "Mùa Tri Ân"!

Nhìn những hạt cải lớn lên từng ngày, những hạt bình yên lớn lên từng ngày trong những trái tim đẹp đẽ hôn nhiên của trẻ thơ làm sức sống như bừng dậy. Bừng dậy mỗi buổi sáng trong ngõ xóm, trong bước chân đến trường, khi giờ tan lớp…

Một trái tim bình yên, một gia đình bình yên, một đất nước bình yên, một thế giới bình yên! Tất cả từ một "trái tim biết tri ân"!

Tác giả cuốn sách "Trái tim biết ơn" như đang khơi dậy nguồn sống ấy bằng những lời kệ giản uyên, đầy tình thương gom góp vào kho tàng "giáo dục tâm thức".`,
    author: "Thiện Tuệ",
    position: "Thong dong"
  },
  {
    id: 3,
    title: "Đóa Sen Nhỏ",
    content: `Có một đóa sen nhỏ đang hé nở trong khu vườn tĩnh lặng của tâm hồn trẻ thơ. Mỗi cánh sen ấy là một phẩm chất quý: lòng biết ơn, sự từ bi, niềm vui học hỏi, đức trung thực, và tình thương yêu với vạn vật.

"Trái Tim Biết Ơn" là một cuốn sách nhỏ, nhưng chứa đựng một vũ trụ nhiệm mầu. Mỗi bài thơ là một bài học nhẹ nhàng đi vào vùng đất thơ ngây của trẻ. Lời thơ trong sáng, giản dị, dễ nhớ, dễ thương, đưa trẻ trở về với sự tĩnh lặng trong lành của chính mình.

Tôi tin rằng, nếu mỗi ngày trẻ được gieo một câu thơ vào tâm hồn, các em sẽ lớn lên như những đóa hoa sen – dịu dàng mà mạnh mẽ, thơm mát mà khiêm nhường, tỏa sáng từ bên trong.`,
    author: "Hòa thượng Thích Hải Ấn",
    position: "Chủ tịch hội đồng quản trị\nTrường mầm non Lâm tỳ ni"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Removed auto-advance - only manual control
  // useEffect(() => {
  //   const interval = setInterval(nextTestimonial, 8000);
  //   return () => clearInterval(interval);
  // }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="w-full py-20 px-4 md:-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className={`${greatVibes.className} text-center text-green-600 text-5xl md:text-6xl mb-4`}>
          Những lời cảm nhận
        </h2>
        
        <p className={`${lora.className} text-center text-gray-600 text-lg mb-12`}>
          Những chia sẻ chân thành từ các bậc thiện tri thức
        </p>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-auto max-w-4xl relative overflow-hidden">
            {/* Background decorative quote */}
            <Quote className="absolute top-6 left-6 text-green-100 w-16 h-16 md:w-20 md:h-20" />
            
            {/* Testimonial Content */}
            <div className="relative z-10">
              {/* Title */}
              <h3 className={`${dancingScript.className} text-3xl md:text-4xl text-green-700 mb-6 text-center font-medium`}>
                {currentTestimonial.title}
              </h3>
              
              {/* Content */}
              <div className={`${lora.className} text-gray-700 text-base md:text-lg leading-relaxed mb-8 space-y-4`}>
                {currentTestimonial.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Author Info */}
              <div className="border-t border-gray-200 pt-6">
                <p className={`${raleway.className} text-green-800 font-semibold text-lg mb-1`}>
                  {currentTestimonial.author}
                </p>
                <p className={`${lora.className} text-gray-600 text-sm whitespace-pre-line`}>
                  {currentTestimonial.position}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            title="Lời cảm nhận trước"
            aria-label="Xem lời cảm nhận trước"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-green-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            title="Lời cảm nhận tiếp theo"
            aria-label="Xem lời cảm nhận tiếp theo"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-green-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              title={`Xem lời cảm nhận ${index + 1}`}
              aria-label={`Chuyển đến lời cảm nhận thứ ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-600 scale-110' 
                  : 'bg-green-200 hover:bg-green-300'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="w-full bg-green-100 rounded-full h-1">
            <div 
              className={`bg-green-600 h-1 rounded-full transition-all duration-300 ${
                currentIndex === 0 ? 'w-1/3' :
                currentIndex === 1 ? 'w-2/3' :
                'w-full'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;