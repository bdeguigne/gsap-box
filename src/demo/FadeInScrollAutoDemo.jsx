import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * Composant de démo automatique pour FadeInScroll
 * Anime en boucle des éléments avec un effet de fade in et fade out
 */
export default function FadeInScrollAutoDemo() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".card");
    
    // Réinitialiser l'état initial
    gsap.set(cards, { autoAlpha: 0, y: 15 });
    
    // Créer une timeline pour l'animation en boucle
    timelineRef.current = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    
    // Animation de fade in pour chaque carte avec un délai
    cards.forEach((card, index) => {
      // Fade in
      timelineRef.current.to(
        card, 
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out" 
        }, 
        index * 0.2 // Délai entre chaque carte
      );
    });
    
    // Pause avant de commencer le fade out
    timelineRef.current.to({}, { duration: 1.5 });
    
    // Animation de fade out pour chaque carte avec un délai
    cards.forEach((card, index) => {
      // Fade out
      timelineRef.current.to(
        card, 
        { 
          autoAlpha: 0, 
          y: -15, 
          duration: 0.6, 
          ease: "power2.in" 
        }, 
        `>-${0.4 - index * 0.1}` // Délai légèrement chevauchant pour le fade out
      );
    });

    return () => {
      // Nettoyer l'animation lors du démontage
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="w-full max-w-[200px]">
        <div className="card mb-2 rounded-lg bg-card p-3 shadow-md">
          <h4 className="text-sm font-medium">Reveal on Scroll</h4>
          <p className="text-secondary text-xs">Elegant animations</p>
        </div>
        <div className="card mb-2 rounded-lg bg-card p-3 shadow-md">
          <h4 className="text-sm font-medium">Sequential</h4>
          <p className="text-secondary text-xs">Timed appearance</p>
        </div>
      </div>
    </div>
  );
}
