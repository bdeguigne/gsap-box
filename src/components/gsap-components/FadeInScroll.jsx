import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function FadeInScroll({
  children,
  y = 50,
  opacity = 0,
  duration = 0.8,
  delay = 0,
  ease = "power3.out",
  className,
  ...props
}) {
  const elementRef = useRef(null);

  useGSAP(
    () => {
      if (!elementRef.current) return;

      gsap.fromTo(
        elementRef.current,
        {
          y: y,
          opacity: opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: ease,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 90%",
            end: "bottom 70%",
            once: true,
          },
        },
      );
    },
    { scope: elementRef },
  );

  return (
    <div ref={elementRef} className={cn("opacity-0", className)} {...props}>
      {children}
    </div>
  );
}
