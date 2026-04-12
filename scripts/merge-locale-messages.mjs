import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function deepMerge(target, source) {
  if (!source || typeof source !== "object") return target;
  if (Array.isArray(source)) {
    return source;
  }
  for (const key of Object.keys(source)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    const sv = source[key];
    const tv = target[key];
    if (Array.isArray(sv)) {
      target[key] = sv;
    } else if (sv && typeof sv === "object") {
      if (
        !Object.prototype.hasOwnProperty.call(target, key) ||
        !tv ||
        typeof tv !== "object" ||
        Array.isArray(tv)
      ) {
        target[key] = {};
      }
      deepMerge(target[key], sv);
    } else {
      target[key] = sv;
    }
  }
  return target;
}

const locales = ["pt", "en", "es"];

for (const locale of locales) {
  const partsDir = path.join(root, "messages", "parts", locale);
  const merged = {};
  if (fs.existsSync(partsDir)) {
    const files = fs
      .readdirSync(partsDir)
      .filter((f) => f.endsWith(".json"))
      .sort();
    for (const f of files) {
      const part = JSON.parse(fs.readFileSync(path.join(partsDir, f), "utf8"));
      deepMerge(merged, part);
    }
  }
  const projectsPath = path.join(root, "messages", "partials", `projects.${locale}.json`);
  if (fs.existsSync(projectsPath)) {
    const pr = JSON.parse(fs.readFileSync(projectsPath, "utf8"));
    deepMerge(merged, pr);
  }
  fs.writeFileSync(
    path.join(root, "messages", `${locale}.json`),
    JSON.stringify(merged, null, 2)
  );
  console.log(`Wrote messages/${locale}.json`);
}
