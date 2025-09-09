# Project Work Phases

**Phase 0: Foundation & Setup**
*   **Goal:** Prepare the project structure, define data schemas, and ensure all necessary tools are in place.
*   **Tasks:**
    1.  **Directory Scaffolding:** Create the directory structure for the Clean Architecture data layer (`/src/lib/{domain,application,infrastructure}`) and the content source (`/content/members`, `/content/stories`).
    2.  **Data Schema Definition:** Formally document the fields for the `Member` and `SuccessStory` Markdown files. This is a prerequisite for the parsers.
    3.  **Dependency Check:** Verify `package.json` for necessary libraries (`gray-matter` for parsing, a testing framework like Jest or Vitest) and install any that are missing.

**Phase 1: Data Layer - Members**
*   **Goal:** Build and test the complete backend logic for fetching and processing member data.
*   **Tasks:**
    1.  **Domain:** Define the `Member` entity in `/src/lib/domain`.
    2.  **Infrastructure:** Define the `IMemberRepository` interface and create the `MarkdownMemberRepository` implementation. This includes file reading, parsing, and robust error handling.
    3.  **Unit Testing:** Write unit tests for the `MarkdownMemberRepository` to ensure it correctly parses data and handles errors gracefully.
    4.  **Application:** Create the `memberUseCases` to transform `Member` entities into `MemberDTOs` suitable for the UI.
    5.  **Service Locator:** Configure the service locator to provide the `MarkdownMemberRepository` to the rest of the application.

**Phase 2: UI - Talent Directory Page**
*   **Goal:** Develop the complete, user-facing Talent Directory page.
*   **Tasks:**
    1.  **Page & Data Fetching:** Create the page file at `/src/app/talent/page.tsx` and use the application layer use case to fetch member data.
    2.  **Component Development:** Build the reusable React components: `TalentCard`, `TalentGrid`, and the `MemberModal` for the detailed pop-up view.
    3.  **Search Functionality:** Implement the search/filter logic. This will likely involve converting parts of the page to Client Components to manage state.
    4.  **Styling:** Apply Tailwind CSS to all components to match the visual design from the wireframe.

**Phase 3: Data Layer & UI - Home Page**
*   **Goal:** Build the home page, which includes implementing the data layer for "Success Stories."
*   **Tasks:**
    1.  **Data Layer (Success Stories):** Repeat the steps from Phase 1 for `SuccessStory` data (define entity, create repository with tests, implement use cases). The `getFeaturedSuccessStories` use case will need to fetch data from both the story and member repositories.
    2.  **Component Development:** Build the home page components: `HeroSection`, `SuccessStoryCard`, and `SuccessStoriesGallery`.
    3.  **Navigation:** Create the primary `Navbar` component and ensure routing between the Home and Talent pages is working.
    4.  **Styling:** Style all new components with Tailwind CSS.

**Phase 4: Review, Finalization & Deployment**
*   **Goal:** Polish the application and prepare it for its initial launch.
*   **Tasks:**
    1.  **Content Population:** Add the real member and success story Markdown files to the `/content` directory.
    2.  **End-to-End Review:** Conduct a full review of the implemented pages, checking for bugs, and ensuring everything aligns with the project goals.
    3.  **Accessibility Audit:** Perform checks to ensure the site meets accessibility standards (keyboard navigation, screen reader compatibility, etc.).
    4.  **Deployment:** Run the production build and deploy the application to Vercel.
