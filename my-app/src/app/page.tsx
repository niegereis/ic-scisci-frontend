"use server";
import React from "react";
import HomePage from "./components/HomePage";

async function getBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog-articles?populate[author][populate]=authorImage&populate=coverImage`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar os artigos.");
  }

  const data = await res.json();
  return data;
}

export default async function Page() {
  try {
    const blogs = await getBlogs();
    console.log("Conteudos dos blogs passados: ", blogs);
    return <HomePage blogs={blogs || { data: [] }} />;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return <p>Erro ao carregar os artigos.</p>;
  }
}
