/**
 * @file Defines the component for the featured event visual card.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Image from "next/image";
import { FeaturedEventDTO } from "@/lib/application/dtos/eventDTOs";

interface FeaturedEventCardProps {
  card: FeaturedEventDTO["card"];
}

/**
 * A stylized visual card to display the featured event's image.
 * @param {FeaturedEventCardProps} props The props for the component.
 * @returns The rendered card.
 */
export function FeaturedEventCard({ card }: FeaturedEventCardProps) {
  return (
    <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 md:p-6 transform scale-95 hover:scale-100 transition-transform duration-500 ease-in-out">
      <div className="relative w-full h-full min-h-[300px]">
        <Image
          src={card.imageUrl}
          alt={`Image for ${card.title}`}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
