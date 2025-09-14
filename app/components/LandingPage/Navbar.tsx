

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
    { name: 'Download Book', href: '/docs/Gratefulheart.docx', download: true },
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
    ? 'bg-gradient-to-r from-emerald-600/10 to-cyan-600/40  backdrop-blur-sm shadow-lg border-b border-gray-200' // backdrop-blur làm mờ phần phía sau
    : 'bg-transparent'
}`}>      <div className="max-w-7xl mx-auto px-0 overflow-hidden">
        <div className="flex items-center justify-between h-24">
          
          {/* Toggle Button for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 ml-6 rounded-md text-white hover:bg-gray-100 transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="relative w-full flex justify-end md:justify-start">
            <Image
              src="/assetLandingPage/logo.png"
              alt="Logo"
              width={128}
              height={32}
              className="w-20 h-auto md:w-32 "
            />
          </div>

          {/* Desktop Menu - Right side */}
          <div className={`hidden md:flex items-center space-x-1 ${montserrat.className}`}>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                download={item.download || false}
                className="relative px-4 py-2 text-white drop-shadow-[0_1px_1px_rgba(1,1,1,1)] font-medium group whitespace-nowrap"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full transition-all duration-500 group-hover:w-full group-hover:left-0 transform origin-center"></div>
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100"></div>
              </a>
            ))}
          </div>

          {/* Empty space for mobile */}
          <div className="md:hidden w-12"></div>
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
  aria-modal={isMenuOpen}
>
  <div className="px-4 py-6 space-y-4 relative h-full">
    {/* Nút đóng */}
    <button
      onClick={() => setIsMenuOpen(false)}
      aria-label="Close menu"
      title="Close menu"
      className="absolute ml-10 top-4 right-4 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
    >
      <X className="h-6 w-6" />
    </button>

    {/* Menu Items */}
    <div className="mt-10 space-y-3">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          download={item.download || false}
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