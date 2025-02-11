/** @type {import('next').NextConfig} */
import { i18n } from "./next-i18next.config.mjs";

const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: i18n,
  images: { domains: ["res.cloudinary.com"] },
};

// export default nextConfig;
module.exports = nextConfig; // Use module.exports instead of export default
