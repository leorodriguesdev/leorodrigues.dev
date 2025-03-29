// src/data/projectsData.ts

export interface Project {
    id: number;
    title: string;
    type: "website" | "mobile";
    description: string;
    image: string;
    techStack: string[];
    highlights: string[];
    date: string;
}

export const projectsData: Project[] = [
    {
        id: 1,
        title: "Landing Page para Startup",
        type: "website",
        description:
            "Landing page responsiva com React e Next.js, focada em conversões e design moderno.",
        image:
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
        highlights: ["Otimização de SEO", "Animações leves com Framer Motion"],
        date: "2023-01-10",
    },
    {
        id: 2,
        title: "Aplicativo de Pedidos Delivery",
        type: "mobile",
        description:
            "App React Native integrado com APIs de geolocalização e métodos de pagamento, melhorando o fluxo de entregas.",
        image:
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["React Native", "Node.js", "Expo", "Stripe API"],
        highlights: ["Push Notifications", "Integração com mapas"],
        date: "2022-12-02",
    },
    {
        id: 3,
        title: "E-commerce Completo",
        type: "website",
        description:
            "Plataforma de vendas online com autenticação, carrinho de compras e dashboard de vendas.",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
        highlights: ["Checkout com PayPal", "Recomendação de produtos"],
        date: "2022-11-15",
    },
    {
        id: 4,
        title: "Sistema de Agendamentos Online",
        type: "website",
        description:
            "Plataforma de agendamentos online com autenticação, calendário e dashboard de agendamentos.",
        image:
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
        highlights: ["Checkout com PayPal", "Recomendação de produtos"],
        date: "2022-11-15",
    },
    {
        id: 5,
        title: "Sistema de Controle de Estoque",
        type: "mobile",
        description:
            "App React Native integrado com APIs de geolocalização e métodos de pagamento, melhorando o fluxo de entregas.",
        image:
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["React Native", "Node.js", "Expo", "Stripe API"],
        highlights: ["Push Notifications", "Integração com mapas"],
        date: "2022-12-02",
    },
    {
        id: 6,
        title: "Sistema de Controle de Estoque",
        type: "website",
        description:
            "Plataforma de vendas online com autenticação, carrinho de compras e dashboard de vendas.",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
        highlights: ["Checkout com PayPal", "Recomendação de produtos"],
        date: "2022-11-15",
    },
    {
        id: 7,
        title: "Sistema de Controle de Estoque",
        type: "website",
        description:
            "Plataforma de vendas online com autenticação, carrinho de compras e dashboard de vendas.",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
        highlights: ["Checkout com PayPal", "Recomendação de produtos"],
        date: "2022-11-15",
    },
    {
        id: 8,
        title: "Sistema de Controle de Estoque",
        type: "website",
        description:
            "Plataforma de vendas online com autenticação, carrinho de compras e dashboard de vendas.",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
        highlights: ["Checkout com PayPal", "Recomendação de produtos"],
        date: "2022-11-15",
    },
    {
        id: 9,
        title: "Sistema de Controle de Estoque",
        type: "website",
        description: "Plataforma de vendas online com autenticação, carrinho de compras e dashboard de vendas.",
        image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
        highlights: ["Checkout com PayPal", "Recomendação de produtos"],
        date: "2022-11-15",
    },

];
