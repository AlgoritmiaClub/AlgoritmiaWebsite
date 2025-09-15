/**
 * @file Defines the component for the featured event section.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { FeaturedEventDTO } from "@/lib/application/dtos/eventDTOs";
import { FeaturedEventCard } from "./FeaturedEventCard";

interface FeaturedEventProps {
  event: FeaturedEventDTO;
  onSelect: () => void;
}

/**
 * A component that displays the featured event in a two-column layout.
 * @param {FeaturedEventProps} props The props for the component.
 * @returns The rendered section.
 */
export function FeaturedEvent({ event, onSelect }: FeaturedEventProps) {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center p-8">
      <div className="text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark-blue leading-tight">{event.title}</h1>
        <p className="mt-4 text-xl font-semibold text-gray-700">{event.formattedDate}</p>
        <p className="mt-6 text-gray-600">{event.description}</p>
        <div className="mt-6 flex gap-2">
          {event.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
        {/* <button className="mt-8 bg-brand-dark-blue text-white font-bold py-3 px-8 rounded-full hover:bg-brand-blue transition-colors duration-300">
          RSVP (Work in progress)
        </button> */}
      </div>
      <div onClick={onSelect} className="cursor-pointer">
        <FeaturedEventCard card={event.card} />
      </div>
    </section>
  );
}
