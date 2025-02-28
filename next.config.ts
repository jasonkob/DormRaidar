import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  
  images:{
    domains:["maps.googleapis.com"]
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
}

export default nextConfig
