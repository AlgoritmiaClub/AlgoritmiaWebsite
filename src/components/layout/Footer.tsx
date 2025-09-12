import Image from "next/image";
import Link from "next/link";

/**
 * @file Defines the footer for the website.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

/**
 * A component that renders the site-wide footer.
 * @returns The rendered footer component.
 */
export function Footer() {
  return (
    <footer className="bg-white text-brand-blue">
      <div className="container mx-auto flex justify-between items-center py-5 px-6 text-sm">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Homepage">
            <Image
              src="/logo.svg"
              alt="Algoritmia Logo"
              width={28}
              height={28}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
          <span>Copyright &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="font-mono">
          <span>&middot; Connect &middot; the &middot; dots</span>
        </div>
      </div>
    </footer>
  );
}