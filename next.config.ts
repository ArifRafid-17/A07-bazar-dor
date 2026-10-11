import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: '/signin',
        destination: '/SignIn',
      },
      {
        source: '/signup',
        destination: '/SignUp',
      },
      {
        source: '/profile',
        destination: '/Profile',
      },
      {
        source: '/profile/update',
        destination: '/Profile/update',
      },
      {
        source: '/product/:slug',
        destination: '/ProductDetails/:slug',
      },
      {
        source: '/product',
        destination: '/ProductDetails',
      },
    ];
  },
};

export default nextConfig;
