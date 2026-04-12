import { getMessages, setRequestLocale } from "next-intl/server";
import { buildProjects, type Project } from "@/data/projectsData";

export async function getProjects(locale?: string): Promise<Project[]> {
  if (locale) {
    setRequestLocale(locale);
  }
  const messages = await getMessages();
  const items = (messages as { projects?: { items?: Record<string, unknown> } })
    .projects?.items;
  return buildProjects(items as Parameters<typeof buildProjects>[0]);
}
