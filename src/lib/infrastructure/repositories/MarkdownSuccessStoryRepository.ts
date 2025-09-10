/**
 * @file Implements a repository for success stories using Markdown files.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { SuccessStory } from "@/lib/domain/success-story";
import { ISuccessStoryRepository } from "./ISuccessStoryRepository";

/**
 * A repository for accessing success story data stored in local Markdown files.
 */
export class MarkdownSuccessStoryRepository implements ISuccessStoryRepository {
  private readonly storiesDirectory = path.join(process.cwd(), "content/stories");

  private async parseStoryFile(fileName: string): Promise<SuccessStory | null> {
    const id = fileName.replace(/\.md$/, "");
    const filePath = path.join(this.storiesDirectory, fileName);

    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContent);

      // Basic validation
      if (!data.memberId || !data.company || !data.quote) {
        console.warn(`Skipping malformed story file: ${fileName}`);
        return null;
      }

      const story: SuccessStory = {
        id,
        memberId: data.memberId,
        company: data.company,
        companyLogoUrl: data.companyLogoUrl || "/images/companies/default-logo.svg",
        quote: data.quote,
        isFeatured: data.isFeatured || false,
      };

      return story;
    } catch (error) {
      console.error(`Error reading or parsing story file ${fileName}:`, error);
      return null; // Graceful degradation
    }
  }

  async findAll(): Promise<SuccessStory[]> {
    try {
      const files = await fs.readdir(this.storiesDirectory);
      const storyPromises = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => this.parseStoryFile(file));

      const stories = await Promise.all(storyPromises);
      return stories.filter((story): story is SuccessStory => story !== null);
    } catch (error) {
      console.error("Error reading stories directory:", error);
      return [];
    }
  }

  async findFeatured(): Promise<SuccessStory[]> {
    const allStories = await this.findAll();
    return allStories.filter((story) => story.isFeatured);
  }
}
