// src/data/projectsData.ts

export interface Project {
    id: number;
    title: string;
    type: "website" | "mobile" | "api";
    description: string;
    image: string;          // Imagem principal
    images?: string[];      // Outras imagens do projeto
    companyLogo?: string;   // Logo da empresa/cliente
    techStack: string[];
    highlights: string[];
    date: string;
    links?: {
        website?: string;   // Link para o site
        playStore?: string; // Link para a Play Store
        appStore?: string;  // Link para a App Store        
    };
    status: string;       // Status do projeto (Online, Em produção, etc.)
    sourceCodeUrl?: string; // URL do repositório do projeto no GitHub
}

export const projectsData: Project[] = [
    {
        id: 1,
        title: "Anna Bella - Site Institucional",
        type: "website",
        description: "Site institucional fictício para apresentar o portfólio de uma modelo. Projeto criado no início da carreira para treinar HTML e CSS com navegação entre páginas e galeria de fotos.",
        image: "/projects/anna-bella/anna-bella-home.png",
        images: [
            "/projects/anna-bella/anna-bella-logo.png",
            "/projects/anna-bella/anna-bella-home.png",
            "/projects/anna-bella/anna-bella-campanha.png",
            "/projects/anna-bella/anna-bella-contato.png",
        ],
        companyLogo: "/projects/anna-bella-logo.png",
        techStack: ["HTML5", "CSS3"],
        highlights: [
            "Primeiro projeto no início da carreira",
            "Navegação entre páginas",
            "Galeria de imagens simples com bordas estilizadas",
            "Layout clássico e elegante com CSS puro"
        ],
        date: "2022-07-01",
        links: {
            website: "https://leorodriguesdev.github.io/projetoanna-bella/",
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/projetoanna-bella",
    },
    {
        id: 2,
        title: "TecBlog - Blog de Tecnologia",
        type: "website",
        description: "Projeto prático desenvolvido no início da carreira durante cursos paralelos feitos junto ao curso de tecnologia. TecBlog é um blog fictício de tecnologia com páginas HTML e CSS onde foram praticados conceitos básicos de layout, tipografia, espaçamento, cabeçalho fixo e estilização de links e posts.",
        image: "/projects/projetotecblog/tecblog-home.png",
        images: [
            "/projects/projetotecblog/tecblog-home.png"
        ],
        companyLogo: "/projects/projetotecblog/logo.png",
        techStack: ["HTML5", "CSS3"],
        highlights: [
            "Projeto do início da carreira para praticar HTML e CSS",
            "Layout limpo e organizado com cabeçalho fixo e áreas laterais",
            "Postagens com data e imagem",
            "Sidebar com posts recentes e categorias"
        ],
        date: "2022-12-08",
        links: {
            website: "https://leorodriguesdev.github.io/projetotecblog/",
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/projetotecblog",
    },
    {
        id: 3,
        title: "Tela de Login Simples",
        type: "website",
        description: "Projeto de uma tela de login minimalista e responsiva utilizando apenas HTML e CSS para prática de posicionamento e estilização com gradientes e transparência.",
        image: "/projects/teladelogin1/tela-login-principal.png",
        images: [
            "/projects/teladelogin1/tela-login-principal.png"
        ],
        techStack: ["HTML5", "CSS3"],
        highlights: [
            "Campos com ícones para e-mail e senha",
            "Layout centralizado e responsivo",
            "Gradiente de fundo e transparência nos elementos",
        ],
        date: "2023-03-15",
        links: {
            website: "https://leorodriguesdev.github.io/teladelogin1/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/teladelogin1"
    },
    {
        id: 4,
        title: "Currículo Interativo - Apresentation",
        type: "website",
        description: "Projeto desenvolvido no meu primeiro bootcamp com a Codaí, onde tive meu primeiro contato com Bootstrap. O objetivo foi criar um site pessoal para apresentação em vagas de emprego após o bootcamp. Este projeto simula um currículo online interativo com mudança dinâmica de conteúdo e links para redes sociais.",
        image: "/projects/apresentation/apresentation-home.png", // Imagem principal (pode colocar a captura da Home)
        images: [
            "/projects/apresentation/apresentation-home.png",  // Home (Sobre)
            "/projects/apresentation/apresentation-projects.png" // Projetos
        ],
        companyLogo: "/projects/apresentation/apresentation-home.png", // opcional, pode ser o mesmo da imagem principal ou um ícone simples
        techStack: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        highlights: ["Currículo Interativo", "Responsivo", "Troca dinâmica de conteúdo"],
        date: "2020-09-10",
        links: {
            website: "https://leorodriguesdev.github.io/apresentation"
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/apresentation"
    },
    {
        id: 5,
        title: "Portal Notícias Cidade",
        type: "website",
        description: "Um dos primeiros portais que desenvolvi durante minha fase inicial de estudos em desenvolvimento web. Neste projeto aprendi a estruturar sites com múltiplas páginas HTML e CSS, criando um portal de notícias fictício com diversas categorias e galeria de imagens.",
        image: "/projects/projetonoticiascidade/noticiascidade1.png",
        images: [
            "/projects/projetonoticiascidade/noticiascidade1.png",
            "/projects/projetonoticiascidade/noticiascidade2.png",
            "/projects/projetonoticiascidade/noticiascidade3.png"
        ],
        companyLogo: "/projects/projetonoticiascidade/iconeSite.png",
        techStack: ["HTML", "CSS"],
        highlights: ["Estrutura de múltiplas páginas HTML", "Layout de portal com colunas e menus"],
        date: "2020-07-15",
        links: {
            website: "https://leorodriguesdev.github.io/projetonoticiascidade/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/projetonoticiascidade",
    },
    {
        id: 6,
        title: "Chalé Hotel - Site Institucional",
        type: "website",
        description: "Projeto desenvolvido no meu início de estudos com HTML e CSS, durante o curso da Udemy do professor Jamilton Damasceno. O site simula a página institucional de um hotel fictício com apresentação visual atrativa, menus de navegação e listagem de benefícios.",
        image: "/projects/projetochale-hotel/chalehotel1.png",
        images: [
            "/projects/projetochale-hotel/chalehotel1.png"
        ],
        companyLogo: "/projects/projetochale-hotel/iconeSite.png",
        techStack: ["HTML", "CSS"],
        highlights: ["Layout institucional com imagens", "Menu de navegação e listagem de benefícios"],
        date: "2021-05-20",
        links: {
            website: "https://leorodriguesdev.github.io/projetochale-hotel/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/projetochale-hotel",
    },
    {
        id: 7,
        title: "Efeito Parallax com CSS",
        type: "website",
        description: "Projeto prático desenvolvido para treinar o efeito Parallax apenas com HTML e CSS. A ideia era explorar a propriedade background-attachment: fixed para criar uma experiência de rolagem suave e com profundidade.",
        image: "/projects/efeitoparallaxcss/parallax1.png",
        images: [
            "/projects/efeitoparallaxcss/parallax1.png"
        ],
        companyLogo: "/projects/efeitoparallaxcss/iconeSite.png",
        techStack: ["HTML", "CSS"],
        highlights: ["Efeito Parallax com background-attachment: fixed", "Experiência visual diferenciada"],
        date: "2021-06-10",
        links: {
            website: "https://leorodriguesdev.github.io/efeitoparallaxcss/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/efeitoparallaxcss",
    },
    {
        id: 8,
        title: "Museu Nacional",
        type: "website",
        description: "Projeto institucional desenvolvido para simular o site de um museu. Foram utilizados HTML e CSS com foco em estruturação, navegação e integração de elementos como vídeo, mapa e formulário.",
        image: "/projects/museu-nacional/museu-nacional.png",
        images: [
            "/projects/museu-nacional/museu-nacional.png"
        ],
        companyLogo: "/projects/museu-nacional/iconeSite.png",
        techStack: ["HTML", "CSS"],
        highlights: ["Página institucional com vídeo e mapa", "Formulário de visita", "Galeria de fotos"],
        date: "2021-07-15",
        links: {
            website: "https://leorodriguesdev.github.io/museu-nacional/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/museu-nacional",
    },
    {
        id: 9,
        title: "Finans",
        type: "website",
        description: "Landing page moderna e responsiva para uma solução de finanças pessoais. Desenvolvido com HTML, CSS e Bootstrap para apresentar recursos e benefícios do produto de forma clara e atraente.",
        image: "/projects/finans/finans-desktop.png",
        images: [
            "/projects/finans/finans-desktop.png",
            "/projects/finans/finans-mobile.png"
        ],
        companyLogo: "/projects/finans/iconeSite.png",
        techStack: ["HTML", "CSS", "Bootstrap", "FontAwesome"],
        highlights: ["Landing page responsiva", "Formulário de captura", "Design moderno e clean"],
        date: "2021-08-01",
        links: {
            website: "https://leorodriguesdev.github.io/finans/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/finans",
    },
    {
        id: 10,
        title: "Clone Spotify",
        type: "website",
        description: "Landing page clone do Spotify desenvolvida com HTML, CSS e Bootstrap para treinar responsividade, carrossel de destaques e organização de seções promocionais.",
        image: "/projects/clonespotify/clone-spotify-desktop.png",
        images: [
            "/projects/clonespotify/clone-spotify-desktop.png",
            "/projects/clonespotify/clone-spotify-mobile.png"
        ],
        companyLogo: "/projects/clonespotify/iconeSite.png",
        techStack: ["HTML", "CSS", "Bootstrap", "FontAwesome"],
        highlights: ["Carrossel responsivo", "Layout moderno e clean", "Landing page institucional"],
        date: "2021-09-10",
        links: {
            website: "https://leorodriguesdev.github.io/clonespotify/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/clonespotify",
    },
    {
        id: 11,
        title: "API NPS",
        type: "api",
        description: "API RESTful para envio e cálculo de NPS (Net Promoter Score), com integração de e-mail e testes automatizados. Utiliza Node.js, TypeORM, Nodemailer e SQLite.",
        image: "/projects/api-nps/api-nps.png",
        images: [
            "/projects/api-nps/api-nps.png"
        ],
        companyLogo: "/projects/api-nps/iconeBackend.png",
        techStack: ["Node.js", "TypeScript", "Express", "SQLite", "TypeORM", "Nodemailer", "Jest"],
        highlights: ["Envio automatizado de e-mails", "Cálculo de NPS", "Testes automatizados"],
        date: "2021-08-30",
        links: {
            website: "",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/api-nps",
    },
    {
        id: 12,
        title: "dev.finances",
        type: "website",
        description: "Aplicação de controle financeiro desenvolvida com HTML, CSS e JavaScript puro, permitindo registrar e visualizar entradas, saídas e saldo total.",
        image: "/projects/dev-finances/web.png",
        images: [
            "/projects/dev-finances/web.png",
            "/projects/dev-finances/mobile.png",
        ],
        companyLogo: "/projects/dev-finances/icon.png",
        techStack: ["HTML", "CSS", "JavaScript"], 
        highlights: [
            "Modal de nova transação com interação via DOM",
            "Visualização dinâmica de entradas, saídas e total",
            "Estilização responsiva e moderna"
        ],
        date: "2021-01-23",
        links: {
            website: "https://leorodriguesdev.github.io/dev.finances/",
        },
        status: "Concluído",
        sourceCodeUrl: "https://github.com/leorodriguesdev/dev.finances",
    },
    {
        id: 13,
        title: "Pomo - Aplicação Pomodoro com Gamificação",
        type: "website",
        description: "Aplicação web inspirada na técnica Pomodoro que combina produtividade com exercícios físicos e cuidados com a saúde. Durante as pausas, o usuário recebe desafios de exercícios físicos e para os olhos, ganhando experiência (XP) ao completá-los e subindo de nível.",
        image: "/projects/pomo/home.png",
        images: [
            "/projects/pomo/home.png",
            "/projects/pomo/tempo.png",
            "/projects/pomo/fimdotempo.png",
            "/projects/pomo/mobile.png"
        ],
        companyLogo: "/projects/pomo/logo.png",
        techStack: ["Next.js", "TypeScript", "React", "CSS Modules", "Context API"],
        highlights: [
            "Timer Pomodoro de 25 minutos para sessões de foco",
            "Sistema de desafios com exercícios físicos e para os olhos",
            "Gamificação com XP, níveis e conquistas",
            "Notificações sonoras e do navegador",
            "Persistência de dados em cookies",
            "Interface responsiva e moderna"
        ],
        date: "2024-03-15",
        links: {
            website: "https://pomo-puce.vercel.app/",
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/pomo",
    },
    {
        id: 14,
        title: "UNES - Universidade de Excelência",
        type: "website",
        description: "Site institucional moderno e responsivo para uma universidade fictícia. Projeto que demonstra a evolução de um site legado com tabelas para uma versão moderna usando HTML5 semântico, CSS Grid/Flexbox e JavaScript ES6+. Inclui formulário funcional, animações suaves, SEO otimizado e design system completo.",
        image: "/projects/unes-universidade/unes-home.png",
        images: [
            "/projects/unes-universidade/unes-home.png",
            "/projects/unes-universidade/unes-quem-somos.png",
            "/projects/unes-universidade/unes-contato.png",
            "/projects/unes-universidade/unes-mobile.png"
        ],
        companyLogo: "/projects/unes-universidade/unes-logo.png",
        techStack: ["HTML5", "CSS3", "JavaScript ES6+", "Font Awesome", "AOS Library", "Google Fonts"],
        highlights: [
            "Modernização completa de site legado com tabelas",
            "Design responsivo com CSS Grid e Flexbox",
            "Formulário de contato com validação em tempo real",
            "Animações suaves e efeitos visuais elegantes",
            "SEO otimizado com meta tags e structured data",
            "Sistema de design com cores e tipografia profissional",
            "FAQ interativo com accordion",
            "Contadores animados de estatísticas",
            "Performance otimizada com lazy loading",
            "PWA Ready com Service Worker configurado"
        ],
        date: "2024-12-15",
        links: {
            website: "https://leorodriguesdev.github.io/unes-universidade/",
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/unes-universidade",
    },
    {
        id: 15,
        title: "desaba.fei - Sistema de Comentários Moderno",
        type: "website",
        description: "Sistema de comentários moderno e interativo desenvolvido em React, com design responsivo e funcionalidades avançadas. Inclui busca em tempo real, filtros inteligentes, edição de comentários, avatares dinâmicos, validação em tempo real e persistência local. Interface moderna com gradientes sofisticados, animações suaves e suporte completo à acessibilidade.",
        image: "/projects/desaba-fei/desaba-fei-home.png",
        images: [
            "/projects/desaba-fei/desaba-fei-home.png",
            "/projects/desaba-fei/desaba-fei-comments.png",
            "/projects/desaba-fei/desaba-fei-comments2.png",
            "/projects/desaba-fei/desaba-fei-mobile.png"
        ],
        companyLogo: "/projects/desaba-fei/desaba-fei-logo.png",
        techStack: ["React", "JavaScript", "CSS3", "HTML5", "date-fns", "LocalStorage API"],
        highlights: [
            "Sistema de comentários completo com CRUD",
            "Busca avançada em tempo real por nome, email ou conteúdo",
            "Filtros inteligentes por data e nome",
            "Edição de comentários com validação em tempo real",
            "Avatares dinâmicos com iniciais coloridas",
            "Design responsivo com mobile-first approach",
            "Persistência automática no localStorage",
            "Animações suaves e efeitos shimmer",
            "Suporte completo à acessibilidade (WCAG 2.1 AA)",
            "Design system moderno com gradientes sofisticados",
            "Estados interativos com feedback visual",
            "Detecção automática de dark mode"
        ],
        date: "2024-12-20",
        links: {
            website: "https://desaba-fei.vercel.app/",
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/desaba.fei",
    },
    {
        id: 16,
        title: "MySkills - App de Cadastro de Skills",
        type: "mobile",
        description: "Aplicação mobile desenvolvida com React Native para cadastro e visualização de skills de desenvolvedores. O app permite adicionar novas habilidades, visualizar lista de skills cadastradas e inclui sistema de login/welcome. Projeto criado para praticar desenvolvimento mobile com React Native e Expo.",
        image: "/projects/myskills/myskills-logo.png",
        images: [
            "/projects/myskills/myskills-home.png",
        ],
        companyLogo: "/projects/myskills/myskills-logo.png",
        techStack: ["React Native", "TypeScript", "Expo", "FlatList", "Hooks", "JSX"],
        highlights: [
            "Cadastro de entrada/saída das skills",
            "Component Profile para exibição de perfil",
            "Página de login/Welcome"
        ],
        date: "2024-01-15",
        links: {
        },
        status: "Em construção",
        sourceCodeUrl: "https://github.com/leorodriguesdev/MySkills",
    },
    {
        id: 17,
        title: "dtmoney - Controle de Finanças Pessoais",
        type: "website",
        description: "Aplicação web para controle pessoal de finanças desenvolvida durante o Chapter 1 do Ignite da Rocketseat. Permite cadastrar entradas e saídas de dinheiro organizadas por nome e categoria, com cálculo automático de saldo total.",
        image: "/projects/dtmoney/dtmoney-home.png",
        images: [
            "/projects/dtmoney/dtmoney-home.png",
            "/projects/dtmoney/dtmoney-transactions.png",
            "/projects/dtmoney/dtmoney-mobile.png"
        ],
        companyLogo: "/projects/dtmoney/dtmoney-logo.png",
        techStack: ["React", "TypeScript", "Styled Components", "MirageJS", "Axios", "Polished"],
        highlights: [
            "Cadastro de entradas e saídas de dinheiro",
            "Cálculo automático de entrada, saída e total",
            "Organização por nome e categoria",
            "Interface moderna e responsiva",
            "Simulação de API com MirageJS",
            "Página de login integrada"
        ],
        date: "2023-06-15",
        links: {
            website: "https://dtmoney-ten-omega.vercel.app/",
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/dtmoney",
    },
    {
        id: 18,
        title: "ig.news - Plataforma de Notícias React",
        type: "website",
        description: "Plataforma de notícias sobre o mundo React desenvolvida com Next.js, TypeScript e integração com Stripe para pagamentos. Sistema completo de autenticação com GitHub, assinatura premium e conteúdo exclusivo. Projeto full-stack com webhooks, API routes e design responsivo moderno.",
        image: "/projects/ignews/ignews-home.png",
        images: [
            "/projects/ignews/ignews-home.png",
            "/projects/ignews/ignews-home-logada.png",
            "/projects/ignews/ignews-post.png",
            "/projects/ignews/ignews-post-detail.png",
            "/projects/ignews/ignews-mobile.png",
            "/projects/ignews/ignews-checkout.png"
        ],
        companyLogo: "/projects/ignews/ignews-logo.png",
        techStack: ["Next.js", "TypeScript", "React", "NextAuth.js", "Stripe", "Sass", "SCSS Modules"],
        highlights: [
            "Autenticação completa com GitHub via NextAuth.js",
            "Sistema de assinatura premium integrado com Stripe",
            "Webhooks para processamento de pagamentos",
            "API Routes para checkout e webhooks",
            "Design responsivo com SCSS Modules",
            "Sistema de posts com preview para não assinantes",
            "Interface moderna e elegante",
            "Integração completa com Stripe Dashboard",
            "Deploy otimizado na Vercel"
        ],
        date: "2024-12-25",
        links: {
            website: "https://ignews-snowy-sigma.vercel.app/",
        },
        status: "Online",
        sourceCodeUrl: "https://github.com/leorodriguesdev/ignews",
    },
    {
        id: 19,
        title: "LalaMovie - App de Críticas de Filmes",
        type: "mobile",
        description: "Aplicação mobile desenvolvida em React Native para críticas e comentários de filmes. Projeto de estudo criado para aprender na prática React Native e preparar para desenvolvimento mobile. Inclui funcionalidades como navegação, sliders, cards de filmes, sistema de comentários e avaliações.",
        image: "/projects/lalamovie/lalamovie-banner.png",
        images: [
            "/projects/lalamovie/lalamovie-home.png",
        ],
        companyLogo: "/projects/lalamovie/lalamovie-logo.png",
        techStack: ["React Native", "TypeScript", "Node.js", "Hooks", "FlatList", "JavaScript"],
        highlights: [
            "Página Home com header e navegação",
            "Slider de filmes em destaque",
            "Cards de filmes com informações",
            "Seções Top Rated e Lowest Rated",
            "Página de detalhes do filme",
            "Sistema de comentários e avaliações",
            "Input para adicionar comentários",
            "Lógica de persistência de comentários"
        ],
        date: "2024-01-20",
        links: {
        },
        status: "Em construção",
        sourceCodeUrl: "https://github.com/leorodriguesdev/lalamovie",
    },
];
