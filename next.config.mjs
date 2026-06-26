/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Bu satırı ekliyoruz
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
