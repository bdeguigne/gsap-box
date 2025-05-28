import { useNavigate } from "react-router-dom";
import { ComponentCard } from "../components/ComponentCard";
import { TextReveal } from "../components/gsap-components/TextReveal";
import { FadeInScroll } from "../components/gsap-components/FadeInScroll";
import { StaggeredGrid } from "../components/ui/staggered-grid";
import { RollingText } from "../components/gsap-components/RollingText";
import BottomToTopTransitionAutoDemo from "../demo/BottomToTopTransitionAutoDemo";
import SplitTransitionAutoDemo from "../demo/SplitTransitionAutoDemo";
import FadeInScrollAutoDemo from "../demo/FadeInScrollAutoDemo";
import { Button } from "../components/ui/button";

// Exemples de code pour les composants
const textRevealCode = `import { TextReveal } from "./components/gsap-components/TextReveal";

<TextReveal>
  <p>This is a text reveal animation</p>
  <p>It will animate character by character</p>
</TextReveal>`;

const fadeInScrollCode = `import { FadeInScroll } from "./components/gsap-components/fade-in-scroll";

<FadeInScroll>
  <div>This content will fade in on scroll</div>
</FadeInScroll>`;

const rollingTextCode = `import { RollingText } from "./components/gsap-components/RollingText";

<RollingText words={["ROLLING", "TEXT", "ANIMATION"]} />`;

export default function Components() {
  const navigate = useNavigate();

  // Fonction pour naviguer vers la page de détail du composant
  // On passe uniquement des données sérialisables (pas de composants React)
  const navigateToComponent = (id, componentName, code) => {
    navigate(`/component/${id}`, {
      state: {
        title: componentName,
        code: code,
      },
    });
  };

  return (
    <>
      {/* Header */}
      <section className="border-b border-dashed border-gray-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <FadeInScroll>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Animation Components
            </h1>
            <p className="text-secondary mb-8 max-w-2xl text-lg">
              Browse our collection of reusable GSAP animation components for
              React. Click on any component to view details and code examples.
            </p>
          </FadeInScroll>
        </div>
      </section>

      {/* Text Animations Section */}
      <section
        id="components"
        className="bg-[#0d0d10] px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-6xl">
          <FadeInScroll>
            <h2 className="mb-1 text-2xl font-medium tracking-tight">
              Text Animations
            </h2>
            <p className="text-secondary mb-6 text-sm">
              Nice, simple, and reusable text animations.
            </p>
          </FadeInScroll>

          <StaggeredGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard
              title="Text Reveal"
              preview={
                <TextReveal
                  animateOnScroll={false}
                  repeat={true}
                  splitType="letters"
                >
                  <h3 className="mb-4 text-2xl font-bold">
                    Text Reveal Animation
                  </h3>
                  <p className="text-sm">
                    This is a text reveal animation using GSAP and SplitText
                  </p>
                  <p className="text-secondary text-sm">
                    It will animate character by character
                  </p>
                </TextReveal>
              }
              onClick={() =>
                navigateToComponent(
                  "text-reveal",
                  "Text Reveal",
                  textRevealCode,
                )
              }
            />

            <ComponentCard
              title="Rolling Text"
              preview={
                <div className="flex items-center justify-center">
                  <div className="text-xl font-[200] whitespace-nowrap">
                    Motion creates{" "}
                    <span className="inline-block">
                      <RollingText
                        innerClass="text-xl font-bold text-accent inline-block"
                        words={["impact.", "wonder.", "rhythm.", "appeal."]}
                        letterHeight={15}
                      />
                    </span>
                  </div>
                </div>
              }
              onClick={() =>
                navigateToComponent(
                  "rolling-text",
                  "Rolling Text",
                  rollingTextCode,
                )
              }
            />

            <ComponentCard
              title="Fade In Scroll"
              preview={<FadeInScrollAutoDemo />}
              onClick={() =>
                navigateToComponent(
                  "fade-in-scroll",
                  "Fade In Scroll",
                  fadeInScrollCode,
                )
              }
            />
          </StaggeredGrid>
        </div>
      </section>

      <section
        id="page-transition"
        className="bg-[#0d0d10] px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-6xl">
          <FadeInScroll>
            <h2 className="mb-1 text-2xl font-medium tracking-tight">
              Page Transitions
            </h2>
            <p className="text-secondary mb-6 text-sm">
              Smooth page transitions.
            </p>
          </FadeInScroll>
          <StaggeredGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard
              title="Bottom-to-Top Transition"
              preview={<BottomToTopTransitionAutoDemo />}
              onClick={() =>
                navigateToComponent(
                  "bottom-to-top-transition",
                  "Bottom-to-Top Transition",
                )
              }
            />
            <ComponentCard
              title="Split Page Transition"
              preview={<SplitTransitionAutoDemo />}
              onClick={() =>
                navigateToComponent(
                  "split-page-transition",
                  "Split Page Transition",
                )
              }
            />
          </StaggeredGrid>
        </div>
      </section>
    </>
  );
}
