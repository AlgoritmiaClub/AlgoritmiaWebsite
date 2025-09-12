/**
 * @file The main page for the Talent Directory.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

import { getAllMembers } from "@/lib/application/use-cases/get-all-members";
import { getMemberRepository } from "@/lib/infrastructure/repositories";
import { TalentDirectory } from "@/components/talent/TalentDirectory";

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
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-left text-brand-dark-blue">Our Talent</h1>
      <TalentDirectory members={members} />
    </main>
  );
}
