import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

describe("lab standalone entrypoint", () => {
  it("boots the lab app instead of the main product app", () => {
    const markup = readFileSync(
      new URL("../../lab/index.html", import.meta.url),
      "utf8"
    );

    expect(markup).toContain('src="./src/main.tsx"');
    expect(markup).not.toContain('src="/src/main.tsx"');
  });
});
