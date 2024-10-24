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
      domains: ['localhost'],
    },
  };
  
  export default nextConfig;
  



