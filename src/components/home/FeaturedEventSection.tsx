import Link from "next/link";
import { getFeaturedEvent } from "@/lib/application/use-cases/get-featured-event";
import { getAgendaEventRepository } from "@/lib/infrastructure/repositories";

/**
 * A component that displays a teaser for the upcoming featured event on the homepage.
 * It fetches its own data and renders nothing if no featured event is found.
 */
export async function FeaturedEventSection() {
  const event = await getFeaturedEvent(getAgendaEventRepository());

  if (!event) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto text-center px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-blue">
          Upcoming Event
        </p>
        <h2 className="mt-4 text-4xl font-bold text-brand-dark-blue">
          {event.title}
        </h2>
        <p className="mt-2 text-lg text-slate-600 capitalize">
          {event.formattedDate}
        </p>
        <Link
          href="/agenda"
          className="mt-8 inline-block rounded-full bg-brand-blue px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Learn More & RSVP
        </Link>
      </div>
    </section>
  );
}
