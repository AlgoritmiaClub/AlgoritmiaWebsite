/**
 * @file A component to display a grid of talent cards.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { MemberDTO } from "@/lib/application/dtos/memberDTO";
import { TalentCard } from "./TalentCard";

interface TalentGridProps {
  members: MemberDTO[];
  onMemberSelect: (member: MemberDTO) => void;
}

/**
 * A grid component that displays a list of members using the TalentCard component.
 * @param {TalentGridProps} props - The props for the component.
 * @returns The rendered TalentGrid component.
 */
export function TalentGrid({ members, onMemberSelect }: TalentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <TalentCard key={member.id} member={member} onSelect={() => onMemberSelect(member)} />
      ))}
    </div>
  );
}
