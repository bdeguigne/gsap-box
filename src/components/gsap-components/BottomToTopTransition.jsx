import React, { useState, useEffect, useRef } from "react";
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

export default BottomToTopTransition;
