/**
 * Fichier contenant le code source des composants et de leurs démos
 * Cette approche permet d'avoir accès au code source même en production (Vercel)
 */

export const sourceCode = {
  // SplitPageTransition
  "split-page-transition": {
    component: `import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

/**
 * Split page transition component that divides the page in two parts
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.frontPage - Page au premier plan (celle qui se split)
 * @param {React.ReactNode} props.backPage - Page en arrière-plan (révélée après le split)
 * @param {string} props.state - Current state: 'entering', 'active', 'exiting', or 'inactive'
 * @param {Function} props.onComplete - Callback when transition completes
 * @param {Object} props.overlayOptions - Options de personnalisation pour l'overlay
 */
gsap.registerPlugin(CustomEase);

export function SplitPageTransition({
  frontPage,
  backPage,
  state = "inactive",
  onComplete,
  overlayOptions = {},
  direction = "vertical", // "vertical" or "horizontal"
}) {
  const containerRef = useRef(null);
  const dividerRef = useRef(null);
  const frontPageRef = useRef(null);

  // Options par défaut pour l'overlay
  const {
    color = "#303030",
    duration = 1,
    stagger = 0.1,
    showDivider = true,
    dividerColor = "white",
    dividerDuration = 1.5,
  } = overlayOptions;

  useGSAP(
    () => {
      const container = containerRef.current;
      const divider = dividerRef.current;
      const leftBlock = container?.querySelector(".block-left");
      const rightBlock = container?.querySelector(".block-right");

      if (!container || !divider || !leftBlock || !rightBlock) return;

      // Reset any ongoing animations
      gsap.killTweensOf([container, divider, leftBlock, rightBlock]);

      // Créer l'easing personnalisé
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      switch (state) {
        case "entering":
          // Animation d'entrée
          // ... code d'animation
          break;
      }
    },
    { dependencies: [state, onComplete], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: state === "active" ? 5 : state === "entering" ? 10 : 1,
      }}
    >
      {/* Overlay qui se split */}
      <div className="overlay pointer-events-none absolute z-20 flex h-full w-full">
        <div
          className="block-left h-full w-full"
          style={{ backgroundColor: color }}
        ></div>
        <div
          className="block-right h-full w-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>

      {/* Contenu de la page de premier plan */}
      <div ref={frontPageRef} className="absolute inset-0 z-20">
        {frontPage}
      </div>

      {/* Contenu de la page d'arrière-plan */}
      <div className="absolute inset-0">{backPage}</div>

      {/* Divider line */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-1/2 z-30 h-full w-[1px] -translate-x-1/2 opacity-0"
        style={{
          transformOrigin: "center top",
          scaleY: 0,
          backgroundColor: dividerColor,
        }}
      />
    </div>
  );
}

export default SplitPageTransition;`,
    demo: `import React, { useState, useEffect, useRef } from "react";
import { SplitPageTransition } from "../components/gsap-components/SplitPageTransition";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Split transition demo with direction toggle
 */
export function SplitTransitionDemo() {
  const [transitionState, setTransitionState] = useState("inactive");
  const [direction, setDirection] = useState("vertical");
  const timeoutRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Overlay customization options
  const overlayOptions = React.useMemo(
    () => ({
      color: "#121212",
      showDivider: true,
      dividerColor: "white",
      stagger: direction === "vertical" ? 0.1 : 0,
      duration: 1,
    }),
    [direction],
  );

  // Handle transition completion
  const handleTransitionComplete = (type) => {
    if (type === "enter-complete") {
      setTransitionState("inactive");

      // Schedule next transition
      timeoutRef.current = setTimeout(() => {
        setTransitionState("entering");
      }, 1500);
    }
  };

  const handleDirectionChange = (newDirection) => {
    if (direction === newDirection) return;

    // Clear any pending transitions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Kill all GSAP animations globally
    gsap.killTweensOf("*");

    // Reset element states if they exist
    if (leftRef.current && rightRef.current) {
      // Reset visibility
      gsap.set([leftRef.current, rightRef.current], {
        autoAlpha: 1,
        clearProps: "all",
      });
    }

    // Update direction and reset state
    setDirection(newDirection);
    setTransitionState("inactive");

    // Start new transition after a short delay
    setTimeout(() => {
      setTransitionState("entering");
    }, 100);
  };

  useEffect(() => {
    setTransitionState("entering");

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Transition component */}
      <SplitPageTransition
        frontPage={<FirstPage leftRef={leftRef} rightRef={rightRef} />}
        backPage={<SecondPage />}
        state={transitionState}
        onComplete={handleTransitionComplete}
        overlayOptions={overlayOptions}
        direction={direction}
      />

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 z-50 flex justify-center gap-2">
        <button
          onClick={() => handleDirectionChange("vertical")}
          className={\`rounded-full px-4 py-2 text-sm font-medium transition-colors \${
            direction === "vertical"
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-secondary hover:text-primary"
          }\`}
        >
          Vertical
        </button>
        <button
          onClick={() => handleDirectionChange("horizontal")}
          className={\`rounded-full px-4 py-2 text-sm font-medium transition-colors \${
            direction === "horizontal"
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-secondary hover:text-primary"
          }\`}
        >
          Horizontal
        </button>
      </div>
    </div>
  );
}

export default SplitTransitionDemo;`
  },

  // BottomToTopTransition
  "bottom-to-top-transition": {
    component: `import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Transition de bas en haut pour les changements de page
 */
export function BottomToTopTransition({
  frontPage,
  backPage,
  state = "inactive",
  onComplete,
  duration = 1,
}) {
  const containerRef = useRef(null);
  const frontPageRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const frontPageEl = frontPageRef.current;

      if (!container || !frontPageEl) return;

      // Reset any ongoing animations
      gsap.killTweensOf([container, frontPageEl]);

      switch (state) {
        case "entering":
          // Initial state
          gsap.set(container, { autoAlpha: 1 });
          gsap.set(frontPageEl, { y: "100%" });

          // Animate front page from bottom to top
          gsap.to(frontPageEl, {
            y: "0%",
            duration: duration,
            ease: "power3.out",
            onComplete: () => onComplete && onComplete("enter-complete"),
          });
          break;

        case "exiting":
          // Animate front page to top
          gsap.to(frontPageEl, {
            y: "-100%",
            duration: duration,
            ease: "power3.in",
            onComplete: () => {
              gsap.set(container, { autoAlpha: 0 });
              onComplete && onComplete("exit-complete");
            },
          });
          break;
      }
    },
    { dependencies: [state, onComplete], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: state === "active" ? 5 : state === "entering" ? 10 : 1,
        visibility: "hidden", // Initially hidden, GSAP will control visibility
      }}
    >
      {/* Contenu de la page d'arrière-plan */}
      <div className="absolute inset-0">{backPage}</div>

      {/* Contenu de la page de premier plan */}
      <div
        ref={frontPageRef}
        className="absolute inset-0 bg-background"
        style={{ transform: "translateY(100%)" }}
      >
        {frontPage}
      </div>
    </div>
  );
}

export default BottomToTopTransition;`,
    demo: `import React, { useState, useEffect, useRef } from "react";
import { BottomToTopTransition } from "../components/gsap-components/BottomToTopTransition";
import { Button } from "../components/ui/button";

export default function BottomToTopTransitionDemo() {
  const [currentPage, setCurrentPage] = useState("page1");
  const [transitionState, setTransitionState] = useState("inactive");
  const nextPageRef = useRef("page2");

  const handleTransitionComplete = (type) => {
    if (type === "exit-complete") {
      // Transition de sortie terminée, mettre à jour la page courante
      setCurrentPage(nextPageRef.current);
      setTransitionState("entering");
    } else if (type === "enter-complete") {
      // Transition d'entrée terminée
      setTransitionState("active");
    }
  };

  const handlePageChange = () => {
    // Définir la prochaine page
    nextPageRef.current = currentPage === "page1" ? "page2" : "page1";
    // Démarrer la transition de sortie
    setTransitionState("exiting");
  };

  // Démarrer avec une animation d'entrée
  useEffect(() => {
    setTransitionState("entering");
  }, []);

  // Rendu des pages
  const renderPage = (pageName) => {
    if (pageName === "page1") {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 p-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Page 1</h2>
          <p className="mb-6 text-center">
            This is the first page with a bottom-to-top transition.
          </p>
          <Button onClick={handlePageChange}>Go to Page 2</Button>
        </div>
      );
    } else {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-amber-500 to-red-600 p-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Page 2</h2>
          <p className="mb-6 text-center">
            This is the second page with a bottom-to-top transition.
          </p>
          <Button onClick={handlePageChange}>Go to Page 1</Button>
        </div>
      );
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {currentPage === "page1" ? (
        <BottomToTopTransition
          frontPage={renderPage("page1")}
          backPage={renderPage("page2")}
          state={transitionState}
          onComplete={handleTransitionComplete}
        />
      ) : (
        <BottomToTopTransition
          frontPage={renderPage("page2")}
          backPage={renderPage("page1")}
          state={transitionState}
          onComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
}`
  },

  // TextReveal
  "text-reveal": {
    component: `import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

/**
 * Composant TextReveal pour animer l'apparition du texte
 */
export function TextReveal({
  children,
  splitType = "words",
  stagger = 0.05,
  duration = 0.8,
  ease = "power2.out",
  animateOnScroll = true,
  repeat = false,
  repeatDelay = 3,
}) {
  const textRef = useRef(null);
  const splitRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      // Créer l'animation de split text
      splitRef.current = new SplitText(textRef.current, {
        type: splitType,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
      });

      // Déterminer les éléments à animer selon le type de split
      const elements =
        splitType === "lines"
          ? splitRef.current.lines
          : splitType === "words"
          ? splitRef.current.words
          : splitRef.current.chars;

      // Réinitialiser l'état
      gsap.set(elements, { autoAlpha: 0, y: 20 });

      // Créer la timeline
      timelineRef.current = gsap.timeline({
        paused: true,
        repeat: repeat ? -1 : 0,
        repeatDelay: repeatDelay,
        onRepeat: () => {
          // Réinitialiser l'état avant chaque répétition
          gsap.set(elements, { autoAlpha: 0, y: 20 });
        },
      });

      // Ajouter l'animation à la timeline
      timelineRef.current.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: ease,
      });

      // Si animateOnScroll est false, jouer l'animation immédiatement
      if (!animateOnScroll) {
        timelineRef.current.play();
      }

      // Sinon, configurer l'animation au scroll
      if (animateOnScroll) {
        gsap.to(timelineRef.current, {
          progress: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: textRef },
  );

  // Nettoyer l'animation quand le composant est démonté
  useEffect(() => {
    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div ref={textRef} className="text-reveal">
      {children}
    </div>
  );
}

export default TextReveal;`,
    demo: `import { TextReveal } from "../components/gsap-components/TextReveal";
import { useState } from "react";

export default function TextRevealDemo() {
  const [splitType, setSplitType] = useState("lines");

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
            className={\`rounded-full px-4 py-2 text-sm font-medium transition-colors \${
              splitType === type
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-secondary hover:text-primary"
            }\`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}`
  },

  // RollingText
  "rolling-text": {
    component: `import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * Composant RollingText pour créer un effet de texte qui défile verticalement
 * @param {Object} props - Propriétés du composant
 * @param {Array<string>} props.words - Liste des mots à afficher en séquence
 * @param {number} props.letterHeight - Hauteur du déplacement des lettres (en pixels)
 * @param {string} props.innerClass - Classes CSS pour le conteneur interne
 */
export function RollingText({
  words = ["GSAP", "Animation", "React"],
  letterHeight = 30,
  innerClass = "",
}) {
  const containerRef = useRef(null);
  const currentWordRef = useRef(0);
  const timelineRef = useRef(null);
  const splitTextsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const wordElements = [];

    // Créer un élément pour chaque mot
    words.forEach((word, index) => {
      const wordEl = document.createElement("div");
      wordEl.className = "absolute inset-0";
      wordEl.style.opacity = index === 0 ? "1" : "0";
      wordEl.textContent = word;
      container.appendChild(wordEl);
      wordElements.push(wordEl);
    });

    // Créer les objets SplitText pour chaque mot
    splitTextsRef.current = wordElements.map(
      (el) => new SplitText(el, { type: "chars" })
    );

    // Fonction récursive pour animer les mots en séquence
    const animateWord = (index) => {
      const currentIndex = index % words.length;
      const nextIndex = (index + 1) % words.length;
      
      const currentSplit = splitTextsRef.current[currentIndex];
      const nextSplit = splitTextsRef.current[nextIndex];
      
      // Calculer la durée d'affichage en fonction de la longueur du mot
      const displayDuration = Math.max(0.5, words[currentIndex].length * 0.1);
      
      // Timeline pour l'animation
      const tl = gsap.timeline({
        onComplete: () => animateWord(index + 1),
      });
      
      // Réinitialiser l'état du prochain mot
      tl.set(wordElements[nextIndex], { autoAlpha: 1 });
      tl.set(nextSplit.chars, {
        y: letterHeight,
        rotationX: -90,
        opacity: 0,
      });
      
      // Animer l'entrée du mot actuel si c'est le premier cycle
      if (index === 0) {
        tl.from(currentSplit.chars, {
          y: letterHeight,
          rotationX: -90,
          opacity: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "back.out(1.7)",
        });
        
        // Pause pour afficher le mot
        tl.to({}, { duration: displayDuration });
      }
      
      // Animer la sortie du mot actuel
      tl.to(currentSplit.chars, {
        y: -letterHeight,
        rotationX: 90,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "back.in(1.7)",
      });
      
      // Animer l'entrée du prochain mot à mi-chemin de la sortie du mot actuel
      tl.to(nextSplit.chars, {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: "back.out(1.7)",
      }, ">-0.3");
      
      // Pause pour afficher le prochain mot
      tl.to({}, { duration: displayDuration });
      
      return tl;
    };

    // Démarrer l'animation
    timelineRef.current = animateWord(0);

    // Nettoyage
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      splitTextsRef.current.forEach((split) => split.revert());
    };
  }, [words, letterHeight]);

  return (
    <div className={\`relative overflow-hidden \${innerClass}\`} ref={containerRef}></div>
  );
}

export default RollingText;`,
    demo: `import { useState } from "react";
import { RollingText } from "../components/gsap-components/RollingText";

export default function RollingTextDemo() {
  const [demoType, setDemoType] = useState("counter");

  return (
    <div className="flex flex-col items-center">
      {/* Affichage de la démo sélectionnée */}
      <div className="flex min-h-[150px] w-full items-center justify-center">
        {demoType === "counter" ? (
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
            <div className="whitespace-nowrap text-3xl font-[200]">
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
            onClick={() => setDemoType(demo.id)}
            className={\`rounded-full px-4 py-2 text-sm font-medium transition-colors \${
              demoType === demo.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-secondary hover:text-primary"
            }\`}
          >
            {demo.label}
          </button>
        ))}
      </div>
    </div>
  );
}`
  },

  // FadeInScroll
  "fade-in-scroll": {
    component: `import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Composant FadeInScroll pour animer l'apparition d'éléments au scroll
 */
export function FadeInScroll({
  children,
  duration = 0.8,
  y = 50,
  stagger = 0.1,
  ease = "power2.out",
  threshold = 0.2,
  markers = false,
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Sélectionner tous les enfants directs du conteneur
      const elements = container.children;

      // Configurer l'état initial
      gsap.set(elements, { autoAlpha: 0, y: y });

      // Créer l'animation de fade in
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: ease,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: markers,
          threshold: threshold,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="fade-in-scroll">
      {children}
    </div>
  );
}

export default FadeInScroll;`,
    demo: `import { FadeInScroll } from "../components/gsap-components/FadeInScroll";

export default function FadeInScrollDemo() {
  return (
    <div className="w-full max-w-xl">
      <FadeInScroll>
        <div className="mb-4 rounded-lg bg-card p-6 shadow-md">
          <h3 className="mb-2 text-xl font-bold">Fade In On Scroll</h3>
          <p>This card will fade in as you scroll down the page.</p>
        </div>
        
        <div className="mb-4 rounded-lg bg-card p-6 shadow-md">
          <h3 className="mb-2 text-xl font-bold">Staggered Animation</h3>
          <p>Each element appears with a slight delay after the previous one.</p>
        </div>
        
        <div className="mb-4 rounded-lg bg-card p-6 shadow-md">
          <h3 className="mb-2 text-xl font-bold">Smooth Transitions</h3>
          <p>The animations are smooth and subtle, enhancing the user experience.</p>
        </div>
        
        <div className="rounded-lg bg-card p-6 shadow-md">
          <h3 className="mb-2 text-xl font-bold">Customizable</h3>
          <p>You can customize the animation duration, ease, and other parameters.</p>
        </div>
      </FadeInScroll>
    </div>
  );
}`
  }
};
