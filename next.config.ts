module.exports = {
  // Required for Netlify
  output: 'export', // Static export mode
  images: {
    unoptimized: true, // Disable default Image Optimization API
  },
  trailingSlash: true, // Ensure consistent URLs
}
