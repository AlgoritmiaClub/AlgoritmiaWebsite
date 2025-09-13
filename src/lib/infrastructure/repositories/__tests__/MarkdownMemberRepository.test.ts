/**
 * @file Unit tests for the MarkdownMemberRepository.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { MarkdownMemberRepository } from "../MarkdownMemberRepository";

// Mock the fs/promises module
vi.mock("fs/promises", () => ({
  default: {
    readdir: vi.fn(),
    readFile: vi.fn(),
  },
}));

// Dynamic import for the mocked module
const fs = await import("fs/promises");

describe("MarkdownMemberRepository", () => {
  let repository: MarkdownMemberRepository;

  // Mock data representing the content of Markdown files
  const mockJaneDoe = `
---
name: "Jane Doe"
role: "Software Engineer"
profilePictureUrl: "/images/jane.jpg"
skills:
  - "TypeScript"
  - "Next.js"
githubUrl: "https://github.com/janedoe"
linkedinUrl: "https://linkedin.com/in/janedoe"
---

This is Jane's biography.
`.trim();

  const mockJohnSmith = `
---
name: "John Smith"
role: "Backend Developer"
skills:
  - "Node.js"
---

John's bio goes here.
`.trim();

  const mockMalformedFile = `
---
name: "Missing Role"
---

This file is malformed.
`.trim();

  beforeEach(() => {
    vi.resetAllMocks();
    repository = new MarkdownMemberRepository();
  });

  describe("findById", () => {
    it("should return a fully populated member object for a valid ID", async () => {
      (fs.default.readFile as Mock).mockResolvedValue(mockJaneDoe);

      const member = await repository.findById("jane-doe");

      expect(member).not.toBeNull();
      expect(member?.id).toBe("jane-doe");
      expect(member?.name).toBe("Jane Doe");
      expect(member?.role).toBe("Software Engineer");
      expect(member?.profilePictureUrl).toBe("/images/jane.jpg");
      expect(member?.skills).toEqual(["TypeScript", "Next.js"]);
      expect(member?.githubUrl).toBe("https://github.com/janedoe");
      expect(member?.linkedinUrl).toBe("https://linkedin.com/in/janedoe");
      expect(member?.biography).toBe("This is Jane's biography.");
    });

    it("should return a member with default values for optional fields", async () => {
      (fs.default.readFile as Mock).mockResolvedValue(mockJohnSmith);

      const member = await repository.findById("john-smith");

      expect(member).not.toBeNull();
      expect(member?.name).toBe("John Smith");
      expect(member?.profilePictureUrl).toBe("/images/default-avatar.png");
      expect(member?.githubUrl).toBeUndefined();
      expect(member?.biography).toBe("John's bio goes here.");
    });

    it("should return null if the file is not found", async () => {
      (fs.default.readFile as Mock).mockRejectedValue(new Error("File not found"));

      const member = await repository.findById("non-existent");

      expect(member).toBeNull();
    });

    it("should return null for a malformed file (missing required fields)", async () => {
      (fs.default.readFile as Mock).mockResolvedValue(mockMalformedFile);

      const member = await repository.findById("malformed");

      expect(member).toBeNull();
    });
  });

  describe("findAll", () => {
    it("should return an array of all valid members", async () => {
      // Setup readdir to return a list of files
      (fs.default.readdir as Mock).mockResolvedValue([
        "jane-doe.md",
        "john-smith.md",
        "malformed.md",
        "notes.txt",
      ]);

      // Setup readFile to return different content based on the file name
      (fs.default.readFile as Mock).mockImplementation((filePath) => {
        const fileName = filePath.toString().split("\\").pop();
        if (fileName === "jane-doe.md") return Promise.resolve(mockJaneDoe);
        if (fileName === "john-smith.md") return Promise.resolve(mockJohnSmith);
        if (fileName === "malformed.md")
          return Promise.resolve(mockMalformedFile);
        return Promise.reject(new Error("Should not be read"));
      });

      const members = await repository.findAll();

      expect(members).toHaveLength(2);
      expect(members.map((m) => m.name)).toEqual(["Jane Doe", "John Smith"]);
      // Verify that only .md files were attempted to be read
      expect(fs.default.readFile).toHaveBeenCalledTimes(3);
    });

    it("should return an empty array if the directory cannot be read", async () => {
      (fs.default.readdir as Mock).mockRejectedValue(new Error("Directory not found"));

      const members = await repository.findAll();

      expect(members).toEqual([]);
    });
  });
});
