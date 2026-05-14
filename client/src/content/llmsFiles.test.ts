import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const llmsPath = fileURLToPath(
  new URL("../../public/llms.txt", import.meta.url)
);
const llmsFullPath = fileURLToPath(
  new URL("../../public/llms-full.txt", import.meta.url)
);
const canonicalDomain = "calistenia-sob-medida-28-dias.semprenamoda.com.br";

function readPublicFile(path: string): string {
  return readFileSync(path, "utf8");
}

describe("public LLM context files", () => {
  it("publishes llms.txt and llms-full.txt from the Vite public root", () => {
    expect(existsSync(llmsPath)).toBe(true);
    expect(existsSync(llmsFullPath)).toBe(true);
  });

  it("points both files to the canonical site and links the full context from llms.txt", () => {
    const llms = readPublicFile(llmsPath);
    const llmsFull = readPublicFile(llmsFullPath);

    expect(llms).toContain(canonicalDomain);
    expect(llmsFull).toContain(canonicalDomain);
    expect(llms).toContain(`https://${canonicalDomain}/llms-full.txt`);
  });

  it("keeps llms-full.txt in marketing scope instead of exposing paid product content", () => {
    const llmsFull = readPublicFile(llmsFullPath);

    expect(llmsFull).not.toMatch(/##\s*Dia\s+1\b/i);
    expect(llmsFull).not.toMatch(/Marcha parada/i);
    expect(llmsFull).not.toMatch(/Agachamento assistido/i);
    expect(llmsFull).not.toMatch(/##\s*Ingredientes\b/i);
    expect(llmsFull).not.toMatch(/##\s*Modo de preparo\b/i);
    expect(llmsFull).not.toMatch(/lista da semana organizada/i);
  });
});
