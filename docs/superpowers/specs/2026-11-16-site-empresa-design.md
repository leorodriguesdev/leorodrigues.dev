# Design — leorodrigues.dev como site da empresa Leorodrigues.dev

> Data: 2026-11-16 · Status: aguardando aprovação · Abordagem escolhida: **B** (evoluir o site atual + página dedicada ao serviço de modernização)

## 1. Intenção e porquê

O site hoje é um portfólio pessoal com uma "versão comercial" escolhida num modal. O objetivo é transformá-lo no **site da empresa Leorodrigues.dev**, uma única versão, com voz de empresa ("nós"), feito para **converter clientes que procuram desenvolvimento de software**. Junto disso, lançar e destacar um serviço novo: **Modernização de Sistemas**, para quem tem site, app ou sistema (simples ou complexo) defasado, com layout ultrapassado ou que não funciona bem e precisa ser refatorado. A empresa já fez isso para clientes reais (STV-ELO e Plural), que viram os cases do serviço.

Sucesso = visitante entende em segundos o que a empresa faz, encontra o serviço que procura (inclusive modernização) e chega ao contato (WhatsApp/e-mail), medido pelo `generate_lead` que já existe.

## 2. Objetivos

1. Uma única home, de empresa, voltada à conversão (sem modal de intenção, sem versão portfólio).
2. Voz de empresa em todo o site: "nós entregamos", "nossa equipe". O fundador aparece como rosto/responsável técnico, não como currículo.
3. Serviço **Modernização de Sistemas** como 4º serviço, com destaque na home e **página própria** (`/services/modernization`) com cases STV-ELO e Plural.
4. Vitrine de projetos só com trabalho para clientes; projetos de estudo saem da vitrine.
5. Apenas dois temas, **claro e escuro**, com acabamento profissional.
6. Conteúdo que ainda não existe entra como **padrão provisório**, fácil de localizar e substituir.

## 3. Não-objetivos

- Formulário de contato (continua WhatsApp/e-mail; UX-04 segue no backlog).
- Blog, CMS ou painel para editar conteúdo.
- Mudar as URLs existentes (`/`, `/about`, `/services`, `/projects`, `/projects/[id]`).
- Páginas individuais por case (`/cases/[slug]`): os cases ficam dentro da página de modernização por enquanto.

## 4. Anti-objetivos (seria fracasso mesmo funcionando)

- **Inventar prova:** métricas, depoimentos, logos ou afirmações sobre clientes que não sejam reais. Placeholders são genéricos e qualitativos, nunca números ou citações falsas.
- Perder o que já foi corrigido: SEO por rota (canonical/hreflang/JSON-LD no servidor), acessibilidade (Radix Dialog, contraste AA, reduced motion), performance (conteúdo no HTML do servidor, LCP), tracking de leads.
- Quebrar links já indexados.
- Visual "gamer/neon": o tema neon e a fonte Audiowide saem.

## 5. Restrições

- Seguir o padrão do projeto (`.cursor/rules/*`): App Router, `page.tsx` server + `*PageClient.tsx`, textos via next-intl em `messages/parts/{pt,en,es}`, `npm run messages:merge` gerando `messages/*.json` (CI barra divergência), Tailwind com tokens CSS, alias `@/`.
- Todo texto novo em **pt, en e es**.
- Contraste WCAG AA nos dois temas (≥ 4.5:1 texto normal).
- Regras de execução do CLAUDE.md: sem dev server/navegador automático; build só com autorização; sem operações de Git.

## 6. Abordagens consideradas

| | Abordagem | Trade-off | Decisão |
|---|---|---|---|
| A | Evoluir o site atual (home única, seção de modernização, cases na home, empresa em `/about`, curadoria, 2 temas) | Esforço médio; preserva SEO e código | — |
| **B** | **A + página dedicada `/services/modernization`** | Um pouco mais de esforço; página própria para buscas como "modernizar sistema antigo" e um link direto para campanhas | **Escolhida** (o serviço novo é o diferencial e merece página que converta e ranqueie) |
| C | Reconstruir do zero (layout, componentes, nova arquitetura de URLs) | Esforço alto; refaz SEO/a11y/perf recém-concluídos e exige redirects | Descartada (o problema é posicionamento e conteúdo, não estrutura) |

## 7. Decisões do usuário

- Voz: **empresa com equipe ("nós")**.
- Abordagem **B**.
- Cases de modernização: **STV-ELO** (app antigo modernizado; nova atualização prevista) e **Plural** (sistema mobile adaptado para web → ecossistema novo, com projeto adequado para cada serviço).
- Ainda não há prints, métricas nem autorização formal de nome/logo: **montar com o que existe e placeholders**; o usuário popula depois.
- Temas: **dois, claro e escuro**, "nível profissional".

## 8. Arquitetura de informação

Navbar (todas as páginas): **Início · Serviços · Modernização · Cases · Empresa · Contato** + seletor de idioma + alternador claro/escuro.
- "Cases" → `/projects` (rótulo novo; URL mantida).
- "Contato" → `#contact` (seção de contato presente em todas as páginas de conteúdo, como já ocorre em `/services`).

| Rota | Papel |
|---|---|
| `/` | Home da empresa (conversão) |
| `/services` | Os 4 serviços |
| `/services/modernization` | **Nova** — serviço de modernização + cases |
| `/projects` | Vitrine curada ("Cases e projetos") |
| `/projects/[id]` | Detalhe de projeto (inalterado na estrutura) |
| `/about` | **A Empresa** (rótulo "Empresa"; URL mantida) |

## 9. Páginas

### 9.1 Home (`/`)
Base: `CommercialHome` atual. Ordem:
1. **Hero** — proposta de valor da empresa (desenvolvimento de sites, apps e sistemas + modernização), CTA primário "Solicitar orçamento" (`#contact`) e secundário "Conheça nossos serviços"; WhatsApp com texto.
2. **Números** — "{years}+ anos de mercado" (dinâmico, já existe), "projetos para clientes" (contagem da vitrine curada, dinâmica), dois indicadores qualitativos (ex.: "Atendimento direto com quem desenvolve", "Suporte pós-entrega"). Saem "97+ projetos", "99% satisfação" e "linhas de código" (não verificáveis/métrica de dev).
3. **Serviços** — 4 cards: Sites, Apps mobile, Sistemas sob medida (full stack), **Modernização de Sistemas** (destacado, com selo "Novo").
4. **Bloco Modernização** — chamada própria: "Seu sistema ficou para trás?", sinais (layout antigo, lento, difícil de manter, adaptação improvisada), CTA "Conheça a modernização" → `/services/modernization`.
5. **Cases** — os 2 cases (cards resumidos) → link para a página de modernização.
6. **Como trabalhamos** — os 4 passos atuais, reescritos em "nós".
7. **Investimento / orçamento** e **Garantias** — atuais, revisados para "nós".
8. **Depoimentos** — só depoimentos de clientes (ver 9.6).
9. **Contato**.

Saem: `VisitorIntentModal`, `PortfolioHome`, `useVisitorIntent` (store e tracking `select_intent`), botão de troca de versão no Footer, `Stats` variante portfolio, `/api/github-stats`.

### 9.2 Serviços (`/services`)
Estrutura atual + 4º card **Modernização de Sistemas** (destaque visual) com link para `/services/modernization`. Textos em "nós". JSON-LD `ProfessionalService` passa a listar os 4 serviços.

### 9.3 Modernização (`/services/modernization`) — nova
1. **Hero** — "Modernização de sistemas, sites e apps" + subtítulo (refatorar, atualizar tecnologia e experiência sem parar a operação) + CTA orçamento.
2. **Sinais de que é hora** — checklist (layout ultrapassado; lento; difícil/caro de manter; tecnologia sem suporte; app/sistema adaptado de outra plataforma; não acompanha o negócio).
3. **O que modernizamos** — sites, apps mobile, sistemas web/internos, integrações/APIs.
4. **Como fazemos** — Diagnóstico → Plano de modernização → Migração incremental (sem parar a operação) → Evolução contínua.
5. **Cases** — STV-ELO e Plural, formato **Problema → O que fizemos → Resultado**, com área de imagens "antes/depois" opcional (renderiza só se houver imagem cadastrada; senão, ilustração/print atual do projeto ou nada).
6. **CTA final** + seção Contato.
Metadata própria (title/description/keywords pt/en/es), canonical/hreflang via `buildPageMetadata`, JSON-LD `Service` (provider = organização) + `BreadcrumbList`, entrada no sitemap. Tracking `cta_click` com `location` novos.

### 9.4 Cases / Projetos (`/projects`)
- Título/rótulo "Cases e projetos".
- Vitrine mostra apenas projetos marcados como trabalho para cliente (flag nova em `projectsBase.json`).
- Projetos de estudo: fora da listagem, da home e do sitemap; páginas de detalhe continuam respondendo (não quebrar links) com `robots: noindex`.
- Plural não tem projeto cadastrado: aparece só como case na página de modernização até haver material.

### 9.5 Empresa (`/about`)
1. **Quem somos** — a Leorodrigues.dev, desde 2018 ({years} anos), o que fazemos e para quem.
2. **Como trabalhamos** — princípios (atendimento direto, transparência no orçamento, código de qualidade, suporte).
3. **Tecnologias** — grid de stack (reaproveita o conteúdo de `Skills`, sem barras de "porcentagem").
4. **Fundador** — bloco curto: foto (`avatar.png`), nome, papel ("Fundador e responsável técnico"), 2–3 linhas, link LinkedIn.
5. **CTA** + Contato.
Saem `Experience`, `Education` e a bio em primeira pessoa.

### 9.6 Depoimentos
Mantém o componente. Exibe só depoimentos de **clientes**: o de Adriano Machado (CEO, OnStart Tecnologia). Os de colegas (Serasa Experian, FIERGS) saem da exibição (ficam no histórico do Git). Layout se adapta a 1–3 itens. Novos depoimentos entram pelo mesmo formato de dados quando existirem. **Nenhum depoimento inventado.**

## 10. Dados e conteúdo provisório

- **Cases:** `src/data/caseStudies.ts` com estrutura tipada (id, cliente, projeto relacionado opcional, imagens antes/depois opcionais, tags de tecnologia, `isPlaceholder: true`), textos em `messages/parts/*` (namespace `cases`). STV pode reaproveitar imagens já existentes do projeto 33.
- **Curadoria:** campo novo em `projectsBase.json` (ex.: `showcase: true`) nos projetos de cliente.
- **Placeholders:** texto genérico e qualitativo, sem números nem citações. Todos listados num bloco "Conteúdo a substituir" em `docs/` (arquivo, chave, o que colocar), para o usuário popular depois.
- Chaves de tradução órfãs (portfolioHome, visitorIntent, experience, education, skills, stats de GitHub, testimonialItems de colegas) são removidas das partes e dos gerados.

## 11. Temas e visual

- Apenas **claro** e **escuro**. Padrão: **segue o sistema** (`prefers-color-scheme`); escolha manual salva e aplicada antes da pintura (mecanismo atual do `themeInitScript`).
- O painel lateral de 8 temas vira um **botão sol/lua** na Navbar (acessível, `aria-pressed`/rótulo).
- Tokens: os dois temas definidos nos tokens shadcn já usados pelo Tailwind (`--background`, `--primary`, …); aliases antigos (`--primary-color`, `--bg-color`, …) mantidos apontando para os novos para não espalhar mudanças.
- Paleta: sóbria, mantendo o verde como identidade, porém refinado (sem neon/glow).
- Tipografia: Geist em tudo; **Audiowide sai** (logo vira wordmark em Geist).
- Contraste AA verificado nos dois temas antes de entregar.

## 12. SEO, dados estruturados e analytics

- Metadata de todas as páginas reescrita para empresa (pt/en/es), mantendo `buildPageMetadata`.
- JSON-LD: home passa de `Person` para **`Organization`** (nome Leorodrigues.dev, logo, sameAs, fundador como `Person`) + `WebSite` + `ProfessionalService`; modernização com `Service`.
- Sitemap: + `/services/modernization`; − projetos de estudo.
- Analytics: `generate_lead`/`cta_click` em todos os CTAs novos (locations novas); remove `select_intent` e a propriedade `visitor_intent` (a dimensão no GA4 fica sem uso; pode ser arquivada).

## 13. Calls feitas por mim (revise)

1. Rótulo "Empresa" mantendo a URL `/about`, e "Cases" mantendo `/projects` (preserva SEO/links).
2. Projetos de cliente na vitrine: **EdimedApp (23), OnStart (30), Coelho Tattoo (31), Eletel Sat (32), STV-ELO (33)**. AgendaPro (24) e AgendAI (29) tratados como produtos próprios e **também** na vitrine; os demais (estudo) fora.
3. Projetos de estudo continuam acessíveis por URL, com `noindex`, em vez de serem apagados.
4. Depoimentos de colegas saem da exibição; fica só o de cliente (OnStart).
5. Tema padrão segue o sistema; alternador sol/lua.
6. Verde mantido como cor da marca, em versão sóbria; Audiowide removida.
7. Indicadores sem prova ("97+ projetos", "99% satisfação", "linhas de código") removidos; entram anos de mercado e contagem real de projetos de clientes.
8. Remoção de `/api/github-stats`, modal de intenção e tracking `select_intent`.

## 14. Fica a critério de quem implementar

- Redação final dos textos (dentro do tom "nós", objetivo e comercial).
- Divisão em componentes e nomes de arquivos, seguindo o padrão do projeto.
- Valores exatos da paleta, desde que AA nos dois temas.
- Ilustrações/ícones das seções novas (lucide, já no projeto).
