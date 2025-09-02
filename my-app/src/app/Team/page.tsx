import { fetchApi } from "@/lib/strapi";
import { TeamMembers } from "@/types/types";
import Image from "next/image";

async function getTeamInfos() {
  const data = await fetchApi<any>(
    "/authors",
    { populate: "*" },
    { cache: "no-store" }
  );
  return data.data.map((team: any) => ({
    id: team.id,
    authorName: team.authorName,
    authorDescription: team.authorDescription,
    academicStatus: team.academicStatus,
    authorImage: team.authorImage,
  }));
}

/**
 * Asynchronous React Server Component that fetches and displays a list of team members.
 *
 * Retrieves team member information using `getTeamInfos` and renders each member in a responsive grid layout.
 * Each team member is displayed with their image, name, and description.
 *
 * @returns {Promise<JSX.Element>} A section containing the team members' profiles.
 */
export default async function Team() {
  const teamMembers: TeamMembers[] = await getTeamInfos();

  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto px-4 text-black space-y-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8">
          {teamMembers.map((team, index) => (
            <article
              key={index}
              className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105"
            >
              <Image
                className="h-56 w-full object-contain mx-auto"
                src={`${process.env.NEXT_PUBLIC_API_URL}${team.authorImage?.url}`}
                alt={team.authorName}
                width={500}
                height={300}
              />
              <div className="p-8">
                <h3 className="font-bold text-2xl my-1">{team.authorName}</h3>
                <p className="text-gray-600 text-xl">
                  {team.authorDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}