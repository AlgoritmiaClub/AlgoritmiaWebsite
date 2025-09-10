/**
 * @file A component to display a gallery of success stories.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { SuccessStoryDTO } from "@/lib/application/dtos/successStoryDTO";
import { SuccessStoryCard } from "./SuccessStoryCard";

interface SuccessStoriesGalleryProps {
  stories: SuccessStoryDTO[];
}

/**
 * A gallery component that displays a list of success stories.
 * @param {SuccessStoriesGalleryProps} props - The props for the component.
 * @returns The rendered SuccessStoriesGallery component.
 */
export function SuccessStoriesGallery({ stories }: SuccessStoriesGalleryProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <SuccessStoryCard key={index} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
