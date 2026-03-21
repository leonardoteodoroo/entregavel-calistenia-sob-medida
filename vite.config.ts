import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

const clientRoot = path.resolve(import.meta.dirname, "client");
const slashRedirectPaths = new Set([
  "/sobre",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-servico",
  "/aviso-legal",
  "/receitas-low-carb",
  "/sobremesas-saudaveis",
]);

const multipageInputs = {
  app: path.resolve(clientRoot, "index.html"),
  sobre: path.resolve(clientRoot, "sobre", "index.html"),
  contato: path.resolve(clientRoot, "contato", "index.html"),
  privacidade: path.resolve(
    clientRoot,
    "politica-de-privacidade",
    "index.html"
  ),
  termos: path.resolve(clientRoot, "termos-de-servico", "index.html"),
  avisoLegal: path.resolve(clientRoot, "aviso-legal", "index.html"),
  receitasLowCarb: path.resolve(clientRoot, "receitas-low-carb", "index.html"),
  sobremesasSaudaveis: path.resolve(
    clientRoot,
    "sobremesas-saudaveis",
    "index.html"
  ),
};

function createSlashRedirectPlugin(): Plugin {
  const redirectIfNeeded = (
    req: IncomingMessage,
    res: ServerResponse,
    next: (err?: unknown) => void
  ) => {
    if (!req.url) {
      next();
      return;
    }

    const requestUrl = new URL(req.url, "http://localhost");
    if (!slashRedirectPaths.has(requestUrl.pathname)) {
      next();
      return;
    }

    res.statusCode = 302;
    res.setHeader("Location", `${requestUrl.pathname}/${requestUrl.search}`);
    res.end();
  };

  return {
    name: "slash-path-redirect",
    configureServer(server) {
      server.middlewares.use(redirectIfNeeded);
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirectIfNeeded);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    createSlashRedirectPlugin(),
  ],
  appType: "mpa",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: clientRoot,
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: multipageInputs,
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
