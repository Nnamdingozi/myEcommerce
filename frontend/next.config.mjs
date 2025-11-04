
// frontend/next.config.js (or .mjs)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


  async redirects() {
    return [];
  },

  images: {
    // This is the robust, explicit configuration.
    remotePatterns: [
      // Rule #1: Allows images from your local development backend
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**',
      },
      // Rule #2: Allows images from your live production backend on Render
      {
        protocol: 'https',
        hostname: 'myecommerce-la62.onrender.com', 
        port: '', // Production URLs don't have a port
        pathname: '/images/**',
      },
      // Rule #3 (Optional but good): Allows images from your Supabase storage
      {
        protocol: 'https',
        hostname: 'epfwlbdrdjalekwflfkv.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/product-images/**',
      },
    ],
  },

};

export default nextConfig; // or module.exports = nextConfig;