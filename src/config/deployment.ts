import { resolveDeployment } from "@/lib/deployment";

export const deployment = resolveDeployment({
  SITE_URL: process.env.SITE_URL,
  SITE_INDEXING: process.env.SITE_INDEXING,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});
