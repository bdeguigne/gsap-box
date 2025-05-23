import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { Button } from "../components/ui/button";
import { CodeBlock } from "../components/ui/code-block";
import { TextReveal } from "../components/gsap-components/TextReveal";
import { FadeInScroll } from "../components/gsap-components/fade-in-scroll";
import { RollingText } from "../components/gsap-components/RollingText";

/**
 * Page de détail d'un composant GSAP
 * Affiche un aperçu et le code du composant avec un système d'onglets
 */
export default function ComponentPreview() {
  const { componentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const componentData = location.state || {};
  const [activeTab, setActiveTab] = useState("preview");

  // Fonction pour générer l'aperçu du composant en fonction de son ID
  const getComponentPreview = () => {
    switch (componentId) {
      case "text-reveal":
        return (
          <TextReveal animateOnScroll={false} repeat={true}>
            <p className="text-md">This is a text reveal animation</p>
            <p className="text-secondary text-sm">
              It will animate character by character
            </p>
          </TextReveal>
        );
      case "rolling-text":
        return (
          <div className="h-4">
            <RollingText words={["ROLLING", "TEXT", "ANIMATION"]} />
          </div>
        );
      case "fade-in-scroll":
        return <div className="text-xl">Fade In Content</div>;
      default:
        return <div className="text-secondary">Aperçu non disponible</div>;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-secondary mb-6 flex items-center gap-2 text-sm">
        <Button
          variant="link"
          className="p-0 text-sm"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <span>/</span>
        <span className="text-primary font-medium">
          {componentData.title || componentId}
        </span>
      </nav>

      {/* Titre */}
      <h1 className="mb-8 text-3xl font-bold">
        {componentData.title || componentId}
      </h1>

      {/* Onglets */}
      <div className="border-border mb-6 flex border-b">
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "preview"
              ? "border-accent text-accent border-b-2"
              : "text-secondary hover:text-primary"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "code"
              ? "border-accent text-accent border-b-2"
              : "text-secondary hover:text-primary"
          }`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
      </div>

      {/* Contenu */}
      <div className="border-border bg-card rounded-lg border p-6">
        {activeTab === "preview" ? (
          <div className="flex min-h-[300px] items-center justify-center">
            {getComponentPreview()}
          </div>
        ) : (
          <div>
            {componentData.code ? (
              <CodeBlock code={componentData.code} language="jsx" />
            ) : (
              <div className="text-secondary">Code non disponible</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
