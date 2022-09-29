/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    HOST_URL: process.env.HOST_URL,
  },
  images: {
    domains: ["127.0.0.1", "localhost", "cloudinary.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
