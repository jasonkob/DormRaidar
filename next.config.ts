import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
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
      {
        protocol: 'https',
        hostname: 'streetviewpixels-pa.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastly.4sqi.net',
        pathname: '/**',
      },
      {protocol: 'https',
      hostname: 'bcdn.renthub.in.th',
      pathname: '/**',
      },
      {protocol: 'https',
      hostname: 'lh5.googleusercontent.com',
      pathname: '/**',
      },
      {protocol: 'https',
      hostname: '**',
      pathname: '/**',
      },
      {protocol: 'http',
      hostname: '**',
      pathname: '/**',
      }

    ],
  },
}

export default nextConfig