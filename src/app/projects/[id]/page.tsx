// src/app/projects/[id]/page.tsx
import { notFound } from 'next/navigation';
import { projectsData, Project } from '@/data/projectsData';
import ProjectDetailClient from './ProjectDetailClient';

type PageProps = { params: { id: string } };

export default function Page({ params }: PageProps) {
  const projectId = parseInt(params.id, 10);
  const project   = projectsData.find(p => p.id === projectId);
  if (!project) notFound();

  /* tudo que é estático/SEO fica aqui;
     as animações ficam no client‑side component */
  return <ProjectDetailClient project={project as Project} />;
}
