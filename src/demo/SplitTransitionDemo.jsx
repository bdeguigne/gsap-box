import React, { useState, useEffect, useRef } from "react";
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

  // Overlay customization options - recalculated when direction changes
  const overlayOptions = React.useMemo(() => ({
    color: "#121212",
    showDivider: true,
    dividerColor: "white",
    stagger: direction === "vertical" ? 0.1 : 0,
    duration: 1
  }), [direction]);

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
  
  // Handle direction change with proper cleanup
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
        clearProps: "all"
      });
      
      // Reset masks
      if (leftRef.current.mask && rightRef.current.mask) {
        gsap.set([leftRef.current.mask, rightRef.current.mask], {
          scaleX: 1,
          scaleY: 1,
          x: 0,
          y: 0,
          autoAlpha: 1,
          clearProps: "transform,opacity,visibility"
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

  // We don't need this effect anymore as handleDirectionChange handles everything

  // Start animation on mount
  useEffect(() => {
    setTransitionState("entering");

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // References for text animation
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Text reveal animation with masks
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
          gsap.killTweensOf([leftRef.current, rightRef.current, leftRef.current.mask, rightRef.current.mask]);
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
      <div className="relative h-[150px] w-full overflow-hidden rounded-lg border">
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
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              direction === option.id
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-secondary hover:text-primary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SplitTransitionDemo;
