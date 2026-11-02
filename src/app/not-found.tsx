import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { SiteShell } from "@/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell locale="pt">
      <title>Página não encontrada · Seu Sergipe</title>
      <meta name="robots" content="noindex" />
      <NotFoundContent />
    </SiteShell>
  );
}
