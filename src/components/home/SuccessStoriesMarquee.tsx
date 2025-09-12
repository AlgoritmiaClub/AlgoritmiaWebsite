/**
 * @file A component to display a continuously scrolling marquee of success stories.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { SuccessStoryDTO } from "@/lib/application/dtos/successStoryDTO";
import { SuccessStoryCard } from "./SuccessStoryCard";

interface SuccessStoriesMarqueeProps {
  stories: SuccessStoryDTO[];
}

/**
 * A component that displays a seamless, infinitely scrolling marquee of success stories.
 * It pauses on hover for better user experience.
 * @param {SuccessStoriesMarqueeProps} props - The props for the component.
 * @returns The rendered SuccessStoriesMarquee component.
 */
export function SuccessStoriesMarquee({ stories }: SuccessStoriesMarqueeProps) {
  // The seamless loop is achieved by duplicating the content.
  const duplicatedStories = [...stories, ...stories];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-brand-dark-blue font-bold text-center mb-8">Success Stories</h2>
        <div
          className="group relative w-full overflow-hidden"
          // Add a mask to fade out the edges for a cleaner look
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div className="flex animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicatedStories.map((story, index) => (
              // Use a fixed width for each card to ensure smooth animation
              <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                <SuccessStoryCard story={story} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
