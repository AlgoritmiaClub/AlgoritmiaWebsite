/**
 * @file Defines the use case for getting a single event by its ID.
 * @author Gemini
 * @copyright Copyright (c) 2025, Gemini
 */

import { IAgendaEventRepository } from "@/lib/infrastructure/repositories/IAgendaEventRepository";
import { AgendaEvent } from "@/lib/domain/AgendaEvent";
import { EventDetailsDTO } from "../dtos/eventDTOs";

/**
 * Maps an AgendaEvent domain entity to an EventDetailsDTO.
 * @param {AgendaEvent} event - The AgendaEvent entity.
 * @returns {EventDetailsDTO} The corresponding DTO.
 */
function toDetailsDTO(event: AgendaEvent): EventDetailsDTO {
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    description: event.description,
    bodyContent: event.bodyContent,
    tags: event.tags,
    imageUrl: event.imageUrl,
  };
}

/**
 * Use case to get a single event by its ID.
 * It fetches an event from the repository and transforms it into a DTO.
 * @param {IAgendaEventRepository} eventRepo - An instance of a class that implements IAgendaEventRepository.
 * @param {string} id - The ID of the event to retrieve.
 * @returns {Promise<EventDetailsDTO | null>} A promise that resolves to an EventDetailsDTO or null if not found.
 */
export async function getEventById(
  eventRepo: IAgendaEventRepository,
  id: string
): Promise<EventDetailsDTO | null> {
  const event = await eventRepo.findById(id);
  if (!event) {
    return null;
  }
  return toDetailsDTO(event);
}
