import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  },
  // Configuració per a locales si és necessària
  async rewrites() {
    return [];
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };
// module.exports = {
// images: {
//   remotePatterns: [
//     {
//       protocol: "https",
//       hostname: "a.storyblok.com",
//     },
//   ],
// }
// };
// export default nextConfig;
