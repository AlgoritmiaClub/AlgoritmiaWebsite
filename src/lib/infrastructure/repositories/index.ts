/**
 * @file Implements the Service Locator for repositories.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { IMemberRepository } from "./IMemberRepository";
import { MarkdownMemberRepository } from "./MarkdownMemberRepository";
import { ISuccessStoryRepository } from "./ISuccessStoryRepository";
import { MarkdownSuccessStoryRepository } from "./MarkdownSuccessStoryRepository";
import { IAgendaEventRepository } from "./IAgendaEventRepository";
import { MarkdownAgendaEventRepository } from "./MarkdownAgendaEventRepository";

// For the MVP, we instantiate the Markdown-based repositories directly.
// When we migrate to a database, we will only need to change the implementations here.
const memberRepository: IMemberRepository = new MarkdownMemberRepository();
const successStoryRepository: ISuccessStoryRepository = new MarkdownSuccessStoryRepository();
const agendaEventRepository: IAgendaEventRepository = new MarkdownAgendaEventRepository();

/**
 * Service Locator function for the Member Repository.
 *
 * This is the single source of truth for obtaining the member repository.
 * It abstracts away the concrete implementation.
 *
 * @returns The currently active instance of IMemberRepository.
 */
export function getMemberRepository(): IMemberRepository {
  return memberRepository;
}

/**
 * Service Locator function for the Success Story Repository.
 *
 * This is the single source of truth for obtaining the success story repository.
 * It abstracts away the concrete implementation.
 *
 * @returns The currently active instance of ISuccessStoryRepository.
 */
export function getSuccessStoryRepository(): ISuccessStoryRepository {
  return successStoryRepository;
}

/**
 * Service Locator function for the Agenda Event Repository.
 *
 * This is the single source of truth for obtaining the agenda event repository.
 * It abstracts away the concrete implementation.
 *
 * @returns The currently active instance of IAgendaEventRepository.
 */
export function getAgendaEventRepository(): IAgendaEventRepository {
  return agendaEventRepository;
}
