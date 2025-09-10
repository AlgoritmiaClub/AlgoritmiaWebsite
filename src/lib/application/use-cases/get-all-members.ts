/**
 * @file Defines the use case for getting all members.
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
 * Use case to get all members.
 * It fetches all members from the repository and transforms them into DTOs.
 * @param memberRepo - An instance of a class that implements IMemberRepository.
 * @returns A promise that resolves to an array of MemberDTOs.
 */
export async function getAllMembers(
  memberRepo: IMemberRepository
): Promise<MemberDTO[]> {
  const members = await memberRepo.findAll();
  return members.map(toDTO);
}
