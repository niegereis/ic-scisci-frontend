import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       port: '1337',
  //       pathname: '/uploads/**',
  //     },
  //     // Em produção, adicionar o domínio do Strapi online aqui
  //   ],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;