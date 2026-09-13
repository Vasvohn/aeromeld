import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: githubPages ? "/aeromeld" : "",
  assetPrefix: githubPages ? "/aeromeld" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPages ? "/aeromeld" : "",
  },
};

export default nextConfig;
