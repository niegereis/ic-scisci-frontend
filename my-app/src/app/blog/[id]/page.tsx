import React from "react";
import { notFound } from "next/navigation";
import BlogContent from "@/app/components/BlogContents";
import { fetchApi } from "@/lib/strapi";


/**
 * Fetches all blog articles from the API, including related author and cover image data.
 *
 * @async
 * @function
 * @returns {Promise<any | null>} The fetched blog articles data, or null if an error occurs.
 * @throws Logs an error and triggers a not-found response if the fetch fails.
 */
async function getAllBlogs() {
  try {
    const data = await fetchApi<any>(
      "/blog-articles",
      {
        "populate[author][populate]": "authorImage",
        "populate": "coverImage",
      },
      { cache: "no-store" }
    );
    return data;
  } catch (error) {
    console.error("Erro ao buscar artigo:", error);
    notFound();
    return null;
  }
}

/**
 * Renders a blog post page based on the provided blog ID from route parameters.
 * 
 * This async function fetches all blog data, finds the blog post matching the given ID,
 * and renders the `BlogContent` component with the found blog data. If the blog data
 * cannot be fetched or the blog post is not found, it triggers the `notFound()` handler.
 *
 * @param params - An object containing the route parameters, specifically the blog post ID.
 * @returns The rendered `BlogContent` component for the found blog post, or `null` if not found.
 */
export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const blogData = await getAllBlogs();

  if (!blogData) {
    notFound();
    return null;
  }

  const blog = blogData.data.find((b: any) => b.id.toString() === id);

  if (!blog) {
    notFound();
    return null;
  }
  return <BlogContent blog={blog} />;
}
