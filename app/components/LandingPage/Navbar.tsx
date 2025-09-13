// components/LandingPage/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import { Menu, X, User, Phone } from 'lucide-react';
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"], // chọn font weight bạn cần
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Theo dõi scroll để thêm shadow khi cuộn xuống
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Teachers', href: '#teachers' },
    { name: 'Book', href: '#book' },
  ];

    // Khóa scroll khi mở menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);


  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
  isScrolled 
    ? 'bg-transparent shadow-lg border-b border-gray-200' // khi cuộn, nền trong suốt nhưng có shadow
    : ''
}`}>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-24 ">
          
          {/* Toggle Button for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0 ">
            <Image
              src="/assetLandingPage/logo.png"
              alt="Logo"
              width={128}
              height={32}
              className="w-20 h-auto md:w-32" // w-8 = 32px, md:w-32 = 128px
            />
          </div>

          


          {/* Desktop Menu - Center */}
          <div className={`hidden md:flex items-center space-x-1 ${montserrat.className}`}>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-black font-Montserrat Medium group"
              >
                <span className="relative z-10 ">{item.name}</span>
                <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full transition-all duration-500 group-hover:w-full group-hover:left-0 transform origin-center"></div>
                <div className="absolute inset-0  rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100"></div>
              </a>
            ))}
          </div>

          
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{/* Overlay mờ khi mở menu (semi-transparent + backdrop blur) */}
<div
  className={`fixed inset-0 transition-opacity duration-300 z-40 pointer-events-none ${
    isMenuOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0"
  }`}
  onClick={() => setIsMenuOpen(false)} // click ra ngoài để đóng menu
>
  {/* Use a semi-transparent black layer and backdrop blur so the page is still visible */}
  <div
    aria-hidden
    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300`}
  />
</div>

{/* Mobile Menu */}
<div
  className={`fixed top-0 left-0 h-full w-72 bg-white/95 z-50 shadow-lg transform transition-transform duration-300 backdrop-saturate-105 ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
  role="dialog"
  aria-modal={isMenuOpen ? 'true' : 'false'}
>
  <div className="px-4 py-6 space-y-4 relative h-full">
    {/* Nút đóng */}
    <button
      onClick={() => setIsMenuOpen(false)}
      aria-label="Close menu"
      title="Close menu"
      className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
    >
      <X className="h-6 w-6" />
    </button>

    {/* Menu Items */}
    <div className="mt-10 space-y-3">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="block px-4 py-3 text-gray-800 hover:bg-yellow-400 hover:text-black rounded transition font-medium"
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
        </a>
      ))}

      {/* CTA */}
      <button
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition font-medium"
        onClick={() => setIsMenuOpen(false)}
      >
        <Phone className="w-4 h-4" />
        <span>Liên hệ</span>
      </button>
    </div>
  </div>
</div>


    </nav>
  );
};

export default Navbar;