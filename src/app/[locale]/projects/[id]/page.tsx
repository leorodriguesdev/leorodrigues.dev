import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import projectsBase from "@/data/projectsBase.json";
import { getProjects } from "@/lib/getProjects";
import { routing } from "@/i18n/routing";
import { StructuredData } from "@/components/StructuredData";
import ProjectDetailClient from "./ProjectDetailClient";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ title?: string }>;
};

function projectPath(locale: string, id: string): string {
  return locale === routing.defaultLocale
    ? `/projects/${id}`
    : `/${locale}/projects/${id}`;
}

export function generateStaticParams() {
  const ids = (projectsBase as { id: number }[]).map((p) => String(p.id));
  return routing.locales.flatMap((locale) =>
    ids.map((id) => ({ locale, id }))
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale, id } = await params;
  const resolvedSearchParams = await searchParams;
  setRequestLocale(locale);

  const projectId = Number(id);
  if (Number.isNaN(projectId)) {
    notFound();
  }

  const projects = await getProjects(locale);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  const titleFromUrl = resolvedSearchParams?.title;
  const canonical = `https://leorodrigues.dev${projectPath(locale, id)}`;

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
            url: "https://leorodrigues.dev",
          },
          ...(project.links?.website && { url: project.links.website }),
          ...(project.sourceCodeUrl && { codeRepository: project.sourceCodeUrl }),
          keywords: project.techStack.join(", "),
          image: project.image.startsWith("http")
            ? project.image
            : `https://leorodrigues.dev${project.image}`,
          url: canonical,
        }}
      />
      <ProjectDetailClient project={project} titleFromUrl={titleFromUrl} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  const projectId = Number(id);
  const projects = await getProjects(locale);
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: t("projectNotFoundTitle"),
    };
  }

  const typeLabel =
    project.type === "mobile"
      ? t("projectTypeMobile")
      : project.type === "api"
        ? t("projectTypeApi")
        : t("projectTypeWebsite");

  const context =
    project.type === "mobile"
      ? t("projectMetaContextMobile")
      : t("projectMetaContextWeb");

  const tech = project.techStack.slice(0, 3).join(", ");
  const description = `${project.description} ${t("projectMetaDescriptionDev", { tech, context })}`;

  const title = `${project.title} - ${t("projectMetaSuffix")} | ${typeLabel}`;
  const path = projectPath(locale, id);
  const url = `https://leorodrigues.dev${path}`;
  const imageUrl = project.image.startsWith("http")
    ? project.image
    : `https://leorodrigues.dev${project.image}`;

  return {
    title,
    description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        pt: `https://leorodrigues.dev${projectPath("pt", id)}`,
        en: `https://leorodrigues.dev${projectPath("en", id)}`,
        es: `https://leorodrigues.dev${projectPath("es", id)}`,
        "x-default": `https://leorodrigues.dev${projectPath(routing.defaultLocale, id)}`,
      },
    },
  };
}
