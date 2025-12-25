import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uniceps.runasp.net',
        port: '',
        pathname: '/uploads/**', // السماح بجميع الصور داخل مجلد uploads
      },
    ],
  },
};

export default nextConfig;
