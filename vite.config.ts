import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import { partytownSnippet } from "@qwik.dev/partytown/integration";
import { partytownVite } from "@qwik.dev/partytown/utils";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

const clientRoot = path.resolve(import.meta.dirname, "client");
const slashRedirectPaths = new Set([
  "/lab",
  "/sobre",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-servico",
  "/aviso-legal",
  "/plano-alimentar",
  "/receitas-low-carb",
  "/sobremesas-saudaveis",
  "/oleos-essenciais-emagrecimento",
]);

const multipageInputs = {
  app: path.resolve(clientRoot, "index.html"),
  lab: path.resolve(clientRoot, "lab", "index.html"),
  sobre: path.resolve(clientRoot, "sobre", "index.html"),
  contato: path.resolve(clientRoot, "contato", "index.html"),
  privacidade: path.resolve(
    clientRoot,
    "politica-de-privacidade",
    "index.html"
  ),
  termos: path.resolve(clientRoot, "termos-de-servico", "index.html"),
  avisoLegal: path.resolve(clientRoot, "aviso-legal", "index.html"),
  planoAlimentar: path.resolve(clientRoot, "plano-alimentar", "index.html"),
  receitasLowCarb: path.resolve(clientRoot, "receitas-low-carb", "index.html"),
  sobremesasSaudaveis: path.resolve(
    clientRoot,
    "sobremesas-saudaveis",
    "index.html"
  ),
  oleosEssenciaisEmagrecimento: path.resolve(
    clientRoot,
    "oleos-essenciais-emagrecimento",
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

function createPartytownSnippetPlugin(): Plugin {
  const snippet = partytownSnippet();

  return {
    name: "partytown-inline-snippet",
    transformIndexHtml(html) {
      if (!html.includes("window.partytown")) {
        return html;
      }

      return html.replace(
        "</head>",
        `    <script>${snippet}</script>\n  </head>`
      );
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    partytownVite({
      dest: path.resolve(import.meta.dirname, "dist/public/~partytown"),
    }),
    createPartytownSnippetPlugin(),
    createSlashRedirectPlugin(),
  ],
  appType: "mpa",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
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
      strict: false,
      allow: [".."],
    },
  },
});
