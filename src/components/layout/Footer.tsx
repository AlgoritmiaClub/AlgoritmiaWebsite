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
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-5 px-6 text-sm text-center md:text-left">
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
          <div>
            <span>Copyright &copy; {new Date().getFullYear()}</span>
            <p className="mt-1">
              Built by{" "}
              <a href="https://www.linkedin.com/in/leonardocumplido21/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Leo Cumplido
              </a>{" "}
              with the design of{" "}
              <a href="https://www.nolbertocastro.com/Portfolio" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                Nolberto Castro
              </a>
            </p>
          </div>
        </div>
        <div className="font-mono">
          <span>&middot; Connect &middot; the &middot; dots</span>
        </div>
      </div>
    </footer>
  );
}