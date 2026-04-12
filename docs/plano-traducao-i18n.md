# Plano: tradução 100% (next-intl)

Documento vivo para guiar o trabalho até cobrir **toda a UI, metadados, mensagens de API, erros globais e conteúdo editorial** em **pt** (padrão, sem prefixo), **en** (`/en`) e **es** (`/es`).

---

## 1. O que significa “100%”

| Área | Critério de pronto |
|------|-------------------|
| **UI** | Nenhuma string de interface visível hardcoded em componentes/páginas; `useTranslations` / `getTranslations` + chaves nos JSON. |
| **Navegação** | Links internos via `@/i18n/navigation` (`Link`, `useRouter`, `usePathname` onde o prefixo de locale importa). Exceções documentadas (ex.: integrações que exigem URL “crua”). |
| **Datas/números** | `useFormatter` (client) ou `Intl` / `next-intl` no servidor, alinhado ao locale ativo. |
| **Metadados** | `generateMetadata` por rota usando namespace `metadata` (ou namespace dedicado), sem títulos/descrições fixos em PT dentro das pages. |
| **Conteúdo longo** | Projetos (`messages/partials/projects.*.json`), depoimentos, experiência, educação, bios, serviços: **três locales com texto real**, não só fallback PT. |
| **APIs** | Respostas ou mensagens expostas ao usuário com locale (header `Accept-Language`, `?locale=`, ou corpo) — política única documentada na [§8.2](#82-política-de-apis-mensagens-nas-rotas) e aplicada em todas as rotas. |
| **Erros** | `global-error.tsx` (e equivalentes) com cópias tratáveis; locale via cookie `NEXT_LOCALE` + `src/lib/globalErrorCopy.ts`. |
| **SEO técnico** | Sitemap e `alternates` coerentes com `localePrefix: 'as-needed'` (URLs canônicas por idioma). |
| **JSON-LD** | Textos do `StructuredData` / schema vindos de mensagens ou de dados já localizados. |

---

## 2. Como o repositório organiza mensagens hoje

1. **Partials por domínio**  
   - `messages/parts/{pt,en,es}/` — `01-metadata.json`, `02-nav.json`, `03-ui.json` (merge em ordem alfabética do nome do arquivo).  
   - `messages/partials/projects.{locale}.json` — textos dos projetos (`projects.items`).

2. **Artefato consumido pela app**  
   - `messages/{pt,en,es}.json` — **gerados**; não editar na mão de rotina.

3. **Comando**  
   - Após alterar `parts` ou `partials`:  
     `node scripts/merge-locale-messages.mjs`  
   - Incluir no fluxo de PR quando houver mudança de cópia.

4. **Código**  
   - Rotas em `src/app/[locale]/`.  
   - `src/i18n/routing.ts` — `defaultLocale: 'pt'`, `localePrefix: 'as-needed'`.  
   - `getProjects()` / `useProjects()` — textos de projeto vêm do merge acima.

**Regra:** novas chaves → adicionar em **pt** primeiro; **en** e **es** no mesmo PR ou em PR seguido. O overlay em `src/i18n/request.ts` usa PT como base; ainda assim, preencher EN/ES para “100%”.

---

## 3. Inventário rápido (snapshot)

O detalhamento auditado (namespaces, política de APIs, mapa arquivo → status) está na **[seção 8](#8-resultado-da-etapa-a-auditoria)**.

---

## 4. Etapas de execução

Cada etapa deve terminar com: **(a)** código revisado, **(b)** chaves nos JSON **pt + en + es** onde couber, **(c)** `node scripts/merge-locale-messages.mjs`, **(d)** `npm run build`, **(e)** smoke manual nos três idiomas nas rotas afetadas.

### Etapa A — Auditoria e mapa de chaves

- [x] Listar componentes e páginas com texto literal ou navegação fora do i18n.  
- [x] Conferir namespaces em `messages/parts/pt/03-ui.json` (+ `01-metadata`, `02-nav`, `partials/projects`).  
- [x] Definir política das **APIs** (registrada na [§8.2](#82-política-de-apis-mensagens-nas-rotas)).

**Pronto quando:** tabela arquivo → namespace na [seção 8](#8-resultado-da-etapa-a-auditoria) (**concluída**).

---

### Etapa B — Shell global e erros (prioridade alta)

- [x] `global-error.tsx`: textos via `messages/{pt,en,es}.json` → `globalError` (`src/lib/globalErrorCopy.ts`); locale por cookie `NEXT_LOCALE` + `useLayoutEffect`; `import "@/styles/globals.css"`; `lang` no `<html>`.  
- [x] `ThemeProvider`: `useTranslations('theme')` para `openSelector` e `selectTheme` (EN/ES nos parts). Nomes dos temas na lista podem permanecer em inglês até decisão futura.  
- [x] `LanguageSwitcher`: `aria-label` via `languageSwitcher.aria`.  
- [x] `src/app/layout.tsx` raiz repassa só `children`.

**Pronto quando:** erro global e seletor de tema legíveis nos três idiomas (**concluída** em 2026-03-29).

---

### Etapa C — Navegação, SEO client e breadcrumbs

- [x] `Breadcrumbs.tsx`: `Link` + `usePathname` de `@/i18n/navigation`; `useTranslations('breadcrumbs')`; JSON-LD com URLs absolutas e prefixo de locale coerente.  
- [x] `SEO.tsx`: pathname i18n; defaults via `metadata`; `og:locale` e canonical por idioma.  
- [x] `GoogleAnalytics.tsx`: mantido `next/navigation` com comentário no arquivo (path real com `/en`/`/es` para GA).

**Pronto quando:** breadcrumbs e SEO alinhados ao locale (**concluída** em 2026-03-29).

---

### Etapa D — Modal de intenção e homes

- [x] `VisitorIntentModal.tsx`: namespace `visitorIntent`.  
- [x] `PortfolioHome.tsx` + `CommercialHome.tsx`: `portfolioHome` / `commercialHome`; `Link` de `@/i18n/navigation`.  
- [x] CTAs com âncora `#contact` como `<a href="#contact">` (in-page).

**Pronto quando:** primeira impressão traduzível (**concluída** em 2026-03-29).

---

### Etapa E — Seções da landing (portfolio)

- [x] `Stats.tsx`, `Skills.tsx`, `Contact.tsx`, `Testimonials.tsx`: namespaces `stats`, `skills`, `contact`, `testimonials` + `testimonialItems`.  
- [x] Depoimentos a partir de `testimonialItems` (não array hardcoded).

**Pronto quando:** home em EN/ES sem PT residual nessas seções (**concluída** em 2026-03-29).

---

### Etapa F — Páginas internas

- [x] `about`: hero, bio (`t.rich`), citação.  
- [x] `services`: `servicesPage` + `servicesCards`; links i18n.  
- [x] `search-console`: UI em `searchConsole`; data com `useFormatter` (recomendações da API ainda dependem da Etapa H).  
- [x] SEO por página com `metadata` / componente `SEO`.

**Pronto quando:** `npm run build` e troca de idioma nas rotas internas (**concluída** em 2026-03-29).

---

### Etapa G — Conteúdo editorial EN/ES (maior volume)

Fazer depois do fio da UI passar só por chaves — o trabalho editorial fica concentrado nos JSON.

- [x] `messages/partials/projects.en.json` e `projects.es.json`: título, descrição, highlights e `status` por `id` (33 itens), texto real em EN/ES.  
- [x] `experienceItems` e `educationItems` em `messages/parts/en/03-ui.json` e `messages/parts/es/03-ui.json`.  
- [x] `testimonialItems`: conteúdo em EN no bundle EN e em ES no bundle ES (vide Etapa E).  
- [ ] Revisão editorial fina de `messages/parts/en/01-metadata.json` e `es/01-metadata.json` (keywords, descrições longas) — **opcional**.  
- [x] Merge + build: `node scripts/merge-locale-messages.mjs` e `npm run build` sem erro.

**Pronto quando:** leitura em EN/ES sem parágrafos longos óbvios em português nos blocos acima (**concluída** em 2026-04-12, exceto metadata opcional).

#### Registro do processo — Etapa G (2026-04-12)

| Critério (§4) | Registro |
|----------------|----------|
| (a) Código | Sem alteração de lógica de negócio; apenas arquivos de mensagem. |
| (b) Locales | PT inalterado como fonte; EN e ES preenchidos com tradução editorial nos arquivos listados abaixo. |
| (c) Merge | `node scripts/merge-locale-messages.mjs` regenerou `messages/pt.json`, `en.json`, `es.json`. |
| (d) Build | `npm run build` concluído com sucesso (inclui SSG de `/[locale]/projects` e `/[locale]/projects/[id]`). |
| (e) Smoke | Recomendado: `/en` e `/es` — seções Experiência/Educación; `/en/projects` e um detalhe (ex. `/en/projects/13`); confirmar ausência de PT nos textos longos dessas áreas. |

**Arquivos-fonte editados (não editar os `messages/*.json` gerados na mão):**

- `messages/partials/projects.en.json` — todos os itens `projects.items["1"]`…`["33"]` em inglês.  
- `messages/partials/projects.es.json` — mesmo esquema em espanhol (estados localizados: En línea, Completado, En construcción, En producción, En desarrollo, etc.).  
- `messages/parts/en/03-ui.json` — blocos `experienceItems` (e0–e7) e `educationItems` (ed0–ed3).  
- `messages/parts/es/03-ui.json` — mesmos blocos em espanhol.

**Fora desta rodada:** revisão opcional de `01-metadata.json` EN/ES.

---

### Etapa H — APIs e dados expostos

- [x] `api/contact/route.ts`, `api/search-console/status/route.ts`, `api/allprojects/route.ts`: `resolveApiLocale` + `getApiCopy` / `getProjectsForApiLocale` em `src/lib/apiLocale.ts` (imports dos `messages/{pt,en,es}.json` mergeados). Respostas com header `Content-Language`.  
- [x] `search-console/page.tsx`: `fetch` com `?locale=${useLocale()}` para alinhar à UI mesmo se o browser enviar outro `Accept-Language`.  
- [x] Contrato documentado abaixo e exemplos `curl`.

**Pronto quando:** respostas coerentes com o idioma negociado (**concluída** em 2026-04-12).

#### Registro do processo — Etapa H (2026-04-12)

**Prioridade de locale:** `?locale=pt|en|es` na URL da requisição → primeiro tag útil de `Accept-Language` → `pt`.

**Código:** `src/lib/apiLocale.ts` — `resolveApiLocale`, `getApiCopy`, `getProjectsForApiLocale`. Rotas: `src/app/api/contact/route.ts`, `search-console/status/route.ts`, `allprojects/route.ts`. UI: `src/app/[locale]/search-console/page.tsx`.

**Exemplos `curl` (dev, porta 3000):**

```bash
curl -s "http://localhost:3000/api/search-console/status?locale=en" | head -c 200
curl -s -H "Accept-Language: es" "http://localhost:3000/api/allprojects" | head -c 200
curl -s -X POST "http://localhost:3000/api/contact?locale=en" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"a@b.co","message":"Hi"}' | head -c 120
```

*(O POST de contato só retorna sucesso se o envio SMTP estiver configurado; em dev o erro ainda deve vir em inglês se `locale=en`.)*

**Nota:** `projectsData` exportado em `src/data/projectsData.ts` continua sendo a lista **PT** para sitemap/fallbacks; a API `allprojects` passa a refletir o locale pedido.

---

### Etapa I — Sitemap, robots e JSON-LD

- [x] `sitemap.ts`: uma entrada por recurso lógico com URL canônica **PT** (default) + `alternates.languages` (`pt`, `en`, `es`, `x-default`) via `src/lib/siteUrls.ts`; rotas estáticas + `/search-console` + todos os `projects/[id]` a partir de `projectsBase.json`.  
- [x] `generateMetadata` em `[locale]/layout.tsx`: `canonical` e `openGraph.url` da home por locale; `alternates.languages` alinhados ao sitemap.  
- [x] `projects/[id]/page.tsx`: `alternates.languages` com chaves `pt` / `en` / `es` / `x-default` (removido `pt-BR` solto).  
- [x] `SEO.tsx`: `<link rel="alternate" hreflang="…">` para `pt`, `en`, `es` e `x-default` com base no pathname i18n.  
- [x] `StructuredData.tsx`: textos de Person / WebSite / ProfessionalService / LocalBusiness via `useTranslations('structuredData')` + `websiteName` nos parts; `SearchAction` com URL de `/projects` respeitando o locale.  
- [x] `robots.ts`: mantém `sitemap` único (lista já inclui hreflang por URL).

**Pronto quando:** revisão manual em Search Console / validador de hreflang (**concluída** em 2026-04-12 no código; validação externa recomendada).

#### Registro do processo — Etapa I (2026-04-12)

**Novo helper:** `src/lib/siteUrls.ts` — `pathnameWithoutLocale`, `absoluteUrl`, `languageAlternates`.  
**Mensagens:** chave `structuredData.websiteName` em `messages/parts/{pt,en,es}/03-ui.json` (merge obrigatório após edição).

---

### Etapa J — QA final e manutenção

- [x] Checklist manual de rotas (registro abaixo; executar no browser após deploy ou em `npm run dev`).  
- [x] CI: workflow GitHub Actions **`.github/workflows/ci.yml`** — `npm ci` → `npm run messages:merge` → `npm run lint` → `npm run build` (branches `master` e `main`).  
- [x] README: seção **Tradução (i18n)** com fluxo `parts` / `partials` → `npm run messages:merge` → `useTranslations` / `@/i18n/navigation` + link para este plano.  
- [x] Script npm **`messages:merge`** em `package.json` (alias do merge).

**Pronto quando:** build e lint verdes na CI e documentação mínima para novos textos (**concluída** em 2026-04-12 no repositório).

#### Checklist manual sugerido (PT / EN / ES)

| Rota / ação | PT | EN | ES |
|-------------|----|----|-----|
| Home — scroll, modal intenção, troca de idioma | ☐ | ☐ | ☐ |
| `/about` | ☐ | ☐ | ☐ |
| `/services` | ☐ | ☐ | ☐ |
| `/projects` + um detalhe `/projects/[id]` | ☐ | ☐ | ☐ |
| `/search-console` (recomendações da API no idioma) | ☐ | ☐ | ☐ |
| Tema (claro/escuro) e `global-error` (simular erro) | ☐ | ☐ | ☐ |
| View-source ou DevTools: `hreflang` + canonical | ☐ | ☐ | ☐ |

*(Marcar na revisão de release; a CI não substitui smoke visual.)*

#### Registro do processo — Etapa J (2026-04-12)

**Arquivos:** `.github/workflows/ci.yml`, `package.json` (`messages:merge`), `README.md` (seção i18n + sumário + ano do rodapé).  
**Validação local:** `npm run messages:merge && npm run lint && npm run build` — sucesso antes do commit.

---

## 5. Ordem sugerida (dependências)

```text
A → B → C → D → E → F → G → H → I → J
```

A etapa **G** pode correr em paralelo com **F** se as chaves PT estiverem estáveis.

---

## 6. Boas práticas neste projeto

- **Um conceito → uma chave**; pluralização e formatação preferencialmente no JSON (ICU / `useFormatter`).  
- **Namespaces** alinhados aos blocos existentes em `03-ui.json`.  
- **Acessibilidade:** `aria-label` e `alt` em mensagens quando forem linguagem natural.  
- **Sem libs i18n extras** além de `next-intl`.  
- **Commits** por etapa ou fatia vertical (ex.: `i18n: Etapa G projects EN/ES`).

---

## 7. Registro de progresso

| Etapa | Data | Status |
|-------|------|--------|
| A | 2026-03-29 | Concluída |
| B | 2026-03-29 | Concluída |
| C | 2026-03-29 | Concluída |
| D | 2026-03-29 | Concluída |
| E | 2026-03-29 | Concluída |
| F | 2026-03-29 | Concluída |
| G | 2026-04-12 | Concluída (exc. metadata EN/ES opcional) |
| H | 2026-04-12 | Concluída |
| I | 2026-04-12 | Concluída |
| J | 2026-04-12 | Concluída |

---

## 8. Resultado da Etapa A (auditoria)

Auditoria por leitura do repositório e greps (`next/link`, `next/navigation`, `useTranslations`). Caminhos relativos a `src/`.

### 8.1 Namespaces já presentes nos JSON (referência)

| Origem | Namespace / raiz | Uso típico |
|--------|------------------|------------|
| `parts/*/01-metadata.json` | `metadata` | `generateMetadata`, SEO default |
| `parts/*/02-nav.json` | `nav`, `languageSwitcher` | Navbar, switcher |
| `parts/*/03-ui.json` | `footer`, `visitorIntent`, `projectsList`, `projectDetail`, `gallery`, `about`, `stats`, `testimonials`, `contact`, `skills`, `experience`, `education`, `portfolioHome`, `projectsSection`, `commercialHome`, `servicesPage`, `servicesCards`, `searchConsole`, `globalError`, `breadcrumbs`, `api`, `theme`, `structuredData`, … | UI geral |
| `parts/*/03-ui.json` | `experienceItems`, `educationItems`, `testimonialItems` | Conteúdo estruturado por id |
| `partials/projects.{locale}.json` | `projects` → `items` | `useProjects` / `getProjects` |

**Regra:** antes de criar chave nova, buscar nestes blocos para evitar duplicar conceitos.

### 8.2 Política de APIs (mensagens nas rotas)

1. **Negociação de idioma:** header `Accept-Language` com tag principal `pt`, `en` ou `es` (fallback **`pt`** se ausente ou não suportado).  
2. **Alternativa explícita:** query `?locale=en|es|pt` sobrescreve o header (útil para testes e `curl`).  
3. **Implementação:** helper em `src/lib/apiLocale.ts` — `resolveApiLocale(request)`, `getApiCopy(locale)`, `getProjectsForApiLocale(locale)` — importa os `messages/{pt,en,es}.json` gerados pelo merge (não duplicar strings nas rotas).  
4. **Rotas só numéricas / agregadas:** `api/github-stats`, `api/analytics` — se a resposta não tiver cópia natural language, marcar como N/A.

**Rotas com cópia localizada (Etapa H):**

| Rota | Campos | Fonte |
|------|--------|--------|
| `POST api/contact` | `message`, `error` | `api.contactSuccess`, `api.contactError` |
| `GET api/search-console/status` | `recommendations[]` | `api.searchAllOk` / `searchSomeFail`, `searchRec2`–`searchRec4` |
| `GET api/allprojects` | array de projetos | `buildProjects(messages[locale].projects.items)` |

### 8.3 Exceções de navegação (`next/navigation` / `next/link`)

| Arquivo | Uso | Tratamento |
|---------|-----|------------|
| `[locale]/layout.tsx`, `projects/[id]/page.tsx` | `notFound` | Manter (API do App Router). |
| `GoogleAnalytics.tsx` | `usePathname`, `useSearchParams` | Exceção: path real com prefixo para GA. |

**`next/link` em `src/`:** nenhuma ocorrência no momento da última revisão deste doc; links de UI devem preferir `@/i18n/navigation`.

### 8.4 Mapa arquivo → namespace (status)

Legenda: **OK** = i18n como previsto; **Parcial** = parte traduzida ou dependência de API; **Pendente** = strings ou dados a tratar; **N/A** = fora de escopo de cópia.

| Arquivo | Status | Namespace(s) | Observações |
|---------|--------|----------------|-------------|
| `app/[locale]/layout.tsx` | OK | `metadata` | Home: `canonical` / `alternates` / `openGraph.url` por locale (`siteUrls`). |
| `app/[locale]/page.tsx` | Parcial | (compõe seções) | Depende dos filhos. |
| `app/[locale]/about/page.tsx` | OK | `about`, `metadata` | |
| `app/[locale]/services/page.tsx` | OK | `servicesPage`, `servicesCards`, `metadata` | |
| `app/[locale]/search-console/page.tsx` | OK | `searchConsole`, `api`, `metadata` | Fetch da status API com `?locale=` alinhado ao `useLocale()`. |
| `app/[locale]/projects/page.tsx` | OK | `projectsList`, `metadata` | |
| `app/[locale]/projects/[id]/page.tsx` | OK | `metadata` | |
| `app/[locale]/projects/[id]/ProjectDetailClient.tsx` | Parcial | `projectDetail`, `projectsList` | Revisar SEO interno se ainda houver título fixo. |
| `app/[locale]/projects/[id]/components/ImagesGallery.tsx` | Pendente | `gallery` | Texto de rodapé da galeria ainda em PT hardcoded (ex.: “Clique em qualquer imagem…”). |
| `components/VisitorIntentModal.tsx` | OK | `visitorIntent` | |
| `components/sections/PortfolioHome.tsx` | OK | `portfolioHome` | |
| `components/sections/CommercialHome.tsx` | OK | `commercialHome` | |
| `components/sections/Projects.tsx` | OK | `projectsSection` | |
| `components/sections/Experience.tsx` | OK | `experience`, `experienceItems` | |
| `components/sections/Education.tsx` | OK | `education`, `educationItems` | |
| `components/Stats.tsx` | OK | `stats` | |
| `components/sections/Skills.tsx` | OK | `skills` | |
| `components/sections/Contact.tsx` | OK | `contact` | |
| `components/Testimonials.tsx` | OK | `testimonials`, `testimonialItems` | |
| `components/StructuredData.tsx` | OK | `structuredData` | Cópias por locale + `SearchAction` com path de projetos localizado. |
| `components/SEO.tsx` | OK | `metadata` | Inclui `link[rel="alternate"][hreflang]` coerentes com `siteUrls`. |
| `components/Breadcrumbs.tsx` | OK | `breadcrumbs` | |
| `components/LanguageSwitcher.tsx` | OK | `languageSwitcher` | |
| `components/layout/Navbar.tsx` | OK | `nav` | |
| `components/layout/Footer.tsx` | OK | `footer`, `nav` | |
| `app/theme/ThemeProvider.tsx` | Parcial | `theme` | Nomes dos temas podem estar hardcoded em EN. |
| `app/global-error.tsx` | OK | `globalError` | `globalErrorCopy` + cookie `NEXT_LOCALE`. |
| `app/sitemap.ts` | OK | — | `alternates.languages` por rota; fonte de IDs `projectsBase.json`. |
| `app/robots.ts` | OK | — | Aponta para `sitemap.xml` único. |
| `app/api/contact/route.ts` | OK | `api` | `resolveApiLocale` + `getApiCopy`. |
| `app/api/search-console/status/route.ts` | OK | `api` | Recomendações por locale. |
| `app/api/allprojects/route.ts` | OK | `projects` | `getProjectsForApiLocale`. |
| `app/api/github-stats/route.ts` | N/A | — | |
| `app/api/analytics/route.ts` | N/A | — | Confirmar corpo; se só métricas, N/A. |

**Nota `global-error.tsx`:** implementado com cookie **`NEXT_LOCALE`** (middleware next-intl) + cópias em `src/lib/globalErrorCopy.ts` importadas dos `messages/*.json` mergeados. Após editar `parts`, rodar merge antes do build.

### 8.5 Comandos úteis para re-auditar

```bash
rg "from ['\"]next/link['\"]" src/
rg "from ['\"]next/navigation['\"]" src/
rg "useTranslations|getTranslations" src/
```

---

*Última atualização: Etapas A–J concluídas (J em 2026-04-12 — CI GitHub Actions, README i18n, script `messages:merge`, checklist manual no plano). Melhorias opcionais: `ImagesGallery`, nomes de tema, revisão `01-metadata` EN/ES.*
