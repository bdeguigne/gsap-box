import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

// Import des démos
import BottomToTopTransitionDemo from "../demo/BottomToTopTransitionDemo";
import SplitTransitionDemo from "../demo/SplitTransitionDemo";
import { TextReveal } from "../components/gsap-components/TextReveal";
import { FadeInScroll } from "../components/gsap-components/FadeInScroll";
import { RollingText } from "../components/gsap-components/RollingText";

/**
 * Page de démonstration qui présente tous les composants d'animation
 * avec une navigation simple pour passer d'une démo à l'autre
 */
export default function DemoPage() {
  // État pour les options de démo
  const [splitType, setSplitType] = useState("lines");
  const [rollingTextDemo, setRollingTextDemo] = useState("counter");

  // Liste des démos disponibles avec leurs tags
  const demos = [
    {
      id: "text-reveal",
      name: "Text Reveal",
      component: (
        <div className="w-full">
          <TextReveal
            animateOnScroll={false}
            repeat={true}
            splitType={splitType}
          >
            <h3 className="mb-4 text-2xl font-bold">Text Reveal Animation</h3>
            <p className="mb-2">
              This component creates beautiful text reveal animations using GSAP
              and SplitText.
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
      ),
      tags: ["SplitText"],
    },
    {
      id: "rolling-text",
      name: "Rolling Text",
      component: (
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
      ),
      tags: ["SplitText"],
    },
    {
      id: "fade-in-scroll",
      name: "Fade In Scroll",
      component: (
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
      ),
      tags: ["Scroll"],
    },
    {
      id: "bottom-to-top-transition",
      name: "Bottom To Top Transition",
      component: (
        <div className="flex h-full w-full items-center">
          <BottomToTopTransitionDemo />
        </div>
      ),
      tags: ["Transition"],
    },
    {
      id: "split-page-transition",
      name: "Split Page Transition",
      component: (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full items-center justify-center">
            <SplitTransitionDemo />
          </div>
        </div>
      ),
      tags: ["Transition"],
    },
  ];

  // État pour suivre la démo active
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const currentDemo = demos[currentDemoIndex];

  // Navigation entre les démos
  const goToNextDemo = () => {
    setCurrentDemoIndex((prev) => (prev === demos.length - 1 ? 0 : prev + 1));
  };

  const goToPrevDemo = () => {
    setCurrentDemoIndex((prev) => (prev === 0 ? demos.length - 1 : prev - 1));
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="mb-2 text-4xl font-bold">Animation Showcase</h1>
          <p className="text-secondary">
            Parcourez les différentes animations disponibles dans GSAP-Box
          </p>
        </div>

        {/* Carré arrondi central avec la démo active */}
        <div className="relative mx-auto mb-6">
          {/* Conteneur principal de la démo en format carré */}
          <div className="border-border relative mx-auto aspect-square w-full max-w-[800px] overflow-hidden rounded-lg border bg-black/10 shadow-lg backdrop-blur-sm">
            {/* Tags en haut à gauche à l'intérieur du conteneur */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {currentDemo.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-card flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium backdrop-blur-sm"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-8">
              {currentDemo.component}
            </div>
          </div>

          {/* Barre de séparation en bas du conteneur */}
          <div className="border-border absolute right-0 bottom-0 left-0 z-10 flex items-center justify-between border-t border-dashed px-4 py-2">
            <div className="text-[0.7rem] font-light">{currentDemo.name}</div>
            <div className="text-[0.7rem] font-light tracking-tight italic">
              GSAP-BOX
            </div>
          </div>
        </div>

        {/* Nom de la démo active */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{currentDemo.name}</h2>
        </div>

        {/* Contrôles de navigation */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevDemo}
            aria-label="Démo précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            {demos.map((demo, index) => (
              <Button
                key={demo.id}
                variant={index === currentDemoIndex ? "default" : "outline"}
                size="sm"
                className="h-8 min-w-8 px-3"
                onClick={() => setCurrentDemoIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextDemo}
            aria-label="Démo suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
