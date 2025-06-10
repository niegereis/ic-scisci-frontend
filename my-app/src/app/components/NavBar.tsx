"use client";
import React, { useState } from "react";
import Image from "next/image";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";
import logo from "../../assets/logo-teste.png";
import "../globals.css";

const NavBar = () => {
  const [togle, setTogle] = useState<boolean>(false);

  const handClick = (): void => setTogle(!togle);

  return (
    <header className="w-full h-[80px] z-10 bg-white drop-shadow-lg relative">
      <div className="flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            className="sm:ml-10 ss:ml-10 md-ml-3 opacity-[%] w-full h-[60px]"
          />
        </div>

        <nav className="flex items-center">
          <ul className="hidden md:flex">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/OurProjects">Projetos</a>
            </li>
            <li>
              <a href="/Team">Equipe</a>
            </li>
            <li>
              <a href="/Publications">Publicações</a>
            </li>
            <li>
              <a href="/AcademicPublications">Produção Acadêmica</a>
            </li>
            <li>
              <a href="/chat">Chatbot</a>
            </li>
          </ul>
        </nav>

        <div className="md:hidden" onClick={handClick}>
          <Image
            src={!togle ? menu : close}
            alt="menu"
            className="w-[28px] h-[28px] object-contain mr-10"
          />
        </div>
      </div>

      <nav
        className={togle ? "absolute bg-white w-full px-8 md:hidden" : "hidden"}
      >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/OurProjects">Projetos</a>
          </li>
          <li>
            <a href="/Team">Equipe</a>
          </li>
          <li>
            <a href="/Publications">Publicações</a>
          </li>
          <li>
            <a href="/AcademicPublications">Produção Acadêmica</a>
          </li>
          <li>
            <a href="/chat">Chatbot</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
