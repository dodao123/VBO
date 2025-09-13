"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Great_Vibes, Dancing_Script, Allura, Raleway, Lora } from 'next/font/google';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '700'] });
const allura = Allura({ subsets: ['latin'], weight: '400' });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '600'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'] });

const AuthorSection = () => { 
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <section data-aos="fade-up" data-aos-delay="100" className="w-full min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto -mt-25">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Text Content - Trước trên mobile, bên phải trên desktop */}
          <div className="space-y-8 mt-30 mb-12 lg:mb-0 lg:order-2 md:ml-24">
            {/* Title */}
            <h1 data-aos="fade-left" data-aos-delay="150"
              className={`${greatVibes.className} text-green-600 text-5xl md:text-7xl mb-8`}
            >
              Tác giả
            </h1>

            {/* Main Heading */}
            <h2 data-aos="fade-left" data-aos-delay="200" className={`${lora.className} text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed`}>
              Diệu Thiện - Trái Tim Biết Ơn
            </h2>
            
            {/* Description */}
            <p data-aos="fade-up" data-aos-delay="250" className={`${lora.className} text-base md:text-lg text-gray-600 leading-relaxed`}>
              <strong>Tác giả</strong> với tâm huyết và tình yêu dành cho trẻ em <br />
              - Người đặt nền móng cho triết lý giáo dục biết ơn <br />
              - Kiến tạo những giá trị nhân văn qua từng trang sách <br />
              - Truyền cảm hứng yêu thương đến mọi trái tim <br />
              - Góp phần xây dựng thế hệ trẻ biết ơn và nhân ái <br /> <br />

              <strong>Tầm nhìn:</strong>
              Mỗi đứa trẻ đều có thể trở thành những trái tim biết ơn <br />
              <strong>Sứ mệnh:</strong> Lan tỏa tình yêu thương qua giáo dục
              
              {isExpanded && (
                <>
                  <br /> <br />
                  "Giáo dục không chỉ là truyền đạt kiến thức mà còn là nuôi dưỡng tâm hồn, 
                  giúp trẻ em hiểu được giá trị của lòng biết ơn, từ đó sống một cuộc đời 
                  ý nghĩa và hạnh phúc hơn."
                </>
              )}
            </p>

            {/* Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-sans"
            >
              {isExpanded ? 'THU GỌN' : 'TÌM HIỂU THÊM'}
            </button>
          </div>

          {/* Images Section - Sau trên mobile, bên trái trên desktop */}
          <div data-aos="fade-right" data-aos-delay="200" className="lg:order-1">
            {/* PC Layout: 1 ảnh lớn trên, 2 ảnh nhỏ dưới */}
            <div className="hidden lg:grid lg:grid-cols-2 mt-20 lg:gap-6">
              <div data-aos="zoom-in" data-aos-delay="300" className="col-span-2 h-86 rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetAuthor/3.jpg"
                  alt="Tác giả chính"
                  fill
                  sizes="(min-width:1024px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="350" className="rounded-2xl h-56 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetAuthor/2.jpg"
                  alt="Tác giả 1"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="400" className="rounded-2xl h-56 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetAuthor/1.jpg"
                  alt="Tác giả 2"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Mobile Layout: mỗi ảnh một hàng */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              <div data-aos="zoom-in" data-aos-delay="300" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetAuthor/3.jpg"
                  alt="Tác giả mobile 1"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="350" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetAuthor/2.jpg"
                  alt="Tác giả mobile 2"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="400" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetAuthor/1.jpg"
                  alt="Tác giả mobile 3"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;