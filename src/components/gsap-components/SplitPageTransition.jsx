import React, { useRef } from "react";
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
 * @param {string} props.overlayOptions.color - Couleur des blocs de l'overlay (par défaut: '#303030')
 * @param {number} props.overlayOptions.duration - Durée de l'animation en secondes (par défaut: 1)
 * @param {number} props.overlayOptions.stagger - Décalage entre les animations des blocs (par défaut: 0.1)
 * @param {string} props.overlayOptions.ease - Type d'easing pour l'animation (par défaut: 'hop')
 * @param {boolean} props.overlayOptions.showDivider - Afficher ou non le divider (par défaut: true)
 * @param {string} props.overlayOptions.dividerColor - Couleur du divider (par défaut: 'white')
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
          // Set initial state for container
          gsap.set(container, {
            autoAlpha: 1,
            zIndex: 10, // Ensure entering content is above exiting content
          });

          // Set initial state for blocks - fully visible
          gsap.set([leftBlock, rightBlock], {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            autoAlpha: 1,
            transformOrigin: "center center",
          });

          // Set divider initial state - completely hidden
          gsap.set(divider, {
            scaleY: 0,
            autoAlpha: 0,
            transformOrigin: "center top",
          });

          gsap.set(frontPageRef.current, {
            autoAlpha: 1,
          });

          // Create the entrance animation sequence
          const tl = gsap.timeline({
            defaults: {
              ease: "hop",
            },
            onComplete: () => onComplete && onComplete("enter-complete"),
          });

          // Séquence d'animation
          if (showDivider) {
            // 1. Le divider apparaît clairement - du haut vers le bas
            tl.to(divider, {
              scaleY: "100%",
              autoAlpha: 1,
              duration: dividerDuration,
              delay: 0.35,
            });

            // 2. Le divider disparaît
            tl.to(divider, {
              autoAlpha: 0,
              duration: 0.6,
              delay: 0.2,
            });
          }

          // Animer le front page
          tl.to(
            frontPageRef.current,
            {
              autoAlpha: 0,
              duration: 0.5,
              delay: 0.2,
            },
            "<",
          );

          // Animer les deux blocs avec le clipPath approprié selon la direction
          if (direction === "vertical") {
            // Animation verticale (vers le haut)
            tl.to([leftBlock, rightBlock], {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Les deux blocs vers le haut
              duration: duration,
              stagger: stagger,
            });
          } else {
            // Animation horizontale (vers les côtés)
            tl.to(
              leftBlock,
              {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", // Bloc gauche vers la gauche
                duration: duration,
              },
              "<",
            );

            tl.to(
              rightBlock,
              {
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", // Bloc droit vers la droite
                duration: duration,
              },
              "<+" + stagger,
            );
          }

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

      {/* Contenu de la page de premier plan (celle qui se split) */}
      <div ref={frontPageRef} className="absolute inset-0 z-20">
        {frontPage}
      </div>

      {/* Contenu de la page d'arrière-plan (révélée après le split) */}
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

export default SplitPageTransition;
