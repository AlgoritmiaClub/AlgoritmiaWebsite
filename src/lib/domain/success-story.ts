/**
 * @file Defines the core domain entity for a success story.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

/**
 * Represents a member's successful internship or job placement.
 * This is a core domain entity.
 */
export interface SuccessStory {
  /**
   * The unique identifier for the story (e.g., 'jane-doe-at-tech-inc').
   */
  id: string;

  /**
   * The ID of the member this story belongs to.
   */
  memberId: string;

  /**
   * The name of the company where the member was placed.
   */
  company: string;

  /**
   * The URL to the company's logo.
   */
  companyLogoUrl: string;

  /**
   * A direct quote from the member about their experience.
   */
  quote: string;

  /**
   * Whether this story should be featured prominently (e.g., on the homepage).
   */
  isFeatured: boolean;
}
