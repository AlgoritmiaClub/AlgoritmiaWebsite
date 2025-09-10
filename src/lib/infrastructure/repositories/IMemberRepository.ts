/**
 * @file Defines the interface for the member repository.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { Member } from "@/lib/domain/member";

/**
 * An interface for a repository that manages Member data.
 * This contract decouples the application layer from the specific
 * data access implementation.
 */
export interface IMemberRepository {
  /**
   * Finds all members.
   * @returns A promise that resolves to an array of all members.
   */
  findAll(): Promise<Member[]>;

  /**
   * Finds a single member by their unique ID.
   * @param id - The unique ID of the member to find.
   * @returns A promise that resolves to the Member object or null if not found.
   */
  findById(id: string): Promise<Member | null>;
}
