const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/asn-zone' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath + '/',
  images: { unoptimized: true },

  // ✅ Skip ESLint checks during build (still run npm run lint manually if needed)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;