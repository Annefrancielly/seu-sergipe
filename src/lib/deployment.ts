export type DeploymentEnv = {
  SITE_URL?: string;
  SITE_INDEXING?: string;
  VERCEL_ENV?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

export type Deployment = {
  siteUrl: URL;
  isProduction: boolean;
  allowIndexing: boolean;
};

const LOCAL_URL = "http://localhost:3000";

function configuredUrl(env: DeploymentEnv): string {
  if (env.SITE_URL) return env.SITE_URL;
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return LOCAL_URL;
}

export function resolveDeployment(env: DeploymentEnv): Deployment {
  const isProduction = env.VERCEL_ENV === "production";
  const siteUrl = new URL(new URL(configuredUrl(env)).origin);

  if (isProduction && siteUrl.protocol !== "https:") {
    throw new Error(`SITE_URL precisa usar https em produção (recebido: ${siteUrl.origin}).`);
  }

  return {
    siteUrl,
    isProduction,
    allowIndexing: isProduction && env.SITE_INDEXING === "on",
  };
}
