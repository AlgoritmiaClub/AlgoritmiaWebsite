# Responsiveness Refactoring Plan

**Date:** September 14, 2025

This document provides a detailed, step-by-step plan to refactor the website's components to be fully responsive, based on the findings in `Responsiveness_Analysis.md`.

---

## 1. General Strategy: Mobile-First

The core strategy is to adopt a **mobile-first** approach. All base styles (without responsive prefixes) will be considered the default for mobile viewports. Styles for larger screens will be applied using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.).

**The workflow for each component will be:**
1.  Modify existing Tailwind classes to be mobile-friendly by default.
2.  Add responsive prefixes to re-introduce the desktop styles only on larger screens.

---

## 2. Task-by-Task Implementation Plan

### **Phase 1: Global Components**

These changes will affect the entire site.

#### **1.1. `Footer.tsx`**
*   **Goal:** Prevent content from being squished on mobile.
*   **File:** `src/components/layout/Footer.tsx`
*   **Action:** Modify the root `div`'s classes.
    *   **From:** `container mx-auto flex justify-between items-center py-5 px-6 text-sm`
    *   **To:** `container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-5 px-6 text-sm text-center md:text-left`
    *   **Explanation:** This makes the flex container vertical (`flex-col`) by default and adds a gap. On medium screens and up (`md:`), it reverts to a horizontal layout.

#### **1.2. `Navbar.tsx` (Mobile Hamburger Menu)**
*   **Goal:** Convert the static navbar into a responsive one with a hamburger menu.
*   **File:** `src/components/layout/Navbar.tsx`
*   **Actions:**
    1.  **Convert to Client Component:** Add `"use client";` to the top of the file and import `useState` from `react`.
    2.  **Add State:** Introduce state to manage the menu's open/closed status: `const [isOpen, setIsOpen] = useState(false);`
    3.  **Create Hamburger Button:** Add a `<button>` that is only visible on mobile (`md:hidden`) and toggles the `isOpen` state `onClick`.
    4.  **Modify Nav Links:** The `<nav>` and `<ul>` elements should be hidden on mobile by default and only appear when `isOpen` is true. On `md:` screens and up, they should always be visible.
        *   The `<ul>` will get conditional classes: `hidden md:flex` and a class to display it when `isOpen` is true (e.g., `absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4`).

---

### **Phase 2: Homepage Components**

#### **2.1. `NewHeroSection.tsx`**
*   **Goal:** Adjust typography and spacing for mobile.
*   **File:** `src/components/home/NewHeroSection.tsx`
*   **Actions:**
    *   **Headline (`<h1>`):** Change `font-bold text-5xl md:text-6xl` to `font-bold text-4xl sm:text-5xl md:text-6xl`.
    *   **Container (`<div>`):** Change `py-24 px-8` to `py-20 px-4 sm:px-8 md:py-24`.

#### **2.2. `SuccessStoriesMarquee.tsx`**
*   **Goal:** Make cards smaller on mobile to improve the marquee effect.
*   **File:** `src/components/home/SuccessStoriesMarquee.tsx`
*   **Action:** Modify the card wrapper `div` inside the `map` function.
    *   **From:** `flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4`
    *   **To:** `flex-shrink-0 w-[80%] sm:w-1/2 md:w-1/3 p-4`
    *   **Explanation:** `w-[80%]` ensures the card doesn't take up the full screen width on the smallest devices, making parts of adjacent cards visible.

#### **2.3. `ActivitiesSection.tsx` & `ActivityCard.tsx`**
*   **Goal:** Fix text overflow on activity cards.
*   **Files:** `src/components/home/ActivitiesSection.tsx`, `src/components/home/ActivityCard.tsx`
*   **Actions:**
    1.  In `ActivitiesSection.tsx`, modify the card container `div`.
        *   **From:** `relative h-[200px]`
        *   **To:** `relative min-h-[220px] sm:min-h-[200px]` (Allow height to grow).
    2.  In `ActivityCard.tsx`, make the typography responsive.
        *   **Headline (`<h3>`):** From `text-2xl` to `text-xl sm:text-2xl`.
        *   **Description (`<p>`):** From `leading-relaxed` to `leading-relaxed text-sm sm:text-base`.

#### **2.4. `FeaturedEventSection.tsx`**
*   **Goal:** Adjust typography for mobile.
*   **File:** `src/components/home/FeaturedEventSection.tsx`
*   **Action:** Modify the `<h2>` element.
    *   **From:** `mt-4 text-4xl font-bold text-brand-dark-blue`
    *   **To:** `mt-4 text-3xl sm:text-4xl font-bold text-brand-dark-blue`

#### **2.5. `HeroSection.tsx`**
*   **Goal:** Make the section layout stack on mobile and adjust typography.
*   **File:** `src/components/home/HeroSection.tsx`
*   **Note:** This component should be renamed to better reflect its purpose (e.g., `ShowcaseSection.tsx`). The plan will proceed with the current name, but the rename should be done as part of the refactor.
*   **Actions:**
    1.  **Make Layout Responsive:**
        *   On the main content `div` with `className="... flex ..."`: add `flex-col md:flex-row`.
        *   On the two direct children `div`s (left and right content): change `w-1/2` to `w-full md:w-1/2`.
    2.  **Adjust Typography:**
        *   On the `<h1>` element: change `text-5xl` to `text-4xl md:text-5xl`.
    3.  **Update Import and Usage:**
        *   After renaming the file, the import and usage in `src/app/page.tsx` must be updated.

---

### **Phase 3: Page-Specific Components**

#### **3.1. `FeaturedEvent.tsx` & `FeaturedEventCard.tsx` (Agenda Page)**
*   **Goal:** Fix the awkward image card layout on mobile.
*   **Files:** `src/components/agenda/FeaturedEvent.tsx`, `src/components/agenda/FeaturedEventCard.tsx`
*   **Actions:**
    1.  In `FeaturedEvent.tsx`, adjust the headline `<h1>`.
        *   **From:** `text-5xl`
        *   **To:** `text-4xl md:text-5xl`
    2.  In `FeaturedEventCard.tsx`, modify the image container `div`.
        *   **From:** `relative w-full h-full min-h-[300px]`
        *   **To:** `relative w-full aspect-video md:aspect-auto md:h-full md:min-h-[300px]`
    3.  In `FeaturedEventCard.tsx`, modify the `Image` component.
        *   **From:** `objectFit="contain"`
        *   **To:** `objectFit="cover"`
    *   **Explanation:** This makes the image a standard `aspect-video` banner on mobile and reverts to the flexible taller layout on medium screens, while ensuring the image covers the area attractively.

#### **3.2. `TalentPageHeader.tsx`**
*   **Goal:** Adjust typography and background for mobile.
*   **File:** `src/components/talent/TalentPageHeader.tsx`
*   **Actions:**
    1.  Modify the headline `<h1>`.
        *   **From:** `text-5xl`
        *   **To:** `text-4xl sm:text-5xl`
    2.  Modify the root `<section>` classes.
        *   **From:** `bg-[url('/images/Frame_91.png')] bg-no-repeat bg-right bg-contain`
        *   **To:** `bg-none md:bg-[url('/images/Frame_91.png')] md:bg-no-repeat md:bg-right md:bg-contain`
    *   **Explanation:** This removes the background image on mobile screens where it interferes with the layout and re-introduces it on medium screens and up.
