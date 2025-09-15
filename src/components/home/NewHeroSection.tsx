import Link from "next/link";

/**
 * @file A new hero section for the homepage.
 * @author Gemini
 */

export function NewHeroSection() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center p-4 bg-[url('/images/mosaicos.png')] bg-cover bg-center">
      <div className="w-full max-w-7xl rounded-2xl flex flex-col items-center justify-center text-center py-20 px-4 sm:px-8 md:py-24">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-white max-w-4xl">
          We also thought that Windows was better than Linux
        </h1>
        <p className="text-lg md:text-xl text-white mt-4">
          Let the biggest programming club in Mexico help you achieve your professional goals
        </p>
        <Link
          href="/#hero-section"
          className="mt-8 inline-block rounded-full bg-white px-10 py-3 font-semibold text-brand-blue transition-colors hover:bg-gray-200"
        >
          Start your journey
        </Link>
      </div>
    </section>
  );
}
