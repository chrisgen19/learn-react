import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// This file is the entry point. It runs once, when the page loads.
// Its only job is to attach our React app to the real HTML page.

// Step 1: find the <div id="root"></div> that lives in index.html.
// This is a normal browser API, nothing to do with React.
const rootElement = document.getElementById("root");

// Step 2: getElementById can return null if no such element exists, so
// TypeScript makes us handle that case before using it.
if (!rootElement) {
  throw new Error("Could not find an element with id 'root' in index.html");
}

// Step 3: hand that DOM element to React. From here on, React controls
// everything inside it.
const root = createRoot(rootElement);

// Step 4: tell React what to draw. StrictMode is a development-only helper
// that deliberately runs some code twice to help surface bugs. It does not
// appear in the production build.
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
