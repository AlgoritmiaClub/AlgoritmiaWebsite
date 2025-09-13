/**
 * @file A component to display a single success story in a card format.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Image from "next/image";
import { SuccessStoryDTO } from "@/lib/application/dtos/successStoryDTO";

interface SuccessStoryCardProps {
  story: SuccessStoryDTO;
}

/**
 * A card component that displays a single success story.
 * @param {SuccessStoryCardProps} props - The props for the component.
 * @returns The rendered SuccessStoryCard component.
 */
export function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  return (
    <div className="border rounded-3xl p-6 flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-300 bg-brand-light/40 hover:bg-brand-light/80">
      <blockquote className="italic text-gray-700 mb-4 flex-grow">
        <p>"{story.quote}"</p>
      </blockquote>
      <div className="flex items-center mt-auto">
        <Image
          src={story.memberPhotoUrl}
          alt={`Photo of ${story.memberName}`}
          width={48}
          height={48}
          className="rounded-full mr-4 object-cover w-12 h-12"
        />
        <div className="flex-grow">
          <h3 className="font-semibold text-lg text-brand-dark-blue">{story.memberName}</h3>
          <p className="text-gray-500">Landed a job at {story.company}</p>
        </div>
        <Image
          src={story.companyLogoUrl}
          alt={`${story.company} logo`}
          width={80} // Adjust size as needed
          height={40} // Adjust size as needed
          className="object-contain self-end"
        />
      </div>
    </div>
  );
}
