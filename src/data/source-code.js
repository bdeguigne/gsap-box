export const sourceCode = {
  // SplitPageTransition
  "split-page-transition": {
    component: `import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

/**
 * Split page transition component that divides the page in two parts
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.frontPage - Front page content (the one that splits)
 * @param {React.ReactNode} props.backPage - Background page content (revealed after the split)
 * @param {string} props.state - Current state: 'entering', 'active', 'exiting', or 'inactive'
 * @param {Function} props.onComplete - Callback when transition completes
 * @param {Object} props.overlayOptions - Customization options for the overlay
 * @param {string} props.overlayOptions.color - Color of the overlay blocks (default: '#303030')
 * @param {number} props.overlayOptions.duration - Animation duration in seconds (default: 1)
 * @param {number} props.overlayOptions.stagger - Delay between block animations (default: 0.1)
 * @param {string} props.overlayOptions.ease - Easing type for the animation (default: 'hop')
 * @param {boolean} props.overlayOptions.showDivider - Whether to show the divider (default: true)
 * @param {string} props.overlayOptions.dividerColor - Color of the divider (default: 'white')
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

      // Create custom easing
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

          // Animation sequence
          if (showDivider) {
            // 1. Divider appears clearly - from top to bottom
            tl.to(divider, {
              scaleY: "100%",
              autoAlpha: 1,
              duration: dividerDuration,
              delay: 0.35,
            });

            // 2. Divider disappears
            tl.to(divider, {
              autoAlpha: 0,
              duration: 0.6,
              delay: 0.2,
            });
          }

          // Animate the front page
          tl.to(
            frontPageRef.current,
            {
              autoAlpha: 0,
              duration: 0.5,
              delay: 0.2,
            },
            "<",
          );

          // Animate both blocks with appropriate clipPath based on direction
          if (direction === "vertical") {
            // Vertical animation (upward)
            tl.to([leftBlock, rightBlock], {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Both blocks move upward
              duration: duration,
              stagger: stagger,
            });
          } else {
            // Horizontal animation (sideways)
            tl.to(
              leftBlock,
              {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", // Left block moves left
                duration: duration,
              },
              "<",
            );

            tl.to(
              rightBlock,
              {
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", // Right block moves right
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
      {/* Overlay that splits */}
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

      {/* Front page content (the one that splits) */}
      <div ref={frontPageRef} className="absolute inset-0 z-20">
        {frontPage}
      </div>

      {/* Background page content (revealed after the split) */}
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
export default function SplitTransitionDemo() {
  const [transitionState, setTransitionState] = useState("inactive");
  const [direction, setDirection] = useState("vertical");
  const timeoutRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Overlay customization options - recalculated when direction changes
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

  // Handle transition completion and schedule next animation
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

      // Reset masks
      if (leftRef.current.mask && rightRef.current.mask) {
        gsap.set([leftRef.current.mask, rightRef.current.mask], {
          scaleX: 1,
          scaleY: 1,
          x: 0,
          y: 0,
          autoAlpha: 1,
          clearProps: "transform,opacity,visibility",
        });
      }
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

  // Custom Text reveal animation with masks for the overlay
  useGSAP(
    () => {
      if (
        leftRef.current &&
        rightRef.current &&
        leftRef.current.mask &&
        rightRef.current.mask
      ) {
        // Reset any ongoing animations when state changes
        if (transitionState === "inactive") {
          gsap.killTweensOf([
            leftRef.current,
            rightRef.current,
            leftRef.current.mask,
            rightRef.current.mask,
          ]);
          return;
        }

        if (transitionState === "entering") {
          const tl = gsap.timeline({ delay: 0.8 });

          // Reset state
          tl.set(
            [
              leftRef.current,
              rightRef.current,
              leftRef.current.mask,
              rightRef.current.mask,
            ],
            {
              autoAlpha: 1,
            },
          );

          // Set up masks based on direction
          if (direction === "vertical") {
            tl.set([leftRef.current.mask, rightRef.current.mask], {
              scaleY: 1,
              y: 0,
            });

            // Reveal text by retracting masks vertically
            tl.to(
              leftRef.current.mask,
              {
                scaleY: 0,
                duration: 0.6,
                ease: "power2.inOut",
              },
              0,
            );

            tl.to(
              rightRef.current.mask,
              {
                scaleY: 0,
                duration: 0.6,
                ease: "power2.inOut",
              },
              0.1,
            );

            // Pause to display text
            tl.to({}, { duration: 0.6 });

            // Hide text by extending masks
            tl.to(
              leftRef.current.mask,
              {
                scaleY: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              ">-0.1",
            );

            tl.to(
              rightRef.current.mask,
              {
                scaleY: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              ">-0.5",
            );
          } else {
            // Horizontal animation
            tl.set([leftRef.current.mask, rightRef.current.mask], {
              scaleX: 1,
              x: 0,
            });

            // Reveal text by retracting masks horizontally
            tl.to(
              leftRef.current.mask,
              {
                scaleX: 0,
                duration: 0.6,
                ease: "power2.inOut",
              },
              0,
            );

            tl.to(
              rightRef.current.mask,
              {
                scaleX: 0,
                duration: 0.6,
                ease: "power2.inOut",
              },
              0.1,
            );

            // Pause to display text
            tl.to({}, { duration: 0.6 });

            // Hide text by extending masks
            tl.to(
              leftRef.current.mask,
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              ">-0.1",
            );

            tl.to(
              rightRef.current.mask,
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut",
              },
              ">-0.5",
            );
          }

          // Hide elements completely after animation
          tl.to(
            [leftRef.current, leftRef.current.mask],
            {
              autoAlpha: 0,
              duration: 0,
            },
            "<+0.5",
          );

          tl.to(
            [rightRef.current, rightRef.current.mask],
            {
              autoAlpha: 0,
              duration: 0,
            },
            "<",
          );
        }
      }
    },
    { dependencies: [transitionState, direction] },
  );

  // Overlay content with masked text
  const overlayContent = (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-1/2 justify-end pr-2">
          <div className="relative overflow-hidden">
            <h1
              ref={leftRef}
              className="text-xl font-light tracking-wider text-white"
            >
              {direction === "vertical" ? "HELLO" : "LEFT"}
            </h1>
            <div
              className="absolute top-0 left-0 h-full w-full transform-gpu bg-[#121212]"
              style={{
                transformOrigin: direction === "vertical" ? "top" : "left",
              }}
              ref={(el) => {
                if (el && leftRef.current) {
                  leftRef.current.mask = el;
                }
              }}
            />
          </div>
        </div>

        <div className="flex w-1/2 justify-start pl-2">
          <div className="relative overflow-hidden">
            <h1
              ref={rightRef}
              className="text-xl font-light tracking-wider text-white"
            >
              {direction === "vertical" ? "WORLD" : "RIGHT"}
            </h1>
            <div
              className="absolute top-0 left-0 h-full w-full transform-gpu bg-[#121212]"
              style={{
                transformOrigin: direction === "vertical" ? "bottom" : "right",
              }}
              ref={(el) => {
                if (el && rightRef.current) {
                  rightRef.current.mask = el;
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Background content
  const content = (
    <div className="flex h-full flex-col items-center justify-center bg-green-50 p-4">
      <h2 className="text-sm font-medium text-black/80">Your content here</h2>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="border-border relative h-[300px] w-full overflow-hidden rounded-lg border">
        <SplitPageTransition
          frontPage={overlayContent}
          backPage={content}
          state={transitionState}
          onComplete={handleTransitionComplete}
          overlayOptions={overlayOptions}
          direction={direction}
        />
      </div>

      {/* Direction toggle buttons */}
      <div className="mt-8 flex justify-center gap-2">
        {[
          { id: "vertical", label: "Vertical" },
          { id: "horizontal", label: "Horizontal" },
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => handleDirectionChange(option.id)}
            className={\`rounded-full px-4 py-2 text-sm font-medium transition-colors \${\n              direction === option.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-secondary hover:text-primary"
            }\`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}`,
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

export default SplitTransitionDemo;`,
  },

  // BottomToTopTransition
  "bottom-to-top-transition": {
    component: `import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Bottom-to-top page transition component
 * @param {Object} props - Component props
 * @param {Array} props.pages - Array of page objects with {id, content}
 * @param {number} props.activePage - ID of the active page
 * @param {Function} props.onTransitionComplete - Callback called when a transition is complete
 */
export function BottomToTopTransition({
  pages,
  activePage,
  onTransitionComplete,
}) {
  // Initialize page states
  const [pageStates, setPageStates] = useState({});
  const [previousActivePage, setPreviousActivePage] = useState(null);

  // Initialize states on first render
  useEffect(() => {
    const initialStates = {};
    pages.forEach((page) => {
      initialStates[page.id] = page.id === activePage ? "active" : "inactive";
    });
    setPageStates(initialStates);
    setPreviousActivePage(activePage);
  }, []);

  // Handle active page changes
  useEffect(() => {
    if (previousActivePage !== null && previousActivePage !== activePage) {
      // Start the transition
      setPageStates((prev) => ({
        ...prev,
        [previousActivePage]: "exiting",
        [activePage]: "entering",
      }));
    }

    setPreviousActivePage(activePage);
  }, [activePage, previousActivePage]);

  // Handle transition events
  const handleTransition = (type, pageId) => {
    if (type === "enter-complete") {
      // When the page has finished entering, update states
      setPageStates((prev) => {
        const newStates = { ...prev };
        // Set all pages to inactive except the active one
        Object.keys(newStates).forEach((key) => {
          const id = parseInt(key);
          newStates[key] = id === activePage ? "active" : "inactive";
        });
        return newStates;
      });

      // Notify that the transition is complete
      if (onTransitionComplete) {
        onTransitionComplete("enter-complete", pageId);
      }
    } else if (type === "exit-complete") {
      // Notify that the exit is complete
      if (onTransitionComplete) {
        onTransitionComplete("exit-complete", pageId);
      }
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {pages.map((page) => (
        <PageTransition
          key={page.id}
          state={pageStates[page.id] || "inactive"}
          onComplete={(type) => handleTransition(type, page.id)}
        >
          {page.content}
        </PageTransition>
      ))}
    </div>
  );
}

/**
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be displayed
 * @param {string} props.state - Current state: 'entering', 'active', 'exiting', or 'inactive'
 * @param {Function} props.onComplete - Callback when transition completes
 */
function PageTransition({ children, state, onComplete }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Reset any ongoing animations
      gsap.killTweensOf(container);

      switch (state) {
        case "entering":
          // Start hidden and wait for the exiting animation to complete
          gsap.set(container, {
            autoAlpha: 0,
            clipPath: "inset(100% 0 0 0)",
            zIndex: 10, // Ensure entering content is above exiting content
          });

          // Delay the entrance animation to create a brief black screen moment
          gsap
            .timeline()
            .to(container, {
              autoAlpha: 1,
              delay: 0.4, // Delay to create the black screen pause
              duration: 0.01,
            })
            .to(container, {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.4, // Fast reveal from bottom
              ease: "power2.inOut",
              onComplete: () => onComplete && onComplete("enter-complete"),
            });
          break;

        case "active":
          // Fully visible
          gsap.set(container, {
            autoAlpha: 1,
            clipPath: "inset(0% 0 0 0)",
            zIndex: 5, // Normal z-index for active content
          });
          break;

        case "exiting":
          // Start visible and quickly animate out to top
          gsap.set(container, {
            autoAlpha: 1,
            clipPath: "inset(0% 0 0 0)",
            zIndex: 1, // Lower z-index for exiting content
          });

          gsap.to(container, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.4, // Fast exit to reveal black background
            ease: "power1.inOut",
            onComplete: () => {
              // Hide completely after animation
              gsap.set(container, { autoAlpha: 0 });
              onComplete && onComplete("exit-complete");
            },
          });
          break;

        case "inactive":
        default:
          // Hidden
          gsap.set(container, {
            autoAlpha: 0,
            clipPath: "inset(100% 0 0 0)",
            zIndex: 0, // Lowest z-index for inactive content
          });
          break;
      }
    },
    { dependencies: [state, onComplete] },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        visibility: state === "inactive" ? "hidden" : "visible",
        clipPath: "inset(100% 0 0 0)", // Initial clip state
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: state === "entering" ? 10 : state === "active" ? 5 : 1,
        backgroundColor: "white", // Page background color
      }}
    >
      {children}
    </div>
  );
}

export default BottomToTopTransition;`,
    demo: `import React, { useState } from "react";
import BottomToTopTransition from "../components/gsap-components/BottomToTopTransition";

export default function BottomToTopTransitionDemo() {
  const [currentPage, setCurrentPage] = useState(1);

  // Demo pages with contrasting styles
  const pages = [
    {
      id: 1,
      content: (
        <div className="flex h-full flex-col items-center justify-center bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-blue-800">First Page</h2>
          <p className="mb-6 text-center text-sm text-blue-600">
            This page has a blue theme
          </p>
          <button
            onClick={() => setCurrentPage(2)}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Go to Green Page
          </button>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex h-full flex-col items-center justify-center bg-green-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-green-800">Second Page</h2>
          <p className="mb-6 text-center text-sm text-green-600">
            This page has a green theme
          </p>
          <button
            onClick={() => setCurrentPage(1)}
            className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            Go to Blue Page
          </button>
        </div>
      ),
    },
  ];

  // Handle transition events (optional)
  const handleTransitionComplete = (type, pageId) => {
    console.log(\`Transition \${type} completed for page \${pageId}\`);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg border bg-black"
      style={{ height: "300px" }}
    >
      {/* Debug info */}
      <div className="absolute top-0 right-0 z-50 bg-black/10 p-1 text-[10px] text-gray-500">
        Current Page: {currentPage}
      </div>

      {/* Container for pages */}
      <BottomToTopTransition
        pages={pages}
        activePage={currentPage}
        onTransitionComplete={handleTransitionComplete}
      />
    </div>
  );
}`,
  },

  // TextReveal
  "text-reveal": {
    component: `import React, { useRef } from "react";

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
}`,
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

      {/* Mode selection buttons */}
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
}`,
  },

  // RollingText
  "rolling-text": {
    component: `import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * @param {string} innerClass - Additional CSS classes for the container
 * @param {string[]} words - Array of words to animate
 * @param {number} letterHeight - Vertical displacement height for letters (in pixels)
 */
export function RollingText({
  innerClass = "",
  words = [],
  letterHeight = 40,
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const titles = gsap.utils.toArray(".rolling-text");

      const tl = gsap.timeline({
        repeat: -1,
      });

      titles.forEach((title) => {
        const splitText = SplitText.create(title, {
          type: "chars",
          charsClass: "char++",
        });
        tl.from(
          splitText.chars,
          {
            opacity: 0,
            y: letterHeight,
            rotationX: -90,
            stagger: 0.03,
          },
          "<",
        );

        tl.to(
          splitText.chars,
          {
            opacity: 0,
            y: -letterHeight,
            rotationX: 90,
            stagger: 0.03,
          },
          "<1",
        );
      });
    },
    { scope: containerRef }, // Limit the scope of animations to this container
  );

  return (
    <div ref={containerRef} className={\`\${innerClass} w-full text-center\`}>
      <div className="leading-0">
        {/* Map each word from the array to create HTML elements */}
        {[...words].map((word, index) => (
          <h1 className="rolling-text" key={index}>
            {word}
          </h1>
        ))}
      </div>
    </div>
  );
}`,
    demo: `import { useState } from "react";
import { RollingText } from "../components/gsap-components/RollingText";

export default function RollingTextDemo() {
  const [demoType, setDemoType] = useState("counter");

  return (
    <div className="flex flex-col items-center">
      {/* Display of the selected demo */}
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

      {/* Mode selection buttons */}
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
}`,
  },

  // FadeInScroll
  "fade-in-scroll": {
    component: `import { useRef } from "react";
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
}`,
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
}`,
  },
};
