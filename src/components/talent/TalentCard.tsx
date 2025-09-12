/**
 * @file A component to display a single member's profile in a card format.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import Image from "next/image";
import { MemberDTO } from "@/lib/application/dtos/memberDTO";

interface TalentCardProps {
  member: MemberDTO;
  onSelect: () => void;
}

/**
 * A card component that displays a summary of a member's profile.
 * @param {TalentCardProps} props - The props for the component.
 * @returns The rendered TalentCard component.
 */
export function TalentCard({ member, onSelect }: TalentCardProps) {
  return (
    <div
      className="border bg-grey-50 rounded-lg p-4 text-center shadow-md hover:shadow-lg cursor-pointer transform transition-all duration-300 scale-95 hover:scale-100 grayscale-[80%] hover:grayscale-0"
      onClick={onSelect}
    >
      {/* The Next.js Image component requires a remotePatterns configuration in next.config.ts to work with external URLs. For now, we assume local images or placeholders. */}
      <Image
        src={member.profilePictureUrl} // Assumes a default is provided by the repo if missing
        alt={`Profile picture of ${member.name}`}
        width={128}
        height={128}
        className="rounded-full mx-auto mb-4 object-cover w-32 h-32"
      // TODO: a placeholder for missing images
      // onError={(e) => { e.currentTarget.src = '/images/default-avatar.png'; }}
      />
      <h2 className="text-xl text-brand-blue font-semibold">{member.name}</h2>
      <p className="text-gray-500">{member.role}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {/* Displaying a subset of skills */}
        {member.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="bg-brand-light text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
