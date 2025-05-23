import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { Button } from "../components/ui/button";
import { CodeBlock } from "../components/ui/code-block";
import { TextReveal } from "../components/gsap-components/TextReveal";
import { FadeInScroll } from "../components/gsap-components/fade-in-scroll";
import { RollingText } from "../components/gsap-components/RollingText";
import PageTransitionDemo from "../components/gsap-components/PageTransition";

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
  const [splitType, setSplitType] = useState("lines"); // État pour le type de split
  const [rollingTextDemo, setRollingTextDemo] = useState("counter"); // État pour le type de démo RollingText

  // Fonction pour générer l'aperçu du composant en fonction de son ID
  const getComponentPreview = () => {
    switch (componentId) {
      case "text-reveal":
        return (
          <div className="w-full max-w-xl">
            <TextReveal
              animateOnScroll={false}
              repeat={true}
              splitType={splitType}
            >
              <h3 className="mb-4 text-2xl font-bold">Text Reveal Animation</h3>
              <p className="mb-2">
                This component creates beautiful text reveal animations using
                GSAP and SplitText.
              </p>
              <p className="mb-2">
                You can animate by lines, words, or individual letters for
                different effects.
              </p>
              <p className="text-secondary mb-4 text-sm">
                Perfect for headlines, paragraphs, and any text that needs
                attention.
              </p>
            </TextReveal>

            {/* Boutons de sélection du mode */}
            <div className="mt-8 flex justify-center gap-2">
              {["lines", "words", "letters"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSplitType(type)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    splitType === type
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-secondary hover:text-primary"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );
      case "rolling-text":
        return (
          <div className="flex flex-col items-center">
            {/* Affichage de la démo sélectionnée */}
            <div className="flex min-h-[150px] w-full items-center justify-center">
              {rollingTextDemo === "counter" ? (
                <div className="flex items-center justify-center">
                  <span className="font-mono text-5xl font-bold text-green-400">
                    202
                  </span>
                  <RollingText
                    innerClass="text-5xl font-mono font-bold text-green-400"
                    words={["3", "4", "5", "6"]}
                    letterHeight={40}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="text-3xl font-[200] whitespace-nowrap">
                    Motion creates{" "}
                    <span className="inline-block">
                      <RollingText
                        innerClass="text-3xl font-bold text-accent inline-block"
                        words={["impact.", "wonder.", "rhythm.", "appeal."]}
                        letterHeight={25}
                      />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Boutons de sélection du mode */}
            <div className="mt-8 flex justify-center gap-2">
              {[
                { id: "counter", label: "Year Counter" },
                { id: "headline", label: "Headline" },
              ].map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setRollingTextDemo(demo.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    rollingTextDemo === demo.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-secondary hover:text-primary"
                  }`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>
        );
      case "fade-in-scroll":
        return <div className="text-xl">Fade In Content</div>;
      case "page-transition":
        return <PageTransitionDemo />;
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
