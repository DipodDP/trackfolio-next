/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
module.exports = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Match API requests
        destination: '/api/:path*',  // Proxy to backend server
      },
      {
        source: '/api/:path*',  // Match API requests
        destination: `${apiUrl}/:path*`,  // Proxy to backend server
      },
    ];
  },
};