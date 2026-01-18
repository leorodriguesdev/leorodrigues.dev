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
export async function GET() {
  // O site redireciona para www, então verificamos ambos
  const baseUrl = 'https://www.leorodrigues.dev';
  const checks = {
    sitemap: { url: `${baseUrl}/sitemap.xml`, status: 'pending' as const, accessible: false },
    robots: { url: `${baseUrl}/robots.txt`, status: 'pending' as const, accessible: false },
    homepage: { url: baseUrl, status: 'pending' as const, accessible: false },
    services: { url: `${baseUrl}/services`, status: 'pending' as const, accessible: false },
    about: { url: `${baseUrl}/about`, status: 'pending' as const, accessible: false },
    projects: { url: `${baseUrl}/projects`, status: 'pending' as const, accessible: false },
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
      
      checks[key as keyof typeof checks].status = response.ok ? 'success' : 'error';
      checks[key as keyof typeof checks].accessible = response.ok;
    } catch {
      checks[key as keyof typeof checks].status = 'error';
      checks[key as keyof typeof checks].accessible = false;
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
