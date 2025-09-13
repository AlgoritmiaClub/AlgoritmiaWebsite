/**
 * @file Defines the use case for getting all data for the Agenda page.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { IAgendaEventRepository } from "@/lib/infrastructure/repositories/IAgendaEventRepository";
import { FeaturedEventDTO, ArchivedEventDTO } from "../dtos/eventDTOs";

/**
 * Formats a Date object into a string like "Sabado 10 de Enero del 2024".
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
function formatFullDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Formats a Date object into a string like "10 Febrero del 2024".
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Orchestrates the fetching and processing of all data required for the Agenda page.
 * @param {IAgendaEventRepository} eventRepo - The repository for event data.
 * @returns {Promise<{ featuredEvent: FeaturedEventDTO | null; archivedEvents: ArchivedEventDTO[] }>} The processed data for the UI.
 */
export async function getAgendaPageData(eventRepo: IAgendaEventRepository): Promise<{
  featuredEvent: FeaturedEventDTO | null;
  archivedEvents: ArchivedEventDTO[];
}> {
  const [featured, archived] = await Promise.all([
    eventRepo.findFeaturedEvent(),
    eventRepo.findArchivedEvents(),
  ]);

  let featuredEvent: FeaturedEventDTO | null = null;
  if (featured) {
    featuredEvent = {
      title: featured.title,
      formattedDate: formatFullDate(featured.date),
      description: featured.description,
      tags: featured.tags,
      imageUrl: featured.imageUrl,
      card: {
        title: featured.title,
        // This is a placeholder, as the card date format is different.
        // In a real scenario, this might come from a different field.
        formattedDate: new Intl.DateTimeFormat("es-ES", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
          .format(featured.date)
          .toUpperCase(),
        imageUrl: featured.imageUrl,
      },
    };
  }

  const archivedEvents: ArchivedEventDTO[] = archived.map((event) => ({
    id: event.id,
    title: event.title,
    formattedDate: formatShortDate(event.date),
    thumbnailUrl: event.imageUrl,
  }));

  return { featuredEvent, archivedEvents };
}
