/**
 * @file Defines the interface for the success story repository.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { SuccessStory } from "@/lib/domain/success-story";

/**
 * An interface for a repository that manages SuccessStory data.
 */
export interface ISuccessStoryRepository {
  /**
   * Finds all success stories.
   * @returns A promise that resolves to an array of all stories.
   */
  findAll(): Promise<SuccessStory[]>;

  /**
   * Finds all stories marked as featured.
   * @returns A promise that resolves to an array of featured stories.
   */
  findFeatured(): Promise<SuccessStory[]>;
}
