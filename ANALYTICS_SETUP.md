# Configuração de Analytics e Monitoramento

Este documento explica como configurar todas as ferramentas de analytics e monitoramento para o site.

## 📊 Ferramentas Implementadas

### 1. Google Analytics 4 (GA4)
- ✅ Tracking de páginas
- ✅ Eventos customizados
- ✅ Conversões
- ✅ Análise de comportamento do usuário

### 2. Vercel Analytics
- ✅ Page views
- ✅ Top páginas, referrers, devices, browsers
- ✅ Já configurado automaticamente

### 3. Vercel Speed Insights
- ✅ Core Web Vitals (LCP, FID, CLS)
- ✅ Performance por país/dispositivo
- ✅ Já configurado automaticamente

### 4. Sentry (Error Tracking - Opcional)
- ✅ Rastreamento de erros em produção
- ✅ Stack traces completos
- ✅ Notificações de erros

## 🚀 Configuração

### Passo 1: Google Analytics 4

1. Acesse https://analytics.google.com
2. Crie uma conta ou faça login
3. Crie uma nova propriedade GA4
4. Copie o **Measurement ID** (formato: `G-XXXXXXXXXX`)
5. Adicione no arquivo `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Passo 2: Sentry (Opcional)

1. Acesse https://sentry.io
2. Crie uma conta ou faça login
3. Crie um novo projeto (selecione Next.js)
4. Copie o **DSN**
5. Adicione no arquivo `.env.local`:

```env
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_ORG=your-org-name
SENTRY_PROJECT=your-project-name
```

6. Descomente as linhas no `next.config.js`:
   - Remova os `//` das linhas relacionadas ao Sentry

### Passo 3: Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry (Opcional)
# NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
# SENTRY_ORG=your-org
# SENTRY_PROJECT=your-project

# Ambiente
NODE_ENV=production
```

## 📈 Eventos Rastreados

### Eventos Automáticos
- **page_view**: A cada navegação de página
- **theme_change**: Quando o usuário muda o tema
- **project_view**: Quando visualiza um projeto

### Eventos de Interação
- **download**: Download do CV
- **email**: Clique no email
- **whatsapp**: Clique no WhatsApp
- **social**: Clique em redes sociais (GitHub, LinkedIn, Twitter)
- **outbound**: Clique em links externos
- **project**: Clique em projetos

## 🔍 Como Acessar os Dados

### Google Analytics 4
1. Acesse https://analytics.google.com
2. Selecione sua propriedade
3. Navegue pelos relatórios:
   - **Tempo real**: Ver usuários ativos agora
   - **Relatórios**: Ver dados históricos
   - **Eventos**: Ver eventos customizados
   - **Conversões**: Ver conversões configuradas

### Vercel Analytics
1. Acesse o dashboard da Vercel
2. Vá em **Analytics** no projeto
3. Veja métricas de:
   - Page views
   - Top páginas
   - Referrers
   - Devices e browsers

### Vercel Speed Insights
1. Acesse o dashboard da Vercel
2. Vá em **Speed Insights** no projeto
3. Veja métricas de:
   - Core Web Vitals
   - Performance por país
   - Performance por dispositivo

### Sentry
1. Acesse https://sentry.io
2. Selecione seu projeto
3. Veja:
   - Erros em tempo real
   - Stack traces
   - Performance issues
   - Notificações configuradas

## 📝 Próximos Passos

1. **Configurar Conversões no GA4**:
   - Marque eventos importantes como conversões
   - Ex: Download CV, Envio de email

2. **Configurar Alertas no Sentry**:
   - Configure notificações por email/Slack
   - Defina thresholds de erro

3. **Criar Dashboards Personalizados**:
   - No GA4, crie relatórios customizados
   - Monitore KPIs importantes

4. **Integrar com Google Search Console**:
   - Conecte GA4 com Search Console
   - Veja quais palavras-chave trazem tráfego

## 🔧 Troubleshooting

### Google Analytics não está funcionando
- Verifique se `NEXT_PUBLIC_GA_MEASUREMENT_ID` está configurado
- Verifique se o site está em produção (GA4 pode não funcionar em localhost)
- Use a extensão do Chrome "Google Analytics Debugger" para debug

### Sentry não está capturando erros
- Verifique se `NEXT_PUBLIC_SENTRY_DSN` está configurado
- Verifique se descomentou as linhas no `next.config.js`
- Verifique se `NODE_ENV=production`

### Speed Insights não aparece
- Aguarde algumas horas após o deploy
- Verifique se o projeto está no plano correto da Vercel
- Alguns dados podem demorar para aparecer

## 📚 Recursos Adicionais

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Vercel Speed Insights Docs](https://vercel.com/docs/speed-insights)
- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

