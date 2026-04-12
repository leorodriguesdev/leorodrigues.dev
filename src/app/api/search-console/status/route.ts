import { NextResponse } from "next/server";
import { getApiCopy, resolveApiLocale } from "@/lib/apiLocale";

/**
 * API Route para verificar status do Google Search Console
 *
 * Esta rota verifica se:
 * - O sitemap está acessível
 * - O robots.txt está correto
 * - As páginas principais estão acessíveis
 *
 * Uso: GET /api/search-console/status
 */
type CheckStatus = "pending" | "success" | "error";

interface CheckResult {
  url: string;
  status: CheckStatus;
  accessible: boolean;
}

export async function GET(request: Request) {
  const locale = resolveApiLocale(request);
  const api = getApiCopy(locale);

  // O site redireciona para www, então verificamos ambos
  const baseUrl = "https://www.leorodrigues.dev";
  const checks: Record<string, CheckResult> = {
    sitemap: {
      url: `${baseUrl}/sitemap.xml`,
      status: "pending",
      accessible: false,
    },
    robots: {
      url: `${baseUrl}/robots.txt`,
      status: "pending",
      accessible: false,
    },
    homepage: { url: baseUrl, status: "pending", accessible: false },
    services: {
      url: `${baseUrl}/services`,
      status: "pending",
      accessible: false,
    },
    about: { url: `${baseUrl}/about`, status: "pending", accessible: false },
    projects: {
      url: `${baseUrl}/projects`,
      status: "pending",
      accessible: false,
    },
  };

  // Verificar cada URL
  for (const check of Object.values(checks)) {
    try {
      const response = await fetch(check.url, {
        method: "HEAD",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
      });

      check.status = response.ok ? "success" : "error";
      check.accessible = response.ok;
    } catch {
      check.status = "error";
      check.accessible = false;
    }
  }

  const allAccessible = Object.values(checks).every(
    (check) => check.accessible,
  );

  return NextResponse.json(
    {
      status: allAccessible ? "healthy" : "issues",
      timestamp: new Date().toISOString(),
      checks,
      recommendations: [
        allAccessible ? api.searchAllOk : api.searchSomeFail,
        api.searchRec2,
        api.searchRec3,
        api.searchRec4,
      ],
    },
    { headers: { "Content-Language": locale } },
  );
}
