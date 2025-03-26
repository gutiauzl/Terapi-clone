/** @type {import('next').NextConfig} */

const nextConfig = {
  // Add transpilePackages to ensure proper module resolution
  transpilePackages: ["@polar-sh/sdk"],
  // Increase memory limit for webpack
  webpack: (config) => {
    config.externals = [...(config.externals || []), "canvas", "jsdom"];

    // Disable persistent caching to avoid file system issues
    config.cache = false;

    return config;
  },
  // Configure allowed image domains
  images: {
    domains: ['via.placeholder.com', 'placeholder.com', 'placehold.co', 'randomuser.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Disable static optimization to avoid middleware issues
  poweredByHeader: false,
  reactStrictMode: true,
  // Desactivar el uso de enlaces simbólicos
  experimental: {
    // Desactivar enlaces simbólicos que pueden causar problemas en Windows
    disableSymlinking: true,
  }
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  if (!nextConfig.experimental) {
    nextConfig.experimental = {};
  }
  // NextJS 14.1.3 to 14.2.11:
  nextConfig.experimental.swcPlugins = [[require.resolve("tempo-devtools/swc/0.90"), {}]];
}

module.exports = nextConfig;
