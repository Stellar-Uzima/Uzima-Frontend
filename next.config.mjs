import fs from "node:fs";
import path from "node:path";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  customWorkerSrc: "worker",
  workboxOptions: {
    disableDevLogs: true,
  },
});

class BuildStatsPlugin {
  constructor(target, projectDir) {
    this.target = target;
    this.projectDir = projectDir;
  }

  apply(compiler) {
    compiler.hooks.done.tap(`BuildStatsPlugin:${this.target}`, (stats) => {
      const outDir = path.join(this.projectDir, ".next", "analyze");
      fs.mkdirSync(outDir, { recursive: true });

      const statsJson = stats.toJson({
        all: false,
        assets: true,
        chunks: true,
        chunkRelations: true,
        modules: true,
        chunkModules: true,
        entrypoints: true,
        ids: true,
        groupModulesByType: false,
        groupModulesByPath: false,
        groupModulesByExtension: false,
        groupModulesByLayer: false,
        groupModulesByCacheStatus: false,
        groupModulesByAttributes: false,
      });

      fs.writeFileSync(
        path.join(outDir, `${this.target}-stats.json`),
        JSON.stringify(statsJson, null, 2),
      );
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {}, // Silences the warning/error
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  webpack: (config, { isServer, nextRuntime, dir }) => {
    if (process.env.ANALYZE === "true") {
      const target = isServer ? (nextRuntime === "edge" ? "edge-server" : "server") : "client";
      config.plugins.push(new BuildStatsPlugin(target, dir));
    }

    return config;
  },
};

export default withPWA(nextConfig);
