/**
 * @file The dynamic, animated hero section component for the homepage.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * The Hero Section for the homepage.
 * Features a timed animation that splits the section in two after a delay,
 * with a smooth transition for the background color.
 * @returns The rendered HeroSection component.
 */
export function HeroSection() {
  const [isSplit, setIsSplit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplit(true);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <section id="hero-section" className="relative bg-brand-dark-blue overflow-hidden min-h-[450px]">
      {/* Animated Background Overlay */}
      <div
        style={{ backgroundImage: "linear-gradient(to right, var(--brand-dark-blue) 92%, transparent 100%)" }}
        className={`absolute top-0 left-0 bottom-0 z-0 transition-all duration-1000 ease-in-out ${isSplit ? "w-1/2" : "w-full"
          }`}
      ></div>

      {/* Content Layer */}
      <div className="relative z-10 flex w-full min-h-[450px]">
        {/* Left Content */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">
            Club Algoritmia
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Showcasing the next generation of tech talent.
          </p>
          <div className="space-x-4">
            <Link
              href="/talent"
              className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Our Talent
            </Link>
            <Link
              href="/#activities-section"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <Image
            src="/algoritmia-logo-slogan.png"
            alt="Algoritmia Club Logo and Slogan"
            width={400}
            height={400}
            className={`object-contain transition-opacity duration-700 ease-in-out ${isSplit ? "opacity-100 delay-500" : "opacity-0"
              }`}
            priority
          />
        </div>
      </div>
    </section>
  );
}
