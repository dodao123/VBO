"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Great_Vibes, Dancing_Script, Allura,Raleway,Lora } from 'next/font/google'


const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' })
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '700'] })
const allura = Allura({ subsets: ['latin'], weight: '400' })
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '600'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'] })


const IntroductionSection = () => {
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
          {/* Text Content */}
          <div className="space-y-8 mt-16 mb-12 lg:mb-0">
            {/* Title */}
            <h1 data-aos="fade-right" data-aos-delay="150"
              className={`${greatVibes.className} text-green-600 text-5xl md:text-7xl mb-8`}
            >
              Về chúng tôi
            </h1>

            
            {/* Main Heading */}
            <h2 data-aos="fade-right" data-aos-delay="200" className={`${lora.className} text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed`}>
              Vườn biết ơn, Nơi đồng hành của những trái tim yêu thương
            </h2>
            
            {/* Description */}
            <p data-aos="fade-up" data-aos-delay="250" className={`${lora.className} text-base md:text-lg text-gray-600 leading-relaxed`}>
  Ngày 22-06-2020 <br />
  <strong>VƯỜN BIẾT ƠN</strong> Câu Lạc Bộ Đọc Sách Hướng Dương Được thành lập và hoạt động với những thiện pháp lan tỏa lòng biết ơn và văn hóa đọc chạm đến trái tim mọi người.Hướng đến ba giá trị cốt lõi:  <br />
 
  + Tu tâm bồi trí tuệ <br />
  + Rèn luyện nghị lực <br />
  + Cho đi để hạnh phúc <br /> <br />

  <strong>Slogan: </strong>
  Lan tỏa yêu thương - Hướng điều tích cực <br />
  <strong>Vườn biết ơn:</strong> Nơi đồng hành của những trái tim yêu thương
  
  {isExpanded && (
    <>
      <br /> <br />
      "Hãy mở sách ra để cuốn sách nở hoa kết tinh thành trái tim biết ơn tựa như hoa sen, 
      tựa như cánh én ... làm những điều nhỏ bé bằng tình yêu thương hướng điều tích cực 
      như hoa hướng dương luôn hướng về phía mặt trời"
    </>
  )}
</p>

            
            {/* Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-sans"
            >
              {isExpanded ? 'THU GỌN' : 'XEM THÊM'}
            </button>
          </div>
          
          {/* Images Section */}
          <div>
            {/* PC Layout: 2 trên 1 dưới */}
            <div className="hidden lg:grid lg:grid-cols-2 mt-20 lg:gap-6">
              <div data-aos="zoom-in" data-aos-delay="300" className="rounded-2xl h-56 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetIntroduceVBO/1.jpg"
                  alt="Vườn biết ơn 1"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="350" className="rounded-2xl h-56 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetIntroduceVBO/2.jpg"
                  alt="Vườn biết ơn 2"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="400" className="col-span-2 h-86 rounded-2xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetIntroduceVBO/3.jpg"
                  alt="Vườn biết ơn 3"
                  fill
                  sizes="(min-width:1024px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Mobile Layout: mỗi ảnh một hàng */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              <div data-aos="zoom-in" data-aos-delay="300" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetIntroduceVBO/1.jpg"
                  alt="Vườn biết ơn mobile 1"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="350" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetIntroduceVBO/2.jpg"
                  alt="Vườn biết ơn mobile 2"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div data-aos="zoom-in" data-aos-delay="400" className="rounded-2xl h-32 overflow-hidden shadow-2xl relative">
                <Image
                  src="/assetLandingPage/AssetIntroduceVBO/3.jpg"
                  alt="Vườn biết ơn mobile 3"
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

export default IntroductionSection;