# ✅ Checklist de Produção - LeoRodrigues.dev

## 📋 Configurações Necessárias na Vercel

### 1. Variáveis de Ambiente

Adicione no painel da Vercel (Settings → Environment Variables):

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-B9K8FJ0BR0

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=https://3c341b78f6bfc1f83260611e01b25f07@o4509861879939072.ingest.us.sentry.io/4510313681780736
SENTRY_ORG=leorodriguesdev
SENTRY_PROJECT=leorodriguesdev

# Ambiente
NODE_ENV=production
```

**⚠️ IMPORTANTE:** Configure para **Production**, **Preview** e **Development** (ou pelo menos Production).

### 2. Verificar Integrações

- ✅ Vercel Analytics: Já configurado automaticamente
- ✅ Vercel Speed Insights: Já configurado automaticamente
- ✅ Google Analytics 4: Requer `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- ✅ Sentry: Requer todas as variáveis acima

### 3. Deploy

Após configurar as variáveis:
1. Vá em **Deployments**
2. Clique nos três pontos do último deploy
3. Selecione **Redeploy**
4. Ou faça um novo commit e push

## 🔍 Validação Pós-Deploy

### Google Analytics 4
1. Acesse: https://analytics.google.com
2. Vá em **Relatórios** → **Tempo real**
3. Acesse seu site e verifique se aparece 1 usuário ativo
4. Aguarde alguns minutos e verifique se os eventos aparecem

### Sentry
1. Acesse: https://sentry.io
2. Vá em **Issues** no projeto `leorodriguesdev`
3. Se houver erros, eles aparecerão aqui automaticamente

### Vercel Analytics
1. Acesse o dashboard da Vercel
2. Vá em **Analytics** no projeto
3. Os dados aparecem automaticamente após o deploy

### Vercel Speed Insights
1. Acesse o dashboard da Vercel
2. Vá em **Speed Insights** no projeto
3. Os dados aparecem após algumas horas (precisa de tráfego real)

## 📊 Eventos Rastreados

Os seguintes eventos são automaticamente rastreados:

- ✅ **page_view**: Cada navegação de página
- ✅ **download**: Download do CV
- ✅ **email**: Clique em email
- ✅ **whatsapp**: Clique no WhatsApp
- ✅ **social**: Cliques em redes sociais (GitHub, LinkedIn, Twitter)
- ✅ **project_view**: Visualização de projeto
- ✅ **project**: Clique em projetos
- ✅ **theme_change**: Mudança de tema
- ✅ **outbound**: Links externos

## 🐛 Troubleshooting

### Google Analytics não está coletando dados
- Verifique se `NEXT_PUBLIC_GA_MEASUREMENT_ID` está configurado
- Aguarde até 48 horas (geralmente aparece em minutos)
- Use a extensão "Google Analytics Debugger" no Chrome

### Sentry não está capturando erros
- Verifique se todas as variáveis estão configuradas
- Verifique se `NODE_ENV=production`
- Sentry só funciona em produção

### Build falha
- Verifique se todas as variáveis de ambiente estão configuradas
- Verifique os logs do build na Vercel

## 📝 Status Atual

- ✅ **Build**: Compilando com sucesso
- ✅ **Sentry**: Configurado e ativo
- ✅ **Google Analytics**: Configurado (aguardando variável de ambiente)
- ✅ **Vercel Analytics**: Ativo automaticamente
- ✅ **Vercel Speed Insights**: Ativo automaticamente
- ✅ **SEO**: Configurado (robots.txt, sitemap.xml, metadata)
- ✅ **Tracking de Eventos**: Implementado em todos os componentes

## 🚀 Próximos Passos

1. **Configurar variáveis de ambiente na Vercel** (prioridade máxima)
2. **Fazer deploy**
3. **Aguardar 24-48h para dados iniciais**
4. **Configurar alertas no Sentry** (opcional)
5. **Configurar conversões no GA4** (opcional)

