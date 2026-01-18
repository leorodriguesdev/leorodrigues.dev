# Configuração do Google Search Console - leorodrigues.dev

**Status:** ⚠️ Requer configuração manual

---

## 🎯 Passo a Passo Completo

### 1. Acessar Google Search Console

1. Acesse: https://search.google.com/search-console
2. Faça login com sua conta Google
3. Clique em **"Adicionar propriedade"**

### 2. Adicionar Propriedade

**Opção Recomendada: Prefixo de URL**

1. Selecione **"Prefixo de URL"**
2. Digite: `https://leorodrigues.dev`
3. Clique em **"Continuar"**

### 3. Verificar Propriedade

**Método 1: Tag HTML (Já Implementado)**

✅ O código de verificação já está no `layout.tsx`:
```typescript
verification: {
  google: "MCCPSESPM5MMVGw-lXb_pL40db1Z6VMT",
}
```

1. No Search Console, selecione **"Tag HTML"**
2. Copie o código fornecido
3. Se o código acima não funcionar, substitua no `layout.tsx`
4. Clique em **"Verificar"**

**Método 2: Arquivo HTML (Alternativo)**

1. Baixe o arquivo HTML fornecido pelo Google
2. Faça upload para `/public/` do projeto
3. Faça deploy
4. Clique em **"Verificar"**

**Método 3: DNS (Mais Confiável)**

1. No Search Console, selecione **"Registro DNS"**
2. Adicione o registro TXT no seu provedor de domínio
3. Aguarde propagação (pode levar até 48h)
4. Clique em **"Verificar"**

### 4. Enviar Sitemap

Após verificação:

1. No menu lateral, clique em **"Sitemaps"**
2. Em **"Adicionar um novo sitemap"**, digite: `sitemap.xml`
3. Clique em **"Enviar"**
4. Aguarde processamento (alguns minutos)

### 5. Solicitar Indexação

**Páginas Principais:**

1. Vá em **"Inspeção de URL"** (barra de pesquisa no topo)
2. Digite cada URL abaixo e clique em **"Solicitar indexação"**:
   - `https://leorodrigues.dev`
   - `https://leorodrigues.dev/about`
   - `https://leorodrigues.dev/services`
   - `https://leorodrigues.dev/projects`

**Ou use a API de Indexação (Avançado):**

Veja seção "API de Indexação" abaixo.

---

## 🔧 API de Indexação do Google

O Google oferece uma API para solicitar indexação programaticamente. Vou criar uma rota que você pode chamar:

### Configuração Necessária

1. **Criar Projeto no Google Cloud:**
   - Acesse: https://console.cloud.google.com
   - Crie um novo projeto
   - Ative a API "Google Search Console API"

2. **Criar Credenciais:**
   - Vá em "APIs e Serviços" → "Credenciais"
   - Crie uma "Conta de Serviço"
   - Baixe a chave JSON
   - Adicione no `.env.local`:
   ```env
   GOOGLE_SERVICE_ACCOUNT_KEY=/caminho/para/service-account-key.json
   ```

3. **Conceder Acesso no Search Console:**
   - No Search Console, vá em "Configurações" → "Usuários e permissões"
   - Adicione o email da conta de serviço como "Proprietário"

### Implementação (Opcional)

Posso criar uma API route que usa a API do Google para solicitar indexação automaticamente. Isso requer:
- Conta de serviço do Google Cloud
- Chave JSON da conta de serviço
- Permissões configuradas

---

## 📊 Monitoramento Após Configuração

### Verificar Indexação

1. **Cobertura:**
   - Menu lateral → **"Cobertura"**
   - Verifique páginas indexadas
   - Corrija erros se houver

2. **Performance:**
   - Menu lateral → **"Performance"**
   - Veja impressões, cliques, CTR
   - Analise palavras-chave

3. **Melhorias:**
   - Menu lateral → **"Melhorias"**
   - Core Web Vitals
   - Mobile Usability
   - HTTPS

### Métricas Importantes

- **Impressões:** Quantas vezes seu site apareceu nos resultados
- **Cliques:** Quantos cliques recebeu
- **CTR:** Taxa de cliques (Cliques/Impressões)
- **Posição média:** Posição média nas buscas

---

## 🔍 Página de Status (Nova)

Foi criada uma página de verificação de status em `/search-console` que:

- ✅ Verifica se todas as páginas estão acessíveis
- ✅ Testa sitemap.xml e robots.txt
- ✅ Fornece checklist de próximos passos
- ✅ Links diretos para Google Search Console

**Acesse:** `https://leorodrigues.dev/search-console`

---

## ✅ Checklist de Configuração

- [ ] Propriedade adicionada no Search Console
- [ ] Verificação concluída (método HTML, DNS ou arquivo)
- [ ] Sitemap enviado (`sitemap.xml`)
- [ ] Sitemap processado com sucesso
- [ ] Páginas principais solicitadas para indexação
- [ ] Primeiras páginas indexadas (verificar em 24-48h)
- [ ] Performance sendo monitorada
- [ ] Erros corrigidos (se houver)

---

## 🚨 Problemas Comuns

### Sitemap não encontrado
- Verifique se `/sitemap.xml` está acessível
- Acesse: `https://leorodrigues.dev/sitemap.xml` no navegador
- Deve retornar XML válido

### Páginas não indexadas
- Verifique se não estão bloqueadas no robots.txt
- Verifique se têm conteúdo suficiente
- Solicite indexação manualmente

### Erro de verificação
- Verifique se o código está no `<head>` da página
- Limpe cache do navegador
- Tente método alternativo (DNS ou arquivo)

---

## 📝 Notas

- O Google pode levar até 48h para processar sitemaps
- Indexação pode levar alguns dias para páginas novas
- Monitore regularmente (semanalmente nas primeiras semanas)
- Corrija erros rapidamente para melhor ranqueamento

---

**Próximo Passo:** Após configurar, aguarde 24-48h e verifique se as páginas foram indexadas.
