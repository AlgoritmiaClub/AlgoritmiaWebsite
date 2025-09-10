/**
 * @file Defines the core domain entity for a club member.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

/**
 * Represents a member of the Algoritmia Club.
 * This is a core domain entity, independent of any framework or data source.
 */
export interface Member {
  /**
   * The unique identifier for the member (e.g., 'jane-doe').
   */
  id: string;

  /**
   * The full name of the member.
   */
  name: string;

  /**
   * The member's role or specialization (e.g., 'Software Engineer').
   */
  role: string;

  /**
   * The URL to the member's profile picture.
   */
  profilePictureUrl: string;

  /**
   * A list of the member's technical skills.
   */
  skills: string[];

  /**
   * The URL to the member's GitHub profile.
   */
  githubUrl?: string;

  /**
   * The URL to the member's LinkedIn profile.
   */
  linkedinUrl?: string;

  /**
   * A detailed biography of the member.
   */
  biography: string;
}
