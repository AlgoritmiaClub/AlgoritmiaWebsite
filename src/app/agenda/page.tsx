/**
 * @file The main page for the /agenda route.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { getAgendaEventRepository } from "@/lib/infrastructure/repositories";
import { getAgendaPageData } from "@/lib/application/use-cases/get-agenda-page-data";
import { AgendaView } from "@/components/agenda/AgendaView";

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
        <AgendaView
          featuredEvent={featuredEvent}
          archivedEvents={archivedEvents}
        />
      </div>
    </main>
  );
}
