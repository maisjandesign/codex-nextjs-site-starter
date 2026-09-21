import type { NextConfig } from 'next';
const config: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
};
export default config;
