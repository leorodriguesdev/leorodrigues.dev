# Conteúdo a substituir

Pontos do site que estão com conteúdo provisório ou genérico, à espera de material real.
Textos ficam em `messages/parts/{pt,en,es}/*.json`; depois de editar, rode `npm run messages:merge`
e faça commit das partes **e** dos `messages/*.json` gerados (o CI barra divergência).

## Cases de modernização (`/services/modernization` e destaque na home)

| O quê | Onde | Hoje | Substituir por |
|---|---|---|---|
| Textos dos cases STV-ELO e Plural (problema, o que fizemos, resultado) | `modernizationPage.cases` em `03-ui.json` (pt/en/es) | Descrição qualitativa, sem números | Problema real, o que foi feito e resultado com dados (tempo de carregamento, avaliação na loja, nº de usuários, redução de chamados etc.) |
| Imagens antes/depois | `ModernizationPageClient.tsx` (bloco "Antes / depois") | Placeholder "Modernização em andamento" | Prints do sistema antigo e do novo de cada cliente (salvar em `public/projects/<cliente>/`) |
| Autorização de nome/logo | — | Nome do cliente citado em texto | Confirmar autorização; se houver, adicionar logo do cliente |
| Plural no portfólio | `src/data/projectsBase.json` + `messages/partials/projects.*.json` | Não cadastrado | Cadastrar como projeto (com `"showcase": true`) quando houver material |

## Vitrine de projetos (`/projects`)

- Só aparecem projetos com `"showcase": true` em `src/data/projectsBase.json` (hoje: 23 EdimedApp, 24 AgendaPro, 29 AgendAI, 30 OnStart, 31 Coelho Tattoo, 32 Eletel Sat, 33 STV-ELO).
- Os demais (estudo) seguem acessíveis por URL, com `noindex`, e fora do sitemap. Para exibir um projeto, adicione `"showcase": true`.

## Dados estruturados (SEO)

| O quê | Onde | Hoje | Substituir por |
|---|---|---|---|
| Logo da empresa no schema `Organization` | `src/lib/structuredData.ts` (`organizationSchema` → `logo`) | `/print.png` (print do site) | Arquivo de logo quadrado (mín. 112×112 px) em `public/` |
| Redes da empresa (`sameAs`) | `src/lib/structuredData.ts` (`SAME_AS`) | GitHub e LinkedIn pessoais | Perfis da empresa (LinkedIn da empresa, Instagram etc.), mantendo os pessoais no `Person` |

## Estatísticas da home (mantidas por decisão)

- `GITHUB_CONTRIBUTIONS_LAST_YEAR` em `src/components/Stats.tsx` é um número fixo (2461): atualizar manualmente quando quiser refletir o último ano.
