/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextPWA = withPWA({
  dest: "public",
});

const nextConfig = {
  
};

export default nextPWA(nextConfig);