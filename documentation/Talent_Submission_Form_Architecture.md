# Talent Submission Form: Architectural Plan

**Date:** September 12, 2025

This document outlines the architecture for the "Share Your Career" feature, which allows members to submit their profiles to be included on the Talent page.

---

### 1. High-Level Strategy

The core strategy is to decouple the frontend form from the backend logic. A client-side form will gather the user's information and send it to a dedicated Next.js API Route. This API route acts as a secure backend, responsible for validating the data, generating the Markdown content for the new member profile, and emailing this content to the club's leadership for review and final approval.

### 2. Frontend Architecture (The Form)

*   **Component:** A new component, `SubmissionForm.tsx`, will be created in `/src/components/talent/`.
*   **Component Type:** This will be a **React Client Component** (`'use client'`) to manage state and user interactions.
*   **User Experience:** The form will be presented in a **modal dialog** that overlays the Talent page. The visibility of this modal will be controlled by state, triggered by the "Share your career" button.
*   **State Management:** We will use React's `useState` hook to manage:
    *   The value of each form field (name, role, skills, etc.).
    *   The form's submission status (e.g., idle, submitting, success, error).
*   **Validation:** Client-side validation will be implemented to provide immediate feedback to the user, ensuring all required fields are filled out correctly before submission.

### 3. Backend Architecture (The API Route)

*   **Serverless Function:** A new API Route will be created at `/src/app/api/submit-talent/route.ts`.
*   **Responsibilities:**
    1.  **Receive Data:** It will define a `POST` handler to accept the JSON data submitted from the frontend form.
    2.  **Server-Side Validation:** It will re-validate all incoming data on the server. This is a critical security measure to ensure data integrity, as client-side validation can be bypassed.
    3.  **Markdown Generation:** Upon successful validation, the handler will format the data into a Markdown string with the correct frontmatter structure for a member profile.

### 4. Email Service & The "Write" Step

This is the most critical architectural consideration.

*   **Filesystem Limitation:** The project is deployed on Vercel, which uses a **read-only filesystem**. This means our API route **cannot** directly write a new `.md` file into the project's `/content/members` directory at runtime. This is a fundamental constraint of modern serverless platforms.
*   **Correct Workflow:** The API route will use a library like `Nodemailer` to send an email containing the generated Markdown content. The content can be an attachment (`new-member.md`) or be placed in the email body.
*   **Manual Review (The Final Step):** This email will be sent to an address managed by Algoritmia's leadership. A club officer is then responsible for:
    1.  Reviewing the submission for quality and accuracy.
    2.  **Manually committing the new `.md` file to the project's Git repository.**

This "human-in-the-loop" workflow is a secure and robust pattern for managing user-generated content on a static site.

### 5. Security & Deployment

*   **Environment Variables:** The credentials for the email service (SMTP server, username, password) **must** be stored as secure environment variables on the Vercel platform. They must not be hardcoded in the source code.
*   **Spam Prevention:** The API route should be protected with a rate-limiter to prevent abuse and spam submissions.

### 6. Proposed Development Workflow

1.  **Frontend:** Build the `SubmissionForm.tsx` component and the modal UI.
2.  **Backend:** Create the `/api/submit-talent` API route.
3.  **Integration:** Connect the frontend form to the API route.
4.  **Email:** Add the `Nodemailer` library and configure the email sending logic using environment variables.
5.  **Testing:** Thoroughly test the end-to-end flow.
