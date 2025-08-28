const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/asn-io' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // static export
  basePath,                      // GitHub Pages subpath
  assetPrefix: basePath + '/',   // prefix for assets
  images: { unoptimized: true }, // disable Next image optimizer on Pages
};

export default nextConfig;