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
  async headers() {
    return [
      {
        // Cache long sur les images statiques /public/* (immutable, 1 an)
        // Gain perf : LCP et FCP sur visites répétées + crawl Google
        source: '/:path*.(webp|jpg|jpeg|png|svg|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Force canonical domain : www.vetoassure.fr -> vetoassure.fr (301)
      // Évite le doublon GSC et concentre l'autorité SEO sur le domaine canonique
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.vetoassure.fr' }],
        destination: 'https://vetoassure.fr/:path*',
        permanent: true,
      },
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
        destination: '/blog/assurance-1-vs-assurance-2-comparatif',
        permanent: true,
      },
      {
        source: '/blog/santevet-vs-kozoo-comparatif',
        destination: '/blog/assurance-1-vs-assurance-2-comparatif',
        permanent: true,
      },
      {
        source: '/avis/santeVet',
        destination: '/avis/assurance-1',
        permanent: true,
      },
      {
        source: '/avis/santevet',
        destination: '/avis/assurance-1',
        permanent: true,
      },
      {
        source: '/avis/kozoo',
        destination: '/avis/assurance-2',
        permanent: true,
      },
      {
        source: '/avis/assuropoil',
        destination: '/avis/assurance-3',
        permanent: true,
      },
      {
        source: '/avis/dalma',
        destination: '/avis/assurance-4',
        permanent: true,
      },
      {
        source: '/avis/acheel',
        destination: '/avis/assurance-5',
        permanent: true,
      },
      {
        source: '/avis/barkibu',
        destination: '/avis/assurance-6',
        permanent: true,
      },
      {
        source: '/avis/lovys',
        destination: '/avis/assurance-7',
        permanent: true,
      },
      {
        source: '/avis/lassie',
        destination: '/avis/assurance-8',
        permanent: true,
      },
      {
        source: '/avis/fidanimo',
        destination: '/avis/assurance-9',
        permanent: true,
      },
      {
        source: '/avis/hypnia',
        destination: '/avis/assurance-10',
        permanent: true,
      },
      {
        source: '/avis/bulle-bleue',
        destination: '/avis/assurance-11',
        permanent: true,
      },
      {
        source: '/avis/Assurance1',
        destination: '/avis/assurance-1',
        permanent: true,
      },
      {
        source: '/avis/Assurance2',
        destination: '/avis/assurance-2',
        permanent: true,
      },
      {
        source: '/avis/Assurance3',
        destination: '/avis/assurance-3',
        permanent: true,
      },
      {
        source: '/avis/Assurance5',
        destination: '/avis/assurance-5',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
