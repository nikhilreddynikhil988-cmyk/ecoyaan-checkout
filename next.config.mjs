/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/pament',
        destination: '/payment',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
