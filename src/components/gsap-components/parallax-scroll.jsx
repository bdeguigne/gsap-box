import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function ParallaxScroll({
  children,
  speed = 0.5,
  direction = "y",
  className,
  ...props
}) {
  const elementRef = useRef(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Create the parallax effect
    gsap.to(element, {
      [direction]: `${speed * 100}%`,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}
