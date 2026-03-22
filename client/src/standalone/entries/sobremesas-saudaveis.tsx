import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ensureGtm } from "@/lib/gtm";
import "@/index.css";
import SobremesasSaudaveisApp from "../SobremesasSaudaveisApp";
import StandaloneLayout from "../StandaloneLayout";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Elemento #root nao encontrado na pagina de sobremesas.");
}

ensureGtm();

createRoot(root).render(
  <StrictMode>
    <StandaloneLayout currentPath="/sobremesas-saudaveis">
      <SobremesasSaudaveisApp />
    </StandaloneLayout>
  </StrictMode>
);
