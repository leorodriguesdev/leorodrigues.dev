import { NextResponse } from "next/server";
import { getProjectsForApiLocale, resolveApiLocale } from "@/lib/apiLocale";

export async function GET(request: Request) {
  const locale = resolveApiLocale(request);
  const projects = getProjectsForApiLocale(locale);
  return NextResponse.json(projects, {
    headers: { "Content-Language": locale },
  });
}
