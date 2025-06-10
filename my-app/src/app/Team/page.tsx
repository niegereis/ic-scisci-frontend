"use client";

import { TeamMembers } from "@/types/types";
import Image from "next/image";
import { useState, useEffect } from "react";

async function getTeamInfos() {
  const res = await fetch("http://localhost:1337/api/authors?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar os autores.");
  }

  const data = await res.json();
  return data;
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [filter, setFilter] = useState<
    "all" | "Professor" | "Aluno" | "mestrando" | "doutorando"
  >("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getTeamInfos();
      const formatted = data.data.map((team: any) => ({
        id: team.id,
        authorName: team.authorName,
        authorDescription: team.authorDescription,
        academicStatus: team.academicStatus,
        authorImage: team.authorImage,
      }));
      setTeamMembers(formatted);
      setLoading(false);
    }
    fetchData();
  }, []);

  const [filteredMembers, setFilteredMembers] = useState<TeamMembers[]>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = teamMembers.filter((team) => {
        if (filter === "all") return true;
        return team.academicStatus === filter;
      });
      setFilteredMembers(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filter, teamMembers]);

  return (
    <section className="w-full bg-[#f9f9f9] py-[50px]">
      <div className="max-w-[1240px] mx-auto px-4 text-black space-y-10">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {["all", "Professor", "Aluno", "mestrando", "doutorando"].map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(
                    item as
                      | "all"
                      | "Professor"
                      | "Aluno"
                      | "mestrando"
                      | "doutorando"
                  )
                }
                className={`px-4 py-2 rounded-md capitalize ${
                  filter === item
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {item === "all" ? "Todos" : item}
              </button>
            )
          )}
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden drop-shadow-md animate-pulse"
              >
                <div className="h-56 w-full bg-gray-300"></div>
                <div className="p-8 space-y-4">
                  <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
                  <div className="h-4 bg-gray-300 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMembers.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8">
            {filteredMembers.map((team, index) => (
              <article
                key={index}
                className="bg-white rounded-xl overflow-hidden drop-shadow-md cursor-pointer transition-transform transform hover:scale-105"
              >
                <Image
                  className="h-56 w-full object-contain mx-auto"
                  src={`http://localhost:1337${team.authorImage?.url}`}
                  alt={team.authorName}
                  width={500}
                  height={300}
                />
                <div className="p-8">
                  <h3 className="font-bold text-2xl my-1">{team.authorName}</h3>
                  <p className="text-gray-600 text-xl">
                    {team.authorDescription}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // Se não houver membros no filtro
          <p className="text-center text-xl text-gray-600">
            Nenhum membro encontrado para este filtro.
          </p>
        )}
      </div>
    </section>
  );
}
