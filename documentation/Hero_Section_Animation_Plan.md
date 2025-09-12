# Plan: Dynamic Hero Section Animation

**Date:** September 9, 2025

This document outlines the plan for redesigning the `HeroSection` component to include a timed, animated transition.

---

### 1. Objective

To transform the static `HeroSection` into a dynamic, animated component. Initially, it will appear as a single, full-width dark panel. After a 2-second delay, it will smoothly split into two halves: the left half retaining the original content on a dark background, and a new right half with a white background appearing to reveal the club's logo.

### 2. Component Strategy

*   The `HeroSection` component will be converted into a **Client Component** by adding the `"use client";` directive at the top of the file.
*   **Rationale:** This is necessary to use React hooks (`useState`, `useEffect`) for managing the animation's state and triggering it after a delay.

### 3. State Management

*   A state variable, `isSplit`, will be introduced to track the component's state:
    ```javascript
    const [isSplit, setIsSplit] = useState(false);
    ```
*   A `useEffect` hook will be used to set a 2-second timer when the component first mounts. When the timer completes, it will update the state by calling `setIsSplit(true)`. This will trigger the animation.

### 4. Structural (JSX) Changes

*   The root `<section>` will become a `flexbox` container.
*   Inside, it will contain two primary `<div>` children: a **"Left Panel"** and a **"Right Panel"**.
*   **Left Panel:** Will contain the existing content (the "Club Algoritmia" title, the subtitle, and the two action buttons).
*   **Right Panel:** Will be dedicated to displaying the club logo image.

### 5. Styling & Animation Strategy (Tailwind CSS)

This will be achieved by conditionally applying Tailwind classes based on the `isSplit` state. Smoothness will be handled by `transition` utilities.

*   **Initial State (`isSplit` is `false`):**
    *   **Left Panel:** Will occupy the full width of the container (`w-full`). Its content will be centered. The background will be a dark color (e.g., `bg-slate-800`) and text will be light (`text-white`).
    *   **Right Panel:** Will have zero width (`w-0`) and be invisible (`opacity-0`). The `overflow-hidden` class will prevent its content from being visible.

*   **Final (Split) State (`isSplit` is `true`):**
    *   **Left Panel:** Will transition to occupy the left 50% of the container's width (`w-1/2`). Its content will align to the center of this new, smaller space.
    *   **Right Panel:** Will smoothly transition to occupy the right 50% of the width (`w-1/2`) and become fully visible (`opacity-100`). It will have a white background (`bg-white`).

*   **Transition:**
    *   Both panels will have transition classes applied (e.g., `transition-all duration-1000 ease-in-out`) to animate the changes to their `width` and `opacity` properties, creating the desired dynamic effect.

### 6. Asset Management

*   The logo image (`idea@1080x-8.png`) must be placed in the `/public` directory to be accessible. For this implementation, it will be assumed the image is saved as `/public/algoritmia-logo-slogan.png`.
*   The Next.js `<Image>` component will be used within the Right Panel to render the logo, ensuring optimal performance.

---

## V2 Plan: Faded Background Transition

This section outlines a more sophisticated approach to the animation, focusing on a smoother, faded transition for the background colors as requested.

### 1. V2 Objective

To evolve the animation so the transition between the dark and white backgrounds is a fluid, sliding motion rather than a simple reveal caused by resizing panels. The final state will feature a soft gradient fading from dark to transparent over a white background, as specified in the design.

### 2. V2 Core Technique: Gradient Background Animation

*   The core technique remains the same: we will animate the `background-position` of a single container to create the slide effect.
*   The root `<section>` element will have a `bg-white` class to provide the base background for the right-hand side.
*   A `::before` pseudo-element will be used to hold the gradient. This pseudo-element will be styled with a `linear-gradient(to right, #1e293b 50%, transparent 100%)`.
*   This gradient layer will be made twice as wide as the container by setting its `width: 200%`.

### 3. V2 Animation Flow

*   **Initial State (`isSplit` is `false`):** The gradient pseudo-element will be positioned with `right: 0`. This aligns the gradient so that its solid dark half completely covers the container, making the entire section appear dark.
*   **Final State (`isSplit` is `true`):** The pseudo-element's position will be transitioned to `right: -100%`. This smoothly slides the gradient layer to the left. As it slides, the transparent part of the gradient reveals the underlying white background of the root section, creating the desired faded effect.
*   **Transition Class:** The `right` property of the pseudo-element will be animated using a class like `transition-all duration-1000 ease-in-out`.

### 4. V2 Structural & Content Polish

*   **JSX Simplification:** The internal structure can be simplified to a single root `<section>` with one child `div` using `flexbox` to position the left (text) and right (logo) content blocks.
*   **Choreographed Logo Reveal:** To make the animation more professional, the logo's fade-in will be delayed. A `transition-delay` will be applied to its `opacity` animation, ensuring the background slide begins *before* the logo starts to appear. This creates a polished effect where the logo is "revealed" by the new white space.
