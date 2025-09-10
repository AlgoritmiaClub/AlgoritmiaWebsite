/**
 * @file Defines the use case for getting a single member by their ID.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { IMemberRepository } from "@/lib/infrastructure/repositories/IMemberRepository";
import { MemberDTO } from "../dtos/memberDTO";
import { Member } from "@/lib/domain/member";

/**
 * Maps a Member domain entity to a MemberDTO.
 * @param member - The Member entity.
 * @returns The corresponding MemberDTO.
 */
function toDTO(member: Member): MemberDTO {
  // For now, the transformation is a direct mapping.
  return member;
}

/**
 * Use case to get a single member by their ID.
 * It fetches a member from the repository and transforms it into a DTO.
 * @param memberRepo - An instance of a class that implements IMemberRepository.
 * @param id - The ID of the member to retrieve.
 * @returns A promise that resolves to a MemberDTO or null if not found.
 */
export async function getMemberById(
  memberRepo: IMemberRepository,
  id: string
): Promise<MemberDTO | null> {
  const member = await memberRepo.findById(id);
  if (!member) {
    return null;
  }
  return toDTO(member);
}
