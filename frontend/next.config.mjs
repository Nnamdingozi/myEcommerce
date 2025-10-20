// /** @type {import('next').NextConfig} */
// const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/home',
  //       permanent: true, 
  //     },
  //   ];
  // },
//   images: {
//     remotePatterns: [
//       {
//         protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
//         hostname: new URL(process.env.NEXT_PUBLIC_BACKEND_URL).hostname,
//         pathname: '/images/*',
//       },
//     ],
//   },
// };

// export default nextConfig;



// next.config.js

// /** @type {import('next').NextConfig} */
// const nextConfig = {
  // async redirects() {
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
//       {
//         protocol: 'http', // Use 'https' in production
//         hostname: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || 'localhost',
//         // No port needed if it's the standard 80/443, but good to have for local dev
//         port: process.env.NODE_ENV === 'development' ? '5000' : '',
//         pathname: '/images/**', // FIX: Use ** to match all sub-paths
//       },
//     ],
//   },
// };

// export default nextConfig;



// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, 
      },
    ];
  },
  
  images: {
    remotePatterns: [
      // == PATTERN 1: For Local Development ==
      // This is a simple, hardcoded rule that will always work on your machine.
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**', // The ** is important
      },
      // == PATTERN 2: For Production (Render) ==
      // This rule will handle your deployed application.
      // Replace 'your-backend-on-render.com' with your actual backend hostname.
      {
        protocol: 'https',
        hostname: 'https://myecommerce-la62.onrender.com', // EXAMPLE: Use your real Render hostname
        port: '', // Production services usually don't need a port specified
        pathname: '/images/**',
      },
      
      // Add any other domains you might load images from (e.g., a CDN) here.
    ],
  },
};
export default nextConfig;