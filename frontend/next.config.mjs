
// // next.config.js

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/home',
//         permanent: true, 
//       },
//     ];
//   },
  
//   images: {
//     remotePatterns: [
//       // == PATTERN 1: For Local Development ==
//       // This is a simple, hardcoded rule that will always work on your machine.
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '5000',
//         pathname: '/images/**', // The ** is important
//       },
//       // == PATTERN 2: For Production (Render) ==
//       // This rule will handle your deployed application.
//       // Replace 'your-backend-on-render.com' with your actual backend hostname.
//       {
//         protocol: 'https',
//         hostname: 'https://myecommerce-la62.onrender.com', // EXAMPLE: Use your real Render hostname
//         port: '', // Production services usually don't need a port specified
//         pathname: '/images/**',
//       },
      
//       // Add any other domains you might load images from (e.g., a CDN) here.
//     ],
//   },
// };
// export default nextConfig;


// next.config.js

// next.config.js

/** @type {import('next').NextConfig} */


// Get backend and asset URLs from env (no trailing slash expected)
const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL || 'http://localhost:5000';

// Parse the URLs to extract protocol, hostname, and port
const backend = new URL(backendUrl);
const assetUrl = new URL(assetBaseUrl);

const nextConfig = {
  // No redirects (root stays as homepage)
  async redirects() {
    return [];
  },

  // Configure Next Image remote patterns using asset URL
  images: {
    remotePatterns: [
      {
        protocol: assetUrl.protocol.replace(':', ''), // "http" or "https"
        hostname: assetUrl.hostname,                 // e.g. "localhost" or "myecommerce-la62.onrender.com"
        port: assetUrl.port || '',                   // e.g. "5000" (dev) or '' (prod)
        pathname: '/images/**',
      },
    ],
  },

  // Optional helpful flags
  reactStrictMode: true,
  swcMinify: true,

  // Expose backend and asset URLs to the app if you want (optional)
  env: {
    NEXT_PUBLIC_API_BASE_URL: backend.href.replace(/\/$/, ''),    // ensure no trailing slash
    NEXT_PUBLIC_ASSET_BASE_URL: assetUrl.href.replace(/\/$/, ''), // ensure no trailing slash
  },
};

export default nextConfig;
