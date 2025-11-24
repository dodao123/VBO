import React from 'react';

const PCWave = () => {
  return (
    <div className="relative w-full -mt-56 z-10">
      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4aaed3" stopOpacity="1" />
            <stop offset="50%" stopColor="#5cd2c1" stopOpacity="1" />
            <stop offset="100%" stopColor="#7fd9b2" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* <path fill="url(#blueGradient)" fillOpacity="1" d="M0,96L48,90.7C96,85,192,75,288,106.7C384,139,480,213,576,213.3C672,213,768,139,864,128C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path> */}
        <path fill="url(#blueGradient)" fillOpacity="1" d="M0,64L40,85.3C80,107,160,149,240,154.7C320,160,400,128,480,106.7C560,85,640,75,720,101.3C800,128,880,192,960,197.3C1040,203,1120,149,1200,128C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>


      </svg>

      {/* Statistics Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {/* Stat 1 */}
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-gray-800">Trí Tuệ</div>
              <div className="text-lg text-white">Nhờ Thiền Và Đọc Sách</div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-gray-800">Từ Bi</div>
              <div className="text-lg text-white">Nhờ Biết Ơn Và Yêu Thương</div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-gray-800">Nghị Lực</div>
              <div className="text-lg text-white">Nhờ Nỗ Lực Và Kiên Trì</div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-42">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 30">
          <defs>
            <linearGradient id="blueGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4aaed3" stopOpacity="1" />
              <stop offset="50%" stopColor="#5cd2c1" stopOpacity="1" />
              <stop offset="100%" stopColor="#7fd9b2" stopOpacity="1" />


            </linearGradient>
          </defs>
          <path fill="url(#blueGradient2)" fillOpacity="1" d="M0,64L0,160L1440,160L1440,0L0,0L0,0Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="blueGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4aaed3" stopOpacity="1" />
              <stop offset="50%" stopColor="#5cd2c1" stopOpacity="1" />
              <stop offset="100%" stopColor="#7fd9b2" stopOpacity="1" />


            </linearGradient>
          </defs>
          <path fill="url(#blueGradient3)" fillOpacity="1" d="M0,288L48,282.7C96,277,192,267,288,240C384,213,480,171,576,176C672,181,768,235,864,250.7C960,267,1056,245,1152,234.7C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
    </div>
  );
};

const MobileWave = () => {
  return (
    <div className="relative w-full -mt-26 z-10">
      <svg width="100%" height="100%" id="svg" viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
        <defs>
          <linearGradient id="mobileBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4aaed3" stopOpacity="1" />
            <stop offset="50%" stopColor="#5cd2c1" stopOpacity="1" />
            <stop offset="100%" stopColor="#7fd9b2" stopOpacity="1" />


          </linearGradient>
        </defs>
        <path fill="url(#mobileBlueGradient)" fill-opacity="1" d="M0,128L48,133.3C96,139,192,149,288,133.3C384,117,480,75,576,74.7C672,75,768,117,864,138.7C960,160,1056,160,1152,154.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>

      </svg>

      {/* Mobile Statistics Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="container mx-auto px-4 -mt-13">
          <div className="grid grid-cols-1 gap-6 text-center text-white">
            {/* Stat 1 */}
            <div className="space-y-0">
              <div className="text-2xl font-bold text-gray-800">Trí Tuệ</div>
              <div className="text-lg text-white">Nhờ Thiền Và Đọc Sách</div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-800">Từ Bi</div>
              <div className="text-lg text-white">Nhờ Biết Ơn Và Yêu Thương</div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-800">Nghị Lực</div>
              <div className="text-lg text-white">Nhờ Nỗ Lực Và Kiên Trì</div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180">
          <defs>
            <linearGradient id="mobileBlueGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4aaed3" stopOpacity="1" />
              <stop offset="50%" stopColor="#5cd2c1" stopOpacity="1" />
              <stop offset="100%" stopColor="#7fd9b2" stopOpacity="1" />


            </linearGradient>
          </defs>
          <path fill="url(#mobileBlueGradient2)" fillOpacity="1" d="M0,64L0,160L1440,160L1440,0L0,0L0,0Z"></path>
        </svg>
      </div>
      <div className="-mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300">
          <defs>
            <linearGradient id="mobileBlueGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4aaed3" stopOpacity="1" />
              <stop offset="50%" stopColor="#5cd2c1" stopOpacity="1" />
              <stop offset="100%" stopColor="#7fd9b2" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill="url(#mobileBlueGradient3)" fill-opacity="1" d="M0,128L48,133.3C96,139,192,149,288,133.3C384,117,480,75,576,74.7C672,75,768,117,864,138.7C960,160,1056,160,1152,154.7C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
    </div>
  );
};

// Component chính hiển thị responsive
const Wave = () => {
  return (
    <>
      {/* Desktop Wave - ẩn trên mobile */}
      <div className="hidden md:block">
        <PCWave />
      </div>

      {/* Mobile Wave - ẩn trên desktop */}
      <div className="block md:hidden">
        <MobileWave />
      </div>
    </>
  );
};

export default Wave;