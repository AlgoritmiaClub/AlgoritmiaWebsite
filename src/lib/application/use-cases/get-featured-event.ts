import { IAgendaEventRepository } from "@/lib/infrastructure/repositories/IAgendaEventRepository";

/**
 * The shape of the data returned by the getFeaturedEvent use case.
 */
export interface HomepageFeaturedEvent {
  title: string;
  formattedDate: string;
}

/**
 * Formats a date into a full, readable string in Spanish.
 * @param date The date to format.
 * @returns The formatted date string.
 */
function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(date);
}

/**
 * Fetches the single featured event and transforms it into a DTO suitable for the homepage.
 * @param eventRepo The event repository instance.
 * @returns A promise that resolves to the featured event DTO or null if not found.
 */
export async function getFeaturedEvent(
  eventRepo: IAgendaEventRepository
): Promise<HomepageFeaturedEvent | null> {
  try {
    const event = await eventRepo.findFeaturedEvent();

    if (!event) {
      return null;
    }

    return {
      title: event.title,
      formattedDate: formatEventDate(event.date),
    };
  } catch (error) {
    // Per architecture guidelines, log the error and return a safe value.
    console.error("Error fetching featured event for homepage:", error);
    return null;
  }
}
