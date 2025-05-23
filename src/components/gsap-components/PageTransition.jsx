/**
 * PageTransition Component
 *
 * A component that provides smooth page transitions using GSAP and clip-path.
 * This version implements a bottom-to-top transition with a clipping effect.
 *
 * @author Brice Deguigne
 * @version 1.0.0
 */

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

/**
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be displayed
 * @param {string} props.state - Current state: 'entering', 'active', 'exiting', or 'inactive'
 * @param {Function} props.onComplete - Callback when transition completes
 */
export function PageTransition({ children, state, onComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
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
  }, [state, onComplete]);

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

/**
 * Demo component to showcase the PageTransition
 */
export function PageTransitionDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageStates, setPageStates] = useState({
    1: "active",
    2: "inactive",
  });

  // Debug log to check state changes
  useEffect(() => {
    console.log("Page states updated:", pageStates);
  }, [pageStates]);

  const handleTransition = (type) => {
    console.log("Transition event:", type);
    if (type === "enter-complete") {
      // When page has finished entering, update states
      setPageStates((prev) => {
        const newStates = {};
        // Set all pages to inactive except the current one
        Object.keys(prev).forEach((key) => {
          newStates[key] =
            parseInt(key) === currentPage ? "active" : "inactive";
        });
        return newStates;
      });
    }
  };

  const changePage = (newPage) => {
    console.log(`Changing page from ${currentPage} to ${newPage}`);
    // Don't allow changes during transition
    if (pageStates[currentPage] !== "active") {
      console.log("Transition already in progress, ignoring");
      return;
    }

    // Start transition
    setPageStates((prev) => {
      console.log("Setting new page states for transition");
      return {
        ...prev,
        [currentPage]: "exiting",
        [newPage]: "entering",
      };
    });

    // Update current page
    setCurrentPage(newPage);
  };

  // Sample page content with contrasting styling to make transitions more visible
  const Page1 = (
    <div className="flex h-full flex-col items-center justify-center bg-blue-50 p-6">
      <h2 className="mb-4 text-xl font-bold text-blue-800">First Page</h2>
      <p className="mb-6 text-center text-sm text-blue-600">
        This page has a blue theme
      </p>
      <button
        onClick={() => changePage(2)}
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
      >
        Go to Green Page
      </button>
    </div>
  );

  const Page2 = (
    <div className="flex h-full flex-col items-center justify-center bg-green-50 p-6">
      <h2 className="mb-4 text-xl font-bold text-green-800">Second Page</h2>
      <p className="mb-6 text-center text-sm text-green-600">
        This page has a green theme
      </p>
      <button
        onClick={() => changePage(1)}
        className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
      >
        Go to Blue Page
      </button>
    </div>
  );

  return (
    <div className="relative mx-auto h-[300px] w-full max-w-md overflow-hidden rounded-lg border bg-black">
      {/* Debug info */}
      <div className="absolute top-0 right-0 z-50 bg-black/10 p-1 text-[10px] text-gray-500">
        Current: {currentPage} | States: {JSON.stringify(pageStates)}
      </div>

      {/* Container for pages */}
      <div className="absolute inset-0 overflow-hidden">
        <PageTransition state={pageStates[1]} onComplete={handleTransition}>
          {Page1}
        </PageTransition>

        <PageTransition state={pageStates[2]} onComplete={handleTransition}>
          {Page2}
        </PageTransition>
      </div>
    </div>
  );
}

export default PageTransitionDemo;
