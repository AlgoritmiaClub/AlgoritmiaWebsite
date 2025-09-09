# **Algoritmia Website: Web Application Architecture**

Version: 2.0  
Author: Leo (Project Architect)  
Date: September 8, 2025

## **1\. Guiding Principles**

Welcome to the Algoritmia web project\! This document outlines the complete architecture for the web application. The primary goal is to create a system that is **decoupled, maintainable, and scalable**.

Our core philosophies are:

1. **Clean Architecture** for the data layer.  
2. **Component-Based Architecture** for the frontend.

This dual approach provides crucial advantages. It allows us to build a robust application where the business logic is independent of the database and the UI is composed of isolated, reusable pieces. For our MVP, we will use local **Markdown (.md) files** as our database. This architecture ensures a smooth migration to a proper database in Phase 2 with minimal disruption.

## **2\. Data Layer Architecture**

Our data layer is organized into the following layers, moving from the inside out.

### **2.1. Domain Layer (Entities)**

* **Location:** /src/lib/domain/  
* **Purpose:** To define the core, framework-agnostic data structures of our application (e.g., Member, SuccessStory).  
* **Rule:** These files contain **no logic** and have **zero dependencies**.

### **2.2. Application Layer (Use Cases & DTOs)**

* **Location:** /src/lib/application/  
* **Purpose:** To orchestrate the business logic and to shape data for the UI layer.  
* **Rule:** Depends on the **Domain** layer and repository **interfaces**. It does **not** know how data is stored.

#### **Data Transfer Objects (DTOs)**

A key responsibility of this layer is to transform domain entities into **Data Transfer Objects (DTOs)**. A DTO is an object shaped specifically for the needs of the UI. This simplifies UI components by providing them with all the data they need in a single, clean object.

**Example (/src/lib/application/stories/storyUseCases.ts):**

import { ISuccessStoryRepository } from '@/lib/infrastructure/repositories/ISuccessStoryRepository';  
import { IMemberRepository } from '@/lib/infrastructure/repositories/IMemberRepository';

// This is the DTO \- the shape of data the UI will receive  
export interface SuccessStoryDTO {  
  quote: string;  
  company: string;  
  companyLogoUrl: string;  
  memberName: string;  
  memberPhotoUrl: string;  
}

// The use case now accepts multiple repositories to orchestrate data  
export async function getFeaturedSuccessStories(  
  storyRepo: ISuccessStoryRepository,  
  memberRepo: IMemberRepository  
): Promise\<SuccessStoryDTO\[\]\> {  
  const stories \= await storyRepo.findFeatured();

  // Enrich the raw data into the DTO for the UI  
  const storiesForUi \= await Promise.all(stories.map(async (story) \=\> {  
    const member \= await memberRepo.findById(story.memberId);  
    return {  
      ...story, // quote, company, etc.  
      memberName: member?.name || 'Algoritmia Member',  
      memberPhotoUrl: member?.profilePictureUrl || '/images/default-avatar.png',  
    };  
  }));

  return storiesForUi;  
}

### **2.3. Interface Adapters (Repository Interfaces)**

* **Location:** /src/lib/infrastructure/repositories/  
* **Purpose:** To define the **contracts** (TypeScript interfaces) that our data access layers must follow.

### **2.4. Infrastructure Layer (Implementations & Service Locator)**

* **Location:** /src/lib/infrastructure/  
* **Purpose:** To contain the **concrete implementations** of the repository interfaces and to manage which implementation is currently active.

#### **Repository Service Locator**

To fully decouple the UI layer from the data source, we will use a **Service Locator** pattern. The UI will ask a central factory function for the "current" active repository instead of creating one itself. This centralizes the decision of which database to use, making future migrations trivial.

**Example (/src/lib/infrastructure/repositories/index.ts):**

import { IMemberRepository } from './IMemberRepository';  
import { MarkdownMemberRepository } from './MarkdownMemberRepository';  
// import { PostgresMemberRepository } from './PostgresMemberRepository'; // Future

const memberRepository: IMemberRepository \= new MarkdownMemberRepository();

// This factory is the single source of truth for the Member repository  
export function getMemberRepository(): IMemberRepository {  
  return memberRepository;  
}

## **3\. Frontend Architecture (UI Layer)**

The frontend will be built using Next.js App Router and React.

### **3.1. Component-Based Architecture**

The UI is a tree of isolated, reusable components. The homepage (/src/app/page.tsx) will be composed of high-level components like Navbar, HeroSection, and SuccessStoriesGallery, which are themselves built from smaller UI elements like a Button or Card.

### **3.2. Server Components vs. Client Components**

* **Default:** All components will be **React Server Components (RSCs)** by default. They render on the server, can access the backend directly, and are highly performant.  
* **Interactivity:** Only when client-side interactivity is needed (e.g., useState, onClick), a component will be marked with the 'use client' directive.

### **3.3. UI Data Flow**

There is a clear, one-way data flow connecting our data layer to our UI.

1. **Data Fetching:** The root page component (e.g., /src/app/page.tsx) is responsible for all data fetching. It uses the **Repository Service Locator** to get the necessary repositories.  
2. **Use Case Orchestration:** The page calls the relevant use case from the Application Layer, passing in the repositories.  
3. **Passing Props:** The DTOs returned from the use case are passed down to the child UI components as props.

**Example (/src/app/page.tsx):**

import { getSuccessStoryRepository, getMemberRepository } from '@/lib/infrastructure/repositories';  
import { getFeaturedSuccessStories } from '@/lib/application/stories/storyUseCases';  
import { SuccessStoriesGallery } from '@/components/home/SuccessStoriesGallery';

export default async function HomePage() {  
  // 1\. Get repositories from the service locator  
  const storyRepo \= getSuccessStoryRepository();  
  const memberRepo \= getMemberRepository();

  // 2\. Call the use case, which returns the DTO  
  const stories \= await getFeaturedSuccessStories(storyRepo, memberRepo);

  // 3\. Pass the clean DTOs down to the UI component  
  return (  
    \<main\>  
      \<SuccessStoriesGallery stories={stories} /\>  
    \</main\>  
  );  
}

### **3.4. Styling Architecture**

* **Framework:** **Tailwind CSS** will be used for all styling.  
* **Philosophy:** We will adhere to the **utility-first** approach, applying classes directly in JSX. A central tailwind.config.js will define project-specific design tokens (colors, fonts) for brand consistency.

## **4\. Cross-Cutting Concerns**

These are principles that apply across the entire application.

### **4.1. Error Handling: Graceful Degradation**

* **Rule:** All data-accessing code within the **Infrastructure Layer** (e.g., file reading) must be wrapped in try...catch blocks.  
* **Behavior:** If a specific file is missing or malformed, the repository method should log the error and return a safe value (e.g., an empty array or null).  
* **Goal:** This ensures that a single broken data file will not crash the entire website during the build process.

### **4.2. Accessibility (a11y)**

* **Rule:** The application must be accessible to all users.  
* **Implementation:**  
  * Use semantic HTML elements (\<nav\>, \<main\>, \<button\>).  
  * Ensure all images (\<img\>) have meaningful alt text.  
  * Interactive elements must be navigable and operable via keyboard.  
  * Ensure sufficient color contrast for text and UI elements.