/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is plain HTML/JS/CSS, free to host on Vercel/Netlify/GitHub Pages.
  output: 'export',
  // Lets `NEXT_DIST_DIR=.next-build npm run build` run while `next dev` is using .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
