# Agenda Page

## Agenda Page Description

The page is organized into two primary, visually distinct sections: a main feature area and a secondary content grid.

### 1. Featured Content Section

This top section is designed to highlight a single, important item. It uses a spacious, two-column layout to separate descriptive text from a featured visual.

-   **Left Column (Information Panel):** This column is dedicated to textual details. It contains:

    -   **A Main Headline:** Large, bold text serving as the primary title.
    -   **A Date Stamp:** Text positioned directly below the headline to provide temporal context.
    -   **A Descriptive Paragraph:** A block of text that offers a summary or further details.
    -   **A Set of Category Tags:** A row of small, rounded badges used to classify the content.
    -   **A Primary Call-to-Action Button:** A prominent, solid-colored button to encourage user interaction.

-   **Right Column (Visual Panel):** This column presents a graphical representation of the item. It consists of:

    -   **A Stylized Visual Card:** A container with rounded corners and a subtle shadow that holds a key illustration or image, along with its own title and date information.

### 2. Archived Content Section

This section, set apart by a contrasting, solid-colored background with rounded corners, serves as a collection of past items.

-   **Section Heading:** A title that clearly labels the purpose of this section.
-   **A Content Grid:** A structured, multi-column layout (in this case, 2x2) that organizes multiple items neatly.
-   **Item Card:** Each element within the grid is a reusable card component. This card has a horizontal layout and contains:

    -   **A Thumbnail Image:** A small, square image on the left.
    -   **An Item Title & Date:** Text on the right that provides the title and date for that specific item.

Here is a more detailed breakdown focusing on the visual language, styling, and hierarchy.

### 1. Featured Content Section

This section uses a clean, asymmetrical layout to create a strong focal point. The design prioritizes clarity and draws the user's attention to a single, featured item through a deliberate use of space and style.

-   **Left Column (Information Panel):**

    -   **Typography:** A clear typographic hierarchy is established. The main headline uses a large, bold, sans-serif font, making it the dominant element. Below it, the date stamp is smaller but maintains a significant presence. The descriptive paragraph uses a standard-sized, regular-weight font for optimal readability.
    -   **Interactive Elements:** The category tags are styled as small, pill-shaped badges with soft, rounded corners and a muted background, allowing them to inform without distracting. The primary call-to-action button is designed to stand out; it features a solid, dark accent color, fully rounded corners, and bold, legible text, making it an unmissable target for the user.

-   **Right Column (Visual Panel):**

    -   **Card Design:** This area features a prominent visual card that has a soft, almost tangible appearance. It's a stylized, light-gray card with generous rounded corners and a subtle drop shadow, giving it a slightly three-dimensional appearance that "lifts" it from the page. A very thin, delicate border provides a crisp edge, defining its shape.
    -   **Internal Layout:** The content within the card, including its own title and date, is given ample padding, ensuring an uncluttered and focused presentation of the visual.

### 2. Archived Content Section

This section is designed as a distinct, self-contained module that groups together secondary content. Its visual treatment clearly separates it from the primary feature section above it.

-   **Section Container:** The entire area is framed within a container that uses a vibrant, solid-colored background (in this case, a blue gradient). This strong color blocking immediately signals a change in content context. The container also has large, soft, rounded corners, which integrates it smoothly with the overall "soft UI" aesthetic of the page.
-   **Grid System:** The content is organized into a balanced and symmetrical grid (2x2), which creates a sense of order and makes the items easy to scan. Consistent spacing between each card prevents the layout from feeling crowded.
-   **Item Card Design:** Each card in the grid is a compact, reusable component designed for quick consumption.

    -   **Structure:** It uses a horizontal layout with a light, off-white background that contrasts sharply with the blue container. Its rounded corners mirror the design language of the larger components.
    -   **Content Layout:** The card is divided into two parts: a small, square thumbnail image on the left and a block of text on the right.
    -   **Typography:** Within the card, the item title is bolded for emphasis, while the date below it is rendered in a smaller, lighter font, creating a clear and scannable information hierarchy for each individual item.

### Background

The entire page is set against a dynamic background that transitions vertically. It begins as pure white at the top, providing a clean, neutral canvas for the featured content. As the user scrolls down, the white smoothly fades into a soft, light blue, which then deepens into the vibrant, solid `brand-blue` that forms the backdrop for the "Archived Content" section. This gradient effect unifies the two distinct sections of the page into a single, cohesive visual experience.

This is how the page must look like:

![Agenda](/images_for_debugging/AgendaPage.png)

## Backend & Data Architecture

To power the Agenda page, we will extend the existing Clean Architecture data layer. This ensures that the new functionality for fetching events remains decoupled, testable, and consistent with the rest of the project.

For the MVP, event data will be sourced from local Markdown files located in a new `/content/events/` directory.

### 1. Domain Layer (`/src/lib/domain`)

We will introduce a new core entity to represent an event.

-   **`AgendaEvent.ts`**: A new interface defining the fundamental data structure for an event.

    ```typescript
    // /src/lib/domain/AgendaEvent.ts
    export interface AgendaEvent {
      id: string; // e.g., "nadie-sabe-como-romperla"
      title: string;
      date: Date;
      description: string;
      tags: string[];
      imageUrl: string;
    }
    ```

### 2. Infrastructure Layer (`/src/lib/infrastructure`)

This layer will handle the concrete implementation of fetching event data from Markdown files.

-   **`IAgendaEventRepository.ts`**: A new repository interface (the contract) for event data access.

    ```typescript
    // /src/lib/infrastructure/repositories/IAgendaEventRepository.ts
    import { AgendaEvent } from "@/lib/domain/AgendaEvent";

    export interface IAgendaEventRepository {
      findFeaturedEvent(): Promise<AgendaEvent | null>;
      findArchivedEvents(): Promise<AgendaEvent[]>;
    }
    ```

-   **`MarkdownAgendaEventRepository.ts`**: The concrete implementation that reads from `/content/events/`. It will parse the frontmatter of each file and determine which event is "featured" (e.g., the one with the most recent date in the future) and which are "archived" (events with dates in the past).

-   **`/content/events/{event-slug}.md`**: The schema for the event Markdown files.

    ```yaml
    ---
    title: "Nadie sabe como romperla en una mock"
    date: "2024-01-10"
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
    tags: ["CV Review", "Mocks", "SP"]
    imageUrl: "/images/events/mock-event.png"
    ---

    Event body content (if any)...
    ```

-   **`index.ts` (Service Locator)**: The service locator will be updated with a `getAgendaEventRepository()` function to provide the application with the active repository instance.

### 3. Application Layer (`/src/lib/application`)

This layer will orchestrate the logic and prepare the data for the UI.

-   **DTOs (Data Transfer Objects)**: We will create DTOs to shape the event data specifically for the Agenda page components. This is where we will handle date formatting.

    ```typescript
    // /src/lib/application/dtos/eventDTOs.ts
    export interface FeaturedEventDTO {
      title: string;
      formattedDate: string; // e.g., "Sabado 10 de Enero del 2024"
      description: string;
      tags: string[];
      imageUrl: string;
      card: {
        title: string;
        formattedDate: string; // e.g., "OCTUBRE 14 2023 | 11 AM"
        imageUrl: string;
      };
    }

    export interface ArchivedEventDTO {
      id: string;
      title: string;
      formattedDate: string; // e.g., "10 Febrero del 2024"
      thumbnailUrl: string;
    }
    ```

-   **Use Case (`get-agenda-page-data.ts`)**: A single use case will be created to fetch and process all the data needed for the page in one go.

    ```typescript
    // /src/lib/application/use-cases/get-agenda-page-data.ts
    import { IAgendaEventRepository } from "@/lib/infrastructure/repositories/IAgendaEventRepository";
    import { FeaturedEventDTO, ArchivedEventDTO } from "../dtos/eventDTOs";

    export async function getAgendaPageData(
      eventRepo: IAgendaEventRepository
    ): Promise<{
      featuredEvent: FeaturedEventDTO | null;
      archivedEvents: ArchivedEventDTO[];
    }> {
      // 1. Fetch raw data from the repository
      const featured = await eventRepo.findFeaturedEvent();
      const archived = await eventRepo.findArchivedEvents();

      // 2. Transform entities into DTOs (including date formatting)
      // ...

      // 3. Return the shaped data ready for the UI
      return { featuredEvent: ..., archivedEvents: ... };
    }
    ```

## Frontend Implementation Plan

This section outlines the strategy for building the user-facing components for the Agenda page, connecting them to the backend data layer.

### 1. Component Architecture

The page will be built using a modular, component-based approach. All new components will be located in a new `/src/components/agenda/` directory.

-   **`AgendaPage` (`/src/app/agenda/page.tsx`)**
    -   **Type:** React Server Component (RSC).
    -   **Responsibilities:**
        -   The root component for the `/agenda` route.
        -   Calls the `getAgendaPageData` use case to fetch all event data.
        -   Renders the overall page layout, including the main gradient background.
        -   Passes the `featuredEvent` and `archivedEvents` DTOs down to the appropriate child components.

-   **`FeaturedEvent.tsx`**
    -   **Type:** Presentational Server Component.
    -   **Responsibilities:**
        -   Receives the `featuredEvent` DTO as a prop.
        -   Implements the two-column layout for the top section.
        -   Renders the information panel (title, date, description, tags, button) on the left.
        -   Renders the `FeaturedEventCard` component on the right.

-   **`FeaturedEventCard.tsx`**
    -   **Type:** Presentational Server Component.
    -   **Responsibilities:**
        -   Receives the `featuredEvent.card` object as a prop.
        -   Renders the stylized visual card with its internal title, date, and image.

-   **`ArchivedEvents.tsx`**
    -   **Type:** Presentational Server Component.
    -   **Responsibilities:**
        -   Receives the `archivedEvents` DTO array as a prop.
        -   Renders the "Eventos pasados" heading.
        -   Renders the container with the blue background and rounded corners.
        -   Maps over the `archivedEvents` array to render the grid of `ArchivedEventCard` components.

-   **`ArchivedEventCard.tsx`**
    -   **Type:** Presentational Server Component.
    -   **Responsibilities:**
        -   Receives a single `archivedEvent` DTO as a prop.
        -   Renders the compact, horizontal card with a thumbnail and text for a single past event.

### 2. Data Flow

The data flow will be unidirectional, starting from the root page component:

1.  **Fetch:** `AgendaPage` (Server Component) will call `getAgendaPageData()`.
2.  **Distribute:** The resulting `featuredEvent` and `archivedEvents` DTOs are passed down as props.
3.  **Render:** `FeaturedEvent` and `ArchivedEvents` receive the props and render themselves and their children (`FeaturedEventCard`, `ArchivedEventCard`) with the final, formatted data.

This approach keeps data fetching centralized at the route level and ensures all child components are simple, presentational components that just need to render the data they are given.

### 3. Directory Structure

The new files will be organized as follows:

```
/src
|-- /app
|   |-- /agenda
|       |-- page.tsx      // Main page component
|-- /components
|   |-- /agenda
|       |-- FeaturedEvent.tsx
|       |-- FeaturedEventCard.tsx
|       |-- ArchivedEvents.tsx
|       |-- ArchivedEventCard.tsx
```

### 4. Styling Notes

-   **Background:** The main page layout in `agenda/page.tsx` will have a container with a `bg-gradient-to-b from-white to-brand-blue`.
-   **Layout:** Sections will be built using CSS Grid and Flexbox for responsive layouts (`md:grid-cols-2` for the featured section, `lg:grid-cols-2` for the archive grid).
-   **Styling:** All styling will be done using utility classes from **Tailwind CSS**, adhering to the project's existing design system (colors, spacing, rounding).
