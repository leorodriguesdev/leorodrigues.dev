import projectsBase from "./projectsBase.json";
import ptMessages from "../../messages/pt.json";

export interface Project {
  id: number;
  title: string;
  type: "website" | "mobile" | "api";
  description: string;
  image: string;
  images?: string[];
  companyLogo?: string;
  techStack: string[];
  highlights: string[];
  date: string;
  links?: {
    website?: string;
    playStore?: string;
    appStore?: string;
  };
  status: string;
  sourceCodeUrl?: string;
}

export type ProjectBase = Omit<
  Project,
  "title" | "description" | "highlights" | "status"
>;

export type ProjectCopy = Pick<
  Project,
  "title" | "description" | "highlights" | "status"
>;

export function buildProjects(
  items: Record<string, ProjectCopy | undefined> | undefined
): Project[] {
  const list = projectsBase as ProjectBase[];
  return list.map((base) => {
    const copy = items?.[String(base.id)];
    if (
      !copy?.title ||
      copy.description === undefined ||
      copy.highlights === undefined ||
      !copy?.status
    ) {
      throw new Error(`Missing project copy for id ${base.id}`);
    }
    return { ...base, ...copy } as Project;
  });
}

/** Lista em PT para sitemap, API e fallbacks server-side. Na UI use `useProjects()` ou `getProjects()`. */
export const projectsData = buildProjects(
  (ptMessages as { projects?: { items?: Record<string, ProjectCopy> } }).projects
    ?.items
);
