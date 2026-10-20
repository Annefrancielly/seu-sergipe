export type DeploymentEnv = {
  SITE_URL?: string;
  SITE_ENV?: string;
  SITE_INDEXING?: string;
  WORKERS_CI_BRANCH?: string;
};

export type Deployment = {
  siteUrl: URL;
  isProduction: boolean;
  allowIndexing: boolean;
};

const LOCAL_URL = "http://localhost:3000";
const PRODUCTION_BRANCH = "main";

function detectProduction(env: DeploymentEnv): boolean {
  if (env.SITE_ENV) return env.SITE_ENV === "production";
  return env.WORKERS_CI_BRANCH === PRODUCTION_BRANCH;
}

export function resolveDeployment(env: DeploymentEnv): Deployment {
  const isProduction = detectProduction(env);

  if (isProduction && !env.SITE_URL) {
    throw new Error("Defina SITE_URL nas variáveis de build da Cloudflare antes do deploy de produção.");
  }

  const siteUrl = new URL(new URL(env.SITE_URL || LOCAL_URL).origin);

  if (isProduction && siteUrl.protocol !== "https:") {
    throw new Error(`SITE_URL precisa usar https em produção (recebido: ${siteUrl.origin}).`);
  }

  return {
    siteUrl,
    isProduction,
    allowIndexing: isProduction && env.SITE_INDEXING === "on",
  };
}
