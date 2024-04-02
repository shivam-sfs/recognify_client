/**
 * @type {import('next').NextConfig}
 */

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

const nextConfig = {
  trailingSlash: true,
  output: "export",
  basePath: "/admin",
  distDir: "../recognify_backed/admin",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//     domains: ["localhost"],
//   },
// };

// module.exports = nextConfig;
