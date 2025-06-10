import { Publication } from "@/types/types";
import Link from "next/link";

async function getPublications() {
  const res = await fetch(
    "http://localhost:1337/api/academic-publications?populate=*",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar publicações.");
  }

  const data = await res.json();
  return data;
}

export default async function Publications() {
  const publications = await getPublications();

  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto px-4 text-black space-y-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {publications.data.map((pub: Publication) => (
            <article
              key={pub.id}
              className="bg-white rounded-xl overflow-hidden drop-shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-xl mb-2">
                  {pub.academicPublicationTitle}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Jornal:</strong> {pub.academicPublicationJornal}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Ano:</strong> {pub.academicPublicationYear}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Autores:</strong>{" "}
                  {pub.authors.map((author) => author.authorName).join(", ")}
                </p>
              </div>
              <Link
                href={pub.academicPublicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md text-sm"
              >
                Acessar publicação
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
