import type { NextConfig } from 'next';
const config: NextConfig = {
  env: { NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'https://widjo-ai.vercel.app' },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
};
export default config;
