# Auditoria SEO e Estratégia de Posicionamento - leorodrigues.dev

**Data:** Janeiro 2025  
**Especialista:** Consultoria SEO Técnica  
**Objetivo:** Escalar ranqueamento orgânico, aumentar visibilidade e gerar leads qualificados

---

## 📊 1. AUDITORIA SEO TÉCNICA

### ✅ Pontos Fortes Identificados

1. **Next.js 15 com App Router** - SSR/SSG nativo, ótimo para SEO
2. **Metadata configurado** - Open Graph, Twitter Cards, canonical URLs
3. **Sitemap.xml dinâmico** - Gerado automaticamente com projetos
4. **Robots.txt configurado** - Permitindo indexação correta
5. **Structured Data básico** - Person, WebSite, ProfessionalService
6. **Google Analytics integrado** - Rastreamento de métricas
7. **Verificação Google Search Console** - Código presente no layout
8. **Performance otimizada** - Speed Insights da Vercel

### ⚠️ Problemas Críticos Identificados

#### 1. **Componente SEO Client-Side (CRÍTICO)**
- **Problema:** `SEO.tsx` usa `"use client"` e manipula DOM via `useEffect`
- **Impacto:** Meta tags não são renderizadas no servidor, Google não indexa corretamente
- **Solução:** Usar `generateMetadata` do Next.js 15 (já parcialmente implementado no layout)

#### 2. **Falta de Structured Data LocalBusiness**
- **Problema:** Não há schema LocalBusiness para conectar com Google Meu Negócio
- **Impacto:** Perda de oportunidades em buscas locais
- **Solução:** Adicionar LocalBusiness com endereço, telefone, área de atuação

#### 3. **Títulos e Descriptions Genéricos**
- **Problema:** Títulos não incluem palavras-chave de alto valor
- **Impacto:** Menor relevância em buscas específicas
- **Solução:** Otimizar com palavras-chave estratégicas

#### 4. **Falta de Breadcrumbs**
- **Problema:** Sem breadcrumbs structured data
- **Impacto:** Google não exibe breadcrumbs nos resultados
- **Solução:** Implementar breadcrumbs com schema.org

#### 5. **Ausência de Página de Serviços**
- **Problema:** Não há página dedicada a serviços (desenvolvimento mobile, web, etc.)
- **Impacto:** Perda de oportunidades em buscas por serviços
- **Solução:** Criar `/services` com conteúdo otimizado

#### 6. **Falta de Conteúdo Blog/Artigos**
- **Problema:** Sem estratégia de conteúdo para autoridade
- **Impacto:** Dificuldade em rankear para termos competitivos
- **Solução:** Estratégia de conteúdo (ver seção 4)

---

## 🎯 2. ESTRATÉGIA DE PALAVRAS-CHAVE

### 2.1 Palavras-Chave Primárias (Alto Volume, Alta Conversão)

#### Marca Pessoal
- `Léo Rodrigues desenvolvedor`
- `Léo Rodrigues React Native`
- `Léo Rodrigues mobile developer`
- `leorodrigues.dev`

#### Serviços Mobile (Prioridade Alta)
- `desenvolvedor React Native` (2.400/mês)
- `desenvolvedor mobile React Native` (880/mês)
- `desenvolvedor Expo` (720/mês)
- `desenvolvedor app mobile` (1.600/mês)
- `contratar desenvolvedor React Native` (320/mês)

#### Serviços Web (Prioridade Média)
- `desenvolvedor Next.js` (1.900/mês)
- `desenvolvedor full stack` (3.600/mês)
- `desenvolvedor React` (4.400/mês)
- `desenvolvedor Node.js` (2.400/mês)

#### SEO Local (Prioridade Alta para Conversão)
- `desenvolvedor React Native [CIDADE]`
- `desenvolvedor mobile [CIDADE]`
- `desenvolvedor app [CIDADE]`
- `desenvolvedor React Native Brasil`
- `desenvolvedor mobile Brasil`

### 2.2 Long-Tail Keywords (Menor Volume, Alta Conversão)

- `contratar desenvolvedor React Native Expo`
- `desenvolvedor mobile especialista React Native`
- `desenvolvedor full stack React Native Node.js`
- `desenvolvedor mobile e web React Native`
- `desenvolvedor React Native freelance`
- `desenvolvedor app mobile React Native TypeScript`
- `desenvolvedor mobile para empresas`
- `desenvolvedor React Native com experiência`

### 2.3 Palavras-Chave de Conteúdo (Autoridade)

- `como desenvolver app React Native`
- `tutorial React Native Expo`
- `melhores práticas React Native`
- `desenvolvimento mobile React Native`
- `diferença React Native vs Flutter`

---

## 🔧 3. OTIMIZAÇÕES ON-PAGE

### 3.1 Homepage (`/`)

**Título Atual:**
```
Léo Rodrigues - Desenvolvedor Mobile & Full Stack | React Native, Expo, Next.js & Node.js
```

**Título Otimizado:**
```
Desenvolvedor React Native e Mobile | Léo Rodrigues - Apps e Sites Modernos
```

**Description Otimizada:**
```
Desenvolvedor Mobile especialista em React Native e Expo. Criando apps nativos para iOS e Android, sites com Next.js e sistemas full stack. 7+ anos de experiência. Disponível para projetos.
```

**H1 Otimizado:**
```html
<h1>Desenvolvedor React Native e Mobile | Apps Modernos para iOS e Android</h1>
```

**Conteúdo a Adicionar:**
- Seção "Serviços" com cards: Desenvolvimento Mobile, Desenvolvimento Web, Full Stack
- Seção "Áreas de Atuação" com cidades/regiões
- Seção "Por que escolher?" com diferenciais técnicos

### 3.2 Página About (`/about`)

**Melhorias:**
- Adicionar H2 com palavras-chave: "Desenvolvedor Mobile com 7+ Anos de Experiência"
- Incluir seção "Tecnologias que Domino" com lista detalhada
- Adicionar seção "Áreas de Especialização" (Mobile, Web, Backend)
- Incluir localização física (cidade/estado) para SEO local

### 3.3 Página Projects (`/projects`)

**Melhorias:**
- Adicionar filtros por tecnologia (React Native, Next.js, etc.)
- Criar categorias: Mobile Apps, Websites, APIs
- Adicionar descrições mais detalhadas com palavras-chave
- Incluir tags de tecnologias como links internos

### 3.4 Nova Página: Services (`/services`)

**Estrutura Proposta:**
```
/services
  /mobile-development
  /web-development
  /full-stack-development
```

**Conteúdo para `/services/mobile-development`:**
- Título: "Desenvolvimento Mobile com React Native e Expo | Apps iOS e Android"
- Descrição detalhada dos serviços
- Casos de sucesso (projetos mobile)
- FAQ sobre desenvolvimento mobile
- CTA para contato

### 3.5 Otimização de Projetos Individuais

**Template de Metadata:**
```typescript
title: `${project.title} - Desenvolvido por Léo Rodrigues | ${project.type === 'mobile' ? 'App React Native' : 'Site Next.js'}`
description: `${project.description} Desenvolvido com ${project.techStack.join(', ')}. Veja mais projetos de ${project.type === 'mobile' ? 'desenvolvimento mobile' : 'desenvolvimento web'}.`
```

---

## 📝 4. ESTRATÉGIA DE CONTEÚDO

### 4.1 Blog/Artigos (Autoridade Técnica)

**Estrutura Proposta:**
```
/blog
  /react-native
  /nextjs
  /mobile-development
  /web-development
```

**Tópicos Prioritários (Pillar Content):**

1. **"Guia Completo de Desenvolvimento Mobile com React Native"**
   - 3000+ palavras
   - Cobertura completa do tema
   - Links internos para artigos relacionados

2. **"Como Criar um App Mobile do Zero com React Native e Expo"**
   - Tutorial passo a passo
   - Casos de uso reais
   - Código e exemplos

3. **"React Native vs Flutter: Qual Escolher em 2025?"**
   - Comparação técnica
   - Análise de performance
   - Quando usar cada um

4. **"Next.js 15: Novidades e Melhores Práticas para SEO"**
   - Foco em SEO técnico
   - Performance
   - SSR/SSG

**Frequência:**
- 2-4 artigos por mês
- Foco em qualidade sobre quantidade
- 1500-3000 palavras por artigo

### 4.2 Cluster de Conteúdo

**Pillar:** "Desenvolvimento Mobile com React Native"  
**Clusters:**
- Como instalar React Native
- Navegação em React Native
- Estado em React Native
- Performance em React Native
- Deploy de apps React Native
- Testes em React Native

---

## 🗺️ 5. INTEGRAÇÃO GOOGLE MEU NEGÓCIO

### 5.1 Structured Data LocalBusiness

**Schema a Implementar:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Léo Rodrigues - Desenvolvedor Mobile e Full Stack",
  "image": "https://leorodrigues.dev/avatar.png",
  "@id": "https://leorodrigues.dev",
  "url": "https://leorodrigues.dev",
  "telephone": "[TELEFONE]",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[CIDADE]",
    "addressRegion": "[ESTADO]",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LATITUDE]",
    "longitude": "[LONGITUDE]"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://github.com/leorodriguesdev",
    "https://linkedin.com/in/leorodriguesdev",
    "https://x.com/leorodriguesdev"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Brasil"
  },
  "serviceType": [
    "Desenvolvimento Mobile",
    "Desenvolvimento Web",
    "Desenvolvimento Full Stack",
    "Consultoria em Desenvolvimento"
  ]
}
```

### 5.2 Conectar Site + Google Meu Negócio

**Checklist:**
- [ ] Adicionar NAP (Name, Address, Phone) consistente em todas as páginas
- [ ] Incluir link para perfil do Google Meu Negócio no footer
- [ ] Adicionar botão "Como chegar" se tiver endereço físico
- [ ] Incluir seção de avaliações/testimonials com schema Review
- [ ] Adicionar horário de atendimento visível

### 5.3 Otimização para Buscas Locais

**Ações:**
1. Criar página `/local/[cidade]` para principais cidades de atuação
2. Incluir menções a cidades em conteúdo (ex: "Desenvolvedor React Native em Porto Alegre")
3. Adicionar mapa do Google Maps na página de contato
4. Coletar e exibir avaliações de clientes

---

## 🔗 6. AÇÕES DE AUTORIDADE (BACKLINKS)

### 6.1 Perfis e Diretórios

**Prioritários:**
- [ ] GitHub (já tem) - Otimizar README com link para site
- [ ] LinkedIn (já tem) - Adicionar link no perfil
- [ ] Twitter/X (já tem) - Adicionar link na bio
- [ ] Medium/Dev.to - Publicar artigos com link para site
- [ ] Stack Overflow - Adicionar link no perfil
- [ ] Behance/Dribbble - Se tiver designs
- [ ] Crunchbase - Se tiver empresa registrada

### 6.2 Guest Posts e Colaborações

**Estratégia:**
- Escrever para blogs de tecnologia brasileiros
- Participar de podcasts de desenvolvimento
- Contribuir para projetos open source
- Responder perguntas no Stack Overflow com links relevantes

### 6.3 Menções e Citações

**Ações:**
- Pedir para clientes mencionarem o site em seus projetos
- Incluir link em projetos open source
- Adicionar em apresentações e palestras
- Incluir em assinaturas de email

---

## 📈 7. MÉTRICAS E MONITORAMENTO

### 7.1 KPIs Principais

1. **Tráfego Orgânico**
   - Sessões orgânicas (Google Analytics)
   - Taxa de crescimento mensal

2. **Posicionamento**
   - Posição média no Google Search Console
   - Palavras-chave ranqueadas
   - Impressões e CTR

3. **Conversões**
   - Contatos via formulário
   - Cliques em "Entre em Contato"
   - Downloads de CV (se houver)

4. **Performance Técnica**
   - Core Web Vitals (LCP, FID, CLS)
   - PageSpeed Insights
   - Mobile-friendliness

### 7.2 Ferramentas Recomendadas

- Google Search Console (já configurado)
- Google Analytics (já configurado)
- Google My Business Insights
- Ahrefs ou SEMrush (opcional, para análise de palavras-chave)
- PageSpeed Insights (monitoramento contínuo)

---

## 🚀 8. PLANO DE AÇÃO PRIORITÁRIO

### Fase 1: Correções Técnicas Críticas (Semana 1-2)
1. ✅ Corrigir componente SEO (usar generateMetadata)
2. ✅ Adicionar LocalBusiness structured data
3. ✅ Implementar breadcrumbs
4. ✅ Otimizar títulos e descriptions

### Fase 2: Conteúdo e Páginas (Semana 3-4)
1. ✅ Criar página `/services` com subpáginas
2. ✅ Otimizar conteúdo da homepage
3. ✅ Melhorar página About com palavras-chave
4. ✅ Adicionar seção de localização

### Fase 3: Estratégia de Conteúdo (Mês 2-3)
1. Criar estrutura de blog
2. Publicar primeiro pillar content
3. Criar 3-4 artigos de cluster
4. Otimizar projetos com conteúdo rico

### Fase 4: Autoridade e Backlinks (Mês 3-6)
1. Otimizar perfis em redes sociais
2. Publicar guest posts
3. Participar de comunidades
4. Coletar avaliações de clientes

---

## 📋 9. CHECKLIST DE IMPLEMENTAÇÃO

### SEO Técnico
- [ ] Corrigir componente SEO (SSR-friendly)
- [ ] Adicionar LocalBusiness schema
- [ ] Implementar breadcrumbs
- [ ] Otimizar robots.txt
- [ ] Verificar sitemap.xml
- [ ] Adicionar hreflang (se tiver versão em inglês)

### On-Page
- [ ] Otimizar títulos (60 caracteres)
- [ ] Otimizar descriptions (155 caracteres)
- [ ] Adicionar alt text em todas as imagens
- [ ] Implementar heading hierarchy (H1, H2, H3)
- [ ] Adicionar internal linking estratégico
- [ ] Otimizar URLs (slug amigáveis)

### Conteúdo
- [ ] Criar página de serviços
- [ ] Adicionar FAQ section
- [ ] Criar estrutura de blog
- [ ] Escrever primeiro artigo pillar
- [ ] Otimizar descrições de projetos

### Local SEO
- [ ] Adicionar NAP em todas as páginas
- [ ] Conectar com Google Meu Negócio
- [ ] Adicionar mapa na página de contato
- [ ] Criar páginas locais (se aplicável)
- [ ] Coletar avaliações

### Performance
- [ ] Otimizar imagens (WebP, lazy loading)
- [ ] Minificar CSS/JS
- [ ] Implementar caching
- [ ] Verificar Core Web Vitals
- [ ] Testar mobile-friendliness

---

## 🎯 RESULTADOS ESPERADOS

### Curto Prazo (1-3 meses)
- Aumento de 30-50% no tráfego orgânico
- Ranqueamento para 10-15 palavras-chave de long-tail
- Melhoria em Core Web Vitals
- Aumento de 20% em contatos via formulário

### Médio Prazo (3-6 meses)
- Ranqueamento para palavras-chave primárias (top 20)
- Aumento de 100-150% no tráfego orgânico
- Autoridade de domínio aumentada
- Aumento de 50% em conversões

### Longo Prazo (6-12 meses)
- Top 10 para palavras-chave principais
- Tráfego orgânico sustentável e crescente
- Autoridade estabelecida no nicho
- Pipeline constante de leads qualificados

---

**Próximos Passos:** Implementar correções técnicas críticas e criar página de serviços otimizada.
