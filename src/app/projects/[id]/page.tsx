/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projectsData, Project } from '@/data/projectsData';
import { StructuredData } from '@/components/StructuredData';
import ProjectDetailClient from './ProjectDetailClient';

// @ts-ignore: Ignorar problemas de tipo temporariamente
export default async function Page({ params, searchParams }: any) {
  const resolvedParams = await Promise.resolve(params); // Resolva params, se necessário
  const projectId = Number(resolvedParams.id);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  // Capturar o título da query string
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const titleFromUrl = resolvedSearchParams?.title;

  return (
    <>
      <StructuredData
        type="CreativeWork"
        data={{
          name: project.title,
          description: project.description,
          dateCreated: project.date,
          creator: {
            "@type": "Person",
            name: "Léo Rodrigues",
            url: "https://leorodrigues.dev"
          },
          ...(project.links?.website && { url: project.links.website }),
          ...(project.sourceCodeUrl && { codeRepository: project.sourceCodeUrl }),
          keywords: project.techStack.join(", "),
          image: project.image.startsWith('http') ? project.image : `https://leorodrigues.dev${project.image}`,
        }}
      />
      <ProjectDetailClient project={project as Project} titleFromUrl={titleFromUrl} />
    </>
  );
}

// @ts-ignore: Ignorar problemas de tipo temporariamente
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const projectId = Number(resolvedParams.id);
  const project = projectsData.find((p) => p.id === projectId);
  
  if (!project) {
    return {
      title: "Projeto não encontrado",
    };
  }

  const projectTypeLabel = project.type === 'mobile' 
    ? 'App Mobile React Native' 
    : project.type === 'api' 
    ? 'Sistema Backend' 
    : 'Site Next.js';

  return {
    title: `${project.title} - Desenvolvido por Léo Rodrigues | ${projectTypeLabel}`,
    description: `${project.description} Desenvolvido com ${project.techStack.slice(0, 3).join(', ')}. Veja mais projetos de ${project.type === 'mobile' ? 'desenvolvimento mobile' : 'desenvolvimento web'}.`,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image.startsWith('http') ? project.image : `https://leorodrigues.dev${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
      url: `https://leorodrigues.dev/projects/${project.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image.startsWith('http') ? project.image : `https://leorodrigues.dev${project.image}`],
    },
    alternates: {
      canonical: `https://leorodrigues.dev/projects/${project.id}`,
    },
  };
}
