/**
 * @file Defines the Data Transfer Object for a success story.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

/**
 * Represents the data shape of a success story as needed by the UI.
 *
 * This DTO is an enriched version of the SuccessStory entity. It includes
 * details from the associated Member entity, such as the member's name and photo,
 * to simplify the logic in the UI components.
 */
export interface SuccessStoryDTO {
  /**
   * A direct quote from the member about their experience.
   */
  quote: string;

  /**
   * The name of the company where the member was placed.
   */
  company: string;

  /**
   * The URL to the company's logo.
   */
  companyLogoUrl: string;

  /**
   * The name of the member featured in the story.
   */
  memberName: string;

  /**
   * The URL to the member's profile picture.
   */
  memberPhotoUrl: string;

  /**
   * The role of the member at the time of the story.
   */
  memberRole: string;
}
