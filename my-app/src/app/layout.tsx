import React from "react";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata = {
  title: "SciSci Project",
  description: "Projeto SciSci - Ciência da Ciência",
};

/**
 * Root layout component for the application.
 *
 * @param children - The React node(s) to be rendered within the layout.
 * @returns The root HTML structure including the head, navigation bar, main content, and footer.
 *
 * @remarks
 * - Sets the language to Brazilian Portuguese (`pt-BR`).
 * - Includes meta tags for character set and viewport configuration.
 * - Adds a favicon and dynamic page title.
 * - Applies global background and text color classes.
 * - Renders a navigation bar (`<NavBar />`) and footer (`<Footer />`) around the main content.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <NavBar />
        <main className="min-h-screen">{children}</main> <Footer />
      </body>
    </html>
  );
}
