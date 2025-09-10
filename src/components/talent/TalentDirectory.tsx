/**
 * @file A client component to manage the interactive parts of the Talent Directory.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

"use client";

import { useState, useMemo } from "react";
import { MemberDTO } from "@/lib/application/dtos/memberDTO";
import { TalentGrid } from "./TalentGrid";
import { MemberModal } from "./MemberModal"; // Import the modal

interface TalentDirectoryProps {
  members: MemberDTO[];
}

/**
 * A client component that provides search, filtering, and modal views for the talent directory.
 * @param {TalentDirectoryProps} props - The props for the component.
 * @returns The rendered TalentDirectory component.
 */
export function TalentDirectory({ members }: TalentDirectoryProps) {
  const [query, setQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<MemberDTO | null>(null);

  const filteredMembers = useMemo(() => {
    if (!query) {
      return members;
    }
    return members.filter((member) => {
      const searchContent = `${member.name} ${member.role} ${member.skills.join(" ")}`.toLowerCase();
      return searchContent.includes(query.toLowerCase());
    });
  }, [members, query]);

  const handleSelectMember = (member: MemberDTO) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name, role, or skill..."
          className="w-full px-4 py-2 border rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <TalentGrid members={filteredMembers} onMemberSelect={handleSelectMember} />

      {selectedMember && (
        <MemberModal member={selectedMember} onClose={handleCloseModal} />
      )}
    </div>
  );
}
