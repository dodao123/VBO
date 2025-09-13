// app/page.tsx
"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from '@/components/LandingPage/Navbar';
import HeroSection from '@/components/LandingPage/HeroSection';
import IntroductionSection from '@/components/LandingPage/IntroductionSection';
import AuthorSection from '@/components/LandingPage/AuthorSection';
import TestimonialsSection from '@/components/LandingPage/TestimonialsSection';
import GallerySection from '@/components/LandingPage/GallerySection';
import PracticeSection from '@/components/LandingPage/PracticeSection';
import Footer from '@/components/LandingPage/Footer';
import Wave from '@/components/LandingPage/Wave';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden bg-[url('/assetLandingPage/bg.png')] bg-cover bg-center bg-fixed">
      <Navbar />
      <HeroSection />
      <Wave />
      <IntroductionSection />
      <AuthorSection />
      <TestimonialsSection />
      <GallerySection />
      <PracticeSection />
      <Footer />
    </main>
  );
}