/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ Standalone mod

  images: {
    domains: [
      'store.storeimages.cdn-apple.com',
      'images.samsung.com',
      'lh3.googleusercontent.com',
      'fdn2.gsmarena.com',
      'localhost',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '7014',
        pathname: '/**',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ Build sırasında ESLint hatalarını yoksay
  },
};

module.exports = nextConfig;
