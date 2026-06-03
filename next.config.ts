import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/countries',
        destination: '/destinos',
        permanent: true,
      },
      {
        source: '/countries/:id',
        destination: '/destinos/:id',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
