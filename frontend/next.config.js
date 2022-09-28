/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["127.0.0.1", "localhost", "cloudinary.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
