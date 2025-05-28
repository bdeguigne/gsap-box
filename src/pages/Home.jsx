import { useNavigate } from "react-router-dom";
import { ComponentCard } from "../components/ComponentCard";
import { TextReveal } from "../components/gsap-components/TextReveal";
import { FadeInScroll } from "../components/gsap-components/FadeInScroll";
import { StaggeredGrid } from "../components/ui/staggered-grid";
import { RollingText } from "../components/gsap-components/RollingText";
import BottomToTopTransitionAutoDemo from "../demo/BottomToTopTransitionAutoDemo";
import SplitTransitionAutoDemo from "../demo/SplitTransitionAutoDemo";
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

export default function Home() {
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
      {/* Hero Section */}
      <section className="relative border-b border-dashed border-gray-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl space-y-6">
          <TextReveal>
            <h1 className="tracking text-4xl font-semibold md:text-5xl">
              Reusable GSAP Animations For React Developers
            </h1>

            <p className="text-secondary mt-4 max-w-2xl text-xl font-light">
              A curated collection of beautiful and reusable GSAP animations.
              Plug & Play for any React project.
            </p>
          </TextReveal>

          <FadeInScroll>
            <div className="flex gap-4">
              <Button variant="default">Browse Components</Button>
              <Button variant="outline">Github</Button>
            </div>
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
              preview={
                <div className="flex h-[100px] items-center justify-center">
                  <div className="bg-accent rounded-md px-4 py-2 text-sm font-medium text-white">
                    Fade In On Scroll
                  </div>
                </div>
              }
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
      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <FadeInScroll>
            <h2 className="mb-12 text-center text-3xl font-bold">
              How It Works
            </h2>
          </FadeInScroll>

          <div className="space-y-8">
            <FadeInScroll>
              <div className="bg-card border-border rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  <span
                    role="img"
                    aria-label="Choose a Component"
                    className="mr-2 inline-block align-middle"
                  >
                    🧩
                  </span>
                  Choose a Component
                </h3>
                <p className="text-secondary">
                  Browse the library of GSAP components and select the one that
                  fits your needs.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll>
              <div className="bg-card border-border rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  <span
                    role="img"
                    aria-label="Copy the Code"
                    className="mr-2 inline-block align-middle"
                  >
                    📋
                  </span>
                  Copy the Code
                </h3>
                <p className="text-secondary">
                  View and copy the component code directly into your React
                  project.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll>
              <div className="bg-card border-border rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  <span
                    role="img"
                    aria-label="Customize"
                    className="mr-2 inline-block align-middle"
                  >
                    🎨
                  </span>
                  Customize
                </h3>
                <p className="text-secondary">
                  Adjust the parameters to customize the animation to your
                  specific needs.
                </p>
              </div>
            </FadeInScroll>
          </div>
        </div>
      </section>
    </>
  );
}
