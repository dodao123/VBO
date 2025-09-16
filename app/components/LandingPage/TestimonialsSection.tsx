"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
    position: "Người Sáng lập kiêm Chủ Tịch\nCông Ty Cổ phần Sách Thái Hà",
    urlImage: "/assetLandingPage/ReaderReact/1.jpg"
  },
  {
    id: 2,
    title: "Mùa Tri Ân",
    content: `Bốn mùa Xuân Hạ - Thu - Đông nay mình có thêm một mùa - "Mùa Tri Ân"!

Nhìn những hạt cải lớn lên từng ngày, những hạt bình yên lớn lên từng ngày trong những trái tim đẹp đẽ hôn nhiên của trẻ thơ làm sức sống như bừng dậy. Bừng dậy mỗi buổi sáng trong ngõ xóm, trong bước chân đến trường, khi giờ tan lớp…

Một trái tim bình yên, một gia đình bình yên, một đất nước bình yên, một thế giới bình yên! Tất cả từ một "trái tim biết tri ân"!

Tác giả cuốn sách "Trái tim biết ơn" như đang khơi dậy nguồn sống ấy bằng những lời kệ giản uyên, đầy tình thương gom góp vào kho tàng "giáo dục tâm thức".`,
    author: "Thiện Tuệ",
    position: "Thong dong",
    urlImage: "/assetLandingPage/ReaderReact/2.jpg"
  },
  {
    id: 3,
    title: "Đóa Sen Nhỏ",
    content: `Có một đóa sen nhỏ đang hé nở trong khu vườn tĩnh lặng của tâm hồn trẻ thơ. Mỗi cánh sen ấy là một phẩm chất quý: lòng biết ơn, sự từ bi, niềm vui học hỏi, đức trung thực, và tình thương yêu với vạn vật.

"Trái Tim Biết Ơn" là một cuốn sách nhỏ, nhưng chứa đựng một vũ trụ nhiệm mầu. Mỗi bài thơ là một bài học nhẹ nhàng đi vào vùng đất thơ ngây của trẻ. Lời thơ trong sáng, giản dị, dễ nhớ, dễ thương, đưa trẻ trở về với sự tĩnh lặng trong lành của chính mình.

Tôi tin rằng, nếu mỗi ngày trẻ được gieo một câu thơ vào tâm hồn, các em sẽ lớn lên như những đóa hoa sen – dịu dàng mà mạnh mẽ, thơm mát mà khiêm nhường, tỏa sáng từ bên trong.`,
    author: "Hòa thượng Thích Hải Ấn",
    position: "Chủ tịch hội đồng quản trị\nTrường mầm non Lâm tỳ ni",
    urlImage: "/assetLandingPage/ReaderReact/3.jpg"
  },
  {
    id: 4,
    title: "Vẻ đẹp của trái tim biết ơn",
    content: `Một bông hoa, một cành cây khô, một giọt nước, tưởng chừng như rất bình thường trong cuộc sống, nhưng khi đặt chúng và những không gian tươi đẹp khác nhau, thì lại tôn lên giá trị cao quý khác nhau. Trái tim con người cũng vậy, thật sự không hề đơn giản, mà rất nhiều mầu sắc khác nhau. Nếu khéo biết học hỏi điều tốt đẹp và chuyển hoá tâm hồn này, thì trái tim đó trở lên Thánh thiện, an lành.

Do vậy, "Trái Tim Biết Ơn" một quyển sách nhỏ, nhưng mở ra tâm hồn cho các bạn nhỏ nói riêng và tất cả chúng ta nói chung những tinh hoa tốt đẹp. Những vần thơ ngắn gọn nhưng súc tích, nhắc nhở chúng ta về lòng biết ơn, nuôi dưỡng hạt giống trí tuệ, thiện lành, tạo ra một thói quen tích cực trong cuộc sống. Nhờ đó, con người trở về với trái tim từ bi, đạo đức, nhân hậu…. đây cũng chính là nết đẹp trong văn hoá dân tộc và trên tinh thần giác ngộ của Phật giáo muốn hướng đến.

Thật hạnh phúc khi nhìn lại có rất nhiều thứ để chúng ta trân trọng và cảm ơn. Thông qua tác phẩm Trái Tim Biết Ơn của Diệu Thiện, mỗi bạn nhỏ sẽ lấy đó làm quyển sách đầu giường để hằng ngày học tập và rèn luyện theo. Chúng ta cùng nhau xây dựng một thế giới hạnh phúc hơn, yêu thương hơn, trí tuệ hơn thông qua tinh thần biết ơn, Trái Tim Biết Ơn vậy!`,
    author: "Thạc sĩ Phật học: Thích Di Kiên",
    position: "",
    urlImage: "/assetLandingPage/ReaderReact/4.jpg"
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
    <section className="w-full py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-100 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-200 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-100 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Title Section */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className={`${greatVibes.className} text-green-600 text-5xl md:text-7xl mb-4 relative`}>
              Những lời cảm nhận
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            </h2>
          </div>
          <p className={`${lora.className} text-gray-600 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed`}>
            Những chia sẻ chân thành từ các bậc thiện tri thức về giá trị của lòng biết ơn
          </p>
        </div>

        {/* Main Testimonial Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Testimonial Card with Image & Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-50">
            {/* Decorative Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2"></div>
            
            {/* Content Layout - Grid with Image & Text */}
            <div className="grid lg:grid-cols-3 gap-0 lg:gap-8">
              
              {/* Profile Image Section */}
              <div className="lg:col-span-1 p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white">
                <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={currentTestimonial.urlImage}
                    alt={`${currentTestimonial.author} - Ảnh chân dung`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 224px, (min-width: 1024px) 192px, (min-width: 768px) 160px, 128px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-transparent"></div>
                </div>
                
                {/* Author Info Below Image */}
                <div className="text-center mt-4 lg:mt-6">
                  <p className={`${raleway.className} text-green-800 font-bold text-base md:text-lg lg:text-xl xl:text-2xl mb-1 md:mb-2`}>
                    {currentTestimonial.author}
                  </p>
                  {currentTestimonial.position && (
                    <p className={`${lora.className} text-gray-600 text-xs md:text-sm lg:text-base whitespace-pre-line leading-relaxed`}>
                      {currentTestimonial.position}
                    </p>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-2 p-4 md:p-6 lg:p-8 xl:p-12">
                {/* Quote Icon */}
                {/* <div className="flex justify-start mb-4 md:mb-6">
                  <div className="bg-green-100 rounded-full p-2 md:p-3">
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                </div> */}

                {/* Title */}
                <h3 className={`${dancingScript.className} text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-green-700 mb-4 md:mb-6 font-medium leading-tight`}>
                  {currentTestimonial.title}
                </h3>
                
                {/* Content */}
                <div className={`${lora.className} text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed space-y-3 md:space-y-4 lg:space-y-5`}>
                  {currentTestimonial.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-justify indent-3 md:indent-4 lg:indent-6 first:indent-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 lg:-left-6">
            <button 
              onClick={prevTestimonial}
              title="Lời cảm nhận trước"
              aria-label="Xem lời cảm nhận trước"
              className="group bg-white hover:bg-green-50 rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-green-100"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-green-600 group-hover:text-green-700 transition-colors" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 lg:-right-6">
            <button 
              onClick={nextTestimonial}
              title="Lời cảm nhận tiếp theo"
              aria-label="Xem lời cảm nhận tiếp theo"
              className="group bg-white hover:bg-green-50 rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-green-100"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-green-600 group-hover:text-green-700 transition-colors" />
            </button>
          </div>
        </div>

        {/* Enhanced Navigation Indicators */}
        <div className="mt-12 text-center">
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-4 mb-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                title={`Xem lời cảm nhận ${index + 1}`}
                aria-label={`Chuyển đến lời cảm nhận thứ ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-4 h-4 bg-green-600 scale-110 shadow-lg' 
                    : 'w-3 h-3 bg-green-200 hover:bg-green-300 hover:scale-105'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar with Better Design */}
          <div className="max-w-xs mx-auto">
            <div className="w-full bg-green-100 rounded-full h-2 shadow-inner">
              <div 
                className={`bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500 shadow-lg ${
                  currentIndex === 0 ? 'w-1/4' :
                  currentIndex === 1 ? 'w-2/4' :
                  currentIndex === 2 ? 'w-3/4' :
                  'w-full'
                }`}
              />
            </div>
            <p className={`${lora.className} text-green-600 text-sm mt-3`}>
              {currentIndex + 1} / {testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;