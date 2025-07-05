/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.pexels.com", "localhost"], // Add any other image domains you need
  },
  // Enable server components and API routes
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
