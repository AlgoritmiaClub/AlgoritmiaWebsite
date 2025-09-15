'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Algoritmia Club Logo" width={40} height={40} />
          </Link>

          {/* Hamburger Menu Button (visible on mobile) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>

          {/* Desktop Menu (visible on medium screens and up) */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li><Link href="/" className="text-gray-600 hover:text-brand-blue transition-colors">Home</Link></li>
              <li><Link href="/talent" className="text-gray-600 hover:text-brand-blue transition-colors">Talent</Link></li>
              <li><Link href="/agenda" className="text-gray-600 hover:text-brand-blue transition-colors">Agenda</Link></li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu (conditionally rendered) */}
        {isOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col items-center space-y-4">
              <li><Link href="/" className="text-gray-600 hover:text-brand-blue transition-colors" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link href="/talent" className="text-gray-600 hover:text-brand-blue transition-colors" onClick={() => setIsOpen(false)}>Talent</Link></li>
              <li><Link href="/agenda" className="text-gray-600 hover:text-brand-blue transition-colors" onClick={() => setIsOpen(false)}>Agenda</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
