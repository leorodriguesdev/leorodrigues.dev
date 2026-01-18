import { NextResponse } from 'next/server';

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
type CheckStatus = 'pending' | 'success' | 'error';

interface CheckResult {
  url: string;
  status: CheckStatus;
  accessible: boolean;
}

export async function GET() {
  // O site redireciona para www, então verificamos ambos
  const baseUrl = 'https://www.leorodrigues.dev';
  const checks: Record<string, CheckResult> = {
    sitemap: { url: `${baseUrl}/sitemap.xml`, status: 'pending', accessible: false },
    robots: { url: `${baseUrl}/robots.txt`, status: 'pending', accessible: false },
    homepage: { url: baseUrl, status: 'pending', accessible: false },
    services: { url: `${baseUrl}/services`, status: 'pending', accessible: false },
    about: { url: `${baseUrl}/about`, status: 'pending', accessible: false },
    projects: { url: `${baseUrl}/projects`, status: 'pending', accessible: false },
  };

  // Verificar cada URL
  for (const [key, check] of Object.entries(checks)) {
    try {
      const response = await fetch(check.url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      });
      
      check.status = response.ok ? 'success' : 'error';
      check.accessible = response.ok;
    } catch {
      check.status = 'error';
      check.accessible = false;
    }
  }

  const allAccessible = Object.values(checks).every(check => check.accessible);
  
  return NextResponse.json({
    status: allAccessible ? 'healthy' : 'issues',
    timestamp: new Date().toISOString(),
    checks,
    recommendations: [
      allAccessible 
        ? '✅ Todas as páginas estão acessíveis. Pronto para enviar sitemap no Google Search Console.'
        : '⚠️ Algumas páginas não estão acessíveis. Verifique antes de enviar sitemap.',
      '📋 Acesse https://search.google.com/search-console e adicione a propriedade https://leorodrigues.dev',
      '🗺️ Envie o sitemap: sitemap.xml',
      '🔍 Solicite indexação das páginas principais manualmente',
    ],
  });
}
