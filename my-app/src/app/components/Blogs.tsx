import React from "react";
import Link from "next/link";
import { BlogsProps } from "@/types/types";
import Image from "next/image";

const Blogs = ({ blogs }: BlogsProps) => {
  if (!Array.isArray(blogs.data) || blogs.data.length === 0) {
    return <p>Não há blogs disponíveis no momento.</p>;
  }

  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="grid gap-8 text-black">
          {blogs.data.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} passHref>
              <article className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
                <Image
                  className="w-full md:w-64 h-56object-cover"
                  src={`${process.env.NEXT_PUBLIC_API_URL}${blog.coverImage?.url}`}
                  alt={blog.articleTitle}
                  width={500}
                  height={300}
                />
                <div className="p-8 flex flex-col justify-between flex-1">
                  <h3 className="font-bold text-2xl mb-2">
                    {blog.articleTitle}
                  </h3>
                  <p className="text-gray-600 text-xl">
                    {blog.blogDescripition}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
