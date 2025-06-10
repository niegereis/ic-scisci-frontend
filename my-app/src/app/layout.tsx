import React from "react";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata = {
  title: "SciSci Project",
  description: "Projeto SciSci - Ciência da Ciência",
};

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
