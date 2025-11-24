"use client";
import dynamic from 'next/dynamic';
import Navbar from '@/components/LandingPage/Navbar';
import Image from 'next/image';

const ReaderDocx = dynamic(() => import('@/components/Reader/ReaderDocx'), {
    ssr: false,
    loading: () => (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
    ),
});

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
