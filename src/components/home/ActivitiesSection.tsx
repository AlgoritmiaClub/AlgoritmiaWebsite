/**
 * @file A component to display club activities in a stacked card carousel.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ActivityCard } from "./ActivityCard";

// --- Icons for the cards ---
const CodeIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const MicIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const PresentationIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// --- Static Data for the cards ---
const activities = [
  {
    title: "Problem Solving Sessions",
    description:
      "Every Saturday, we gather to tackle challenging programming problems, honing our algorithmic thinking and collaboration skills.",
    icon: <CodeIcon />,
  },
  {
    title: "Technical Mock Interviews",
    description:
      "We simulate real-world technical interviews to help members get used to the pressure and refine their communication skills.",
    icon: <MicIcon />,
  },
  {
    title: "Workshops & Tech Talks",
    description:
      "Learn new technologies from senior members and industry experts, followed by networking sessions.",
    icon: <PresentationIcon />,
  },
  {
    title: "CV & Portfolio Reviews",
    description:
      "Get personalized feedback on your resume and portfolio from experienced members to make a great first impression on recruiters.",
    icon: <DocumentIcon />,
  },
];

const CYCLE_DURATION = 5000; // 5 seconds per card

/**
 * A section component that displays club activities in an automatically
 * progressing, stacked card carousel.
 * @returns The rendered ActivitiesSection component.
 */
export function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, CYCLE_DURATION);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handlePaginationClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="activities-section" className="relative bg-gray-50 py-20 overflow-hidden">
      <Image
        src="/images/Modo Claro.png"
        alt=""
        width={500}
        height={500}
        className="absolute -left-48 -top-32 opacity-50 hidden md:block"
      />
      <Image
        src="/images/Modo Claro.png"
        alt=""
        width={500}
        height={500}
        className="absolute -right-48 -bottom-48 opacity-50 transform -scale-x-100 hidden md:block"
      />
      <div className="mx-auto px-4 py-8 text-center bg-grey-50">
        <h2 className="text-4xl text-brand-dark-blue font-bold mb-4">What We Do</h2>

        <div className="max-w-2xl mx-auto">
          {/* Card Container */}
          <div className="relative min-h-[220px] sm:min-h-[200px]">
            {activities.map((activity, index) => (
              <ActivityCard
                key={activity.title}
                title={activity.title}
                description={activity.description}
                icon={activity.icon}
                isActive={index === activeIndex}
                isNext={index === (activeIndex + 1) % activities.length}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-3 mt-8">
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePaginationClick(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`relative h-3 rounded-full border border-brand-dark-blue overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index
                  ? "w-10 bg-gray-50"
                  : "w-3 bg-gray-50 hover:bg-gray-500"
                  }`}
              >
                <div
                  key={index === activeIndex ? activeIndex : `inactive-${index}`}
                  className={`h-full bg-brand-dark-blue rounded-full transition-opacity duration-500 ${activeIndex === index
                    ? "opacity-100 animation-fill"
                    : "opacity-0"
                    }`}
                ></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
