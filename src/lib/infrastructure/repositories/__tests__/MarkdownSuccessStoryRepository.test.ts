/**
 * @file Unit tests for the MarkdownSuccessStoryRepository.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import path from "path"; // Import path
import { MarkdownSuccessStoryRepository } from "../MarkdownSuccessStoryRepository";

// Mock the fs/promises module
vi.mock("fs/promises", () => ({
  default: {
    readdir: vi.fn(),
    readFile: vi.fn(),
  },
}));

const fs = await import("fs/promises");

describe("MarkdownSuccessStoryRepository", () => {
  let repository: MarkdownSuccessStoryRepository;

  const mockStory1 = `
---
memberId: "jane-doe"
company: "Tech Solutions Inc."
quote: "This was a great experience!"
isFeatured: true
---
`.trim();

  const mockStory2 = `
---
memberId: "john-smith"
company: "Data Corp"
quote: "I learned so much."
isFeatured: false
---
`.trim();

  const mockFeaturedStory = `
---
memberId: "anna-lee"
company: "Innovate LLC"
quote: "I loved the team."
isFeatured: true
---
`.trim();

  const mockMalformedStory = `
---
memberId: "bad-data"
---
`.trim();

  beforeEach(() => {
    vi.resetAllMocks();
    repository = new MarkdownSuccessStoryRepository();
  });

  describe("findAll", () => {
    it("should return all valid stories", async () => {
      fs.default.readdir.mockResolvedValue([
        "story1.md",
        "story2.md",
        "malformed.md",
      ]);
      fs.default.readFile.mockImplementation((filePath) => {
        const fileName = path.basename(filePath.toString());
        if (fileName === "story1.md") return Promise.resolve(mockStory1);
        if (fileName === "story2.md") return Promise.resolve(mockStory2);
        if (fileName === "malformed.md")
          return Promise.resolve(mockMalformedStory);
        return Promise.reject(new Error("File not found"));
      });

      const stories = await repository.findAll();

      expect(stories).toHaveLength(2);
      expect(stories.map((s) => s.memberId)).toEqual(["jane-doe", "john-smith"]);
    });

    it("should return an empty array if the directory cannot be read", async () => {
      fs.default.readdir.mockRejectedValue(new Error("Directory not found"));

      const stories = await repository.findAll();

      expect(stories).toEqual([]);
    });
  });

  describe("findFeatured", () => {
    it("should return only featured stories", async () => {
      // Mock findAll to return a mix of stories
      const mockAllStories = [
        { id: "story1", memberId: "jane-doe", company: "Tech", quote: "q", isFeatured: true, companyLogoUrl: "" },
        { id: "story2", memberId: "john-smith", company: "Data", quote: "q", isFeatured: false, companyLogoUrl: "" },
        { id: "story3", memberId: "anna-lee", company: "Innovate", quote: "q", isFeatured: true, companyLogoUrl: "" },
      ];
      // Instead of mocking fs, we can mock the class's own findAll method for this specific test
      vi.spyOn(repository, 'findAll').mockResolvedValue(mockAllStories);

      const featuredStories = await repository.findFeatured();

      expect(featuredStories).toHaveLength(2);
      expect(featuredStories.map((s) => s.memberId)).toEqual(["jane-doe", "anna-lee"]);
    });
  });
});