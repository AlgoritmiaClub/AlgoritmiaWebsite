/**
 * @file The hero section component for the homepage.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Link from "next/link";

/**
 * The Hero Section for the homepage.
 * @returns The rendered HeroSection component.
 */
export function HeroSection() {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">Club Algoritmia</h1>
      <p className="text-xl text-gray-600 mb-8">Showcasing the next generation of tech talent.</p>
      <div className="space-x-4">
        <Link href="/talent" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          View Our Talent
        </Link>
        <Link href="/about" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
          Learn More
        </Link>
      </div>
    </section>
  );
}
