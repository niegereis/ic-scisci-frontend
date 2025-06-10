import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Author, ProjectContentProps, Blog } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const ProjectsContent = ({ project }: ProjectContentProps) => {
  if (!project) {
    return (
      <div className="w-full pb-10 bg-[#f9f9f9]">
        <div className="max-w-[1240px] mx-auto text-center pt-20">
          <h1 className="text-2xl font-bold text-gray-800">
            Projeto não encontrado
          </h1>
        </div>
      </div>
    );
  }

  const {
    projectTitle,
    projectDescription,
    projectImage,
    authors,
    blog_articles,
  } = project;

  const mainImageUrl = projectImage?.url;

  return (
    <article className="w-full pb-10 bg-[#f9f9f9]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 px-4 sm:pt-20 md:mt-0 text-black">
          <section>
            {mainImageUrl && (
              <Image
                className="h-56 w-full object-cover rounded-xl"
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${mainImageUrl}`}
                alt={projectTitle}
                width={500}
                height={300}
              />
            )}
            <h1 className="font-bold text-2xl my-1 pt-5">{projectTitle}</h1>
            <div className="pt-5 prose text-justify max-w-none">
              <BlocksRenderer content={projectDescription} />
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-2xl my-1 pt-5 mb-4">Equipe</h1>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                {authors?.map((author: Author) => {
                  const authorImageUrl = author.authorImage?.url;
                  return (
                    <article
                      key={author.id}
                      className="bg-white rounded-xl overflow-hidden drop-shadow-md"
                    >
                      {authorImageUrl && (
                        <Image
                          className="h-56 w-full object-contain mx-auto"
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${authorImageUrl}`}
                          alt={author.authorName}
                          width={500}
                          height={300}
                        />
                      )}
                      <div className="p-8">
                        <h3 className="font-bold text-2xl my-1">
                          {author.authorName}
                        </h3>
                        <p className="text-gray-600 text-xl">
                          {author.authorDescription}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-2xl my-1 pt-5 mb-4">
                Publicações relacionadas
              </h1>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                {blog_articles?.map((pub: Blog) => {
                  // 4. E a mesma lógica para a imagem da publicação
                  const pubImageUrl = pub.coverImage?.url;
                  return (
                    <Link key={pub.id} href={`/blog/${pub.id}`} passHref>
                      <article className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105">
                        {pubImageUrl && (
                          <Image
                            className="h-56 w-full object-contain mx-auto"
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${pubImageUrl}`}
                            alt={pub.articleTitle}
                            width={500}
                            height={300}
                          />
                        )}
                        <div className="p-8">
                          <h3 className="font-bold text-2xl my-1">
                            {pub.articleTitle}
                          </h3>
                          <p className="text-gray-600 text-xl">
                            {pub.blogDescripition}
                          </p>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default ProjectsContent;
