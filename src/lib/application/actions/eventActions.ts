'use server';

/**
 * @file Defines server actions for handling event-related operations.
 * @author Gemini
 * @copyright Copyright (c) 2025, Gemini
 */

import { getAgendaEventRepository } from "@/lib/infrastructure/repositories";
import { getEventById } from "../use-cases/get-event-by-id";

/**
 * A Server Action to fetch the full details for a single event.
 * This function is called from client components to securely fetch server-side data.
 * @param {string} id - The ID of the event to fetch.
 * @returns {Promise<any>} A promise that resolves to the event data or null if not found.
 */
export async function getEventDetails(id: string) {
  try {
    const eventRepo = getAgendaEventRepository();
    const event = await getEventById(eventRepo, id);
    // The object is stringified and re-parsed to ensure it's a plain serializable object
    // that can be passed from a Server Component/Action to a Client Component.
    // This avoids issues with non-serializable data types like Dates.
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error(`Failed to get details for event ${id}:`, error);
    return null;
  }
}
