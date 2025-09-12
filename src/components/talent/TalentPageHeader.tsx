/**
 * @file Defines the header section for the Talent page.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Link from "next/link";

/**
 * A component that renders the main header for the talent directory page.
 * @returns The rendered header section.
 */
export function TalentPageHeader() {
  return (
    <section className="mb-12 flex items-center py-12 text-left bg-[url('/images/Frame_91.png')] bg-no-repeat bg-right bg-contain">
      <div>
        <h1 className="text-5xl font-extrabold text-white">Our Talent</h1>
        <p className="mt-4 text-lg text-white max-w-2xl">
          Meet the brilliant minds of Algoritmia. A curated directory of our
          skilled members ready to take on new challenges.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Share your career
        </Link>
      </div>
    </section>
  );
}
