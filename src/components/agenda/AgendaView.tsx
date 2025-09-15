'use client';

/**
 * @file The main client component for the Agenda page to handle interactivity.
 * @author Gemini
 * @copyright Copyright (c) 2025, Gemini
 */

import { useState } from 'react';
import { FeaturedEventDTO, ArchivedEventDTO } from '@/lib/application/dtos/eventDTOs';
import { AgendaEvent } from '@/lib/domain/AgendaEvent';
import { getEventDetails } from '@/lib/application/actions/eventActions';
import { FeaturedEvent } from './FeaturedEvent';
import { ArchivedEvents } from './ArchivedEvents';
import { EventModal } from './EventModal';

interface AgendaViewProps {
  featuredEvent: FeaturedEventDTO | null;
  archivedEvents: ArchivedEventDTO[];
}

/**
 * A client component that wraps the Agenda page content to provide interactivity.
 * It manages the state for the event details modal.
 * @param {AgendaViewProps} props The props for the component.
 * @returns The rendered Agenda view.
 */
export function AgendaView({ featuredEvent, archivedEvents }: AgendaViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectArchivedEvent = async (id: string) => {
    setIsLoading(true);
    try {
      const eventDetails = await getEventDetails(id);
      if (eventDetails) {
        // The date will be a string after serialization, so we need to convert it back
        eventDetails.date = new Date(eventDetails.date);
        setSelectedEvent(eventDetails);
      }
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFeaturedEvent = () => {
    if (featuredEvent) {
      // We need to construct a full AgendaEvent object from the DTO
      const eventFromDTO: AgendaEvent = {
        id: featuredEvent.title, // DTO doesn't have an ID, using title as a fallback key
        title: featuredEvent.title,
        description: featuredEvent.description,
        bodyContent: featuredEvent.bodyContent, // Use the pre-fetched bodyContent
        imageUrl: featuredEvent.imageUrl,
        tags: featuredEvent.tags,
        date: featuredEvent.date, // Use the raw date from the DTO
      };
      setSelectedEvent(eventFromDTO);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      {featuredEvent ? (
        <FeaturedEvent event={featuredEvent} onSelect={handleSelectFeaturedEvent} />
      ) : (
        <div className="text-center py-24">
          <h2 className="text-2xl font-bold text-gray-700">No upcoming events.</h2>
          <p className="text-gray-500 mt-2">Check back soon for new events!</p>
        </div>
      )}
      <ArchivedEvents events={archivedEvents} onSelect={handleSelectArchivedEvent} />

      {selectedEvent && <EventModal event={selectedEvent} onClose={handleCloseModal} />}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
