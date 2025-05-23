import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "../../lib/utils";

export function PageTransition({
  children,
  duration = 0.8,
  ease = "power3.inOut",
  className,
  ...props
}) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  
  useGSAP(() => {
    if (!containerRef.current || !overlayRef.current) return;
    
    const tl = gsap.timeline();
    
    // Initial state - overlay covers the content
    gsap.set(overlayRef.current, { 
      y: "0%",
      autoAlpha: 1
    });
    
    // Content is hidden initially
    gsap.set(containerRef.current, { 
      autoAlpha: 0
    });
    
    // Animate the overlay away and reveal content
    tl.to(overlayRef.current, {
      y: "-100%",
      duration: duration,
      ease: ease
    })
    .to(containerRef.current, {
      autoAlpha: 1,
      duration: duration / 2,
      ease: "power2.out"
    }, `-=${duration / 2}`);
    
  }, []);
  
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Overlay element */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-background z-10"
      />
      
      {/* Content container */}
      <div ref={containerRef} className="opacity-0">
        {children}
      </div>
    </div>
  );
}
