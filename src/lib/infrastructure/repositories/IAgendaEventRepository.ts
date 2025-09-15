/**
 * @file Defines the interface for the Agenda Event repository.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { AgendaEvent } from "@/lib/domain/AgendaEvent";

/**
 * The contract for the event repository. This interface decouples the application
 * layer from the data access layer.
 */
export interface IAgendaEventRepository {
  /**
   * Finds the single featured event.
   * @returns A promise that resolves to the featured event or null if not found.
   */
  findFeaturedEvent(): Promise<AgendaEvent | null>;

  /**
   * Finds all archived (past) events.
   * @returns A promise that resolves to an array of archived events.
   */
  findArchivedEvents(): Promise<AgendaEvent[]>;

  /**
   * Finds a single event by its unique ID.
   * @param id - The unique ID of the event to find.
   * @returns A promise that resolves to the AgendaEvent object or null if not found.
   */
  findById(id: string): Promise<AgendaEvent | null>;
}
