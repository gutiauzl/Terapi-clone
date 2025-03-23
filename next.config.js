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
  // Disable static optimization to avoid middleware issues
  poweredByHeader: false,
  reactStrictMode: true,
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  nextConfig["experimental"] = {
    // NextJS 14.1.3 to 14.2.11:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],
  };
}

module.exports = nextConfig;
