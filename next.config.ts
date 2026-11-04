import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/:lang(en|ar)/:slug",
        destination: "/:lang",
        permanent: true, // 301 Redirect لنقل أرشفة جوجل
      },
    ];
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uniceps.runasp.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uniapi.trio-verse.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
