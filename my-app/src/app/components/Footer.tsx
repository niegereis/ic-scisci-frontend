"use client";
import React from "react";
import { FaGithub, FaInstagram, FaUserCircle } from "react-icons/fa";

/**
 * Footer component that displays the application's footer section.
 *
 * This component renders a footer with a copyright notice and a navigation bar
 * containing links to GitHub, Instagram, and an admin login page. The layout is responsive,
 * adapting between column and row arrangements based on screen size.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
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
              href="https://github.com/ufopcsilab/projects"
              className="hover:text-gray-300 transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/csilab_ufop/"
              className="hover:text-gray-300 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://ic-scisci-backend.onrender.com/admin/auth/login"
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
