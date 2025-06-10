/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from 'next/navigation';
import { projectsData, Project } from '@/data/projectsData';
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
  const titleFromUrl = searchParams?.title;

  return <ProjectDetailClient project={project as Project} titleFromUrl={titleFromUrl} />;
}

// @ts-ignore: Ignorar problemas de tipo temporariamente
export async function generateMetadata({ params, searchParams }: any) {
  const resolvedParams = await Promise.resolve(params); // Resolva params, se necessário
  const title = searchParams?.title || resolvedParams.title;
  return { title: `Projeto ${title}` };
}
