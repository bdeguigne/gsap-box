import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ComponentPreview from "./pages/ComponentPreview";

/**
 * Configuration des routes de l'application
 * - Route principale : page d'accueil
 * - Route /component/:componentId : page de détail d'un composant
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/component/:componentId",
    element: <ComponentPreview />,
  },
]);
