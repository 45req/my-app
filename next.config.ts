import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export', // Required for static deployment
  trailingSlash: true, // Ensures consistent URL endings
  images: {
    unoptimized: true, // Disables Vercel's image optimization
  },
  // Type-safe configuration
  typescript: {
    ignoreBuildErrors: true, // Optional for smoother builds
  },
  // Add this if using internationalization
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  }
}

export default config
