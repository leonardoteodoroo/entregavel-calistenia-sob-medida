import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ensureGtm } from "@/lib/gtm";
import "@/index.css";
import OleosEssenciaisEmagrecimentoApp from "../OleosEssenciaisEmagrecimentoApp";
import StandaloneLayout from "../StandaloneLayout";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Elemento #root não encontrado na home do bônus.");
}

ensureGtm();

createRoot(root).render(
  <StrictMode>
    <StandaloneLayout currentPath="/oleos-essenciais-emagrecimento">
      <OleosEssenciaisEmagrecimentoApp />
    </StandaloneLayout>
  </StrictMode>
);
