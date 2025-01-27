'use client'
import Masthead from './components/Masthead';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import ContactFooter from './components/ContactFooter';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/assets/donations11.png',
    '/assets/donations22.png',
    '/assets/donations33.png',
    '/assets/donations44.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds interval
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main className="relative">
      <TopBar />
      <Navbar />
      <Masthead />
      <div className="h-screen w-full overflow-hidden relative">
        <div
          className={`flex transition-transform duration-1000`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="relative min-w-full h-screen">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={src}
                  alt={`Donation ${index + 1}`}
                  fill
                  className="object-cover ease-in-out"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactFooter />
      <Footer />
    </main>
  );
}
