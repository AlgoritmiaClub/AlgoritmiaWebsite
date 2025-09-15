/**
 * @file A modal component to display detailed information about an event.
 * @author Gemini
 * @copyright Copyright (c) 2025, Gemini
 */

import Image from "next/image";
import { AgendaEvent } from "@/lib/domain/AgendaEvent";

interface EventModalProps {
  event: AgendaEvent;
  onClose: () => void;
}

/**
 * A modal dialog that shows a event's detailed profile.
 * @param {EventModalProps} props - The props for the component.
 * @returns The rendered EventModal component.
 */
export function EventModal({ event, onClose }: EventModalProps) {
  // Format the date for display
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(event.date);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-title"
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full relative transform transition-all duration-300 scale-95 hover:scale-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="relative w-full aspect-video">
          <Image
            src={event.imageUrl}
            alt={`Image for ${event.title}`}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="p-6">
          <h2 id="event-title" className="text-2xl md:text-3xl font-bold text-brand-dark-blue">
            {event.title}
          </h2>
          <p className="mt-2 text-lg text-gray-600 capitalize">{formattedDate}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 text-gray-700 whitespace-pre-wrap">
            {event.bodyContent}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-black/30 rounded-full p-1 hover:bg-black/50 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
