import React from 'react';
import Image from 'next/image';

const Banner = () => {
  return (
    <section id="banner" className="relative w-full h-screen z-0">
      {/* Banner cho desktop */}
      <div className="hidden md:block">
        <Image
          src="/assetLandingPage/banner.jpg"
          alt="Banner Desktop"
          fill
          className=""
          priority
        />
      </div>

      {/* Banner cho mobile */}
      <div className="block md:hidden">
        <Image
          src="/assetLandingPage/mobileBanner.png"
          alt="Banner Mobile"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default Banner;
