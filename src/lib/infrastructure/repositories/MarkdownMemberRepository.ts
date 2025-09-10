/**
 * @file Implements a repository for members using Markdown files as the data source.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Member } from "@/lib/domain/member";
import { IMemberRepository } from "./IMemberRepository";

/**
 * A repository for accessing member data stored in local Markdown files.
 * It implements the IMemberRepository interface, decoupling the application
 * from the specific data source.
 */
export class MarkdownMemberRepository implements IMemberRepository {
  private readonly membersDirectory = path.join(process.cwd(), "content/members");

  /**
   * Finds and returns all members from the Markdown files.
   *
   * It reads all .md files in the content/members directory, parses them,
   * and returns them as an array of Member objects. It gracefully handles
   * errors by logging them and returning an empty array if the directory
   * cannot be read.
   *
   * @returns A promise that resolves to an array of all members.
   */
  async findAll(): Promise<Member[]> {
    try {
      const files = await fs.readdir(this.membersDirectory);
      const memberPromises = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => this.findById(file.replace(/\.md$/, "")));

      const members = await Promise.all(memberPromises);

      // Filter out any null values that may have resulted from parsing errors
      return members.filter((member): member is Member => member !== null);
    } catch (error) {
      // If the directory doesn't exist or there's a reading error
      console.error("Error reading members directory:", error);
      return []; // Graceful degradation
    }
  }

  /**
   * Finds a single member by their unique ID (the file slug).
   *
   * It reads the corresponding .md file, parses its frontmatter and content,
   * and returns a Member object. It handles errors gracefully by logging
   * them and returning null if the file is not found, is malformed, or
   * fails to parse.
   *
   * @param id - The unique ID of the member (e.g., 'jane-doe').
   * @returns A promise that resolves to the Member object or null if not found.
   */
  async findById(id: string): Promise<Member | null> {
    const filePath = path.join(this.membersDirectory, `${id}.md`);
    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(fileContent);

      // Basic validation to ensure required fields are present
      if (!data.name || !data.role) {
        console.warn(`Skipping malformed member file: ${id}.md`);
        return null;
      }

      const member: Member = {
        id,
        name: data.name,
        role: data.role,
        profilePictureUrl: data.profilePictureUrl || "/images/default-avatar.png",
        skills: data.skills || [],
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
        biography: content.trim(),
      };

      return member;
    } catch (error) {
      // Handles file not found, read errors, or parsing errors from gray-matter
      console.error(`Error reading or parsing member file ${id}.md:`, error);
      return null; // Graceful degradation
    }
  }
}
