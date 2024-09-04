/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // If you're using API routes, you might want to add this:
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default nextConfig;
