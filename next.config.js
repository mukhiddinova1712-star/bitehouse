/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'picsum.photos', 'www.themealdb.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig
