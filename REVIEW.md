# REVIEW — Auditoria técnica de leorodrigues.dev

> Data: 2026-11-16 · Branch analisada: `master` (`0a1c183`) · Escopo: somente leitura do código-fonte.
> Nenhum servidor, build, teste, lint ou acesso à produção foi executado. Itens que dependem de runtime estão marcados como **A verificar**, com o comando para validar.

---

## Fase 1 — Entendimento do projeto

**Stack**

| Item | Valor (evidência) |
|---|---|
| Framework | Next.js `15.5.15` App Router (`package.json:52`, `package-lock.json`) |
| React | `^18.2.0` instalado (`package.json:54`) — o App Router do Next 15 usa React 19 vendorizado |
| Linguagem | TypeScript 5, `strict: false` (`tsconfig.json:7`) |
| Estilo | Tailwind 3 + tokens CSS por tema em `src/styles/globals.css` (8 temas `.theme-*`) |
| i18n | next-intl 4.9 (`src/i18n/*`), locales `pt` (default, sem prefixo), `en`, `es` — `localePrefix: "as-needed"` |
| Mensagens | `messages/parts/<locale>/*.json` + `messages/partials/projects.*.json` → mesclados em `messages/{pt,en,es}.json` via `scripts/merge-locale-messages.mjs` |
| Dados | `src/data/projectsBase.json` (33 projetos) + cópia traduzida em `messages/*` (`src/data/projectsData.ts`) |
| Animação | `motion` (`motion/react`) em praticamente todas as seções |
| Estado | Local (`useState`) + `sessionStorage` (intenção do visitante) + `localStorage` (tema). Sem store global |
| Observabilidade | Sentry (`src/instrumentation*.ts`, `sentry.*.config.ts`), Vercel Analytics + Speed Insights, GA4 (`src/components/GoogleAnalytics.tsx`) |
| API | Route handlers em `src/app/api/*` (`contact`, `analytics`, `allprojects`, `github-stats`, `search-console/status`) |
| CI | GitHub Actions: `npm ci` → `messages:merge` → `next lint` → `next build` em Node 20 (`.github/workflows/ci.yml`) |
| Deploy | Vercel (inferido por `@vercel/*` e `.vercel` no `.gitignore`) |

**Convenções observadas** (inclusive as declaradas em `.cursor/rules/01-stack-and-standards.mdc` e `02-project-architecture.mdc`):
- Alias `@/*`; componentes em PascalCase; seções em `src/components/sections/`, layout em `src/components/layout/`, primitivos em `src/components/ui/` (CVA + `cn()`).
- Regra declarada do projeto: **Server Components por padrão**, `"use client"` só quando necessário; todo texto visível via next-intl; validar dados em rotas de API.
- ESLint `next/core-web-vitals` + `next/typescript`; sem Prettier; sem testes.

**Resumo da arquitetura**
Site institucional/portfólio de um desenvolvedor freelancer, com duas "personas" na home (comercial × portfólio) escolhidas por um modal. A infraestrutura de SEO técnico é boa no papel (sitemap com hreflang, `generateMetadata` no layout e no detalhe de projeto, helpers em `src/lib/siteUrls.ts`). Porém **quase todas as páginas são Client Components** e o `ThemeProvider` do layout **não renderiza o conteúdo no servidor** (splash de 3 s), o que anula grande parte desse trabalho de SEO e penaliza fortemente o LCP. A conversão depende de `mailto:` e WhatsApp; não há formulário, apesar de existir a rota `/api/contact`.

---

## 1. Resumo executivo

O site tem boa base técnica (Next 15, i18n completo em 3 idiomas, sitemap/hreflang, Sentry, Vercel Analytics, CI), mas três decisões de implementação comprometem diretamente os objetivos de negócio (ser encontrado no Google e gerar contatos). Em produção, todo primeiro acesso exibe um splash de 3 s e o HTML entregue pelo servidor não contém o conteúdo das páginas; as páginas `/about`, `/services` e `/projects` ainda saem do servidor com canonical apontando para a home. Na página de serviços, todos os botões "Solicitar orçamento" apontam para uma âncora `#contact` que não existe nessa página.

**Os 3 maiores riscos/oportunidades:**
1. **Splash de 3 s + conteúdo fora do HTML do servidor** (`ThemeProvider.tsx:28,56,156`): LCP ≥ 3 s garantido e indexação dependente do renderizador JS do Google. Corrigir isso é a melhoria de maior impacto em performance e SEO ao mesmo tempo.
2. **Metadados por página só no cliente + canonical errado no SSR** (`[locale]/layout.tsx:35-41,84-87`, `SEO.tsx`): risco real de o Google consolidar `/about`, `/services` e `/projects` na home e de as versões EN/ES receberem título em português.
3. **Funil de conversão quebrado e sem medição**: CTAs de orçamento sem destino em `/services`, nenhum evento de conversão (lead) instrumentado e a escolha do modal de intenção sem tracking. Hoje não é possível saber quantos leads o site gera.

**Risco de segurança urgente (fora do top 3 de negócio, mas prioridade zero):** 267 alertas Dependabot abertos, sendo 4 críticos. Os mais graves são RCE não autenticado na Image Optimization API do `next@15.5.15`, corrigido em 15.5.28 por um upgrade só de patch. Remover `axios` (sem uso) e `yarn.lock` fecha 145 alertas sem tocar em código (ver seção 3.9).

---

## 2. Nota por área

| Área | Nota | Justificativa |
|---|---|---|
| Performance / CWV | **3/10** | Splash bloqueante de 3 s, hero com `opacity: 0` até hidratar, páginas 100% client, imagens-fonte de até 14 MB servidas sem otimização no lightbox, `fill` sem `sizes`. |
| SEO | **4/10** | Boa infraestrutura (sitemap, hreflang, metadata no layout e no detalhe), mas o conteúdo não está no HTML do servidor, há canonical errado no SSR, meta da home fixo em PT, JSON-LD injetado no cliente e com dados inventados (LocalBusiness). |
| Acessibilidade | **5/10** | Labels ARIA em ícones e breadcrumb semântico, mas modal desktop sem `role="dialog"`/foco preso/Esc, contraste 1,34:1 em botões do tema padrão, 4 temas reprovam AA e não há suporte a `prefers-reduced-motion`. |
| Segurança | **4/10** | Sem secrets no cliente, `.env*` ignorado e headers básicos presentes. Por outro lado: 267 alertas Dependabot abertos (4 críticos, incluindo RCE na Image Optimization API do `next`), `.exe` servido pelo domínio, `/api/contact` exposta sem validação/rate limit, sem CSP/Permissions-Policy e spoofing de título via query string. |
| Código / Arquitetura | **5/10** | Organização de pastas clara e i18n bem estruturado, mas contraria a própria regra "Server Components por padrão", tem `strict: false`, ~20 dependências sem uso, rotas mortas, URLs/contatos duplicados e estado de intenção não compartilhado. |
| UX / Conversão | **5/10** | Proposta de valor e CTAs claros na home comercial, mas CTAs quebrados em `/services`, modal interruptivo após 1 s, ausência de formulário, números/depoimentos sem comprovação e sem página 404 própria. |
| Analytics | **4/10** | GA4 + Vercel Analytics instalados, mas nenhum evento de lead, CTAs principais sem tracking, sem rastreamento da escolha de intenção, possível pageview duplicado e sem Consent Mode. |
| DX / Manutenção | **5/10** | CI com lint e build e script de i18n documentado, mas CI em Node 20 (fora do suporte), `next lint` descontinuado, dois lockfiles, sem testes e sem typecheck explícito; README e 6 documentos `.md` na raiz desatualizados. |

---

## 3. Achados

Legenda de esforço: **P** ≤ 2 h · **M** ≤ 1 dia · **G** > 1 dia.

### 3.1 Performance / Core Web Vitals

#### PERF-01 — Splash bloqueante de 3 s; conteúdo não é renderizado no servidor
- **Severidade:** Crítico · **Esforço:** M
- **Evidência:** `src/app/theme/ThemeProvider.tsx:28` (`isLoading` inicia `true`), `:55-58` (`setTimeout(..., 3000)`), `:156-220` (`isLoading ? <LoadingScreen/> : children`). O provider envolve tudo em `src/app/[locale]/layout.tsx:116-121`.
- **Problema:** em todo primeiro carregamento o usuário vê só "Leorodrigues.dev|" digitando por 3 s. No SSR, `isLoading === true`, então **o HTML do servidor não contém Navbar, conteúdo, Footer nem o `<GoogleAnalytics/>`**. O LCP real fica ≥ 3 s + hidratação, o que reprova o limiar "Good" de 2,5 s. O `LoadingScreen` ainda injeta um `<h1>` extra (`:142`) e é declarado dentro do render (`:82`), recriando o componente a cada render.
- **Impacto de negócio:** abandono na primeira visita, especialmente no mobile (orçamentos chegam por anúncio/Google), e penalização de ranking por CWV.
- **Correção proposta:** remover o splash. Aplicar o tema antes da pintura com script inline (sem flash) e renderizar `children` sempre:
  ```tsx
  // src/app/[locale]/layout.tsx — dentro de <head>
  <script
    dangerouslySetInnerHTML={{
      __html: `try{var t=localStorage.getItem('theme');if(t){document.documentElement.className=document.documentElement.className.replace(/theme-\\S+/,'theme-'+t)}}catch(e){}`,
    }}
  />
  ```
  ```tsx
  // ThemeProvider.tsx — remover isLoading/LoadingScreen e renderizar sempre:
  return (
    <div className={`transition-colors duration-500 min-h-screen ${isTransitioning ? "fade-transition" : ""}`}>
      <ThemeSelector ... />
      {children}
    </div>
  );
  ```
- ⚠️ **Dependência:** ao remover o splash, os componentes passam a ser renderizados no servidor e dois problemas hoje mascarados aparecem: `Navbar.isActive` lê `document` durante o render (CQ-06, vai quebrar o SSR) e `useSearchParams` sem `<Suspense>` em `GoogleAnalytics` (AN-02, erro de build no Next 15). Os três precisam ser corrigidos juntos.

#### PERF-02 — Hero e títulos começam com `opacity: 0` (LCP atrasado)
- **Severidade:** Alto · **Esforço:** P
- **Evidência:** `src/components/sections/CommercialHome.tsx:31-65` (`motion.div`/`motion.h1`/`motion.p` com `initial={{ opacity: 0 }}` e `delay` de 0,3–0,4 s); padrão repetido em `about/page.tsx:32-36`, `services/page.tsx:99-103` e `projects/page.tsx:76-80`.
- **Problema:** o motion serializa o estado `initial` no HTML. O elemento LCP (h1 ou subtítulo) fica invisível até o JS hidratar e a animação terminar.
- **Correção:** não animar a opacidade do elemento LCP. Usar `initial={false}` no h1/subtítulo do hero ou animar só `y` (transform), mantendo `opacity: 1`.

#### PERF-03 — Todas as páginas principais são Client Components
- **Severidade:** Alto · **Esforço:** G
- **Evidência:** `"use client"` em `src/app/[locale]/page.tsx:1`, `about/page.tsx:1`, `services/page.tsx:1`, `projects/page.tsx:1` e `search-console/page.tsx:1`. Isso contraria `.cursor/rules/01-stack-and-standards.mdc` ("Server Components por padrão").
- **Problema:** a árvore inteira é hidratada (motion, lucide, next-intl client e todas as mensagens). Também impede `export const metadata/generateMetadata` nessas rotas (causa de SEO-02).
- **Correção:** transformar cada `page.tsx` em Server Component que exporta `generateMetadata` e renderiza seções; manter `"use client"` só nas ilhas interativas (Navbar, modal, filtros de projetos, galeria). A home pode renderizar `CommercialHome` no servidor e alternar para portfólio no cliente.

#### PERF-04 — Imagens: fontes gigantes, lightbox sem otimização e `fill` sem `sizes`
- **Severidade:** Alto · **Esforço:** M
- **Evidência:**
  - `public/` tem **108 MB**, com PNGs de até 14,7 MB (`public/projects/coelhotattoo013/onepage.png`, `public/site2.png` 10 MB, `public/avatar.png` 2 MB usado a 128 px em `about/page.tsx:38-44`).
  - Lightbox usa os arquivos originais: `src/app/[locale]/projects/[id]/components/ImagesGallery.tsx:27` (`slides = images.map((src) => ({ src }))`), de modo que um clique pode baixar 14 MB.
  - `fill` sem `sizes`: `src/app/[locale]/projects/page.tsx:268-273`, `src/components/sections/Projects.tsx:56-61` e `src/components/SafeImage.tsx:39-46`. O padrão é `100vw`, o que faz baixar a variante mais larga para cards de ~33vw.
- **Correção:**
  1. Recomprimir as fontes (ex.: `npx @squoosh/cli` ou `sharp`) para WebP/AVIF com largura máxima de 1920 px.
  2. Nos slides do lightbox, usar URLs do otimizador: `src: \`/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75\``, ou o `render.slide` com `next/image` (padrão documentado pelo yet-another-react-lightbox).
  3. Adicionar `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` nos cards e propagar `sizes` em `SafeImage`.
  4. Remover arquivos não referenciados (ver CQ-03).

#### PERF-05 — Mensagens inteiras serializadas para o cliente e `pt.json` duplicado no bundle
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** `src/app/[locale]/layout.tsx:108,115` passa `getMessages()` completo ao `NextIntlClientProvider`. `src/data/projectsData.ts:2,53-56` importa `messages/pt.json` estaticamente e constrói `projectsData` (export não usado em nenhum lugar), e esse módulo é importado por `src/hooks/useProjects.ts:4` (client).
- **Problema:** todas as páginas levam todos os namespaces (incluindo 33 projetos × 3 campos) no payload RSC, e o bundle client ainda inclui `pt.json` inteiro, mesmo em `/en`.
- **Correção:** remover o export `projectsData` e o import de `pt.json` de `projectsData.ts` (manter só `buildProjects` e os tipos); passar `messages={pick(messages, [...namespacesUsadosNoCliente])}` no provider, ou mover a montagem dos projetos para o servidor (`getProjects`) e passar via props.

#### PERF-06 — Lightbox e plugins importados de forma estática
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `ImagesGallery.tsx:7-15`.
- **Correção:** `const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false })` e carregar os plugins sob demanda quando `open === true`.

#### PERF-07 — Sentry com `tracesSampleRate: 1.0` em produção e init duplicado
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `src/instrumentation-client.ts:6`, `src/instrumentation.ts:8,17`, `sentry.server.config.ts:6`, `sentry.edge.config.ts:6`.
- **Problema:** 100 % das transações são rastreadas, o que gera overhead no cliente e custo de cota. Com `instrumentation.ts` fazendo o init, os arquivos `sentry.*.config.ts` ficam redundantes.
- **Correção:** `tracesSampleRate: 0.1` (ou via env) e remover `sentry.server.config.ts`/`sentry.edge.config.ts`, depois de confirmar que não são importados (**A verificar**: `grep -rn "sentry.server.config\|sentry.edge.config" .`).

#### PERF-08 — Fonte Audiowide em TTF
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `src/app/fonts.ts:15-19`, `src/fonts/Audiowide-Regular.ttf`.
- **Correção:** converter para `woff2` (ou usar `next/font/google` com `Audiowide`), já que é usada em todos os títulos.

---

### 3.2 SEO

#### SEO-01 — Conteúdo das páginas ausente do HTML do servidor
- **Severidade:** Crítico · **Esforço:** (resolvido junto com PERF-01)
- **Evidência:** mesma causa de PERF-01 (`ThemeProvider.tsx:156`).
- **Impacto:** Google, Bing, LinkedIn, WhatsApp e crawlers de IA que não executam JS veem só o splash. O Google indexa em uma segunda onda (render) que é mais lenta e menos confiável.
- **A verificar:** `curl -s https://leorodrigues.dev/ | grep -c "<h1"` e `curl -s https://leorodrigues.dev/services | grep -o "<h1[^>]*>[^<]*"`. Se só aparecer o h1 do splash, o problema está confirmado em produção.

#### SEO-02 — Metadados por página só no cliente; canonical e hreflang do SSR apontam para a home
- **Severidade:** Crítico · **Esforço:** M
- **Evidência:**
  - O layout define `alternates.canonical = absoluteUrl(locale, "/")` e `languages = languageAlternates("/")` para **todas** as rotas (`src/app/[locale]/layout.tsx:35-36,84-87`).
  - `/about`, `/services`, `/projects` e `/search-console` são client e não exportam `generateMetadata`. Título, descrição, canonical e hreflang corretos só são aplicados via `useEffect` em `src/components/SEO.tsx:53-128`.
- **Problema:** no HTML inicial, `/services` declara `<link rel="canonical" href="https://leorodrigues.dev/">`. Canonical para outra URL é um sinal forte de duplicação, e o Google pode ignorar a página. Title e OG do SSR também são os da home, o que afeta o preview no LinkedIn e no WhatsApp.
- **Correção:** com PERF-03, exportar `generateMetadata` em cada rota reaproveitando `absoluteUrl`/`languageAlternates`:
  ```ts
  // src/app/[locale]/services/page.tsx (Server Component)
  export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });
    return {
      title: t("servicesTitle"),
      description: t("servicesDescription"),
      alternates: { canonical: absoluteUrl(locale, "/services"), languages: languageAlternates("/services") },
      openGraph: { url: absoluteUrl(locale, "/services"), title: t("servicesTitle"), description: t("servicesDescription") },
    };
  }
  ```
  Remover o canonical/alternates do layout (deixar só para a home em `[locale]/page.tsx`) e aposentar `SEO.tsx`.

#### SEO-03 — Meta da home fixo em português para todos os idiomas
- **Severidade:** Alto · **Esforço:** P
- **Evidência:** `src/app/[locale]/page.tsx:21-25` (title, description e keywords literais em PT). Isso viola a regra de i18n do projeto (`.cursor/rules/01-stack-and-standards.mdc`, item 3).
- **Impacto:** `/en` e `/es` exibem título/descrição em PT depois da hidratação, o que conflita com o `lang` e o hreflang. A descrição ainda omite o posicionamento de IA/automação já usado no hero.
- **Correção:** mover para `metadata.homeTitle/homeDescription` em `messages/parts/*/01-metadata.json` e, idealmente, para `generateMetadata` da home.

#### SEO-04 — JSON-LD injetado no cliente e com dados imprecisos
- **Severidade:** Alto · **Esforço:** M
- **Evidência:**
  - `src/components/StructuredData.tsx:41-187` cria `<script type="application/ld+json">` via `useEffect`, ausente do HTML do servidor.
  - `LocalBusiness` com horário comercial fixo e sem endereço (`:121-165`). Para um profissional remoto isso não é verdadeiro e pode gerar alerta no Rich Results Test.
  - `WebSite.potentialAction.SearchAction` aponta para `/projects?search=` (`:51,90-97`), mas `projects/page.tsx` não lê `search`. É um sitelinks searchbox inválido.
  - Home injeta `Person`, `WebSite`, `ProfessionalService` **e** `LocalBusiness` (`[locale]/page.tsx:26-29`) com `data={{}}` (objeto novo a cada render, o que reexecuta o efeito; ver CQ-08).
- **Correção:** gerar JSON-LD no servidor (`<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` em Server Component), remover `LocalBusiness` e `SearchAction`, manter `Person` + `ProfessionalService` (com `areaServed` e `availableLanguage`) e, no detalhe, `CreativeWork` (que já é server-side em `projects/[id]/page.tsx:50-69`).

#### SEO-05 — Domínio canônico inconsistente (www × apex)
- **Severidade:** Alto (se confirmado) · **Esforço:** P
- **Evidência:** `src/app/api/search-console/status/route.ts:26-27` afirma "O site redireciona para www" e usa `https://www.leorodrigues.dev`, enquanto canonical, sitemap, hreflang e OG usam `https://leorodrigues.dev` (`src/lib/siteUrls.ts:3`, `src/app/robots.ts:10`, `layout.tsx:39`).
- **Problema:** se o apex redireciona para www, todos os canonicals e URLs do sitemap apontam para URLs com redirect, o que é um sinal conflitante.
- **A verificar:** `curl -sI https://leorodrigues.dev/ | grep -i "^location\|^HTTP"` e `curl -sI https://www.leorodrigues.dev/ | grep -i "^location\|^HTTP"`. Alinhar o domínio primário no painel da Vercel com `siteUrls.ts` e centralizar a base em uma constante/env (`NEXT_PUBLIC_SITE_URL`).

#### SEO-06 — Página interna `/search-console` indexável e presente no sitemap
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `src/app/sitemap.ts:15`; página em `src/app/[locale]/search-console/page.tsx`; link quebrado para `/GOOGLE_SEARCH_CONSOLE_SETUP.md` (`:203`), que fica na raiz do repo e não em `public/`.
- **Correção:** remover do sitemap e da rota pública (ou `robots: { index: false }` + proteção), e remover o link quebrado.

#### SEO-07 — Links internos com `?title=` geram URLs duplicadas e forçam render dinâmico
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `projects/page.tsx:338`, `ProjectDetailClient.tsx:273` (`/projects/${id}?title=...`); `projects/[id]/page.tsx:12,30,45` lê `searchParams`, o que torna a rota dinâmica e anula o `generateStaticParams` (`:21-26`).
- **Correção:** linkar para `/projects/${id}` e remover `titleFromUrl` (ver também SEC-04). Opcional: slugs semânticos (`/projects/agendai`) com redirect 301 dos ids, marcado como **Opcional — requer decisão**.

#### SEO-08 — `robots.txt` duplicado (estático + gerado)
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `public/robots.txt` e `src/app/robots.ts`.
- **Correção:** remover `public/robots.txt` e manter a rota de metadata. **A verificar** qual versão é servida hoje: `curl -s https://leorodrigues.dev/robots.txt`.

#### SEO-09 — Detalhes menores
- **Severidade:** Baixo · **Esforço:** P
- `sitemap.ts:24` usa `lastModified: new Date()` para páginas estáticas: a data muda a cada build e o sinal perde valor. Usar data fixa/derivada do conteúdo.
- Breadcrumb do detalhe mostra o id numérico como nome (`Breadcrumbs.tsx:47-48`); usar o título do projeto.
- `theme-color` fixo `#00ff88` (`SEO.tsx:94`) independente do tema; mover para `viewport.themeColor` no layout.
- `keywords` meta (`layout.tsx:45`, `SEO.tsx:76`) é ignorado pelo Google; manter só se houver motivo.
- Footer usa `<h4>` sem `<h2>/<h3>` acima (`Footer.tsx:48,78,88`), o que quebra a hierarquia.

---

### 3.3 Acessibilidade (WCAG 2.2 AA)

#### A11Y-01 — Modal de intenção (desktop) não é um diálogo acessível
- **Severidade:** Alto · **Esforço:** M
- **Evidência:** `src/components/VisitorIntentModal.tsx:238-269`: `div`s com `motion` sem `role="dialog"`, `aria-modal` ou `aria-labelledby`, sem trap de foco e sem fechar com `Esc`. Abre sozinho após 1 s (`:138-145`). A versão mobile usa Vaul (`:197-235`), que já é acessível.
- **Problema:** usuários de teclado/leitor de tela não sabem que há um modal e o foco continua na página por trás (WCAG 2.1.2, 2.4.3 e 4.1.2).
- **Correção:** usar `@radix-ui/react-dialog`, que já é dependência e é o padrão preferido do projeto (`.cursor/rules/01`, item 6): `Dialog.Root/Portal/Overlay/Content/Title/Description` com o mesmo visual.

#### A11Y-02 — Contraste insuficiente (inclusive no tema padrão)
- **Severidade:** Alto · **Esforço:** M
- **Evidência (razões calculadas a partir dos tokens de `globals.css`):**
  - Botões "ver mais" com `bg-[var(--primary-color)] text-white` em `Experience.tsx:204` e `Education.tsx:146`: **1,34:1** no tema padrão `figmaNeon` (branco sobre `#0f8`). O botão do seletor de tema (`ThemeProvider.tsx:170`) usa o mesmo par.
  - `text-gray-500` sobre card escuro (`Experience.tsx:67,116,161`, `Education.tsx:58-59,...`): **3,91:1**.
  - Tema `pastel`: primary/bg **2,66:1**, primary-foreground/primary **2,88:1**. Tema `minimalBlue`: primary/bg **3,15:1**. Tema `dark`: primary-foreground/primary **2,59:1**. Tema `darkYellow`: `--secondary: #F77F00` faz o texto muted sobre `bg-secondary` cair para **1,04:1**.
  - Regra base `button { background-color: var(--primary-color); color: var(--text-color) }` (`globals.css:277-280`) aplica texto claro sobre o primary em qualquer `<button>` sem classes.
- **Correção:** usar `text-primary-foreground` em vez de `text-white`, `text-muted-foreground` em vez de `text-gray-500`, ajustar os tokens dos temas reprovados (ou reduzir para os temas que passam AA; ver UX-07) e remover a regra base de `button`.

#### A11Y-03 — Sem suporte a `prefers-reduced-motion`
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** nenhuma ocorrência de `reducedMotion`/`prefers-reduced-motion`/`useReducedMotion` em `src/`. Há animações de entrada, `hover:scale`, `animate-ping` (`ThemeProvider.tsx:174`) e contadores (`Stats.tsx`).
- **Correção:** envolver o app em `<MotionConfig reducedMotion="user">` (motion) e adicionar `@media (prefers-reduced-motion: reduce)` para `animate-ping` e transições CSS.

#### A11Y-04 — Seletor de tema com itens focáveis invisíveis e interação por hover
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `ThemeProvider.tsx:160-216`: o painel fica fora da tela (`translate-x-full`) mas os 8 botões continuam no tab order. O painel abre/fecha com `onMouseEnter/Leave` e o toggle não tem `aria-expanded`.
- **Correção:** `inert`/`hidden` quando fechado, `aria-expanded` + `aria-controls` no toggle e `aria-pressed` no tema ativo. Alternativa: Radix `Popover`/`DropdownMenu` (já nas dependências).

#### A11Y-05 — Formulários e controles de filtro
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `projects/page.tsx:134-140`: `<label>` sem `htmlFor`/`id` associado ao `<select>`. Botões de filtro (`:98-118`, `:158-214`) sem `aria-pressed`.
- **Correção:** `htmlFor="tech-filter"` + `id="tech-filter"` e `aria-pressed={filter === btn}`.

#### A11Y-06 — Foco visível inconsistente
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** só 4 ocorrências de `focus-visible` em `src/`. O botão do seletor usa `focus:outline-none` sem substituto (`ThemeProvider.tsx:170`). Links de navegação e CTAs dependem do outline padrão, que pode ficar invisível em alguns temas.
- **Correção:** regra global em `@layer base`: `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }` e remover `focus:outline-none` sem alternativa.

---

### 3.4 Segurança

#### SEC-01 — Executável `.exe` servido pelo domínio
- **Severidade:** Alto · **Esforço:** P
- **Evidência:** `public/BraveBrowserSetup-BRV010.exe` (1,2 MB), versionado no Git e acessível em `https://leorodrigues.dev/BraveBrowserSetup-BRV010.exe`.
- **Impacto:** hospedar instaladores de terceiros pode fazer o Google Safe Browsing marcar o domínio, com aviso vermelho no Chrome e perda total de tráfego e confiança. Não há motivo funcional para o arquivo existir.
- **Correção:** remover o arquivo. Opcional: limpar do histórico, embora não seja segredo.

#### SEC-02 — `/api/contact` exposta sem validação, rate limit ou anti-spam (e sem uso)
- **Severidade:** Médio · **Esforço:** P (remover) / M (proteger)
- **Evidência:** `src/app/api/contact/route.ts:10-25`: `name/email/message` usados sem validação, novo transporter por requisição, sem `replyTo`. Nenhum componente chama `/api/contact` (grep vazio).
- **Impacto:** qualquer pessoa pode disparar e-mails ilimitados para `EMAIL_DESTINATION` pela conta Gmail (risco de bloqueio da conta SMTP e flood na caixa de entrada).
- **Correção:** se não houver formulário, remover a rota e a dependência `nodemailer`. Se UX-04 for aprovado, proteger:
  ```ts
  // validação mínima sem nova dependência
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 100);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const message = String(body?.message ?? "").trim().slice(0, 5000);
  if (body?.website) return NextResponse.json({ ok: true }); // honeypot
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: api.contactInvalid }, { status: 400 });
  }
  await transporter.sendMail({ ..., replyTo: email });
  ```
  Somar rate limit (Vercel Firewall rule para `/api/contact`) ou BotID.

#### SEC-03 — Headers de segurança incompletos
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** `next.config.js:19-43` tem só `X-DNS-Prefetch-Control`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy: origin-when-cross-origin`. Não há `Content-Security-Policy`, `Permissions-Policy` nem `Strict-Transport-Security` explícito.
- **Correção:**
  ```js
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy-Report-Only", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com; connect-src 'self' https://*.google-analytics.com https://*.ingest.sentry.io https://vitals.vercel-insights.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'self'" },
  ```
  Começar em `Report-Only` e promover depois de validar. **A verificar** se a Vercel já injeta HSTS: `curl -sI https://leorodrigues.dev | grep -i strict-transport`.

#### SEC-04 — Spoofing de conteúdo via `?title=`
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `ProjectDetailClient.tsx:24` (`displayTitle = titleFromUrl || project.title`), renderizado no `<h1>` (`:105`).
- **Impacto:** `https://leorodrigues.dev/projects/5?title=Golpe...` exibe texto arbitrário como título no seu domínio, o que pode ser usado em phishing/engenharia social. Não é XSS, porque o React escapa o conteúdo.
- **Correção:** remover `titleFromUrl` (junto com SEO-07).

#### SEC-05 — Rotas utilitárias públicas sem propósito em produção
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `src/app/api/search-console/status/route.ts` (cada chamada dispara 6 `HEAD` externos com User-Agent falso de Googlebot, `:56-62`); `src/app/api/analytics/route.ts` (aceita qualquer JSON e não faz nada); `src/app/api/allprojects/route.ts` (sem consumidores).
- **Correção:** remover as três rotas, ou proteger `search-console` com token em header.

#### SEC-06 — GA4 carregado sem consentimento (LGPD)
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** `GoogleAnalytics.tsx:27-46` carrega `gtag` incondicionalmente; não há banner nem Consent Mode (grep `consent` vazio).
- **A verificar:** posição jurídica/necessidade de consentimento para o público-alvo (BR/EU).
- **Correção:** Consent Mode v2 com `ad_storage/analytics_storage: 'denied'` por padrão + banner simples. A Vercel Analytics é cookieless e pode continuar sem consentimento.

#### SEC-07 — Dependências e lockfiles
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** o Dependabot reporta **267 alertas abertos** (4 críticos), detalhados na seção **3.9 (SEC-DEP-01 a SEC-DEP-13)**. Há **dois lockfiles** (`package-lock.json` e `yarn.lock`) com resoluções possivelmente divergentes; o CI usa npm.
- **A verificar:** `npm audit --omit=dev` e `npx npm-check-updates --target minor`.
- **Correção:** escolher um gerenciador (npm, pelo CI) e remover `yarn.lock`; remover dependências sem uso (CQ-03), o que reduz a superfície de supply chain.

> ✅ Pontos positivos: `.env*` está no `.gitignore` (`.gitignore:33`) e `.env.local` não é versionado; segredos SMTP só são lidos no servidor; o DSN do Sentry e o token de verificação do Google são públicos por natureza; `deepMerge` protege contra prototype pollution (`src/i18n/request.ts:9`).

---

### 3.5 Qualidade de código e arquitetura

#### CQ-01 — `strict: false` no TypeScript
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** `tsconfig.json:7` (comentário "temporariamente").
- **Correção:** ativar `strict: true` e corrigir os erros (o código já é razoavelmente tipado e não há `any` explícito em `src/`). Alternativa incremental: `strictNullChecks` primeiro. **A verificar:** `npx tsc --noEmit --strict | tail -5` para medir o volume.

#### CQ-02 — Páginas client contrariam o padrão do próprio projeto
- **Severidade:** Alto · **Esforço:** G
- Ver PERF-03. Registrado aqui por ser desvio arquitetural da regra documentada em `.cursor/rules/01-stack-and-standards.mdc`.

#### CQ-03 — Código morto e dependências sem uso
- **Severidade:** Médio · **Esforço:** P
- **Evidência (grep sem ocorrências em `src/`):** `axios`, `recharts`, `react-slick`, `slick-carousel`, `@types/react-slick`, `react-toastify`, `react-hot-toast`, `sonner`, `react-responsive-carousel`, `react-simple-typewriter`, `react-parallax-tilt`, `embla-carousel-react`, `cmdk`, `input-otp`, `react-day-picker`, `react-hook-form`, `framer-motion` (o código usa `motion`), `next-themes`, `react-resizable-panels` e ~25 pacotes `@radix-ui/*` (só `@radix-ui/react-slot` é importado, em `src/components/ui/button.tsx`; `vaul` está em uso). Também: `src/components/ui/card.tsx` sem imports; export `projectsData` (`src/data/projectsData.ts:53`) sem uso; rotas `api/analytics`, `api/allprojects`, `api/contact`; assets não referenciados em `public/` (`site2.png` 10 MB, `fullprint.png`, `bg.jpg`, `image.png`, `site1/3.png`, `mobile1-3`, `avatar_.jpeg`, etc.).
- **Correção:** `npm uninstall` dos pacotes listados (validar com `npx depcheck` antes) e remover arquivos/rotas. Manter os Radix que forem usados em A11Y-01/A11Y-04.

#### CQ-04 — Duplicação de URLs, contatos e markup
- **Severidade:** Médio · **Esforço:** M
- **Evidência:**
  - Montagem de URL absoluta reimplementada em `SEO.tsx:38-47`, `Breadcrumbs.tsx:16-26`, `StructuredData.tsx:46-50` e `projects/[id]/page.tsx:15-19,46,111,141-145`, apesar de `src/lib/siteUrls.ts` (`absoluteUrl`, `languageAlternates`). `"https://leorodrigues.dev"` aparece literal em mais de 10 arquivos.
  - Contatos (e-mail, WhatsApp `555194389658`, GitHub, LinkedIn) repetidos em `Contact.tsx`, `Footer.tsx`, `CommercialHome.tsx:95`, `StructuredData.tsx`, `about/page.tsx:64` e `useAnalytics.ts:29`.
  - Card de projeto duplicado entre `projects/page.tsx:258-370` e `sections/Projects.tsx:50-110`; blocos 1º/2º/resto repetidos em `Experience.tsx` e `Education.tsx`.
- **Correção:** `src/lib/siteConfig.ts` com `SITE_URL`, `CONTACT = { email, whatsapp, github, linkedin }` e usar `absoluteUrl` em todos os pontos; extrair `ProjectCard` em `src/components/`.

#### CQ-05 — Estado de intenção do visitante não é compartilhado
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `useVisitorIntent` (`src/hooks/useVisitorIntent.ts:9-36`) cria estado local por instância e é usado separadamente em `[locale]/page.tsx:14`, `Navbar.tsx:16` e `Footer.tsx:10`.
- **Bug:** ao escolher "Portfólio" no modal, a Navbar continua mostrando "Serviços" até recarregar; o Footer contorna com `window.location.reload()` (`Footer.tsx:21`).
- **Correção:** um `VisitorIntentProvider` (Context) no layout, ou `useSyncExternalStore` sobre `sessionStorage`; remover o `reload()`.

#### CQ-06 — Leitura de DOM durante o render na Navbar
- **Severidade:** Alto (bloqueia PERF-01) · **Esforço:** P
- **Evidência:** `Navbar.tsx:61-74` (`isActive` chama `document.querySelector`/`getBoundingClientRect` no render, também em `:118,125,170`).
- **Problema:** quebra o SSR (`document is not defined`) assim que o splash sair, causa mismatch de hidratação e o "ativo" não atualiza no scroll.
- **Correção:** `IntersectionObserver` em `useEffect` com estado `activeSection`.

#### CQ-07 — Dois sistemas de tokens e cores hardcoded
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** cada tema define `--primary-color` **e** `--primary`, `--bg-color` **e** `--background`, etc. (`globals.css:6-35`, ×8). Componentes misturam `text-[var(--primary-color)]` (`Experience.tsx`, `Education.tsx`, `Skills.tsx:161`) com `text-primary`. Há cores fora do sistema: `text-white`, `text-gray-500`, `bg-green-500`/`bg-blue-500` (`ProjectDetailClient.tsx:154,164`), `text-black dark:text-white` (`Skills.tsx:19,31`, sendo que `dark:` não funciona com os temas `.theme-*`) e `theme-figmaNeon` fixo no `<html>` (`layout.tsx:111`).
- **Correção:** padronizar nos tokens shadcn (`--primary`, `--background`...) que o Tailwind já expõe (`tailwind.config.ts:17-50`), remover os aliases `--*-color` e trocar classes hardcoded por tokens.

#### CQ-08 — Efeitos reexecutados a cada render
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `StructuredData` tem `data` nas deps (`StructuredData.tsx:187`) e recebe objetos literais novos (`[locale]/page.tsx:26-29`, `Breadcrumbs.tsx:59-74`, `services/page.tsx:82-94`), então remove e recria o `<script>` a cada render.
- **Correção:** resolvido ao mover JSON-LD para o servidor (SEO-04). Paliativo: `useMemo` no chamador.

#### CQ-09 — Versões desalinhadas
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** `react`/`react-dom ^18.2.0` e `@types/react ^18` com `next 15.5.15` (o App Router do Next 15 requer React 19); `eslint-config-next 15.0.3` com `next 15.5.15`; `eslint ^8` (EOL).
- **Correção:** atualizar para `react@19`, `react-dom@19`, `@types/react@19` e `eslint-config-next@15.5.x`; avaliar ESLint 9 flat config junto com DX-01. **A verificar:** `npm ls react react-dom` e warnings de peer deps no `npm ci`.

#### CQ-10 — Projeto não encontrado lança exceção em vez de degradar
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `buildProjects` lança `Error("Missing project copy...")` se faltar uma tradução (`projectsData.ts:40-47`), o que derruba a página inteira (inclusive a listagem) por causa de uma chave ausente.
- **Correção:** fallback para a cópia PT + log/Sentry, ou validação no script `messages:merge` (falhar o CI, não a produção). Ver DX-06.

---

### 3.6 UX e conversão

#### UX-01 — CTAs de orçamento na página de serviços não levam a lugar nenhum
- **Severidade:** Crítico · **Esforço:** P
- **Evidência:** `services/page.tsx:161-167` (3× "Solicitar orçamento") e `:238-244` (CTA final) usam `href="#contact"`, mas a página não renderiza `<Contact/>`. O único `id="contact"` está em `src/components/sections/Contact.tsx:12`, usado só na home.
- **Impacto:** a página de maior intenção de compra tem os 4 CTAs principais sem efeito.
- **Correção (mínima):** renderizar `<Contact />` antes do `<Footer />` em `services/page.tsx`. Alternativa: `Link href="/#contact"`. Recomendo a primeira, que mantém o usuário na página.

#### UX-02 — Splash de 3 s antes de qualquer conteúdo
- **Severidade:** Crítico · **Esforço:** M · ver **PERF-01**.

#### UX-03 — Modal de intenção interrompe a primeira visita
- **Severidade:** Alto · **Esforço:** P–M
- **Evidência:** `VisitorIntentModal.tsx:138-145` abre após 1 s em toda nova sessão (`sessionStorage`). No mobile ocupa até 90vh (`:204`). Fechar equivale a escolher "comercial" (`:152-157`), que já é o padrão (`[locale]/page.tsx:17`).
- **Impacto:** um passo extra antes da proposta de valor, para o lead que chega por anúncio/Google. Interstitials intrusivos no mobile também são sinal negativo para o Google.
- **Correção recomendada:** remover o modal automático e manter a home comercial como padrão, com um link/toggle discreto "Sou recrutador → ver portfólio" no hero e na navbar (o Footer já tem o toggle em `Footer.tsx:135-146`). **Opcional — requer decisão** (é uma escolha de produto). Se mantiver, medir a escolha (AN-03) antes de decidir.

#### UX-04 — Não há formulário de contato/qualificação de lead
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** conversão só por `mailto:` e `wa.me` (`Contact.tsx:36-53`). O README declara "Formulário de contato com envio via email" (`README.md`, seção Features), e a infraestrutura existe (`/api/contact`, `nodemailer` e `react-hook-form` nas deps), mas não há UI.
- **Impacto:** `mailto:` falha silenciosamente em desktops sem cliente de e-mail; não há como qualificar o lead (tipo de projeto, prazo, orçamento) nem medir conversão.
- **Correção:** **Opcional — requer decisão.** Formulário curto (nome, e-mail/WhatsApp, tipo de projeto, mensagem) com `react-hook-form` (já instalado), estados de loading/sucesso/erro com textos em `messages/` e rota protegida conforme SEC-02.

#### UX-05 — Números e prova social sem comprovação verificável
- **Severidade:** Médio · **Esforço:** P
- **Evidência:**
  - `Stats.tsx:159-167`: "7+ anos", "97+ projetos" e "99% satisfação" fixos no código; o portfólio lista 33 projetos (`projectsBase.json`).
  - "Linhas de código" vem de `/repos/{repo}/languages` (`api/github-stats/route.ts:60-86`), que retorna **bytes**, não linhas. Com fallback fixo de "50K" em caso de erro (`:126-128`).
  - `Testimonials.tsx` mostra 3 depoimentos sem foto, link ou empresa verificável e com nota 5 fixa (`:26`).
  - O contador começa em `0` no HTML (`Stats.tsx:16`), então crawlers e quem tem JS lento veem "0+".
- **Impacto:** clientes B2B costumam checar números; um dado inconsistente reduz a confiança em todo o resto.
- **Correção:** **A verificar** a origem de "97+" e "99%"; usar números rastreáveis (ex.: `projectsBase.length`), renomear a métrica para "KB de código" ou removê-la, adicionar link do LinkedIn/empresa aos depoimentos e renderizar o valor final no SSR (animar só no cliente).

#### UX-06 — Sem página 404 própria
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** não existe `not-found.tsx` em `src/app/` nem em `src/app/[locale]/`. `notFound()` é usado em `layout.tsx:104` e `projects/[id]/page.tsx:35,42`.
- **Correção:** `src/app/[locale]/not-found.tsx` traduzido, com CTA para Projetos e Contato.

#### UX-07 — Seletor com 8 temas, parte deles inacessível
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `ThemeProvider.tsx:13-22,71-80`; 4 temas reprovam AA (A11Y-02).
- **Correção:** **Opcional — requer decisão.** Reduzir para 2–3 temas que passam AA, o que também simplifica a manutenção (CQ-07).

#### UX-08 — Microcopy e detalhes
- **Severidade:** Baixo · **Esforço:** P
- O botão de WhatsApp do hero é só ícone (`CommercialHome.tsx:94-102`). Como é provavelmente o canal de maior conversão no Brasil, vale um botão com texto ("Falar no WhatsApp").
- O link de WhatsApp não tem mensagem pré-preenchida: usar `https://wa.me/555194389658?text=${encodeURIComponent(t("whatsappPrefill"))}`.
- `ProjectDetailClient.tsx:154,164`: botões das lojas com `bg-green-500`/`bg-blue-500` fora da identidade; usar os tokens.

---

### 3.7 Analytics e métricas

#### AN-01 — Nenhum evento de conversão nos CTAs principais
- **Severidade:** Alto · **Esforço:** P
- **Evidência:** sem `onClick` de tracking nos CTAs `#contact` (`CommercialHome.tsx:73-79,260,387-393`, `services/page.tsx:161,238`), no WhatsApp do hero (`CommercialHome.tsx:94-102`) e nos links do Footer. Os eventos existentes (`useAnalytics.ts`) usam o formato legado `event_category/event_label` e nenhum é marcado como conversão (grep `generate_lead` vazio). A Vercel Analytics não recebe eventos customizados (`track()` não é usado).
- **Impacto:** não há como saber taxa de conversão, nem qual página/CTA gera leads.
- **Correção:** padronizar eventos GA4 recomendados e espelhar na Vercel:
  ```ts
  // src/lib/analytics.ts
  import { track } from "@vercel/analytics";
  export function trackLead(channel: "whatsapp" | "email" | "form", location: string) {
    window.gtag?.("event", "generate_lead", { channel, location });
    track("lead", { channel, location });
  }
  export function trackCtaClick(cta: string, location: string) {
    window.gtag?.("event", "select_content", { content_type: "cta", item_id: cta, location });
  }
  ```
  Marcar `generate_lead` como *key event* no GA4. Instrumentar todos os `mailto:`/`wa.me`/CTAs de orçamento com `location` (hero, services-card, contact-section, footer).

#### AN-02 — Pageview possivelmente duplicado ou perdido; `useSearchParams` sem `Suspense`
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `GoogleAnalytics.tsx:16-21` chama `gtag('config')` no mount além do `config` do script inline (`:41-43`). Dependendo da ordem de carregamento, o primeiro pageview é contado 2× ou o do `useEffect` se perde (`window.gtag` ainda indefinido). `useSearchParams` sem `<Suspense>` (`:14`), mascarado hoje pelo splash (PERF-01).
- **A verificar:** GA4 → DebugView (ou extensão Tag Assistant) navegando home → about → projects.
- **Correção:** usar `@next/third-parties/google` (`<GoogleAnalytics gaId=... />`), que já trata page_view em navegação SPA (pacote oficial do Next; **Opcional — requer decisão** por adicionar dependência), ou `send_page_view: false` no inline + envio manual `gtag('event','page_view')` no efeito, envolvido em `<Suspense>`.

#### AN-03 — Escolha do modal de intenção não é medida
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `VisitorIntentModal.tsx:147-157` só grava em `sessionStorage`.
- **Correção:** `trackEvent("select_intent", { intent, method: "modal" | "close" | "footer" })` e registrar `intent` como user property/custom dimension, para segmentar a conversão por persona e decidir UX-03 com dados.

#### AN-04 — Configuração não verificável pelo código
- **Severidade:** Baixo · **Esforço:** P
- **A verificar:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` definido em Production na Vercel (`vercel env ls`); sem ele, o GA não carrega (`GoogleAnalytics.tsx:23-25`). Search Console com sitemap enviado (há verificação por meta em `layout.tsx:89`).

#### AN-05 — Funil não definido
- **Severidade:** Baixo · **Esforço:** P
- **Correção:** definir no GA4 o funil `page_view (home|services)` → `select_content (cta)` → `generate_lead`, com breakdown por `intent`, `locale` e `utm_source`. Usar UTMs nos links do LinkedIn/GitHub/propostas.

---

### 3.8 DX e manutenção

#### DX-01 — `next lint` descontinuado e ESLint 8 em EOL
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** `package.json:10` (`"lint": "next lint"`), `eslint ^8`, `.eslintrc.json`.
- **Correção:** `"lint": "eslint ."` com ESLint 9 + `eslint.config.mjs` (flat config com `eslint-config-next`). O codemod oficial `npx @next/codemod@latest next-lint-to-eslint-cli .` faz a migração.

#### DX-02 — CI em Node 20 (fora de suporte)
- **Severidade:** Alto · **Esforço:** P
- **Evidência:** `.github/workflows/ci.yml:20` (`node-version: "20"`). O Node 20 saiu de LTS em abr/2026 e foi descontinuado como runtime na Vercel em 01/10/2026; `@types/node ^20` (`package.json:75`).
- **Correção:** `node-version: "24"`, `"engines": { "node": ">=22" }` no `package.json`, `@types/node@^24`. Conferir o Node configurado no projeto Vercel.

#### DX-03 — Sem testes nem typecheck explícito no CI
- **Severidade:** Médio · **Esforço:** M
- **Evidência:** `package.json:5-12` sem `test`/`typecheck`; o CI só roda lint e build.
- **Correção:** scripts `"typecheck": "tsc --noEmit"` e `"test": "vitest run"`. Começar por testes unitários de `src/lib/siteUrls.ts`, `src/lib/apiLocale.ts`, `src/data/projectsData.ts` (`buildProjects`) e do script de merge. Adicionar ao CI. **Opcional — requer decisão** quanto à ferramenta (Vitest recomendado por ser leve e não exigir Babel).

#### DX-04 — Mensagens geradas versionadas sem checagem de drift
- **Severidade:** Médio · **Esforço:** P
- **Evidência:** `messages/{pt,en,es}.json` são gerados por `scripts/merge-locale-messages.mjs` a partir de `messages/parts/**` e `messages/partials/**`, e ambos são versionados. O CI regenera (`ci.yml:26-27`), mas não falha se o commit estiver desatualizado, então produção pode divergir do código revisado.
- **Correção:** após `messages:merge`, adicionar `git diff --exit-code messages/` no CI e validar chaves faltantes entre locales no próprio script (CQ-10).

#### DX-05 — Dois lockfiles
- **Severidade:** Médio · **Esforço:** P · ver SEC-07. Remover `yarn.lock` e adicionar `"packageManager": "npm@<versão>"`.

#### DX-06 — Documentação dispersa e desatualizada
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** 7 arquivos `.md` operacionais na raiz (`ANALYTICS_SETUP.md`, `GOOGLE_SEARCH_CONSOLE_SETUP.md`, `PRODUCTION_CHECKLIST.md`, `SEO_AUDIT_AND_STRATEGY.md`, `SEO_OPTIMIZATIONS_SUMMARY.md`, `SEO_PRODUCTION_CHECKLIST.md`, `SEO_VERIFICATION_REPORT.md`). O README diz "Portfólio em desenvolvimento", cita formulário inexistente e não documenta as variáveis de ambiente necessárias (`EMAIL_*`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG/PROJECT`).
- **Correção:** mover para `docs/`, consolidar os 4 de SEO em um, criar `.env.example` e atualizar o README.

#### DX-07 — `next-env.d.ts` versionado apesar de ignorado
- **Severidade:** Baixo · **Esforço:** P
- **Evidência:** `.gitignore:40` ignora `next-env.d.ts`, mas o arquivo está no `git ls-files`.
- **Correção:** `git rm --cached next-env.d.ts` (operação para você executar).

---

### 3.9 Segurança de dependências (Dependabot)

> **Fonte:** saída do `gh api .../dependabot/alerts` executado por você nesta sessão (alertas com `state == "open"`, coletados em 2026-11-16). O arquivo `dependabot-alerts.json` **não existe** na raiz, então a análise usou essa saída, `package.json`, `package-lock.json` e `node_modules/next/package.json`. As cadeias de dependência foram resolvidas a partir do `package-lock.json`. Nenhum `install`, `audit`, `update` ou build foi executado.

**Panorama**

| Métrica | Valor |
|---|---|
| Alertas abertos | **267** (`package-lock.json` 120 · `yarn.lock` 109 · `package.json` 38) |
| Advisories únicos (pacote × GHSA) | **119**: 4 críticos · 54 altos · 53 médios · 8 baixos |
| Pacotes afetados | 25 (6 diretos de runtime, 1 direto de dev, 18 transitivos) |
| Grupos de correção | 12 (SEC-DEP-01 a SEC-DEP-12) |

Os mesmos advisories se repetem por manifesto. Como o CI usa npm, os 109 alertas de `yarn.lock` fecham ao remover esse arquivo (SEC-DEP-13); os demais seguem os grupos abaixo.

**Critério de "Risco real":** considera se o código vulnerável roda em produção (servidor/bundle) ou só no build/lint, se o vetor do advisory se aplica ao uso do projeto e se há entrada controlada por terceiros. Quando diverge da severidade do GitHub, a justificativa está na coluna ou no detalhe do item.

#### Tabela-resumo

| ID | Alertas # | Pacote(s) | Severidade GitHub | Direta/Transitiva | Runtime/Dev | Risco real | Correção | Esforço |
|---|---|---|---|---|---|---|---|---|
| SEC-DEP-01 | 192–206, 211–233, 240–242, 296–298, 311–331, 385–390, 439–441, 448–450 (75) | `next` 15.5.15 | 3 crít · 11 alto · 9 méd · 2 baixo | Direta | Runtime | **Crítico** | `next@15.5.28` (**patch**) | P |
| SEC-DEP-02 | 425–426 (2) | `@sentry/nextjs` 10.27.0 | 1 crít | Direta | Runtime | **Baixo**: só explorável com `tunnelRoute`, que não está configurado (`next.config.js:46-50`) | `@sentry/nextjs@10.75.2` (**minor**) | P |
| SEC-DEP-03 | 234–235, 259–260, 276–277, 413–416, 451–452 (12) | `@opentelemetry/core`, `instrumentation-http/knex/tedious`, `uuid`, `@babel/core` | 5 méd · 1 baixo | Transitiva (`@sentry/nextjs`) | Runtime (OTel) / build (`uuid`, `@babel/core`) | **Médio** (OTel no servidor); **Irrelevante** para knex/tedious (não usamos esses bancos) | Resolver via SEC-DEP-02; overrides só se sobrar | P |
| SEC-DEP-04 | 166–167, 174–189, 209–210, 226–227, 236–239, 243–252, 255–258, 270–273, 280–285, 288–289, 292–295, 299–302, 401–412 (72) | `axios` 1.15.0 + `form-data`, `follow-redirects` | 15 alto · 20 méd · 1 baixo | Direta (+2 transitivas) | Declarada como runtime, **não importada** | **Irrelevante**: `axios` não aparece em `src/`, então não entra no bundle nem no servidor | **Remover** `axios` | P |
| SEC-DEP-05 | 261–269, 368–380, 391–400, 427–429, 433–438, 442–447 (45) | `nodemailer` 8.0.5 | 4 alto · 12 méd | Direta | Runtime | **Médio**: usado só em `/api/contact` (`src/app/api/contact/route.ts:2,12-25`), sem consumidor mas exposta publicamente | **Remover** com a rota (SEC-02) ou `nodemailer@10.1.4` (**major**) | P / M |
| SEC-DEP-06 | 170–173 (4) | `next-intl` 4.9.1, `icu-minify` | 1 méd · 1 baixo | Direta (+1 transitiva) | Runtime | **Irrelevante**: o vetor exige `experimental.messages.precompile`, que não é usado (`next.config.js:5`) | `next-intl@4.9.2` (**patch**) | P |
| SEC-DEP-07 | 290–291, 381–382 (4) | `sharp` 0.34.5 | 2 alto | Transitiva (`next` → `sharp ^0.34.3`) | Runtime (otimizador de imagem) | **Médio**: só processa imagens de `public/` e `images.unsplash.com` (`next.config.js:9-14`); **A verificar** se a Vercel usa o otimizador próprio | `override sharp@^0.35.4` (**minor** em 0.x, pode quebrar) | M |
| SEC-DEP-08 | 207–208, 305–306, 309–310, 337–338, 341–342, 349–350, 361–362, 417–418 (16) | `postcss` 8.5.6 (dev) e 8.4.31 (`next`), `nanoid`, `source-map-js` | 6 alto · 2 méd | Direta dev + transitivas | Build | **Baixo**: só processa CSS próprio no build; não há CSS de terceiros | `postcss@8.5.23` (**patch**) + override escopado em `next` | P |
| SEC-DEP-09 | 307–308, 334–335, 351–354, 419–420 (10) | `brace-expansion` 1.1.14 / 2.1.0 | 3 alto · 1 méd | Transitiva (`minimatch` via `@sentry/node`, ESLint, Tailwind) | Runtime (Sentry) + dev | **Baixo**: padrões glob vêm de configuração, não de input de usuário | `npm update` (2.1.4 / 1.1.21 estão no range) | P |
| SEC-DEP-10 | 286–287, 336, 347–348, 359–360, 394, 430–432 (11) | `fast-uri` 3.1.0 | 8 alto · 1 méd · 2 baixo | Transitiva (`ajv@8` ← `schema-utils` ← `webpack`/`terser-webpack-plugin`) | Build | **Irrelevante**: valida schemas de configuração do webpack no build, sem URI externa | `npm update` (3.1.9 no range `^3`) | P |
| SEC-DEP-11 | 278–279, 303–304, 345–346, 383–384 (8) | `js-yaml` 4.1.1 | 3 alto · 1 méd | Transitiva (`eslint@8`) | Dev | **Irrelevante**: lê apenas arquivos de config locais | `npm update` (4.3.2 no range `^4`) ou ESLint 9 (DX-01) | P |
| SEC-DEP-12 | 355–356, 363–367, 371 (8) | `browserslist` 4.28.2, `baseline-browser-mapping`, `postcss-selector-parser` | 2 alto · 1 méd · 1 baixo | Transitiva (`autoprefixer`, `tailwindcss`) | Build | **Irrelevante**: entrada é a config local `browserslist`/CSS próprio | `npm update` (no range) | P |
| SEC-DEP-13 | 109 alertas com `manifest_path: yarn.lock` | (duplicatas) | — | — | — | **Irrelevante**: lockfile não usado pelo CI/deploy | Remover `yarn.lock` | P |

Total: 75 + 2 + 12 + 72 + 45 + 4 + 4 + 16 + 10 + 11 + 8 + 8 = **267** alertas (os 109 de `yarn.lock` já estão contados nos grupos e caem junto com SEC-DEP-13).

#### Detalhamento

##### SEC-DEP-01 — `next` 15.5.15 → 15.5.28
- **Cadeia:** direta (`package.json:52`, versão fixa `"15.5.15"`). Uso em todo o app; `next/image` em `about/page.tsx:38`, `projects/page.tsx:268`, `sections/Projects.tsx:56`, `SafeImage.tsx:39,51`, `ImagesGallery.tsx:98`, `LanguageSwitcher.tsx:46`, `ThemeProvider.tsx:205`; middleware em `src/middleware.ts:4`.
- **Correção mínima:** `15.5.28`, patch na mesma linha 15.5.x (sem breaking changes esperados). Alinhar `eslint-config-next` à mesma versão.
- **Aplicabilidade por advisory** (por que o risco real é Crítico, mesmo com vários vetores fora do nosso uso):

  | Advisory | Alertas # | Se aplica? | Justificativa |
  |---|---|---|---|
  | GHSA-2464-fhr4-w9xw (RCE, Image Optimization + SVG) | 448–450 | **Sim, A verificar** | `/_next/image` exposto. Não há `dangerouslyAllowSVG` e SVGs são servidos com `unoptimized` (`SafeImage.tsx:45,58`, `projects/page.tsx:285`), mas o endpoint aceita `url` arbitrário dentro dos `remotePatterns`. Se a Vercel atende `/_next/image` com a infra dela, a exposição é menor |
  | GHSA-2xp9-vwfh-vxw4 (RCE, Image Optimization + AVIF) | 388–390 | **Sim** | `formats: ["image/avif", "image/webp"]` em `next.config.js:15` |
  | GHSA-p293-qw3h-jr36 (RCE em servidor Windows) | 385–387 | Não | Deploy na Vercel (Linux) |
  | GHSA-267c-6grr-h53f, GHSA-26hh-7cqf-hhc6, GHSA-492v-c6pp-mqqv (bypass de middleware no App Router) | 192–200 | Sim, impacto baixo | O middleware só faz roteamento de locale (`src/middleware.ts`), sem autenticação |
  | GHSA-36qx-fr4f-26g5 (bypass com i18n no Pages Router) | 220–222 | Não | Projeto só usa App Router |
  | GHSA-8h8q-6873-q5fj (DoS em Server Components), GHSA-wfc6-r584-vfw7 e GHSA-vfv6-92ff-j949 (cache poisoning RSC), GHSA-68g3-v927-f742 e GHSA-4633-3j49-mh5q (cache confusion) | 214–216, 204–206, 231–233, 314–319 | **Sim** | App Router com RSC |
  | GHSA-h64f-5h5j-jqjh e GHSA-q8wf-6r8g-63ch (DoS na Image Optimization) | 228–230, 296–298 | **Sim** | Mesmo endpoint `/_next/image` |
  | GHSA-3g8h-86w9-wvmq (cache poisoning de redirects do middleware) | 223–225 | Sim | O middleware do next-intl gera redirects de locale |
  | Server Actions (GHSA-p3m5-59mp-jv5r, GHSA-m99w-x7hq-7vfj, GHSA-89xv-2m56-2m9x, GHSA-4c39-4ccg-62r3, GHSA-955p-x3mx-jcvp) | 311–313, 320–328, 439–441 | Não / baixo | Nenhum `"use server"` em `src/` |
  | GHSA-p9j2-gv94-2wf4 (SSRF em rewrites) | 329–331 | Não | Sem `rewrites` em `next.config.js` |
  | GHSA-c4j6-fc7j-m34r (SSRF com WebSocket) | 211–213 | Não | Sem WebSocket |
  | GHSA-mg66-mrh9-m8jx (DoS com Cache Components) | 201–203 | Não | `cacheComponents` não habilitado |
  | GHSA-ffhc-5mcf-pf4q (XSS com CSP nonce) | 240–242 | Não | Sem CSP com nonce (ver SEC-03) |
  | GHSA-gx5p-jg67-6x7h (XSS em `beforeInteractive`) | 217–219 | Não | GA usa `afterInteractive` (`GoogleAnalytics.tsx:30,35`) |

- **Mitigação temporária**, se o deploy precisar esperar: remover `"image/avif"` de `formats` em `next.config.js:15`.

##### SEC-DEP-02 / SEC-DEP-03 — `@sentry/nextjs` 10.27.0 → 10.75.2 (+ OpenTelemetry)
- **Cadeias:**
  - `@sentry/nextjs > @sentry/node > @opentelemetry/core@2.6.1`, `> @opentelemetry/instrumentation-http@0.208.0 > @opentelemetry/core@2.2.0`, `> @opentelemetry/instrumentation-knex@0.53.0`, `> @opentelemetry/instrumentation-tedious@0.27.0`
  - `@sentry/nextjs > @sentry/webpack-plugin@4.6.0 > uuid@9.0.1`
  - `@sentry/nextjs > @sentry/bundler-plugin-core@4.9.1 > @babel/core@7.28.5`
- **Uso:** `src/instrumentation.ts:1-21`, `src/instrumentation-client.ts:2-23`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/app/global-error.tsx:3,27`, `next.config.js:2,52`.
- **Correção mínima:** `@sentry/nextjs@10.75.2` (minor dentro da v10). As versões que a 10.75.2 puxa para OTel/`uuid`/`@babel/core` **não estão no lockfile atual**, então se elas atingem `@opentelemetry/core >= 2.8.0`, `instrumentation-http >= 0.222.0`, `instrumentation-knex >= 0.65.0`, `instrumentation-tedious >= 0.40.0`, `uuid >= 11.1.1` e `@babel/core >= 7.29.6` fica **A verificar** com `npm ls` após o upgrade.
- **Risco real:**
  - SEC-DEP-02 (crítico no GitHub): **Baixo**, porque o vetor ("Middleware Bypass when using Tunnel route") exige `tunnelRoute`, que não está configurado.
  - `@opentelemetry/core` (DoS via W3C Baggage): **Médio**, porque roda em toda requisição instrumentada no servidor e o header `baggage` é controlado pelo cliente.
  - `instrumentation-http` (dados sensíveis em log): Médio/Baixo, porque depende do que é enviado ao Sentry.
  - `knex`/`tedious`: **Irrelevante**, porque o projeto não usa esses bancos.
  - `uuid` e `@babel/core`: **Irrelevante**, porque rodam só no build (plugin de bundler) e não recebem entrada externa.
- **Fallback, se o upgrade não puxar as versões corrigidas:** overrides (npm, padrão já usado em `package.json:66-68`) para `@opentelemetry/core` e `uuid`. Não forçar o override de `@opentelemetry/instrumentation-*` sem conferir compatibilidade com `@sentry/node`.

##### SEC-DEP-04 — `axios` 1.15.0 (+ `form-data`, `follow-redirects`)
- **Cadeia:** direta (`package.json:46`); `axios > form-data@4.0.5`, `axios > follow-redirects@1.15.11`.
- **Uso:** nenhum. `grep -rn axios src` vazio; os fetches do projeto usam `fetch` nativo (`api/github-stats/route.ts:8,25,64`, `Stats.tsx:83,107`, `search-console/page.tsx:34`).
- **Risco real:** **Irrelevante**, divergindo dos 15 "altos" do GitHub. Código não importado não chega ao bundle (tree-shaking) nem ao servidor. Ainda assim é a dependência com mais alertas e aumenta a superfície de supply chain.
- **Correção:** remover. Não atualizar.

##### SEC-DEP-05 — `nodemailer` 8.0.5
- **Cadeia:** direta (`package.json:54`); `@types/nodemailer` em `package.json:76`.
- **Uso:** só em `src/app/api/contact/route.ts:2` (`createTransport` em `:12-18`, `sendMail` em `:20-25`). Nenhum componente chama `/api/contact`, mas a rota é pública e aceita `name`/`email`/`message` sem validação (SEC-02).
- **Vetores aplicáveis:** DoS quadrático no `addressparser` (GHSA-2x7j-588g-ccc2, GHSA-v53p-9fqp-m79j) e parsing incorreto de endereços (GHSA-g73g-hqqh-jr95, GHSA-8c8m-p3m8-cjg8, GHSA-m943-m63m-w62w, GHSA-cc9r-2j5m-2m83, GHSA-wmmp-3585-3rmp). O destinatário é fixo (`EMAIL_DESTINATION`), mas o texto do usuário entra em `subject` e `text`.
- **Não aplicáveis:** `raw`/`jsonTransport`/`resolveContent` (GHSA-p6gq-j5cr-w38f, GHSA-wqvq-jvpq-h66f, GHSA-8m3c-c648-2xjj), OAuth2 (GHSA-r7g4-qg5f-qqm2, a rota usa usuário/senha), headers `List-*` (GHSA-268h-hp4c-crq3), DKIM (GHSA-39m8-27wv-hr27) e cache DNS multi-tenant (GHSA-6vj9-mwq6-2f5v, há um único transport).
- **Risco real:** **Médio**. A rota pública não é usada pelo site, mas aceita entrada externa.
- **Correção (preferência):**
  1. Remover a rota e a dependência (alinha com SEC-02/SEC-05).
  2. Se UX-04 (formulário) for aprovado: `nodemailer@10.1.4`, que é **major** (8 → 10). Breaking changes que afetam nosso código: **A verificar** no changelog da v9 e da v10; o uso atual se limita a `createTransport({ service: "gmail", auth })` e `sendMail({ from, to, subject, text })`. Validar também `@types/nodemailer` compatível.

##### SEC-DEP-06 — `next-intl` 4.9.1 / `icu-minify`
- **Cadeia:** direta (`package.json:53`); `next-intl > icu-minify@4.9.1`.
- **Risco real:** **Irrelevante**, porque GHSA-4c35-wcg5-mm9h exige `experimental.messages.precompile` com mensagens controladas pelo atacante. O plugin só recebe o caminho do `request.ts` (`next.config.js:5`) e as mensagens são arquivos versionados (`messages/*.json`).
- **Correção:** `next-intl@4.9.2` (patch). É barato, então vale aplicar mesmo assim.

##### SEC-DEP-07 — `sharp` 0.34.5
- **Cadeia:** `next@15.5.15 > sharp@0.34.5`. O `next` declara `"sharp": "^0.34.3"` (`node_modules/next/package.json:134`).
- **Correção mínima:** `0.35.4`, **fora do range** aceito pelo `next`, então um bump de `next` não resolve. **A verificar** se o `next@15.5.28` já amplia o range.
- **Estratégia:** override `"sharp": "^0.35.4"`. Em 0.x, minor pode ter breaking change; validar `npm run build` e a otimização de imagens (`/_next/image?url=/avatar.png&w=256&q=75`).
- **Risco real:** **Médio**. Os CVEs do libvips/libheif exigem processar uma imagem maliciosa, e as origens permitidas são `public/` (controlado por nós) e `images.unsplash.com`. Na Vercel, se a otimização é feita pela plataforma, o `sharp` do projeto nem roda em produção (**A verificar** no painel: Project → Settings → Images).

##### SEC-DEP-08 — `postcss` (+ `nanoid`, `source-map-js`)
- **Cadeias:** `postcss@8.5.6` (devDependency, `package.json:80`) `> nanoid@3.3.11`, `> source-map-js@1.2.1`; `next@15.5.15 > postcss@8.4.31` (versão **fixa** em `node_modules/next/package.json:108`).
- **Risco real:** **Baixo**, divergindo dos 6 "altos". Os vetores (`sourceMappingURL` malicioso, `</style>` no stringify) dependem de processar CSS de terceiros, e o projeto só compila `src/styles/globals.css` e Tailwind no build.
- **Correção:**
  1. `postcss@8.5.23` (patch), o que também traz `nanoid >= 3.3.18` e `source-map-js >= 1.2.2` dentro do range.
  2. Para a cópia fixada pelo `next`, override escopado (só se o `next@15.5.28` continuar fixando 8.4.31; **A verificar**):
     ```json
     "overrides": {
       "@swc/helpers": "0.5.21",
       "next": { "postcss": "^8.5.23" }
     }
     ```

##### SEC-DEP-09 — `brace-expansion`
- **Cadeias:**
  - Runtime: `@sentry/nextjs > @sentry/node > minimatch@9.0.9 > brace-expansion@2.1.0`
  - Build: `@sentry/nextjs > @sentry/bundler-plugin-core > glob > minimatch > brace-expansion@2.1.0`
  - Dev: `eslint@8.57.1 > minimatch@3.1.5 > brace-expansion@1.1.14`, `@typescript-eslint/typescript-estree > minimatch@9 > brace-expansion@2.1.0` e `tailwindcss > sucrase > glob > minimatch > brace-expansion@2.1.0`
- **Risco real:** **Baixo**. DoS só com padrão glob controlado por atacante; no runtime do Sentry os padrões vêm da configuração do SDK.
- **Correção:** `npm update` deve resolver para `2.1.4` (linha 2.x) e `1.1.21` (linha 1.x), ambos no range `^`. Se o lock não mudar, usar overrides por linha: `"brace-expansion@1": "^1.1.21"` e `"brace-expansion@2": "^2.1.4"`.

##### SEC-DEP-10 — `fast-uri` 3.1.0
- **Cadeia:** `webpack`/`terser-webpack-plugin > schema-utils@4.3.3 > ajv@8.18.0 > fast-uri@3.1.0` (também `ajv-formats > ajv@8`).
- **Risco real:** **Irrelevante**, divergindo dos 8 "altos". Os advisories (host confusion, SSRF, path traversal na normalização de URI) exigem URIs de terceiros, e aqui o `ajv` valida schemas de opções de plugin do webpack, só no build.
- **Correção:** `npm update` (3.1.9 está no range `^3`). Fallback: `"fast-uri": "^3.1.9"` em overrides.

##### SEC-DEP-11 — `js-yaml` 4.1.1
- **Cadeia:** `eslint@8.57.1 > js-yaml@4.1.1` (e `@eslint/eslintrc`), marcada como `dev` no lockfile.
- **Risco real:** **Irrelevante**: DoS de CPU com YAML malicioso, mas o ESLint só lê configs locais (o projeto usa `.eslintrc.json`).
- **Correção:** `npm update` (4.3.2 no range `^4`). Resolve definitivamente com a migração para ESLint 9 (DX-01).

##### SEC-DEP-12 — `browserslist`, `baseline-browser-mapping`, `postcss-selector-parser`
- **Cadeias:** `autoprefixer@10.4.21 > browserslist@4.28.2 > baseline-browser-mapping@2.10.18`; `tailwindcss@3.4.17 > postcss-selector-parser@6.1.2`.
- **Risco real:** **Irrelevante**: as entradas são a configuração de navegadores e o CSS do próprio projeto, só no build.
- **Correção:** `npm update` (4.28.7, 2.11.0 e 6.1.3, todos no range).

##### SEC-DEP-13 — `yarn.lock` duplicado
- 109 dos 267 alertas têm `manifest_path: yarn.lock`. O CI instala com `npm ci` (`.github/workflows/ci.yml:21,24`), então o `yarn.lock` não representa o que vai para produção (**A verificar** o comando de install configurado na Vercel: Project → Settings → Build & Development).
- **Correção:** remover `yarn.lock` e adicionar `"packageManager": "npm@<versão>"` ao `package.json`.

#### Plano de correção em lotes

> Comandos para **você** rodar, em uma branch própria. Ao fim de cada lote: `npx tsc --noEmit && npm run lint && npm run build`.

**Lote 1 — Crítico de runtime (mesmo dia)** · fecha 81 alertas (SEC-DEP-01, 02, 06) e potencialmente os 12 de SEC-DEP-03
```bash
npm install --save-exact next@15.5.28
npm install --save-dev --save-exact eslint-config-next@15.5.28
npm install @sentry/nextjs@^10.75.2 next-intl@^4.9.2
npm ls next @sentry/nextjs next-intl sharp postcss @opentelemetry/core uuid
```
Smoke test: `/`, `/en`, `/projects/1`, troca de idioma, imagens do `/projects`, erro capturado no Sentry (preview).

**Lote 2 — Remoção de dependências sem uso** · fecha ~117 alertas (SEC-DEP-04, SEC-DEP-05 se aprovado SEC-02)
```bash
npm uninstall axios
# somente se a remoção de /api/contact (SEC-02) for aprovada; apagar src/app/api/contact/route.ts junto:
npm uninstall nodemailer @types/nodemailer
```
Se o formulário (UX-04) for mantido, no lugar do `uninstall`:
```bash
npm install nodemailer@^10.1.4 && npm install -D @types/nodemailer@latest
```

**Lote 3 — Transitivas de build/dev + lockfile único** · fecha os alertas restantes de SEC-DEP-08 a 13
```bash
rm yarn.lock
npm install -D postcss@^8.5.23
npm update
npm ls postcss sharp fast-uri brace-expansion js-yaml browserslist nanoid source-map-js
npm audit
```

**Lote 4 — Overrides só para o que restar no `npm audit`**, editando o bloco `overrides` existente em `package.json:66-68`:
```json
"overrides": {
  "@swc/helpers": "0.5.21",
  "next": { "postcss": "^8.5.23" },
  "sharp": "^0.35.4"
}
```
```bash
npm install && npm ls postcss sharp && npm run build
```

#### Alertas que podem ser fechados no GitHub

Feche com *Dismiss* só **depois** de decidir não corrigir, ou enquanto o lote correspondente não entra. Os textos abaixo estão prontos para colar.

| Alertas # | Motivo (GitHub) | Justificativa |
|---|---|---|
| 425–426 (`@sentry/nextjs`, GHSA-mchm-gjx6-7h55) | *Vulnerable code is not actually used* | "O vetor exige a opção `tunnelRoute` do Sentry, que não está configurada em `next.config.js`. Upgrade para 10.75.2 planejado no lote 1." |
| 170–173 (`next-intl`/`icu-minify`, GHSA-4c35-wcg5-mm9h, GHSA-r27j-894h-3w3p) | *Vulnerable code is not actually used* | "Não usamos `experimental.messages.precompile`; as mensagens são arquivos versionados no repositório, sem entrada de terceiros." |
| 413–416 (`instrumentation-knex`/`tedious`, GHSA-qqmp-wf37-98f9) | *Vulnerable code is not actually used* | "O site não usa Knex nem SQL Server (tedious); as instrumentações vêm do `@sentry/node` e nunca são ativadas." |
| 385–387 (`next`, GHSA-p293-qw3h-jr36) | *Vulnerable code is not actually used* | "RCE específico de servidores Windows; o deploy é na Vercel (Linux)." |
| 220–222 (`next`, GHSA-36qx-fr4f-26g5) | *Vulnerable code is not actually used* | "Afeta Pages Router com i18n; o projeto usa apenas App Router." |
| 286–287, 336, 347–348, 359–360, 394, 430–432 (`fast-uri`) | *Risk is tolerable to this project* | "Transitiva de `ajv`/`schema-utils` usada só no build do webpack para validar opções de plugins; não processa URIs de terceiros." |
| 278–279, 303–304, 345–346, 383–384 (`js-yaml`) | *Risk is tolerable to this project* | "Dependência dev do ESLint 8; só lê arquivos de configuração locais. Será removida na migração para ESLint 9." |
| 355–356, 363–367, 371 (`browserslist`, `baseline-browser-mapping`, `postcss-selector-parser`) | *Risk is tolerable to this project* | "Ferramentas de build (autoprefixer/Tailwind) que processam apenas configuração e CSS do próprio repositório." |
| 109 alertas de `yarn.lock` | (fecham sozinhos ao remover o arquivo) | — |

**Não feche:** `next` (exceto as linhas acima), `nodemailer`, `axios` (remova em vez de fechar), `sharp`, `postcss`, `@opentelemetry/core` e `brace-expansion`. São baratos de corrigir ou têm algum caminho de runtime.

#### Melhorias de processo

Hoje `.github/` só tem `workflows/ci.yml` e **não há `dependabot.yml`**. Os PRs atuais do Dependabot são security updates automáticos, sem agrupamento (ex.: `#61 bump next-intl`, `#60 bump flatted`). Os alertas abertos vão de #166 a #452, e o patch do `next` existe desde a 15.5.16.

1. **`.github/dependabot.yml`** (novo; segue o padrão de branch `master` e npm do CI):
   ```yaml
   version: 2
   updates:
     - package-ecosystem: npm
       directory: "/"
       target-branch: master
       schedule:
         interval: weekly
         day: monday
         time: "06:00"
         timezone: America/Sao_Paulo
       open-pull-requests-limit: 5
       labels: ["dependencies"]
       groups:
         next-stack:
           patterns: ["next", "eslint-config-next", "react", "react-dom", "@types/react", "@types/react-dom"]
         sentry:
           patterns: ["@sentry/*"]
         dev-minor-patch:
           dependency-type: development
           update-types: ["minor", "patch"]
         prod-patch:
           dependency-type: production
           update-types: ["patch"]
       ignore:
         # majors que exigem decisão/migração planejada (ver CQ-09 e DX-01)
         - dependency-name: "next"
           update-types: ["version-update:semver-major"]
         - dependency-name: "react"
           update-types: ["version-update:semver-major"]
         - dependency-name: "react-dom"
           update-types: ["version-update:semver-major"]
         - dependency-name: "eslint"
           update-types: ["version-update:semver-major"]
         - dependency-name: "tailwindcss"
           update-types: ["version-update:semver-major"]
     - package-ecosystem: github-actions
       directory: "/"
       target-branch: master
       schedule:
         interval: monthly
   ```
   Os `ignore` de major valem só para version updates. **Security updates continuam chegando** mesmo para essas dependências.

2. **Auto-merge de patches de devDependencies** (novo workflow; exige habilitar *Allow auto-merge* e proteção de branch com o check `CI / build` obrigatório):
   ```yaml
   # .github/workflows/dependabot-auto-merge.yml
   name: Dependabot auto-merge
   on: pull_request
   permissions:
     contents: write
     pull-requests: write
   jobs:
     auto-merge:
       if: github.actor == 'dependabot[bot]'
       runs-on: ubuntu-latest
       steps:
         - id: meta
           uses: dependabot/fetch-metadata@v2
         - if: steps.meta.outputs.dependency-type == 'direct:development' && steps.meta.outputs.update-type == 'version-update:semver-patch'
           run: gh pr merge --auto --squash "$PR_URL"
           env:
             PR_URL: ${{ github.event.pull_request.html_url }}
             GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

3. **Gate no CI** (`.github/workflows/ci.yml`, depois de `npm ci`):
   ```yaml
   - name: Audit production dependencies
     run: npm audit --omit=dev --audit-level=high
   ```
   Começar com `continue-on-error: true` até zerar os lotes 1–3 e depois tornar obrigatório.

4. **Rotina:** revisar *Security → Dependabot* quinzenalmente; dependências não usadas saem na hora (CQ-03), sem esperar alerta.

---

## 4. Matriz impacto × esforço

**Quick wins (alto impacto, esforço P)**: fazer primeiro.

| ID | Impacto | Esforço |
|---|---|---|
| SEC-DEP-01 `next@15.5.28` (RCE na Image Optimization) | Crítico | P |
| SEC-DEP-04 Remover `axios` sem uso (72 alertas) | Alto (higiene) | P |
| SEC-DEP-13 Remover `yarn.lock` (109 alertas duplicados) | Médio | P |
| SEC-DEP-02/03/06 `@sentry/nextjs` + `next-intl` | Médio | P |
| UX-01 CTAs `#contact` quebrados em /services | Crítico | P |
| SEC-01 Remover `.exe` de `public/` | Alto | P |
| AN-01 Eventos de lead nos CTAs | Alto | P |
| SEO-03 Meta da home traduzido | Alto | P |
| PERF-02 Hero sem `opacity: 0` | Alto | P |
| DX-02 Node 24 no CI/engines | Alto | P |
| SEO-05 Verificar www × apex | Alto | P |
| SEC-04 + SEO-07 Remover `?title=` | Médio | P |
| SEC-02/SEC-05 Remover rotas API mortas | Médio | P |
| SEO-06 Tirar `/search-console` do sitemap | Médio | P |
| AN-03 Medir escolha de intenção | Médio | P |
| A11Y-03 `MotionConfig reducedMotion="user"` | Médio | P |
| CQ-05 Compartilhar estado de intenção | Médio | P |

**Projetos estratégicos (alto impacto, esforço M/G)**

| ID | Impacto | Esforço |
|---|---|---|
| PERF-01 + SEO-01 + CQ-06 + AN-02 Remover splash (pacote único) | Crítico | M |
| SEO-02 + PERF-03/CQ-02 Páginas server + `generateMetadata` | Crítico | G |
| SEO-04 JSON-LD server-side e correto | Alto | M |
| PERF-04 Pipeline de imagens | Alto | M |
| A11Y-01 Modal com Radix Dialog | Alto | M |
| A11Y-02 Contraste/tokens | Alto | M |
| UX-03 Rever modal de intenção | Alto | P–M (decisão) |

**Preenchimento (médio/baixo impacto, esforço P)**: SEO-08, SEO-09, A11Y-04, A11Y-05, A11Y-06, PERF-06, PERF-07, PERF-08, CQ-03, CQ-08, CQ-10, UX-06, UX-08, AN-04, AN-05, DX-04, DX-05, DX-06, DX-07.

**Avaliar custo/benefício (médio impacto, esforço M+)**: CQ-01, CQ-04, CQ-07, CQ-09, PERF-05, SEC-03, SEC-06, UX-04, UX-05, UX-07, DX-01, DX-03.

---

## 5. Roadmap sugerido

### Onda 0 — Segurança de dependências (mesmo dia, antes de qualquer outra mudança)
1. **Lote 1 (SEC-DEP-01, 02, 06):** `next@15.5.28`, `@sentry/nextjs@^10.75.2`, `next-intl@^4.9.2`.
2. **Lotes 2–4 (SEC-DEP-04/05/07–13):** remover `axios` (e `nodemailer` se SEC-02 for aprovado), `yarn.lock` e rodar `npm update`; overrides só para o que sobrar.
3. **Processo:** `dependabot.yml` agrupado, auto-merge de patches dev e `npm audit` no CI (ver "Melhorias de processo" em 3.9).

### Onda 1 — Quick wins (até 1 dia)
1. **UX-01** Renderizar `<Contact/>` em `/services`.
2. **SEC-01** Remover `public/BraveBrowserSetup-BRV010.exe` (+ assets órfãos de CQ-03).
3. **AN-01 + AN-03** `trackLead`/`trackCtaClick`/`select_intent` em todos os CTAs, WhatsApp e mailto; `generate_lead` como key event no GA4.
4. **SEO-03** Meta da home via `messages/`.
5. **PERF-02** Hero visível no primeiro paint.
6. **SEC-04 + SEO-07** Remover `?title=`.
7. **SEO-06 + SEC-05 + SEC-02** Remover `/search-console` do sitemap e as rotas API mortas (ou proteger `/api/contact`).
8. **DX-02** Node 24 no CI e `engines`.
9. **A11Y-03** `MotionConfig reducedMotion="user"`.
10. **SEO-05** Rodar os `curl` e alinhar o domínio canônico.

### Onda 2 — Melhorias estruturais (1 semana)
1. **PERF-01 + SEO-01 + CQ-06 + AN-02** Remover o splash, aplicar o tema via script inline, `IntersectionObserver` na Navbar, GA com `Suspense`/page_view único. *(Fazer junto; ver a dependência descrita em PERF-01.)*
2. **PERF-03/CQ-02 + SEO-02** Converter `about`, `services`, `projects` e home para Server Components com `generateMetadata`; aposentar `SEO.tsx`; canonical/hreflang só por rota.
3. **SEO-04** JSON-LD no servidor (remover `LocalBusiness`/`SearchAction`).
4. **PERF-04** Recomprimir imagens, `sizes` nos cards, lightbox via otimizador.
5. **A11Y-01, A11Y-02, A11Y-04** Radix Dialog no modal, correção de contraste/tokens e seletor de tema acessível.
6. **CQ-05** Provider de intenção; **UX-03** decisão sobre o modal com base nos dados da Onda 1.
7. **CQ-03 + SEC-07 + DX-05** Remover dependências mortas e `yarn.lock`.
8. **DX-04** Checagem de drift das mensagens no CI.

### Onda 3 — Evolução (backlog)
- **UX-04** Formulário de qualificação de lead (com SEC-02 completo + Vercel Firewall/BotID). *Opcional — requer decisão.*
- **UX-05** Revisar números/depoimentos com fontes verificáveis.
- **SEC-03** CSP (Report-Only → enforce), HSTS e Permissions-Policy; **SEC-06** Consent Mode v2.
- **CQ-01** `strict: true`; **CQ-07** unificar tokens e reduzir temas (**UX-07**); **CQ-04** `siteConfig` + `ProjectCard`.
- **CQ-09** React 19 + `eslint-config-next` alinhado; **DX-01** ESLint 9 flat config.
- **DX-03** Vitest + testes de `lib/` e do merge de mensagens.
- **PERF-05** Enviar ao cliente só os namespaces necessários; **PERF-06/07/08**.
- **SEO-07 (opcional)** Slugs semânticos para projetos. *Opcional — requer decisão.*
- **UX-06** Página 404 traduzida; **DX-06** README/docs/`.env.example`.

---

## 6. Comandos para validação local (não executados nesta auditoria)

```bash
# Build e análise (confirma PERF-01/SEO-01, CQ-06, AN-02 após mudanças)
npm run messages:merge && npm run build

# Typecheck / lint
npx tsc --noEmit
npx tsc --noEmit --strict | tail -5        # volume de erros para CQ-01
npm run lint

# Dependências
npx depcheck                               # CQ-03
npm audit --omit=dev                       # SEC-07
npm ls react react-dom                     # CQ-09

# Produção (SEO-01, SEO-05, SEO-08, SEC-03)
curl -s https://leorodrigues.dev/services | grep -o '<link rel="canonical"[^>]*>'
curl -s https://leorodrigues.dev/ | grep -o '<h1[^>]*>' | head
curl -sI https://leorodrigues.dev/ | grep -i '^HTTP\|^location\|strict-transport'
curl -sI https://www.leorodrigues.dev/ | grep -i '^HTTP\|^location'
curl -s https://leorodrigues.dev/robots.txt

# Imagens pesadas (PERF-04)
find public -type f -size +500k -exec ls -lh {} \; | sort -k5 -h

# Lighthouse mobile (antes/depois da Onda 1 e 2)
npx lighthouse https://leorodrigues.dev --preset=perf --form-factor=mobile --view
```
