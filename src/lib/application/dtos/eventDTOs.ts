/**
 * @file Defines the DTOs for the Agenda page.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

/**
 * Data Transfer Object for the featured event section.
 */
export interface FeaturedEventDTO {
  title: string;
  formattedDate: string; // e.g., "Sabado 10 de Enero del 2024"
  description: string;
  bodyContent: string; // The detailed content from the markdown body
  tags: string[];
  imageUrl: string;
  date: Date; // The raw date object
  card: {
    title: string;
    formattedDate: string; // e.g., "OCTUBRE 14 2023 | 11 AM"
    imageUrl: string;
  };
}

/**
 * Data Transfer Object for an archived event card.
 */
export interface ArchivedEventDTO {
  id: string;
  title: string;
  formattedDate: string; // e.g., "10 Febrero del 2024"
  thumbnailUrl: string;
}

/**
 * Data Transfer Object for the event details modal.
 */
export interface EventDetailsDTO {
  id: string;
  title: string;
  date: Date;
  description: string;
  bodyContent: string;
  tags: string[];
  imageUrl: string;
}


/**
 * Data Transfer Object for an archived event card.
 */
export interface ArchivedEventDTO {
  id: string;
  title: string;
  formattedDate: string; // e.g., "10 Febrero del 2024"
  thumbnailUrl: string;
}

/**
 * Data Transfer Object for the event details modal.
 */
export interface EventDetailsDTO {
  id: string;
  title: string;
  date: Date;
  description: string;
  bodyContent: string;
  tags: string[];
  imageUrl: string;
}
