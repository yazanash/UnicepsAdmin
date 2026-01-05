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
        pathname: '/uploads/**', // السماح بجميع الصور داخل مجلد uploads
      },
       {
        protocol: 'https',
        hostname: 'uniapi.trio-verse.com',
        port: '',
        pathname: '/uploads/**', // السماح بجميع الصور داخل مجلد uploads
      },
    ],
  },
};

export default nextConfig;
