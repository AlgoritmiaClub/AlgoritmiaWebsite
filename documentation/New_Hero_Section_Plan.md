# Plan: New Homepage Hero Section

**Date:** September 12, 2025

This document outlines the plan for creating a new hero section for the homepage, designed to replace the existing one. The new design is based on the provided image `landing_page_alg.png`.

![new_landing_page](/images_for_debugging/landing_page_alg.png)

---

### 1. Objective

To build a new, visually distinct hero section component that captures the aesthetic of the provided design mock-up. This component will be developed separately and can be used to replace the current `HeroSection` at a later stage.

### 2. Component Strategy

*   **New Component:** A new, self-contained React component will be created at `/src/components/home/NewHeroSection.tsx`.
*   **Component Type:** This will be a **Server Component**. Based on the design, no client-side state or interactivity is required, so a server component is the most performant choice.

### 3. Structural (JSX) Layout

The component will be structured with a clear hierarchy to achieve the desired visual effect.

1.  **Root `<section>`:** The main container for the entire section. It will be responsible for positioning the component on the page.
2.  **Content Wrapper `<div>`:**
    *   This `div` will be the main visual element. It will have large, rounded corners and contain all the content.
    *   It will be styled with the specified background image (`/public/images/mosaicos.png`).
    *   It will act as a flex container to center its children vertically and horizontally.
3.  **Content Elements:**
    *   **`<h1>`:** For the main headline: "Nosotros también pensábamos que Windows era mejor que Linux".
    *   **`<p>`:** For the sub-headline: "La experiencia de uno es la experiencia de todos".
    *   **`<a>`:** A link styled as a button for the call-to-action: "Empieza tu camino". It will likely point to the `/talent` page.

### 4. Styling & Implementation (Tailwind CSS)

The styling will be implemented using utility classes from Tailwind CSS to match the design.

*   **Content Wrapper (`<div>`)**:
    *   `background`: `bg-[url('/images/mosaicos.png')] bg-cover bg-center`
    *   `layout`: `flex flex-col items-center justify-center text-center`
    *   `spacing`: Generous padding, e.g., `py-24 px-8`
    *   `border`: Large rounded corners, e.g., `rounded-2xl`
    *   `sizing`: It will take the full width of its container, e.g., `w-full`.

*   **Headline (`<h1>`)**:
    *   `font`: `font-bold text-5xl md:text-6xl`
    *   `color`: `text-white`
    *   `layout`: `max-w-4xl` to ensure the text wraps correctly on larger screens.

*   **Sub-headline (`<p>`)**:
    *   `font`: `text-lg md:text-xl`
    *   `color`: `text-white`
    *   `spacing`: `mt-4`

*   **Call-to-Action Button (`<a>`)**:
    *   `background`: `bg-white` with a hover effect like `hover:bg-gray-200`.
    *   `font`: `font-semibold` and `text-brand-blue`.
    *   `shape`: `rounded-full` for the pill shape.
    *   `spacing`: `mt-8 px-10 py-3`.
    *   `transition`: `transition-colors` for a smooth hover effect.

### 5. Development Steps

1.  Create the new component file: `/src/components/home/NewHeroSection.tsx`.
2.  Implement the JSX structure and apply the Tailwind CSS classes as detailed above.
3.  The component will remain isolated for now and will not be integrated into the main `/src/app/page.tsx` until instructed.
