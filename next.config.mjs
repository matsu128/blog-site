/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'], // ここに外部の画像ドメインを追加
  },
};

export default nextConfig;
