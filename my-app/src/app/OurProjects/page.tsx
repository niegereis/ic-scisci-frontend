import React from "react";
import Link from "next/link";
import { fetchApi } from "@/lib/strapi";
import { Projects } from "@/types/types";
import Image from "next/image";

interface ProjectsResponse {
  data: Projects[];
}

async function getProjects(): Promise<Projects[]> {
  try {
    const response = await fetchApi<ProjectsResponse>("/sci-sci-projects", {
      populate: "*",
    });

    return response.data;
  } catch (error) {
    console.error("Falha grave ao buscar projetos:", error);
    return [];
  }
}

export default async function OurProjects() {
  const projects = await getProjects();

  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-4 text-black">
          {projects.map((project) => {
            if (!project || !project.projectTitle) {
              return null;
            }

            const imageUrl = project.projectImage?.url;

            return (
              <Link key={project.id} href={`/project/${project.id}`} passHref>
                <article className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
                  {imageUrl && (
                    <Image
                      className="h-56 w-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
                      alt={project.projectTitle}
                      width={500}
                      height={300}
                    />
                  )}

                  <div className="p-8">
                    <h3 className="font-bold text-2xl my-1">
                      {project.projectTitle}
                    </h3>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
