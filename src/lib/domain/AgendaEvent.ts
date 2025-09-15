/**
 * @file Defines the core domain entity for an Agenda Event.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

/**
 * Represents a single event in the agenda. This is the core, framework-agnostic
 * data structure for an event.
 */
export interface AgendaEvent {
  id: string; // e.g., "nadie-sabe-como-romperla"
  title: string;
  date: Date;
  description: string; // The short summary from frontmatter
  bodyContent: string; // The detailed content from the markdown body
  tags: string[];
  imageUrl: string;
}
