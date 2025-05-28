import React, { useState, useEffect, useRef } from "react";
import { SplitPageTransition } from "../components/gsap-components/SplitPageTransition";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Automatic demo of the SplitPageTransition component with text reveal effect
 */
export function SplitTransitionAutoDemo() {
  const [transitionState, setTransitionState] = useState("inactive");
  const timeoutRef = useRef(null);

  // Overlay customization options
  const overlayOptions = {
    color: "#121212",
    showDivider: true,
    dividerColor: "white",
  };

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

  useEffect(() => {
    setTransitionState("entering");

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // References for text animation
  const helloRef = useRef(null);
  const worldRef = useRef(null);

  // Text reveal animation with masks
  useGSAP(
    () => {
      if (
        helloRef.current &&
        worldRef.current &&
        helloRef.current.mask &&
        worldRef.current.mask
      ) {
        if (transitionState === "entering") {
          const tl = gsap.timeline({ delay: 0.8 });

          tl.set(
            [
              helloRef.current,
              worldRef.current,
              helloRef.current.mask,
              worldRef.current.mask,
            ],
            {
              y: 0,
              autoAlpha: 1,
            },
          );

          tl.set([helloRef.current.mask, worldRef.current.mask], {
            scaleY: 1,
            y: 0,
          });

          // Reveal text by retracting masks
          tl.to(
            helloRef.current.mask,
            {
              scaleY: 0,
              duration: 0.6,
              ease: "power2.inOut",
            },
            0,
          );

          tl.to(
            worldRef.current.mask,
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
            helloRef.current.mask,
            {
              scaleY: 1,
              duration: 0.6,
              ease: "power2.inOut",
            },
            ">-0.1",
          );

          tl.to(
            worldRef.current.mask,
            {
              scaleY: 1,
              duration: 0.6,
              ease: "power2.inOut",
            },
            ">-0.5",
          );

          // Hide elements completely after animation
          tl.to(
            [helloRef.current, helloRef.current.mask],
            {
              autoAlpha: 0,
              duration: 0,
            },
            "<+0.5",
          );

          tl.to(
            [worldRef.current, worldRef.current.mask],
            {
              autoAlpha: 0,
              duration: 0,
            },
            "<",
          );
        }
      }
    },
    { dependencies: [transitionState] },
  );

  const overlayContent = (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-1/2 justify-end pr-2">
          <div className="relative overflow-hidden">
            <h1
              ref={helloRef}
              className="text-xl font-light tracking-wider text-white"
            >
              HELLO
            </h1>
            {/* Mask for HELLO */}
            <div
              className="absolute top-0 left-0 h-full w-full transform-gpu bg-[#121212]"
              style={{ transformOrigin: "top" }}
              ref={(el) => {
                if (el && helloRef.current) {
                  helloRef.current.mask = el;
                }
              }}
            />
          </div>
        </div>

        <div className="flex w-1/2 justify-start pl-2">
          <div className="relative overflow-hidden">
            <h1
              ref={worldRef}
              className="text-xl font-light tracking-wider text-white"
            >
              WORLD
            </h1>
            {/* Mask for WORLD */}
            <div
              className="absolute top-0 left-0 h-full w-full transform-gpu bg-[#121212]"
              style={{ transformOrigin: "bottom" }}
              ref={(el) => {
                if (el && worldRef.current) {
                  worldRef.current.mask = el;
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
    <div className="relative h-[150px] w-full overflow-hidden rounded-lg border">
      <SplitPageTransition
        frontPage={overlayContent}
        backPage={content}
        state={transitionState}
        onComplete={handleTransitionComplete}
        autoFadeContent={true} // Disable auto fade content to handle our own animation
        overlayOptions={overlayOptions}
      />
    </div>
  );
}

export default SplitTransitionAutoDemo;
