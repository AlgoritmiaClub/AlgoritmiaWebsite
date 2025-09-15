# Architectural Documentation: Data Fetching Patterns

**Date:** September 14, 2025

This document explains the two primary data-fetching strategies used in this project for handling user interactions that require detailed data, such as opening a modal view.

---

## Introduction

When a user interacts with a component on the client-side (e.g., clicking a card to open a modal), we have two main strategies for providing the detailed data needed for that view. The choice between them is a trade-off between initial page load speed and the speed of the subsequent user interaction.

---

### **Pattern 1: Pre-fetching All Data (The Talent Page Model)**

This pattern involves loading all the necessary data, including details for modals, during the initial server-side render of the page.

#### **How It Works:**

1.  **Server-Side Fetch:** The page route (e.g., `/src/app/talent/page.tsx`), which is a Server Component, calls a use case like `getAllMembers()` to fetch the **complete data** for every single item in the list. This includes fields that are only needed for the modal view, like the full `biography`.
2.  **Hydrate Client:** This entire, comprehensive dataset is passed as a single large prop to a top-level Client Component (e.g., `TalentDirectory.tsx`).
3.  **Client-Side Interaction:** When the user clicks on a `TalentCard`, the client component does **not** need to contact the server. It already has all the information for the selected member and can immediately render the `MemberModal` using the data it holds in its state.

#### **Characteristics:**

*   **Pro:** Interactions within the client (opening the modal, searching, filtering) are instantaneous, as there are no network delays.
*   **Con:** The initial page load is heavier and slower, as it transfers data that the user may never actually view (e.g., the biographies of members they don't click on).
*   **When to Use:** This pattern is ideal for pages where the total dataset is relatively small and providing a snappy, instant UI experience after the initial load is the top priority.

---

### **Pattern 2: On-Demand Fetching with Server Actions (The Agenda Page Model)**

This pattern prioritizes a fast initial page load by fetching only the essential summary data first, and then fetching detailed data only when the user explicitly requests it.

#### **How It Works:**

1.  **Server-Side Summary Fetch:** The page route (e.g., `/src/app/agenda/page.tsx`) fetches only a **lightweight summary** of data for each item (e.g., `ArchivedEventDTO`, which excludes the long `description`).
2.  **Hydrate Client:** This lightweight summary data is passed as a prop to the main Client Component (e.g., `AgendaView.tsx`). The initial page load is very fast.
3.  **Client-Side Interaction:** The user clicks on an `ArchivedEventCard`.
4.  **On-Demand Fetch:** The Client Component's event handler calls a **Server Action** (e.g., `getEventDetails(id)`). This is a secure function that runs on the server.
5.  **Server Action Execution:** The Server Action calls the relevant use case (`get-event-by-id`) which reads the file system and finds the full details for the single requested event.
6.  **Data Return:** The full event details are returned to the client component, which then updates its state and renders the `EventModal`.

#### **Characteristics:**

*   **Pro:** The initial page load is significantly faster and uses less bandwidth, which is critical for mobile users and SEO.
*   **Con:** The modal will take a moment to appear while the data is being fetched over the network. A loading state (e.g., a spinner) is required to provide good user feedback.
*   **When to Use:** This is the preferred pattern for pages that display large lists of items (e.g., past events, blog archives, e-commerce products), where fetching all details upfront would be highly inefficient.
