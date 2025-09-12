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
  private async getAllEvents(): Promise<AgendaEvent[]> {
    try {
      const files = fs.readdirSync(EVENTS_PATH);
      const events = files.map((file) => {
        try {
          const filePath = path.join(EVENTS_PATH, file);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContents);

          // The 'T00:00' is added to ensure the date is parsed in the local timezone,
          // preventing it from shifting to the previous day in timezones behind UTC.
          return {
            id: file.replace(/\.md$/, ""),
            title: data.title,
            date: new Date(`${data.date}T00:00`),
            description: data.description,
            tags: data.tags || [],
            imageUrl: data.imageUrl,
          } as AgendaEvent;
        } catch (error) {
          console.error(`Error parsing event file ${file}:`, error);
          return null;
        }
      });

      return events.filter((event): event is AgendaEvent => event !== null);
    } catch (error) {
      console.error("Could not read event files:", error);
      return [];
    }
  }

  /**
   * Finds the single featured event.
   * The featured event is the next upcoming event.
   * @returns A promise that resolves to the featured event or null if not found.
   */
  async findFeaturedEvent(): Promise<AgendaEvent | null> {
    const allEvents = await this.getAllEvents();
    const now = new Date();

    const upcomingEvents = allEvents
      .filter((event) => event.date > now)
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
