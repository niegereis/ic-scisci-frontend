import React from "react";
import Blogs from "./Blogs";
import { BlogsProps } from "@/types/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { fetchApi } from "@/lib/strapi";

interface AboutProject {
  aboutProjectTitle: string;
  aboutProjectDescription: any;
  aboutProjectImage: {
    url?: string;
  };
}

async function getProjectInfo() {
  const data = await fetchApi<{ data: AboutProject[] }>(
    "/about-projects",
    { populate: "*" },
    { cache: "no-store" }
  );
  return data.data[0];
}


/**
 * Renders the main HomePage component, displaying project information and a list of blog publications.
 *
 * @param blogs - An array of blog post data to be displayed in the "Nossas Publicações" section.
 * @returns The HomePage component containing the project image, description, and blog list.
 *
 * @remarks
 * - Fetches project information asynchronously using `getProjectInfo`.
 * - Displays a project image, title, and description.
 * - Shows a section for recent blog publications with a link to view all.
 */
async function HomePage({ blogs }: BlogsProps) {
  const infos: AboutProject = await getProjectInfo();
  return (
    <div className="bg-[#f9f9f9]">
      <section className="bg-[#f9f9f9]">
        {infos.aboutProjectImage?.url && (
          <div className="max-w-[1240px] mx-auto px-2">
            <Image
              src={infos.aboutProjectImage.url}
              alt={infos.aboutProjectTitle}
              loading="lazy"
              width={1920}
              height={500}
              className="w-full h-auto max-h-[400px] rounded-xl"
            />
          </div>
        )}
      </section>

      <section className="max-w-[1240px] mx-auto p-6 mb-8">
        <h2 className="font-bold text-2xl mb-4">{infos.aboutProjectTitle}</h2>
        <div className="pt-5 prose text-justify max-w-none">
          <BlocksRenderer content={infos.aboutProjectDescription} />
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
          <h2 className="font-bold text-2xl sm:text-2xl ">
            Nossas Publicações
          </h2>
          <button className="text-lg sm:text-sm w-20 rounded-xl text-white hover:underline">
            <a href="/Publications"> Ver todas </a>
          </button>
        </div>
        <Blogs blogs={blogs} />
      </section>
    </div>
  );
}

export default HomePage;
