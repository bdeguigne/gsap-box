import React, { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function RollingText({ innerClass, words = [] }) {
  useEffect(() => {
    const titles = gsap.utils.toArray(".rolling-text");

    const tl = gsap.timeline({
      repeat: -1,
      // scrollTrigger: {
      //   trigger: ".canvas-scroll",
      //   start: "top top",
      //   end: "+=800px",
      //   scrub: 1.5,
      //   // markers: true,
      // },
    });

    titles.forEach((title, index) => {
      const splitText = SplitText.create(title, {
        type: "words",
        wordsClass: "rolling-text",
      });

      tl.from(
        splitText.words,
        {
          opacity: 0,
          y: 80,
          rotationX: -90,
          stagger: 0.05,
        },
        "<",
      );

      tl.to(
        splitText.words,
        {
          opacity: 0,
          y: -80,
          rotationX: 90,
          stagger: 0.05,
        },
        "<1",
      );
    });
  }, []);

  return (
    <div className={`${innerClass} w-full text-center`}>
      <div className="leading-0">
        {[...words].map((word, index) => (
          <h1 className="rolling-text" key={index}>
            {word}
          </h1>
        ))}
      </div>
    </div>
  );
}
