/**
 * @file The main page for the /agenda route.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { getAgendaEventRepository } from "@/lib/infrastructure/repositories";
import { getAgendaPageData } from "@/lib/application/use-cases/get-agenda-page-data";
import { FeaturedEvent } from "@/components/agenda/FeaturedEvent";
import { ArchivedEvents } from "@/components/agenda/ArchivedEvents";

/**
 * The main page component for the Agenda route.
 * It fetches all necessary data and renders the page sections.
 * @returns The rendered Agenda page.
 */
export default async function AgendaPage() {
  const { featuredEvent, archivedEvents } = await getAgendaPageData(
    getAgendaEventRepository()
  );

  return (
    <main className="bg-gradient-to-b from-white via-blue-50 to-brand-blue pt-12">
      <div className="container mx-auto px-10 py-8">
        {featuredEvent ? (
          <FeaturedEvent event={featuredEvent} />
        ) : (
          <div className="text-center py-24">
            <h2 className="text-2xl font-bold text-gray-700">No upcoming events.</h2>
            <p className="text-gray-500 mt-2">Check back soon for new events!</p>
          </div>
        )}
        <ArchivedEvents events={archivedEvents} />
      </div>
    </main>
  );
}
