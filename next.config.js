/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'store.storeimages.cdn-apple.com',
      'images.samsung.com',
      'lh3.googleusercontent.com',
      'fdn2.gsmarena.com',
      'localhost',
      'https://localhost:7014/',
      'https://localhost:7014/images/',
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
};

module.exports = nextConfig;
