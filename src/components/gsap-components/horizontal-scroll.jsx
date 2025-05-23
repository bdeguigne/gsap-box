import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function HorizontalScroll({
  children,
  className,
  ...props
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const sections = scrollerRef.current.children;
    const container = containerRef.current;
    
    // Set the width of the container to accommodate all sections
    gsap.set(container, { 
      height: "100vh",
      overflow: "hidden"
    });
    
    // Create the horizontal scrolling effect
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => "+=" + container.offsetWidth,
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      {...props}
    >
      <div 
        ref={scrollerRef}
        className="flex flex-nowrap absolute top-0 left-0 h-full"
      >
        {children}
      </div>
    </div>
  );
}
