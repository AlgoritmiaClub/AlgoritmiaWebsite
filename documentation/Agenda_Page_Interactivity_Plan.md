# Interactivity Refactoring Plan: Agenda Page

**Date:** September 14, 2025

This document outlines the plan to refactor the Agenda page, making the event cards interactive and display detailed information in a modal dialog.

---

## 1. Guiding Strategy

The core of this task is to introduce client-side interactivity (handling clicks and managing modal state) to a page that is currently composed entirely of performant Server Components. 

The strategy is to create a new top-level **Client Component** (`AgendaView.tsx`) that will wrap the existing page sections. This component will manage all state and user interactions, while the main page route (`/agenda/page.tsx`) remains a Server Component responsible for the initial data fetching. This pattern provides an optimal blend of performance and interactivity.

---

## 2. Implementation Phases

### **Phase 1: Create the Modal Component**

1.  **New Component: `EventModal.tsx`**
    *   **Location:** `src/components/agenda/EventModal.tsx`
    *   **Purpose:** This component will be responsible for displaying the details of a single selected event in a modal dialog.
    *   **Props:** It will accept an `event` object (containing the full event details like title, description, tags, and image URL) and an `onClose` function.
    *   **Functionality:** It will render a modal overlay with the event's content. Clicking a "close" button or the backdrop will trigger the `onClose` function.

### **Phase 2: Create a Supporting Use Case and Server Action**

The `ArchivedEventCard` only displays summary data. To show a detailed view in the modal, we need a way to fetch the full details for a specific archived event when a user clicks on it. This will be handled by a Server Action, which allows a client component to securely call server-side code.

1.  **New Repository Method**
    *   **Files:** `IAgendaEventRepository.ts`, `MarkdownAgendaEventRepository.ts`
    *   **Action:** Add a new method, `findById(id: string): Promise<AgendaEvent | null>`, to the event repository interface and implement it in the Markdown repository to fetch a single event file by its slug.

2.  **New Use Case: `get-event-by-id.ts`**
    *   **Location:** `src/lib/application/use-cases/get-event-by-id.ts`
    *   **Purpose:** To orchestrate fetching a single event from the data layer.
    *   **Functionality:** It will take an event `id` and the event repository as input and return the result of `eventRepo.findById(id)`.

3.  **New Server Action**
    *   **Location:** `src/lib/application/actions/eventActions.ts` (a new file)
    *   **Purpose:** To create a secure, server-side function that is directly callable from our client components.
    *   **Functionality:** It will be marked with `"use server"`. It will define an `async` function (e.g., `getEventDetails(id: string)`) that calls the `get-event-by-id` use case and returns the full event data.

### **Phase 3: Refactor the Agenda Page Structure**

This is where we'll introduce the client component to manage the state.

1.  **New Component: `AgendaView.tsx` (Client Component)**
    *   **Location:** `src/components/agenda/AgendaView.tsx`
    *   **Purpose:** This component will act as the interactive wrapper for the page content. It will manage the state of the modal.
    *   **Directive:** It will be marked with `"use client"`.
    *   **State:** It will contain the state for the modal: `const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);`.
    *   **Handlers:**
        *   `handleSelectArchivedEvent(id: string)`: This function will be called when an archived card is clicked. It will call the new `getEventDetails` Server Action and, on success, set the returned event data into the `selectedEvent` state, opening the modal.
        *   `handleSelectFeaturedEvent()`: This will be called when the featured card is clicked. It will use the full event data already available to it and set that in the `selectedEvent` state.
        *   `handleCloseModal()`: This will set `selectedEvent` back to `null`, closing the modal.

2.  **Update Existing Components**
    *   **`FeaturedEvent.tsx` & `ArchivedEventCard.tsx`:** These components will be modified to accept an `onSelect` prop (a function). An `onClick` handler will be added to the cards that calls this `onSelect` function, making them clickable and interactive.
    *   **`agenda/page.tsx`:** This file will be simplified. It will continue to fetch the initial data (featured and archived events) as a Server Component, but instead of rendering the sections directly, it will pass all the data as props to the new `<AgendaView />` component.
