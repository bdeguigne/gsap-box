import React, { useRef } from "react";
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
    <div ref={containerRef} className={`${innerClass} w-full text-center`}>
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
}
