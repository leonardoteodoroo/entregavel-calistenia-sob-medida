import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "src");
const tokenFile = path.join(sourceRoot, "index.css");
const targetExtensions = new Set([".tsx", ".css"]);

const rules = [
  { name: "hex color", regex: /#[0-9a-fA-F]{3,8}\b/g },
  { name: "rgb/rgba/hsl/hsla", regex: /\b(?:rgb|rgba|hsl|hsla)\(/gi },
  {
    name: "tailwind white/black utility",
    regex: /\b(?:bg|text|border|fill|stroke)-(?:white|black)\b/g,
  },
  {
    name: "tailwind gradient white/black utility",
    regex: /\b(?:from|via|to)-(?:white|black)(?:\/\d{1,3})?\b/g,
  },
  {
    name: "tailwind slash-opacity utility",
    regex: /\b(?:bg|text|border|fill|stroke|shadow)-[a-z]+\/\d{1,3}\b/g,
  },
];

const walk = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      if (!targetExtensions.has(path.extname(entry.name))) return [];
      if (fullPath === tokenFile) return [];
      return [fullPath];
    }),
  );

  return files.flat();
};

const lineFromIndex = (content, index) =>
  content.slice(0, index).split("\n").length;

const run = async () => {
  const files = await walk(sourceRoot);
  const violations = [];

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");

    for (const rule of rules) {
      rule.regex.lastIndex = 0;
      for (const match of content.matchAll(rule.regex)) {
        const matchIndex = match.index ?? 0;
        const line = lineFromIndex(content, matchIndex);
        const relativePath = path.relative(projectRoot, file);
        violations.push({
          path: relativePath,
          line,
          rule: rule.name,
          value: match[0],
        });
      }
    }
  }

  if (violations.length === 0) {
    console.log(
      "Design system compliance OK: no hardcoded color tokens found in src/**/*.tsx or src/**/*.css.",
    );
    return;
  }

  console.error(
    "Design system compliance failed. Replace hardcoded colors with semantic tokens.",
  );
  for (const violation of violations) {
    console.error(
      `- ${violation.path}:${violation.line} [${violation.rule}] ${violation.value}`,
    );
  }
  process.exit(1);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
