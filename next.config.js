/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  // Remove the repository name from the path for cleaner URLs
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig; 