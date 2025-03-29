// src/app/api/allprojects/route.ts

import { NextResponse } from "next/server";
import { projectsData } from "@/data/projectsData";

export async function GET() {
  return NextResponse.json(projectsData);
}
