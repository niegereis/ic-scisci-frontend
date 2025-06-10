"use client";
import React from "react";
import { FaGithub, FaInstagram, FaUserCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="shadow-md border-t-2 border-gray-200 bg-white text-black py-6">
      <section className="max-w-[1024px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-0.5">
          <p className="text-lg">
            Copyright © 2025 Universidade Federal de Ouro Preto
          </p>
          <nav className="flex gap-4 text-xl text-black mt-4 sm:mt-0">
            <a
              href="#"
              className="hover:text-gray-300 transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-gray-300 transition duration-300"
              aria-label="Login"
            >
              <FaUserCircle />
            </a>
          </nav>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
