import ReaderDocx from '@/components/Reader/ReaderDocx';
import Navbar from '@/components/LandingPage/Navbar';
import Image from 'next/image';

export default function ReaderPage() {
    return (
        <main className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/assetLandingPage/banner.jpg"
                    alt="Background"
                    fill
                    className="object-cover opacity-20" // Giảm opacity để dễ đọc chữ hơn
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />
                <div className="pt-28">
                    <ReaderDocx />
                </div>
            </div>
        </main>
    );
}
