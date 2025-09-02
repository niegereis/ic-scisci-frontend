import React from "react";
import { notFound } from "next/navigation";
import ProjectsContent from "@/app/components/ProjectsContent";
import { ProjectPostPageProps, Projects } from "@/types/types";
import { fetchApi } from "@/lib/strapi";

interface ProjectResponse {
  data: Projects[];
}

/**
 * Retrieves a project by its unique identifier.
 *
 * @param id - The unique identifier of the project to fetch.
 * @returns A promise that resolves to the project data if found, or `null` if not found or on error.
 *
 * @example
 * ```typescript
 * const project = await getProjectById("123");
 * if (project) {
 *   // handle project
 * }
 * ```
 */
async function getProjectById(id: string) {
  try {
    const endpoint = `/sci-sci-projects`;
    const params = {
      filters: {
        id: { $eq: id },
      },
      populate: "*",
    };

    const response = await fetchApi<ProjectResponse>(endpoint, params);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Erro ao buscar projeto com ID ${id}:`, error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPostPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectsContent project={project} />;
}
