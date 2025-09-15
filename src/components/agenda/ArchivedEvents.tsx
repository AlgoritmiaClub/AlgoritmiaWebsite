/**
 * @file Defines the component for the archived events section.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { ArchivedEventDTO } from "@/lib/application/dtos/eventDTOs";
import { ArchivedEventCard } from "./ArchivedEventCard";

interface ArchivedEventsProps {
  events: ArchivedEventDTO[];
  onSelect: (id: string) => void;
}

/**
 * A section that displays a grid of past events.
 * @param {ArchivedEventsProps} props The props for the component.
 * @returns The rendered section.
 */
export function ArchivedEvents({ events, onSelect }: ArchivedEventsProps) {
  return (
    <section className="mt-24 backdrop-blur-sm rounded-3xl p-8 md:p-12">
      <h2 className="text-4xl font-bold text-white mb-8">Past events</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <ArchivedEventCard key={event.id} event={event} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <p className="text-white/80">No hay eventos pasados.</p>
      )}
    </section>
  );
}
