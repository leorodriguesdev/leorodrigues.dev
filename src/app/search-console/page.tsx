"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2, ExternalLink, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface CheckStatus {
  url: string;
  status: 'pending' | 'success' | 'error';
  accessible: boolean;
}

interface StatusResponse {
  status: 'healthy' | 'issues';
  timestamp: string;
  checks: Record<string, CheckStatus>;
  recommendations: string[];
}

export default function SearchConsolePage() {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch('/api/search-console/status');
        if (!response.ok) throw new Error('Erro ao buscar status');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  const getStatusIcon = (status: CheckStatus['status']) => {
    if (status === 'pending') return <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />;
    if (status === 'success') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusText = (status: CheckStatus['status']) => {
    if (status === 'pending') return 'Verificando...';
    if (status === 'success') return 'Acessível';
    return 'Não acessível';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Status do Google Search Console"
        description="Verificação de status e configuração do Google Search Console para leorodrigues.dev"
      />
      <Breadcrumbs />
      
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Status do Google Search Console</h1>
            <p className="text-muted-foreground">
              Verificação de acessibilidade das páginas e configuração do Search Console
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {data && (
            <>
              <div className={`rounded-lg border p-6 ${
                data.status === 'healthy' 
                  ? 'bg-green-500/10 border-green-500/20' 
                  : 'bg-yellow-500/10 border-yellow-500/20'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  {data.status === 'healthy' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                  )}
                  <h2 className="text-2xl font-semibold">
                    Status: {data.status === 'healthy' ? 'Tudo OK' : 'Atenção Necessária'}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Última verificação: {new Date(data.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Verificação de Páginas</h2>
                <div className="grid gap-4">
                  {Object.entries(data.checks).map(([key, check]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg bg-card"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(check.status)}
                        <div>
                          <p className="font-medium capitalize">{key}</p>
                          <p className="text-sm text-muted-foreground">{check.url}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${
                        check.status === 'success' ? 'text-green-500' : 
                        check.status === 'error' ? 'text-red-500' : 
                        'text-muted-foreground'
                      }`}>
                        {getStatusText(check.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Próximos Passos</h2>
                <div className="space-y-3">
                  {data.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg bg-card">
                      <div className="mt-0.5">
                        {rec.startsWith('✅') ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : rec.startsWith('⚠️') ? (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <ExternalLink className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 border rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-semibold">Links Úteis</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Google Search Console</p>
                      <p className="text-sm text-muted-foreground">Acessar dashboard</p>
                    </div>
                  </a>
                  <a
                    href="https://leorodrigues.dev/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Sitemap</p>
                      <p className="text-sm text-muted-foreground">Ver sitemap.xml</p>
                    </div>
                  </a>
                  <a
                    href="https://leorodrigues.dev/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Robots.txt</p>
                      <p className="text-sm text-muted-foreground">Ver robots.txt</p>
                    </div>
                  </a>
                  <a
                    href="/GOOGLE_SEARCH_CONSOLE_SETUP.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Guia Completo</p>
                      <p className="text-sm text-muted-foreground">Ver documentação</p>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
