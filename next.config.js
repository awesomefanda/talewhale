/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for GitHub Pages, not for Vercel
  output: process.env.NEXT_PUBLIC_BASE_PATH ? 'export' : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  distDir: process.env.NEXT_PUBLIC_BASE_PATH ? 'out' : '.next',
};

module.exports = nextConfig;
