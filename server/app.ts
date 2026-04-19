import express, { type Response } from "express";
import compression from "compression";
import helmet from "helmet";
import path from "path";

function applyDocumentCacheHeaders(res: Response) {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Expires", "0");
}

export function createApp(staticPath: string) {
  const app = express();

  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(
    express.static(staticPath, {
      maxAge: "1y",
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          applyDocumentCacheHeaders(res);
        }
      },
    })
  );

  app.get("*", (_req, res) => {
    applyDocumentCacheHeaders(res);
    res.sendFile(path.join(staticPath, "index.html"));
  });

  return app;
}
