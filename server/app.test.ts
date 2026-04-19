import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { createServer, type Server } from "node:http";
import os from "node:os";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "./app";

describe("createApp cache headers", () => {
  let baseUrl = "";
  let server: Server;

  beforeAll(async () => {
    const staticPath = await mkdtemp(
      path.join(os.tmpdir(), "calistenia-cache-headers-")
    );

    await mkdir(path.join(staticPath, "assets"), { recursive: true });
    await mkdir(path.join(staticPath, "sobre"), { recursive: true });

    await writeFile(
      path.join(staticPath, "index.html"),
      "<!doctype html><html><body>home</body></html>"
    );
    await writeFile(
      path.join(staticPath, "sobre", "index.html"),
      "<!doctype html><html><body>sobre</body></html>"
    );
    await writeFile(
      path.join(staticPath, "assets", "app-abc123.js"),
      "console.log('asset versionado');"
    );

    server = createServer(createApp(staticPath));

    await new Promise<void>(resolve => {
      server.listen(0, "127.0.0.1", () => resolve());
    });

    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Nao foi possivel obter a porta de teste");
    }

    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    if (!server.listening) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      server.close(error => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it("mantem HTML com no-cache tanto no arquivo fisico quanto no fallback", async () => {
    const [staticHtmlResponse, fallbackResponse] = await Promise.all([
      fetch(`${baseUrl}/sobre/`),
      fetch(`${baseUrl}/rota-inexistente`),
    ]);

    expect(staticHtmlResponse.headers.get("cache-control")).toBe("no-cache");
    expect(staticHtmlResponse.headers.get("expires")).toBe("0");
    expect(fallbackResponse.headers.get("cache-control")).toBe("no-cache");
    expect(fallbackResponse.headers.get("expires")).toBe("0");
  });

  it("mantem assets estaticos com cache imutavel de um ano", async () => {
    const assetResponse = await fetch(`${baseUrl}/assets/app-abc123.js`);

    expect(assetResponse.headers.get("cache-control")).toBe(
      "public, max-age=31536000, immutable"
    );
  });
});
