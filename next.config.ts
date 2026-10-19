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
        pathname: '/**', 
      },
       {
        protocol: 'https',
        hostname: 'uniapi.trio-verse.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
