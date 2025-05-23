import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { FontLoader } from "./components/FontLoader";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FontLoader>
      <BrowserRouter>
        <ReactLenis root>
          <App />
        </ReactLenis>
      </BrowserRouter>
    </FontLoader>
  </StrictMode>,
);
