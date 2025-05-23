import React, { useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * TextReveal Component
 * Creates beautiful text reveal animations using GSAP and SplitText
 *
 * @param {React.ReactNode} children - Text content to animate
 * @param {boolean} animateOnScroll - Whether to trigger animation on scroll
 * @param {number} delay - Delay before animation starts (in seconds)
 * @param {boolean} repeat - Whether to repeat the animation infinitely
 * @param {string} splitType - Type of text splitting: "lines", "words", or "letters"
 */
export function TextReveal({
  children,
  animateOnScroll = true,
  delay = 0,
  repeat = false,
  splitType = "lines", // Type of split: lines, words, or letters
}) {
  // Reference to store the active timeline
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Clean up previous animations
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Clean up previous splits
      splitRef.current.forEach((split) => {
        if (split) {
          split.revert();
        }
      });

      // Reset references
      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements = [];

      if (containerRef.current.hasAttribute("data-text-reveal-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element, index) => {
        elementRef.current.push(element);

        let splitConfig = {};

        // Specific configuration for each split type
        switch (splitType) {
          case "words":
            splitConfig = {
              type: "words",
              wordsClass: "word++",
              // For words, we also use line masking for better effect
              linesClass: "line-parent",
            };
            break;
          case "letters":
            splitConfig = {
              // Split both into chars and words for better control
              type: "chars,words",
              charsClass: "char++",
              wordsClass: "word-parent",
            };
            break;
          case "lines":
          default:
            splitConfig = {
              type: "lines",
              mask: "lines",
              linesClass: "line++",
            };
            break;
        }

        const split = new SplitText(element, splitConfig);

        splitRef.current.push(split);

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent != "0px") {
          if (split.lines.length > 0) {
            split.lines[0].style.paddingLeft = textIndent;
          }
          element.style.textIndent = "0px";
        }

        if (splitType === "words") {
          lines.current.push(...split.words);
        } else if (splitType === "letters") {
          lines.current.push(...split.chars);
        } else {
          lines.current.push(...split.lines);
        }
      });

      /**
       * Initial animation states and animation properties for each split type
       */

      // Initial states - how elements appear before animation
      const initialStates = {
        lines: {
          y: "110%",
        },
        words: {
          y: "50px",
          opacity: 0,
          rotationX: -90,
        },
        letters: {
          opacity: 0,
          scale: 0,
          y: "10px",
          rotationX: -90,
        },
      };

      // Animation properties - how elements animate in
      const animationConfigs = {
        lines: {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: delay,
        },
        words: {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: delay,
        },
        letters: {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "back.out(1.7)",
          delay: delay,
        },
      };

      // Exit animation properties - how elements animate out (for repeat mode)
      const exitConfigs = {
        lines: {
          y: "-110%",
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.in",
        },
        words: {
          y: "-50px",
          opacity: 0,
          rotationX: 90,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.in",
        },
        letters: {
          opacity: 0,
          scale: 0,
          rotationX: 90,
          duration: 0.4,
          stagger: 0.01,
          ease: "power3.in",
        },
      };

      // Apply initial state based on split type
      gsap.set(lines.current, initialStates[splitType] || initialStates.lines);

      // Get animation properties based on split type
      const animationProps =
        animationConfigs[splitType] || animationConfigs.lines;

      /**
       * Create the animation based on settings
       */
      if (animateOnScroll) {
        // Scroll-triggered animation
        timelineRef.current = gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            once: true,
          },
        });
      } else if (repeat) {
        // Create repeating timeline
        timelineRef.current = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.5,
        });

        // 1. Entrance animation
        timelineRef.current.to(lines.current, animationProps);

        // 2. Pause before exit
        // (using "+=1" label to add a 1 second pause)

        // 3. Exit animation
        const exitConfig = exitConfigs[splitType] || exitConfigs.lines;
        timelineRef.current.to(lines.current, exitConfig, "+=1");

        // 4. Reset for next iteration
        timelineRef.current.set(
          lines.current,
          initialStates[splitType] || initialStates.lines,
        );
      } else {
        // Simple one-time animation
        timelineRef.current = gsap.to(lines.current, animationProps);
      }

      // Cleanup function when component unmounts or dependencies change
      return () => {
        // Only need to revert SplitText instances (timeline cleanup is handled by useGSAP)
        splitRef.current.forEach((split) => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, repeat, splitType],
    },
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-text-reveal-wrapper="true">
      {children}
    </div>
  );
}
