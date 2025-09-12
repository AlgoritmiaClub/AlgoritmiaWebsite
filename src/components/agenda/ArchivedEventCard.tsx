/**
 * @file Defines the component for a single archived event card.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Image from "next/image";
import { ArchivedEventDTO } from "@/lib/application/dtos/eventDTOs";

interface ArchivedEventCardProps {
  event: ArchivedEventDTO;
}

/**
 * A compact card component to display a single past event in a grid.
 * @param {ArchivedEventCardProps} props The props for the component.
 * @returns The rendered card.
 */
export function ArchivedEventCard({ event }: ArchivedEventCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex">
        <div className="flex-shrink-0">
          <Image
            className="h-24 w-24 object-cover"
            src={event.thumbnailUrl}
            alt={`Thumbnail for ${event.title}`}
            width={96}
            height={96}
          />
        </div>
        <div className="p-4 text-left">
          <h3 className="text-lg font-bold text-brand-dark-blue">{event.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{event.formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
