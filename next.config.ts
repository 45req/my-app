import type { NextConfig } from 'next'

const config: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  }
}

export default config
