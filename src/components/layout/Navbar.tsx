/**
 * @file The main navigation bar component for the website.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Link from "next/link";
import Image from "next/image";

/**
 * The main Navbar component.
 * @returns The rendered Navbar.
 */
export function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Algoritmia Club Logo" width={40} height={40} />

          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/talent" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Talent
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Agenda
                </Link>
              </li>
              {/* Future links like About, Contact can be added here */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
