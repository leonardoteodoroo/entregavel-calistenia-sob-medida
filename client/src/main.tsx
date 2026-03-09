import { createRoot } from "react-dom/client";
import App from "./App";
import { redirectLegacyHashIfNeeded } from "./lib/legacyHashRedirect";
import "./index.css";

redirectLegacyHashIfNeeded();
window.addEventListener("hashchange", redirectLegacyHashIfNeeded);

createRoot(document.getElementById("root")!).render(<App />);
