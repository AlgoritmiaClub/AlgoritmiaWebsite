/**
 * @file The homepage of the Algoritmia Club website.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { getFeaturedSuccessStories } from "@/lib/application/use-cases/get-featured-success-stories";
import { getMemberRepository } from "@/lib/infrastructure/repositories";
import { getSuccessStoryRepository } from "@/lib/infrastructure/repositories";
import { HeroSection } from "@/components/home/HeroSection";
import { NewHeroSection } from "@/components/home/NewHeroSection";
import { FeaturedEventSection } from "@/components/home/FeaturedEventSection";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
// import { SuccessStoriesGallery } from "@/components/home/SuccessStoriesGallery";
import { SuccessStoriesMarquee } from "@/components/home/SuccessStoriesMarquee";
import { TeamPhotoSection } from "@/components/home/TeamPhotoSection";

/**
 * The Home page component.
 *
 * This is a React Server Component that fetches all the necessary data for the
 * homepage and composes the different sections.
 * @returns The rendered Home page.
 */
export default async function Home() {
  const storyRepo = getSuccessStoryRepository();
  const memberRepo = getMemberRepository();
  const featuredStories = await getFeaturedSuccessStories(storyRepo, memberRepo);

  return (
    <main>
      <NewHeroSection />
      <FeaturedEventSection />
      <HeroSection />
      <SuccessStoriesMarquee stories={featuredStories} />
      <MissionVisionSection />
      <ActivitiesSection />
      {/* <SuccessStoriesGallery stories={featuredStories} /> */}
      <TeamPhotoSection />
    </main>
  );
}
