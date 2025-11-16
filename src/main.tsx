
  /*import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  const rootEl = document.getElementById("root")!;
  // Ensure idempotent mount during HMR/dev so App isn't mounted twice
  rootEl.innerHTML = "";
  createRoot(rootEl).render(<App />); */

  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  const rootEl = document.getElementById("root")!;
  createRoot(rootEl).render(<App />);

  