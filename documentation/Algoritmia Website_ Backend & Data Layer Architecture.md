# **Algoritmia Website: Backend & Data Layer Architecture**

Version: 2.0  
Author: Leo (Project Architect)  
**Date:** September 8, 2025

## **1\. Guiding Principles**

Welcome to the Algoritmia web project\! This document outlines the architecture for our data layer. The primary goal is to create a system that is **decoupled, maintainable, and scalable**.

Our core philosophy is **Clean Architecture**. This means dependencies can only point inwards, protecting our core business logic from changes in frameworks, databases, or other external concerns.

This approach provides a crucial advantage: **flexibility**. For our MVP, we will use local **Markdown (.md) files** as our database. When we migrate to a proper database in Phase 2, this architecture will allow us to make the change with minimal disruption to the rest of the application.

## **2\. Architectural Layers**

Our data layer is organized into the following layers, moving from the inside out.

### **2.1. Domain Layer (Entities)**

* **Location:** /src/lib/domain/  
* **Purpose:** To define the core, framework-agnostic data structures of our application (e.g., Member, SuccessStory).  
* **Rule:** These files contain **no logic** and have **zero dependencies**.

### **2.2. Application Layer (Use Cases & DTOs)**

* **Location:** /src/lib/application/  
* **Purpose:** To orchestrate the business logic of the application and to shape data for the UI layer. This is where we bridge the gap between our raw data and what the frontend needs to display.  
* **Rule:** This layer depends on the **Domain** layer and repository **interfaces**. It does **not** know how data is stored or fetched.

#### **Data Transfer Objects (DTOs)**

A key responsibility of this layer is to transform domain entities into **Data Transfer Objects (DTOs)**. A DTO is an object shaped specifically for the needs of the UI.

* **Why use DTOs?** They simplify UI components. For example, a SuccessStoryCard needs to display the member's name, but the SuccessStory entity only contains a memberId. The use case will perform the necessary "join" to create a SuccessStoryDTO that contains all the required information, so the UI component's logic remains simple.

**Example (/src/lib/application/stories/storyUseCases.ts):**

import { SuccessStory } from '@/lib/domain/entities';  
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
* **Purpose:** To define the **contracts** (TypeScript interfaces) that our data access layers must follow. This is the critical bridge that decouples the application from the data source.

### **2.4. Infrastructure Layer (Implementations & Service Locator)**

* **Location:** /src/lib/infrastructure/  
* **Purpose:** To contain the **concrete implementations** of the repository interfaces and to manage which implementation is currently active.

#### **Concrete Repositories**

This is where the actual data fetching logic lives (e.g., reading from Markdown files, querying a database).

#### **Repository Service Locator**

To fully decouple the UI layer from the data source implementation, we will use a **Service Locator** pattern. Instead of the UI instantiating a repository directly (e.g., new MarkdownMemberRepository()), it will ask a central factory function for the "current" active repository.

* **Why use a Service Locator?** It centralizes the decision of which database to use. When we migrate to a new database, we only need to change one line of code in the entire application—inside the service locator file.

**Example (/src/lib/infrastructure/repositories/index.ts):**

import { IMemberRepository } from './IMemberRepository';  
import { MarkdownMemberRepository } from './MarkdownMemberRepository';  
// import { PostgresMemberRepository } from './PostgresMemberRepository'; // Future implementation

// For now, we are hard-coding the Markdown implementation.  
const memberRepository: IMemberRepository \= new MarkdownMemberRepository();

// This factory function is the single source of truth for the Member repository  
export function getMemberRepository(): IMemberRepository {  
  return memberRepository;  
}

// A similar factory would be created for the Success Story repository

## **3\. Data Flow Example: Fetching Success Stories for the Homepage**

Step 1: The UI Layer (/src/app/page.tsx)  
The page component asks the service locator for the required repositories and passes them to the use case. It has no knowledge of Markdown.  
// /src/app/page.tsx  
import { getSuccessStoryRepository, getMemberRepository } from '@/lib/infrastructure/repositories';  
import { getFeaturedSuccessStories } from '@/lib/application/stories/storyUseCases';

export default async function HomePage() {  
  // 1\. Get repositories from the service locator  
  const storyRepo \= getSuccessStoryRepository();  
  const memberRepo \= getMemberRepository();

  // 2\. Call the use case, which returns the DTO  
  const stories \= await getFeaturedSuccessStories(storyRepo, memberRepo);

  return (  
    // ... JSX to pass the 'stories' DTO to the SuccessStoriesGallery component  
  );  
}

Step 2: The Application Layer  
The getFeaturedSuccessStories use case (shown in section 2.2) executes its logic, fetching data using the repository interfaces and transforming it into the SuccessStoryDTO.  
Step 3: The Infrastructure Layer  
The service locator provides the concrete MarkdownSuccessStoryRepository and MarkdownMemberRepository instances, which read from the /content/ directory to fulfill the requests.

## **4\. Cross-Cutting Concerns**

### **Error Handling Principle: Graceful Degradation**

The data source is a critical dependency, but its failure should not result in a total application crash.

* **Rule:** All data-accessing code within the **Infrastructure Layer** must be wrapped in try...catch blocks.  
* **Behavior:** If a specific file is missing, malformed, or fails to parse, the repository method should:  
  1. Log the specific error to the console for debugging purposes.  
  2. Return a "safe" value. For a method fetching a list (e.g., findAll), it should return the list of successfully parsed items, excluding the failed one. For a method fetching a single item, it should return null.  
* **Goal:** This ensures that a single broken data file will, at worst, cause one item to be missing from a list, but it will not take down the entire website during the build process.