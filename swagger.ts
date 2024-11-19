import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Portfolio API Documentation",
    version: "1.0.0",
    description: "Documentação da API do portfólio, gerenciada com Supabase e Next.js.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor local de desenvolvimento",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "http",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/education": {
      get: {
        tags: ["Education"],
        summary: "Listar todas as formações educacionais.",
        responses: {
          200: {
            description: "Lista de formações educacionais retornada com sucesso.",
          },
          500: {
            description: "Erro interno do servidor.",
          },
        },
      },
      post: {
        tags: ["Education"],
        summary: "Adicionar uma formação educacional.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Especialização em React" },
                  institution: { type: "string", example: "Rocketseat" },
                  year: { type: "string", example: "2023" },
                  description: { type: "string", example: "Curso avançado de React Native e Node.js" },
                },
                required: ["title", "institution", "year", "description"],
              },
            },
          },
        },
        responses: {
          201: { description: "Formação educacional adicionada com sucesso." },
          500: { description: "Erro ao adicionar a formação educacional." },
        },
      },
      put: {
        tags: ["Education"],
        summary: "Atualizar uma formação educacional.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  title: { type: "string", example: "Especialização em React" },
                  institution: { type: "string", example: "Rocketseat" },
                  year: { type: "string", example: "2023" },
                  description: { type: "string", example: "Curso avançado de React Native e Node.js" },
                },
                required: ["id", "title", "institution", "year", "description"],
              },
            },
          },
        },
        responses: {
          200: { description: "Formação educacional atualizada com sucesso." },
          400: { description: "Dados inválidos." },
          404: { description: "Formação não encontrada." },
          500: { description: "Erro ao atualizar a formação educacional." },
        },
      },
      delete: {
        tags: ["Education"],
        summary: "Deletar uma formação educacional.",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            description: "ID da formação educacional a ser deletada.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: { description: "Formação educacional deletada com sucesso." },
          404: { description: "Formação educacional não encontrada." },
          500: { description: "Erro ao deletar a formação educacional." },
        },
      },
    },
    "/experiences": {
      get: {
        tags: ["Experiences"],
        summary: "Listar todas as experiências profissionais.",
        responses: {
          200: { description: "Lista de experiências profissionais retornada com sucesso." },
          500: { description: "Erro ao buscar as experiências." },
        },
      },
      post: {
        tags: ["Experiences"],
        summary: "Adicionar uma experiência profissional.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Analista de Sistemas Pleno" },
                  duration: { type: "string", example: "2022 - Presente" },
                  description: { type: "string", example: "Trabalhando com React Native." },
                  achievements: {
                    type: "array",
                    items: { type: "string", example: "React Native" },
                  },
                },
                required: ["title", "duration", "description", "achievements"],
              },
            },
          },
        },
        responses: {
          201: { description: "Experiência profissional adicionada com sucesso." },
          500: { description: "Erro ao adicionar a experiência profissional." },
        },
      },
      put: {
        tags: ["Experiences"],
        summary: "Atualizar uma experiência profissional.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  title: { type: "string", example: "Analista de Sistemas Pleno" },
                  duration: { type: "string", example: "2022 - Presente" },
                  description: { type: "string", example: "Atualização do projeto React Native." },
                  achievements: {
                    type: "array",
                    items: { type: "string", example: "Nova conquista" },
                  },
                },
                required: ["id", "title", "duration", "description", "achievements"],
              },
            },
          },
        },
        responses: {
          200: { description: "Experiência profissional atualizada com sucesso." },
          400: { description: "Dados inválidos." },
          404: { description: "Experiência não encontrada." },
          500: { description: "Erro ao atualizar a experiência." },
        },
      },
      delete: {
        tags: ["Experiences"],
        summary: "Deletar uma experiência profissional.",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            description: "ID da experiência a ser deletada.",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          200: { description: "Experiência deletada com sucesso." },
          404: { description: "Experiência não encontrada." },
          500: { description: "Erro ao deletar a experiência." },
        },
      },
    },
    "/projects": {
      get: {
        tags: ["Projects"],
        summary: "Listar todos os projetos.",
        responses: {
          200: { description: "Lista de projetos retornada com sucesso." },
          500: { description: "Erro ao buscar os projetos." },
        },
      },
      post: {
        tags: ["Projects"],
        summary: "Adicionar um projeto.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Projeto X" },
                  description: { type: "string", example: "Descrição do projeto." },
                  image: { type: "string", example: "https://image-link" },
                  link: { type: "string", example: "https://project-link" },
                },
                required: ["title", "description", "image", "link"],
              },
            },
          },
        },
        responses: {
          201: { description: "Projeto adicionado com sucesso." },
          500: { description: "Erro ao adicionar o projeto." },
        },
      },
      put: {
        tags: ["Projects"],
        summary: "Atualizar um projeto.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  title: { type: "string", example: "Novo Projeto X" },
                  description: { type: "string", example: "Nova descrição." },
                  image: { type: "string", example: "https://new-image-link" },
                  link: { type: "string", example: "https://new-project-link" },
                },
                required: ["id", "title", "description", "image", "link"],
              },
            },
          },
        },
        responses: {
          200: { description: "Projeto atualizado com sucesso." },
          400: { description: "Dados inválidos." },
          404: { description: "Projeto não encontrado." },
          500: { description: "Erro ao atualizar o projeto." },
        },
      },
      delete: {
        tags: ["Projects"],
        summary: "Deletar um projeto.",
        parameters: [
          {
            name: "id",
            in: "query",
            required: true,
            description: "ID do projeto a ser deletado.",
            schema: { type: "integer", example: 1 },
          },
        ],
        responses: {
          200: { description: "Projeto deletado com sucesso." },
          404: { description: "Projeto não encontrado." },
          500: { description: "Erro ao deletar o projeto." },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./pages/api/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
