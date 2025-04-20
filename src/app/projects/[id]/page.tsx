/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from 'next/navigation';
import { projectsData, Project } from '@/data/projectsData';
import ProjectDetailClient from './ProjectDetailClient';

// @ts-ignore: Ignorar problemas de tipo temporariamente
export default async function Page({ params }: any) {
  const resolvedParams = await Promise.resolve(params); // Resolva params, se necessário
  const projectId = Number(resolvedParams.id);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project as Project} />;
}

// @ts-ignore: Ignorar problemas de tipo temporariamente
export async function generateMetadata({ params }: any) {
  const resolvedParams = await Promise.resolve(params); // Resolva params, se necessário
  return { title: `Projeto ${resolvedParams.id}` };
}
