/**
 * @file The main page for the Talent Directory.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { getAllMembers } from "@/lib/application/use-cases/get-all-members";
import { getMemberRepository } from "@/lib/infrastructure/repositories";
import { TalentDirectory } from "@/components/talent/TalentDirectory";
import { TalentPageHeader } from "@/components/talent/TalentPageHeader";

/**
 * The Talent Directory page component.
 *
 * This is a React Server Component that fetches all member data on the server
 * and passes it to the client for interactive rendering.
 * @returns The rendered Talent Directory page.
 */
export default async function TalentPage() {
  const memberRepo = getMemberRepository();
  const members = await getAllMembers(memberRepo);

  return (
    <main className="bg-gradient-to-b from-[#0075C9] via-[#A1FFFF] via-[20rem] to-white to-[30rem]">
      <div className="container mx-auto px-10 py-8">
        <TalentPageHeader />
        <TalentDirectory members={members} />
      </div>
    </main>
  );
}
