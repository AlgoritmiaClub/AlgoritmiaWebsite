/**
 * @file Defines the Data Transfer Object for a member.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { Member } from "@/lib/domain/member";

/**
 * Represents the data shape of a member as needed by the UI.
 *
 * For now, the DTO is identical to the Member domain entity. This separation
 * is maintained to decouple the UI layer from the core domain model, allowing
 * either to evolve independently in the future without breaking the other.
 * For example, the UI might later need a formatted date or a computed property
 * that doesn't belong in the core Member entity.
 */
export type MemberDTO = Member;
