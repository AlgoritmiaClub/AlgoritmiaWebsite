# Plan: Homepage Featured Event Section

**Date:** September 12, 2025

This document outlines the plan to create a new section on the homepage to display the upcoming featured event, providing better visibility for club members.

---

### 1. Objective

To add a new section to the homepage, positioned directly below the main hero section, that showcases the single most important upcoming event. This section will act as a "teaser" and encourage users to visit the main Agenda page for more details.

### 2. Data Source & Logic

*   **Data Layer:** This feature will leverage the existing Clean Architecture data layer built for the Agenda page.
*   **Repository:** The `IAgendaEventRepository` already provides a `findFeaturedEvent()` method, which is exactly what we need.
*   **Use Case:** We will create a new, specific use case, `get-featured-event.ts`, in `/src/lib/application/use-cases/`. This use case will call the repository's `findFeaturedEvent()` method and transform the resulting `AgendaEvent` entity into a `FeaturedEventDTO` (which can be reused from `eventDTOs.ts`). This keeps the logic clean and specific to this component's needs.
*   **Error Handling:** If no upcoming featured event is found, the use case will return `null`. The component will then render nothing, ensuring the section doesn't appear if there's no event to show.

### 3. Component Strategy

*   **New Component:** A new component will be created at `/src/components/home/FeaturedEventSection.tsx`.
*   **Component Type:** This will be an `async` **React Server Component**. This allows it to fetch its own data directly, making it self-contained and easy to integrate.

### 4. Component Design (JSX & Tailwind CSS)

Since no specific design was provided, we will propose a clean, single-column layout that is distinct but complementary to the sections around it.

*   **Root `<section>`:**
    *   Will have a subtle background color (e.g., `bg-slate-50`) to separate it from the hero section above.
    *   Will have vertical padding (e.g., `py-16`).

*   **Container `<div>`:**
    *   A standard `container mx-auto` to center the content.
    *   Content will be centered (`text-center`).

*   **Content Elements:**
    1.  **Eyebrow Text (`<p>`):** A small, uppercase, bold text element saying "UPCOMING EVENT".
    2.  **Event Title (`<h2>`):** The main title of the event, using a large font size (e.g., `text-4xl font-bold`).
    3.  **Event Date (`<p>`):** The formatted date of the event, displayed below the title with some top margin.
    4.  **Call-to-Action (`<a>`):** A link styled as a button that says "Learn More & RSVP". It will link directly to the `/agenda` page.

### 5. Integration Steps

1.  **Create Use Case:** Create the `get-featured-event.ts` file and implement the data fetching logic.
2.  **Create Component:** Create the `FeaturedEventSection.tsx` file. Implement it as an `async` server component that calls the new use case.
3.  **Conditional Rendering:** The component will only render its JSX if an event is successfully fetched. If not, it will return `null`.
4.  **Update Homepage:** Import and place the `<FeaturedEventSection />` component into `/src/app/page.tsx`, directly below the `<NewHeroSection />`.
