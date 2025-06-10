import React from "react";
import { notFound } from "next/navigation";
import BlogContent from "@/app/components/BlogContents";

async function getAllBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog-articles?populate[author][populate]=authorImage&populate=coverImage`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Erro ao buscar artigo:", res.status);
    notFound();
    return null;
  }

  const data = await res.json();
  return data;
}

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
