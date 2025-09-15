/**
 * @file Implements the repository for fetching Agenda Events from Markdown files.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AgendaEvent } from "@/lib/domain/AgendaEvent";
import { IAgendaEventRepository } from "./IAgendaEventRepository";

const EVENTS_PATH = path.join(process.cwd(), "content/events");

/**
 * A repository for fetching event data from local Markdown files.
 */
export class MarkdownAgendaEventRepository implements IAgendaEventRepository {
  private async parseEventFile(filePath: string): Promise<AgendaEvent | null> {
    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const id = path.basename(filePath).replace(/\.md$/, "");

      // Basic validation
      if (!data.title || !data.date || !data.imageUrl || !data.description) {
        console.warn(`Skipping malformed event file: ${path.basename(filePath)}`);
        return null;
      }

      return {
        id,
        title: data.title,
        date: new Date(data.date),
        description: data.description, // The short summary from frontmatter
        bodyContent: content.trim(), // The detailed content from the markdown body
        tags: data.tags || [],
        imageUrl: data.imageUrl,
      };
    } catch (error) {
      console.error(`Error parsing event file ${path.basename(filePath)}:`, error);
      return null;
    }
  }

  private async getAllEvents(): Promise<AgendaEvent[]> {
    try {
      const files = fs.readdirSync(EVENTS_PATH);
      const eventPromises = files.map((file) => {
        const filePath = path.join(EVENTS_PATH, file);
        return this.parseEventFile(filePath);
      });
      const events = await Promise.all(eventPromises);
      return events.filter((event): event is AgendaEvent => event !== null);
    } catch (error) {
      console.error("Could not read event files:", error);
      return [];
    }
  }

  async findById(id: string): Promise<AgendaEvent | null> {
    const filePath = path.join(EVENTS_PATH, `${id}.md`);
    try {
      if (!fs.existsSync(filePath)) {
        return null;
      }
      return this.parseEventFile(filePath);
    } catch (error) {
      console.error(`Error finding event file ${id}.md:`, error);
      return null;
    }
  }

    /**
   * Finds the single featured event.
   * The featured event is the next upcoming event.
   * @returns A promise that resolves to the featured event or null if not found.
   */
  async findFeaturedEvent(): Promise<AgendaEvent | null> {
    const allEvents = await this.getAllEvents();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const upcomingEvents = allEvents
      .filter((event) => event.date >= today) // Filter for events from today onwards
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return upcomingEvents[0] || null;
  }

  /**
   * Finds all archived (past) events.
   * @returns A promise that resolves to an array of archived events.
   */
  async findArchivedEvents(): Promise<AgendaEvent[]> {
    const allEvents = await this.getAllEvents();
    const now = new Date();

    return allEvents
      .filter((event) => event.date <= now)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
