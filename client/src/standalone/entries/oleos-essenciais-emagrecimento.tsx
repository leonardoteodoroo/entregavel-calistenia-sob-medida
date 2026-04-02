import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ensureGtm } from "@/lib/gtm";
import "@/index.css";
import OleosEssenciaisEmagrecimentoHomeApp from "../OleosEssenciaisEmagrecimentoHomeApp";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Elemento #root não encontrado na home do bônus.");
}

ensureGtm();

createRoot(root).render(
  <StrictMode>
    <OleosEssenciaisEmagrecimentoHomeApp />
  </StrictMode>
);
