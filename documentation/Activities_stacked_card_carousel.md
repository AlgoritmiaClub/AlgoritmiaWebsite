This component is an **automatically progressing, stacked card carousel**. It displays items in a layered stack that cycle on a timer.

## Visual Layout and Animation
- **Stacked Layout**: The cards are presented in a vertical stack. The active card is in the front, fully visible. The top edge of the next card is visible behind it, but it is scaled down more significantly to create a stronger illusion of depth and perspective.
- **"Reveal" Transition**: Instead of sliding horizontally, the transition is vertical. When it's time to change, the front card smoothly animates away (fading and sliding up), revealing the card that was layered behind it. This new card then animates up to take the primary position.

**Navigation and Control**
- **Hover State**: When the user hovers their cursor over the active (front) card, a border gently animates into view around its perimeter. This provides clear, immediate visual feedback that the card is an interactive element.
- **Automatic Progression & Progress Bar**: The carousel cycles through the cards automatically. The pagination dot for the active card transforms into a horizontal progress bar that fills over time. When the bar is full, the component transitions to the next card.
- **Manual Override**: Users can click on any of the pagination dots to immediately interrupt the timer and switch to the corresponding card. When a card is selected manually, its progress bar resets and the automatic progression restarts.

---

## Implementation Plan

This plan outlines the steps to create the "Club Activities" section for the homepage using the stacked card carousel component described above.

### 1. Data Source

*   **Strategy:** For the initial implementation, the data for the activities will be hardcoded as a static array of objects directly within the main component. This is appropriate as the content is not expected to change frequently.
*   **Schema (per card):**
    *   `title`: string (e.g., "Technical Mock Interviews")
    *   `description`: string (e.g., "Prepare for real-world interviews and learn to handle pressure.")
    *   `icon`: A React component for a relevant SVG icon.

### 2. Component Architecture

1.  **`ActivitiesSection.tsx` (Main Component):**
    *   **Location:** `/src/components/home/ActivitiesSection.tsx`
    *   **Type:** This will be a **Client Component** (`"use client"`) to manage state and handle user interactions.
    *   **Responsibilities:**
        *   Hold the static array of activity data.
        *   Manage the `activeIndex` state to track the current card.
        *   Manage hover state to pause/resume the animation.
        *   Implement the `useEffect` hook with a timer to handle automatic card progression.
        *   Render the stack of cards and the pagination controls.

2.  **`ActivityCard.tsx` (Child Component):**
    *   **Location:** `/src/components/home/ActivityCard.tsx`
    *   **Type:** A presentational server component.
    *   **Responsibilities:**
        *   Render the title, description, and icon for a single activity.
        *   Receive props that dictate its visual state (e.g., `isActive`, `isNext`).

### 3. State Management (`ActivitiesSection.tsx`)

*   `activeIndex` (`useState<number>`): Stores the index of the card currently in the front.
*   `isPaused` (`useState<boolean>`): Tracks if the automatic progression is paused (e.g., on hover).
*   `useEffect` Hook:
    *   This hook will contain a `setInterval` to advance the carousel.
    *   It will run only when `isPaused` is `false`.
    *   On each interval, it will update the `activeIndex`, looping back to the start.
    *   The interval duration will control the time each card is displayed.

### 4. Layout & Animation (Tailwind CSS)

*   **Stacking:** The main container in `ActivitiesSection.tsx` will use `position: relative`. The `ActivityCard` components will be rendered inside and positioned with `position: absolute`.
*   **Conditional Styling:** The position and appearance of each card will be determined by its index relative to `activeIndex`.
    *   **Active Card (`index === activeIndex`):** `z-10`, `scale-100`, `opacity-100`.
    *   **Next Card (`index === activeIndex + 1`):** `z-0`, `scale-90`, `translate-y-8`, `opacity-100`.
    *   **Hidden Cards:** `opacity-0`, `translate-y-full`.
*   **Transitions:** Smooth animations will be achieved by adding `transition-all` and `duration-500` classes to the `ActivityCard` components.
*   **Progress Bar:** The active pagination dot will contain a child `div` with a `scale-x` transform that is animated from 0 to 1 over the cycle duration.

### 5. Integration Steps

1.  Create the new file `/src/components/home/ActivitiesSection.tsx`.
2.  Implement the component as a client component, including the static data, state management, and JSX for rendering the cards and pagination.
3.  Create the `ActivityCard.tsx` component to render the content of a single card.
4.  Import `ActivitiesSection` into the homepage at `/src/app/page.tsx`.
5.  Place the `<ActivitiesSection />` component between `<MissionVisionSection />` and `<SuccessStoriesMarquee />`.
