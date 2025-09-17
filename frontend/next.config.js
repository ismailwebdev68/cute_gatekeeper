/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // In local dev, proxy backend requests to http://localhost:4000
    if (isDev) {
      return [
        {
          source: '/get_part_b',
          destination: 'http://localhost:4000/get_part_b',
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;


