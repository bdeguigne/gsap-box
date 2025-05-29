import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { Button } from "../components/ui/button";
import { CodeBlock } from "../components/ui/code-block";
import { TextReveal } from "../components/gsap-components/TextReveal";
import { FadeInScroll } from "../components/gsap-components/FadeInScroll";
import { RollingText } from "../components/gsap-components/RollingText";
import BottomToTopTransitionDemo from "../demo/BottomToTopTransitionDemo";
import SplitTransitionDemo from "../demo/SplitTransitionDemo";
import { SplitPageTransition } from "../components/gsap-components/SplitPageTransition";

import { sourceCode } from "../data/source-code";

export default function ComponentPreview() {
  const { componentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const componentData = location.state || {};
  const [activeTab, setActiveTab] = useState("preview");
  const [codeTab, setCodeTab] = useState("demo");
  const [splitType, setSplitType] = useState("lines");
  const [rollingTextDemo, setRollingTextDemo] = useState("counter");
  const [demoCode, setDemoCode] = useState("");
  const [componentCode, setComponentCode] = useState("");

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
        return (
          <div className="w-full max-w-xl">
            <FadeInScroll>
              <div className="bg-card mb-4 rounded-lg p-6 shadow-md">
                <h3 className="mb-2 text-xl font-bold">Reveal on Scroll</h3>
                <p className="text-secondary">
                  Elements gracefully appear as you scroll down the page.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll delay={0.2}>
              <div className="bg-card mb-4 rounded-lg p-6 shadow-md">
                <h3 className="mb-2 text-xl font-bold">Sequential Animation</h3>
                <p className="text-secondary">
                  Content appears in sequence with customizable timing.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll delay={0.4}>
              <div className="bg-card mb-4 rounded-lg p-6 shadow-md">
                <h3 className="mb-2 text-xl font-bold">Subtle Motion</h3>
                <p className="text-secondary">
                  Elegant animations that enhance rather than distract from your
                  content.
                </p>
              </div>
            </FadeInScroll>
          </div>
        );
      case "bottom-to-top-transition":
        return (
          <div className="h-full w-full">
            <BottomToTopTransitionDemo />
          </div>
        );
      case "split-page-transition":
        return (
          <div className="h-full w-full">
            <SplitTransitionDemo />
          </div>
        );
      default:
        return <div className="text-secondary">Aperçu non disponible</div>;
    }
  };

  // Charger le code source des composants et démos depuis le fichier de données
  useEffect(() => {
    const loadComponentCode = () => {
      try {
        // Vérifier si le composant existe dans notre base de données de code source
        if (sourceCode[componentId]) {
          // Récupérer le code de la démo
          if (sourceCode[componentId].demo) {
            setDemoCode(sourceCode[componentId].demo);
          } else {
            setDemoCode(`// Code de démo non disponible pour ${componentId}`);
          }

          // Récupérer le code du composant
          if (sourceCode[componentId].component) {
            setComponentCode(sourceCode[componentId].component);
          } else {
            setComponentCode(
              `// Code du composant non disponible pour ${componentId}`,
            );
          }
        } else {
          // Composant non trouvé dans la base de données
          setDemoCode(`// Code de démo non disponible pour ${componentId}`);
          setComponentCode(
            `// Code du composant non disponible pour ${componentId}`,
          );
        }
      } catch (error) {
        console.error("Erreur lors du chargement du code source:", error);
        setDemoCode(`// Erreur: ${error.message}`);
        setComponentCode(`// Erreur: ${error.message}`);
      }
    };

    loadComponentCode();
  }, [componentId]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-secondary mb-6 flex items-center gap-2 text-sm">
        <Button
          variant="link"
          className="p-0 text-sm"
          onClick={() => navigate("/components")}
        >
          Components
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

      {/* Onglets principaux */}
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
          <div className="flex h-full min-h-[300px] w-full items-center justify-center">
            {getComponentPreview()}
          </div>
        ) : (
          <div>
            {/* Sous-onglets pour le code */}
            <div className="mb-4 flex gap-2">
              <button
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  codeTab === "demo"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-secondary hover:text-primary"
                }`}
                onClick={() => setCodeTab("demo")}
              >
                Demo code
              </button>
              <button
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  codeTab === "component"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-secondary hover:text-primary"
                }`}
                onClick={() => setCodeTab("component")}
              >
                Component code
              </button>
            </div>

            {/* Affichage du code */}
            {codeTab === "demo" ? (
              demoCode ? (
                <CodeBlock
                  code={demoCode}
                  language="jsx"
                  title="Demo Code"
                  filename={
                    componentId ? `${componentId}-demo.jsx` : "demo.jsx"
                  }
                />
              ) : (
                <div className="text-secondary bg-muted rounded-md p-4">
                  Demo code not available for this component
                </div>
              )
            ) : componentCode ? (
              <CodeBlock
                code={componentCode}
                language="jsx"
                title="Component Code"
                filename={componentId ? `${componentId}.jsx` : "component.jsx"}
              />
            ) : (
              <div className="text-secondary bg-muted rounded-md p-4">
                Component code not available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
