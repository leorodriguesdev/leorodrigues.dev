import { writeFileSync } from "node:fs";
import { projectsData } from "../src/data/projectsData.ts";

const items = Object.fromEntries(
  projectsData.map((p) => [
    String(p.id),
    {
      title: p.title,
      description: p.description,
      highlights: p.highlights,
      status: p.status,
    },
  ])
);

writeFileSync(
  new URL("../messages/_projects-pt-fragment.json", import.meta.url),
  JSON.stringify({ projects: { items } }, null, 2)
);

const base = projectsData.map(
  ({ title: _title, description: _description, highlights: _highlights, status: _status, ...rest }) => rest
);

writeFileSync(
  new URL("../src/data/projectsBase.json", import.meta.url),
  JSON.stringify(base, null, 2)
);

console.log("Wrote messages/_projects-pt-fragment.json and src/data/projectsBase.json");
