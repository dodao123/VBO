import React from 'react';
import { Great_Vibes, Dancing_Script, Lora, Raleway } from 'next/font/google';
import { MapPin, Phone, Facebook, Heart, BookOpen, Mail } from 'lucide-react';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '700'] });
const lora = Lora({ subsets: ['latin'], weight: ['400', '600'] });
const raleway = Raleway({ subsets: ['latin'], weight: ['400', '600', '700'] });

const Footer = () => {
  return (
    <div className="relative">
      {/* Wave SVG */}
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 260" className="w-full h-auto">
          <defs>
            <linearGradient id="darkGradient" x1="100%" y1="100%" x2="100%" y2="100%">
              <stop offset="100%" stopColor="rgb(14,116,144)" stopOpacity="1.01" />
              <stop offset="100%" stopColor="rgb(14,116,144)" stopOpacity="1.0" />
              <stop offset="100%" stopColor="rgb(14,116,144)" stopOpacity="1.0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#darkGradient)"
            fillOpacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,234.7C672,213,768,139,864,138.7C960,139,1056,213,1152,229.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <footer id="contact" className="w-full bg-cyan-700 bg-opacity-0.2 text-white relative overflow-hidden -mt-1">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

          {/* Main Content - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Brand Section - Compact */}
            <div className="text-center md:text-left">
              <h3 className={`${greatVibes.className} text-3xl md:text-4xl text-green-400 mb-2`}>
                Vườn Biết Ơn
              </h3>
              <p className={`${lora.className} text-gray-400 text-sm leading-relaxed`}>
                Nơi trái tim biết ơn nở hoa. Lan tỏa lòng biết ơn mỗi ngày.
              </p>
            </div>

            {/* Contact Info - Compact */}
            <div className="text-center md:text-left">
              <h4 className={`${raleway.className} text-lg font-semibold text-white mb-3`}>
                Liên hệ
              </h4>
              <div className="space-y-2 text-sm">
                <p className={`${lora.className} text-gray-300`}>
                  <Phone className="w-4 h-4 inline mr-2" />
                  <a href="tel:0389320120" className="text-green-400 hover:text-green-300">
                    0389 320 120
                  </a>
                </p>
                <p className={`${lora.className} text-gray-300`}>
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Số 46A, Xóm chùa, Trung Hoà, Hoà Xá, Hà Nội
                </p>
              </div>
            </div>

            {/* Social Links - Compact */}
            <div className="text-center md:text-left">
              <h4 className={`${raleway.className} text-lg font-semibold text-white mb-3`}>
                Theo dõi
              </h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.tiktok.com/@vuonbieton?_t=ZS-8zWq0QYm5Ey&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  title="TikTok"
                >
                  <span className="text-white font-bold text-xs">TT</span>
                </a>
                <a
                  href="https://www.facebook.com/share/wuxKvcAqYE6aRPZU/?mibextid=NoJtEM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  title="Facebook Group"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://www.facebook.com/share/5xXytwhxvPErpvM2/?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  title="Fanpage"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Simple */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">

              {/* Quote - Mobile Hidden on Small Screens */}
              <p className={`${dancingScript.className} text-lg text-green-400 hidden md:block`}>
                "Lòng biết ơn là chìa khóa hạnh phúc"
              </p>

              {/* Copyright */}
              <p className={`${lora.className} text-gray-400 text-sm text-center md:text-right`}>
                © 2025 Vườn Biết Ơn. Tạo với ❤️
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;