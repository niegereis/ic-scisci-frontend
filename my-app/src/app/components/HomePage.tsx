import React from "react";
import Blogs from "./Blogs";
import { BlogsProps } from "@/types/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

interface AboutProject {
  aboutProjectTitle: string;
  aboutProjectDescription: any;
  aboutProjectImage: {
    url: string;
  };
}

async function getProjectInfo() {
  const res = await fetch(
    "http://localhost:1337/api/about-projects?populate=*",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar os artigos.");
  }

  const data = await res.json();
  return data.data[0];
}

async function HomePage({ blogs }: BlogsProps) {
  const infos: AboutProject = await getProjectInfo();
  return (
    <div className="bg-[#f9f9f9]">
      <section className="shadow-md rounded-xl mb-8">
        <div className="max-w-[1240px] mx-auto p-4 text-center">
          <Image
            className="h-56 w-full object-cover rounded-xl"
            src={`http://localhost:1337${infos.aboutProjectImage.url}`}
            alt={infos.aboutProjectTitle}
            width={500}
            height={300}
          />
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto p-6 mb-8">
        <h2 className="font-bold text-2xl mb-4">{infos.aboutProjectTitle}</h2>
        <div className="pt-5 prose text-justify max-w-none">
          <BlocksRenderer content={infos.aboutProjectDescription} />
        </div>
      </section>

      <section className="max-w-[1240px] mx-auto  p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
          <h2 className="font-bold text-2xl sm:text-2xl ">
            Nossas Publicações
          </h2>
          <button className="text-lg sm:text-sm w-20 rounded-xl text-white hover:underline">
            <a href="/Publications"> Ver todas </a>
          </button>
        </div>
        <Blogs blogs={blogs} />
      </section>
    </div>
  );
}

export default HomePage;
