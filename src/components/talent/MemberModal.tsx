/**
 * @file A modal component to display detailed information about a member.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { MemberDTO } from "@/lib/application/dtos/memberDTO";
import Image from "next/image";

interface MemberModalProps {
  member: MemberDTO;
  onClose: () => void;
}

/**
 * A modal dialog that shows a member's detailed profile.
 * @param {MemberModalProps} props - The props for the component.
 * @returns The rendered MemberModal component.
 */
export function MemberModal({ member, onClose }: MemberModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full relative transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="text-center">
            <Image
              src={member.profilePictureUrl}
              alt={`Profile picture of ${member.name}`}
              width={150}
              height={150}
              className="rounded-full mx-auto object-cover w-36 h-36"
            />
            <h2 className="text-2xl font-bold mt-4">{member.name}</h2>
            <p className="text-lg text-gray-600">{member.role}</p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Biography</h3>
            <p className="text-gray-700 mb-4">{member.biography}</p>
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
