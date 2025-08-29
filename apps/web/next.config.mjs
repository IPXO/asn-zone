const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/asn-zone' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath + '/',
  images: { unoptimized: true },
};
export default nextConfig;
