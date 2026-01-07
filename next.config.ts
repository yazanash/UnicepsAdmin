import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uniceps.runasp.net',
        port: '',
        pathname: '/uploads/**', 
      },
       {
        protocol: 'https',
        hostname: 'uniapi.trio-verse.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
