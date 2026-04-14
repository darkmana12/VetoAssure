/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/fr',
        destination: '/',
        permanent: true,
      },
      {
        source: '/fr/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/races/bulldog-francais',
        destination: '/races/bouledogue-francais',
        permanent: true,
      },
      {
        source: '/mois',
        destination: '/',
        permanent: true,
      },
      {
        source: '/races/bengal/',
        destination: '/races/bengal',
        permanent: true,
      },
      {
        source: '/races/',
        destination: '/races',
        permanent: true,
      },
      {
        source: '/blog/Assurance1-vs-Assurance2-comparatif',
        destination: '/blog/santevet-vs-kozoo-comparatif',
        permanent: true,
      },
      {
        source: '/avis/barkibu',
        destination: '/',
        permanent: true,
      },
      {
        source: '/avis/fidanimo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/avis/dalma',
        destination: '/',
        permanent: true,
      },
      {
        source: '/avis/santeVet',
        destination: '/blog/santevet-vs-kozoo-comparatif',
        permanent: true,
      },
      {
        source: '/avis/santevet',
        destination: '/blog/santevet-vs-kozoo-comparatif',
        permanent: true,
      },
      {
        source: '/avis/Assurance1',
        destination: '/',
        permanent: true,
      },
      {
        source: '/avis/Assurance2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/avis/Assurance3',
        destination: '/',
        permanent: true,
      },
      {
        source: '/avis/Assurance5',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
