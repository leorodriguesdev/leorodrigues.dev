"use client";

import { useMessages } from "next-intl";
import { buildProjects, type Project } from "@/data/projectsData";

export function useProjects(): Project[] {
  const messages = useMessages() as {
    projects?: { items?: Record<string, ProjectCopyMsg> };
  };
  return buildProjects(messages.projects?.items);
}

type ProjectCopyMsg = {
  title: string;
  description: string;
  highlights: string[];
  status: string;
};
