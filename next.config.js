/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Use correct basePath for GitHub Pages
  basePath: '',
  assetPrefix: '',
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