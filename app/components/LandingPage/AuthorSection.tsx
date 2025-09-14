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
              Tác Giả 
            </h1>

            {/* Main Heading */}
            <h2 data-aos="fade-left" data-aos-delay="200" className={`${lora.className} text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed`}>
              Sách Trái Tim Biết Ơn
            </h2>
            
            {/* Description */}
            <div data-aos="fade-up" data-aos-delay="250" className={`${lora.className} text-base md:text-lg text-gray-600 leading-relaxed`}>

              <p className="mt-2">SC Diệu Thiện</p>
              <p className="mt-2">Xuất gia hiện ở Hà Nội</p>
              <p className="mt-2">Thế danh: Đào Thị Hồng Hoa</p>
              <p className="mt-2">Sinh ngày 15/8/1991</p>
              <p className="mt-3">Xuất thân trong một gia đình có truyền thống giáo dục.</p>

              {/* Short timeline / highlights visible by default */}
              <div className="mt-3 space-y-1">
                <p>Năm 2015: Tốt nghiệp Cử Nhân Đại Học Y Hà Nội</p>
                <p>Năm 2017: Can thiệp hỗ trợ giáo dục đặc biệt cho trẻ</p>
                <p>Năm 2020: Sáng lập Vườn Biết Ơn - Câu Lạc Bộ Đọc Sách Hướng Dương.</p>
                <p>Được bạn nhỏ gọi trìu mến là cô giáo Hướng Dương trong những giờ đọc biết ơn.</p>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="mt-4 space-y-3">
                  <p><strong>Hạnh nguyện:</strong></p>
                  <p>Sống đời phạm hạnh, thiểu dục tri túc và làm những thiện pháp.</p>

                  <p><strong>Nguyện mong:</strong></p>
                  <p>
                    Từ năm 2026 đến năm 2035 — Đủ nhân duyên thiện lành, được Phật Tử tin tưởng yêu mến
                    phát tâm chung tay xây dựng một tịnh xá có thư viện và khu vườn biết ơn đủ rộng để mở
                    các khóa thiền cho trẻ em, hướng dẫn các em đọc sách và thực tập lòng biết ơn.
                  </p>

                  <p><strong>SC Diệu Thiện chia sẻ rằng:</strong></p>
                  <blockquote className="pl-4 border-l-4 border-green-200 italic">
                    "Con tin sâu sắc vào luật nhân quả, con luôn tâm niệm rằng người có lòng biết ơn
                    và hành thiện sẽ mang hạnh phúc cho mình cho người. Con xin tri ân đến tất cả những
                    mối nhân duyên và những điều xảy đến trong cuộc đời mình. Con xin nguyện sống bằng
                    trái tim biết ơn.”
                  </blockquote>
                </div>
              )}
            </div>

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
                  src="/assetLandingPage/AssetAuthor/2n.jpg"
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
            
            {/* Mobile Layout: 2 ảnh trên, 1 ảnh dưới */}
            <div className="lg:hidden">
              {/* Hàng trên: 2 ảnh */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div data-aos="zoom-in" data-aos-delay="300" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                  <Image
                    src="/assetLandingPage/AssetAuthor/3n.jpg"
                    alt="Tác giả mobile 1"
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <div data-aos="zoom-in" data-aos-delay="350" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                  <Image
                    src="/assetLandingPage/AssetAuthor/2n.jpg"
                    alt="Tác giả mobile 2"
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Hàng dưới: 1 ảnh */}
              <div className="grid grid-cols-1">
                <div data-aos="zoom-in" data-aos-delay="400" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                  <Image
                    src="/assetLandingPage/AssetAuthor/1n.jpg"
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
      </div>
    </section>
  );
};

export default AuthorSection;