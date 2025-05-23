import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "../../lib/utils";

export function StaggeredGrid({
  children,
  stagger = 0.05,
  duration = 0.8,
  y = 30,
  opacity = 0,
  ease = "power3.out",
  delay = 0,
  className,
  ...props
}) {
  const gridRef = useRef(null);

  useGSAP(() => {
    if (!gridRef.current) return;

    // Get all direct children of the grid
    const items = gridRef.current.children;
    
    // Create the staggered animation
    gsap.fromTo(
      items,
      {
        y: y,
        opacity: opacity,
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: ease,
        delay: delay,
      }
    );
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn("grid", className)}
      {...props}
    >
      {children}
    </div>
  );
}
