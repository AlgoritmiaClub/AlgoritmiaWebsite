/**
 * @file Defines the use case for getting all featured success stories.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { ISuccessStoryRepository } from "@/lib/infrastructure/repositories/ISuccessStoryRepository";
import { IMemberRepository } from "@/lib/infrastructure/repositories/IMemberRepository";
import { SuccessStoryDTO } from "../dtos/successStoryDTO";

/**
 * Use case to get all featured success stories.
 *
 * This orchestrates fetching featured stories and enriching them with details
 * from the corresponding member, transforming the data into a UI-friendly DTO.
 *
 * @param storyRepo - An instance of ISuccessStoryRepository.
 * @param memberRepo - An instance of IMemberRepository.
 * @returns A promise that resolves to an array of SuccessStoryDTOs.
 */
export async function getFeaturedSuccessStories(
  storyRepo: ISuccessStoryRepository,
  memberRepo: IMemberRepository
): Promise<SuccessStoryDTO[]> {
  const stories = await storyRepo.findFeatured();

  const storiesForUi = await Promise.all(
    stories.map(async (story) => {
      const member = await memberRepo.findById(story.memberId);

      return {
        quote: story.quote,
        company: story.company,
        companyLogoUrl: story.companyLogoUrl,
        memberName: member?.name || "Algoritmia Member",
        memberPhotoUrl:
          member?.profilePictureUrl || "/images/default-avatar.png",
        memberRole: member?.role || "Alumni",
      };
    })
  );

  return storiesForUi;
}
