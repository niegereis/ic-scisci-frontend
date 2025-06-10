"use server";
import React from "react";
import Blogs from "../components/Blogs";
async function getBlogs() {
  const res = await fetch(
    "http://localhost:1337/api/blog-articles?populate[author][populate]=authorImage&populate=coverImage",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar os artigos.");
  }

  const data = await res.json();
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
