"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Great_Vibes, Dancing_Script, Lora } from 'next/font/google';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'] });

// All gallery images
const galleryImages = [
  'z7004509768813_2cc7674197829b1e254c530da415a8f9.jpg',
  'z7004509771296_e5e940192b2e588c65cfa51db27d2b0f.jpg',
  'z7004509772231_dc7c1e627afca26639408f9edb307339.jpg',
  'z7004509784824_cd9c9c12223ff16e8f5bf688bb9de48e.jpg',
  'z7004509787853_a004e8c94f2a3c171d369c3cb49f1577.jpg',
  'z7004509790938_a6ecca4590bdc1b739015a40ef4e5903.jpg',
  'z7004509803698_d62a941ca242d89156ed3f2d8d0cb46f.jpg',
  'z7004509805658_750eb25f8000213cc4f90faa281844f1.jpg',
  'z7004509819736_d0510ae9fbbd91c8a71f3581df056365.jpg',
  'z7004509827820_b51a225a3bbd2a81226c3110f18187bb.jpg',
  'z7004509834255_b10b245fb22df59ba6b85676981e9d2c.jpg',
  'z7004509840780_e88ef1950e8a7d12a39751f0cc5a7158.jpg',
  'z7004509847248_101f57e10e74b14f66a498cc9073da80.jpg',
  'z7004509854148_7a5b5012f33d5aa89b361037ec64bafb.jpg',
  'z7004509855888_ce26897c9ae8eab07bab85642f80268a.jpg',
  'z7004509862254_6d8d4c50b5eb6cb3ff67b01c27163164.jpg',
  'z7004509868077_eac528c6e843330d40d1419aae015451.jpg',
  'z7004509882637_cc078b019d70333138710c85d594a2a7.jpg',
  'z7004509882951_34589c46fa62a0192c1ec71909d49837.jpg',
  'z7004509888730_a3d76aca2772151c61b9779f9928cd66.jpg',
  'z7004509901751_0aacee24561d44c27df36607798e61a2.jpg',
  'z7004509904900_dd262be473b88e35125e7c246e180c8e.jpg',
  'z7004509914689_647b0c6b13047b78b36394a33d655ba3.jpg',
  'z7004509922516_9385728310dd596552d7629a254809f1.jpg',
  'z7004509928581_f4f3e5042a7421d08977c98a59db7ab3.jpg',
  'z7004509932881_a346357b259f19f32755f96bd609a56c.jpg',
  'z7004509938382_b330e3150e20ac2291486c654557a95a.jpg',
  'z7004509947427_11690632a6f666af3e66ed93eedddd3a.jpg',
  'z7004509952984_4ca0c0d74cf31e913c3a0d9942f6f54d.jpg',
  'z7004509956965_c106b6cee043cf2591d56ce62042cfbd.jpg',
  'z7004509969630_0eec2caa79700bb1de2038cd143f3c13.jpg',
  'z7004509969935_faf5e7e6c4454e9437daf125587eee92.jpg',
  'z7004520966446_7d83c753299c9a8f63995b771bb5f2b0.jpg',
  'z7004520978002_6117d70f77ac0b5bf8bacb0d8655b78e.jpg',
  'z7004520980632_5202a3a8ce76edd84eb86962cb7c4275.jpg',
  'z7004520992141_eaa0a488d5409d267603db8de5e784ed.jpg',
  'z7004521007214_576023b5f6cadc93ffd5e0607c7844e3.jpg',
  'z7004521007222_d3f690670691f1fe3979dcab669e12ca.jpg',
  'z7004521008063_5782a457ad6f0f3810fb68b813ce75ae.jpg'
];

// Creative frame styles for each image
const frameStyles = [
  'rounded-2xl shadow-2xl border-8 border-white bg-white p-3 transform rotate-1 hover:rotate-0',
  'rounded-full shadow-2xl border-8 border-gradient-to-r from-green-200 to-green-300 bg-gradient-to-br from-green-100 to-green-50 p-4 transform -rotate-2 hover:rotate-0',
  'rounded-3xl shadow-2xl border-8 border-gradient-to-r from-blue-200 to-blue-300 bg-gradient-to-br from-blue-100 to-blue-50 p-3 transform rotate-3 hover:rotate-1',
  'rounded-2xl shadow-2xl border-8 border-gradient-to-r from-pink-200 to-pink-300 bg-gradient-to-br from-pink-100 to-pink-50 p-3 transform -rotate-1 hover:rotate-0',
  'rounded-3xl shadow-2xl border-8 border-gradient-to-r from-yellow-200 to-yellow-300 bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 transform rotate-2 hover:rotate-0',
  'rounded-2xl shadow-2xl border-8 border-gradient-to-r from-purple-200 to-purple-300 bg-gradient-to-br from-purple-100 to-purple-50 p-3 transform -rotate-3 hover:rotate-1'
];

const GallerySection = () => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStartIndex((prev) => (prev + 3) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get multiple sets of images for smooth sliding
  const getImageSets = () => {
    const sets = [];
    for (let setIndex = 0; setIndex < 6; setIndex++) { // 6 sets for smooth infinite scroll
      const images = [];
      for (let i = 0; i < 6; i++) {
        const index = ((setIndex * 3) + i) % galleryImages.length;
        images.push(galleryImages[index]);
      }
      sets.push(images);
    }
    return sets;
  };

  const imageSets = getImageSets();
  const currentSetIndex = Math.floor(currentStartIndex / 3) % imageSets.length;

  return (
    <section id="gallery" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className={`${greatVibes.className} text-green-600 text-5xl md:text-6xl mb-4`}>
            Bộ sưu tập
          </h2>
          <h3 className={`${dancingScript.className} text-gray-700 text-2xl md:text-3xl mb-6 font-medium`}>
            "Sách với nụ cười hạnh phúc"
          </h3>
          <p className={`${lora.className} text-gray-600 text-lg max-w-2xl mx-auto`}>
            Những khoảnh khắc quý giá khi độc giả gặp gỡ cuốn sách "Trái Tim Biết Ơn"
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="relative h-[400px] md:h-[600px] flex justify-center items-center overflow-hidden">
          <div 
            className={`flex transition-transform duration-1000 ease-in-out w-full ${
              currentSetIndex === 1 ? '-translate-x-full' :
              currentSetIndex === 2 ? '-translate-x-[200%]' :
              currentSetIndex === 3 ? '-translate-x-[300%]' :
              currentSetIndex === 4 ? '-translate-x-[400%]' :
              currentSetIndex === 5 ? '-translate-x-[500%]' :
              'translate-x-0'
            }`}
          >
            {imageSets.map((imageSet, setIndex) => (
              <div key={setIndex} className="grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-2 gap-6 md:gap-8 w-full max-w-7xl flex-shrink-0 px-4">
                {/* Mobile: 2 rows x 1 column, Desktop: 2 rows x 3 columns */}
                <div className={`relative h-48 md:h-64 ${frameStyles[0]} hover:scale-110 transition-all duration-500`}>
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <Image
                      src={`/assetLandingPage/Galary/${imageSet[0]}`}
                      alt="Khách hàng với cuốn sách Trái Tim Biết Ơn"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </div>
                </div>
                
                <div className={`relative h-48 md:h-64 ${frameStyles[1]} hover:scale-110 transition-all duration-500`}>
                  <div className="relative w-full h-full overflow-hidden rounded-full">
                    <Image
                      src={`/assetLandingPage/Galary/${imageSet[1]}`}
                      alt="Khách hàng với cuốn sách Trái Tim Biết Ơn"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </div>
                </div>
                
                <div className={`relative h-48 md:h-64 ${frameStyles[2]} hover:scale-110 transition-all duration-500 hidden md:block`}>
                  <div className="relative w-full h-full overflow-hidden rounded-3xl">
                    <Image
                      src={`/assetLandingPage/Galary/${imageSet[2]}`}
                      alt="Khách hàng với cuốn sách Trái Tim Biết Ơn"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </div>
                </div>

                <div className={`relative h-48 md:h-64 ${frameStyles[3]} hover:scale-110 transition-all duration-500 hidden md:block`}>
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <Image
                      src={`/assetLandingPage/Galary/${imageSet[3]}`}
                      alt="Khách hàng với cuốn sách Trái Tim Biết Ơn"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </div>
                </div>
                
                <div className={`relative h-48 md:h-64 ${frameStyles[4]} hover:scale-110 transition-all duration-500 hidden md:block`}>
                  <div className="relative w-full h-full overflow-hidden rounded-3xl">
                    <Image
                      src={`/assetLandingPage/Galary/${imageSet[4]}`}
                      alt="Khách hàng với cuốn sách Trái Tim Biết Ơn"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </div>
                </div>
                
                <div className={`relative h-48 md:h-64 ${frameStyles[5]} hover:scale-110 transition-all duration-500 hidden md:block`}>
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <Image
                      src={`/assetLandingPage/Galary/${imageSet[5]}`}
                      alt="Khách hàng với cuốn sách Trái Tim Biết Ơn"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-green-300 to-green-400 rounded-full opacity-20 animate-pulse shadow-xl"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000 shadow-xl"></div>
          <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-20 animate-pulse delay-2000 shadow-xl"></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full opacity-25 animate-bounce shadow-lg"></div>
          <div className="absolute bottom-40 left-20 w-14 h-14 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full opacity-20 animate-pulse delay-3000 shadow-xl"></div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: Math.min(12, galleryImages.length) }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStartIndex % 12
                  ? 'bg-green-600 scale-125'
                  : 'bg-green-200'
              }`}
            />
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12">
          <p className={`${lora.className} text-gray-500 text-sm italic`}>
            Mỗi nụ cười là một câu chuyện, mỗi cuốn sách là một hành trình...
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;