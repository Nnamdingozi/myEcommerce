// /** @type {import('next').NextConfig} */
// const nextConfig = {};



// export default nextConfig;


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
          protocol: 'https',
          hostname: process.env.NODE_ENV === 'production' 
            ? 'myecommerce-la62.onrender.com'
            : 'localhost',
          pathname: '/images/*',
        },
      ],
    },
    
  };
  
  export default nextConfig;
  



