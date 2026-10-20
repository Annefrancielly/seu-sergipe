import { resolveDeployment } from "@/lib/deployment";

export const deployment = resolveDeployment({
  SITE_URL: process.env.SITE_URL,
  SITE_ENV: process.env.SITE_ENV,
  SITE_INDEXING: process.env.SITE_INDEXING,
  WORKERS_CI_BRANCH: process.env.WORKERS_CI_BRANCH,
});
