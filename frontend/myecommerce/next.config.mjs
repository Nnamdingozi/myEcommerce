/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Set this to true or false based on your redirect preference
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
        hostname: new URL(process.env.NEXT_PUBLIC_BACKEND_URL).hostname,
        pathname: '/images/*',
      },
    ],
  },
};

export default nextConfig;