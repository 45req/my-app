import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove i18n because it's not needed for a single locale
  // i18n: { ... }  <-- remove this block
}

export default config
