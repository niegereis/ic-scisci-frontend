import React from "react";
import { BlogContentProps } from "@/types/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

/**
 * Renders the content of a blog post, including the cover image, article title,
 * main content, and author information. If the blog data is not available,
 * displays a "Blog não encontrado" message.
 *
 * @param blog - The blog post data to display, including article title, content,
 * cover image, and author details.
 * 
 * @returns The JSX element representing the blog content or a not found message.
 */
const BlogContent = ({ blog }: BlogContentProps) => {
  if (!blog) {
    return (
      <div className="w-full pb-10 bg-[#f9f9f9]">
        <div className="max-w-[1240px] mx-auto text-center pt-20">
          <h1 className="text-2xl font-bold text-gray-800">
            Blog não encontrado
          </h1>
        </div>
      </div>
    );
  }

  const { articleTitle, blogContent, coverImage, author } = blog;

  return (
    <article className="w-full pb-10 bg-[#f9f9f9]">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ss:grid-cols-1
          md:gap-x-8 sm:gap-y-8 ss:gap-y-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black"
        >
          <section className="col-span-4">
            {coverImage?.url && (
              <div className="max-w-[1240px] mx-auto px-2">
                <Image
                  src={coverImage.url}
                  alt={articleTitle}
                  loading="lazy"
                  width={1920}
                  height={500}
                  className="w-full h-auto max-h-[400px] rounded-xl"
                />
              </div>
            )}

            <h1 className="font-bold text-2xl my-1 pt-5">{articleTitle}</h1>
            <div className="pt-5 prose text-justify max-w-none">
              <BlocksRenderer content={blogContent} />
            </div>

            <div className="col-span-2">
              <h1 className="font-bold text-2xl my-1 pt-5">Equipe</h1>
              <div className="items-center w-full bg-white rounded-xl drop-shadow-md py-5 max-h-max">
                {author?.authorImage?.url && (
                  <Image
                    className="p-2 w-32 h-32 rounded-full mx-auto object-cover"
                    src={author.authorImage.url}
                    alt={author.authorName}
                    loading="lazy"
                    width={500}
                    height={300}
                  />
                )}
                <h2 className="font-bold text-2xl text-center text-gray-900 pt-3">
                  {author.authorName}
                </h2>
                <p className="text-center text-gray-900 font-medium">
                  {author.authorDescription}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default BlogContent;
