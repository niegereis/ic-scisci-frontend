"use server";
import React from "react";
import Blogs from "../components/Blogs";
import { fetchApi } from "@/lib/strapi";
/**
 * Fetches blog articles from the API, including author images and cover images.
 *
 * @async
 * @function
 * @returns {Promise<any>} A promise that resolves to the fetched blog articles data.
 * @throws {Error} Throws an error if the fetch request fails.
 *
 * @example
 * const blogs = await getBlogs();
 */
async function getBlogs() {
  // Usa fetchApi para centralizar a lógica de requisição
  const data = await fetchApi<any>(
    "/blog-articles",
    {
      "populate[author][populate]": "authorImage",
      "populate": "coverImage",
    },
    { cache: "no-store" }
  );
  return data;
}

async function Publications() {
  const blogs = await getBlogs();
  return (
    <div className="bg-[#f9f9f9]">
      <section className="max-w-[1240px] mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center "></div>
        <Blogs blogs={blogs} />
      </section>
    </div>
  );
}

export default Publications;
