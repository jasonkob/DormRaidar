import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true, // ถ้าต้องการให้เป็น redirect แบบถาวร
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/maps/api/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig