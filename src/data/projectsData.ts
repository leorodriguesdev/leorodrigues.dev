// src/data/projectsData.ts

export interface Project {
    id: number;
    title: string;
    type: "website" | "mobile";
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
        title: "Landing Page para Startup",
        type: "website",
        description: "Landing page responsiva...",
        image: "/site1.png",
        images: [
            "/site2.png",
            "/site3.png",
            "/site2.png",
            "/site3.png",
        ],
        companyLogo: "/iconeSite.png",
        techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
        highlights: ["Otimização de SEO", "Animações leves com Framer Motion"],
        date: "2023-01-10",
        // Links específicos para site
        links: {
            website: "https://www.minha-startup.com",
        },
        // Novos campos
        status: "Online",
        sourceCodeUrl: "https://github.com/seu-usuario/landing-startup",
    },
    {
        id: 2,
        title: "Aplicativo de Pedidos Delivery",
        type: "mobile",
        description: "App React Native para entregas...",
        image: "/mobile1.jpeg",
        images: [
            "/mobile2.jpg",
            "/mobile3.png",
            "/mobile2.jpg",
            "/mobile3.png",
        ],
        companyLogo: "/iconeMobile.png",
        techStack: ["React Native", "Node.js", "Expo", "Stripe API"],
        highlights: ["Push Notifications", "Integração com mapas"],
        date: "2022-12-02",
        // Links específicos para mobile
        links: {
            playStore: "https://play.google.com/store/apps/details?id=deliveryapp",
            appStore: "https://apps.apple.com/us/app/deliveryapp/id1234567890",
        },
        status: "Em produção",
        sourceCodeUrl: "https://github.com/seu-usuario/delivery-app",
    },
    // ... etc. nos demais
];
