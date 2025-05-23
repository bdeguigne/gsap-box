import { MainLayout } from "./layouts/MainLayout";
import { ComponentCard } from "./components/ComponentCard";
import { TextReveal } from "./components/gsap-components/TextReveal";
import { FadeInScroll } from "./components/gsap-components/fade-in-scroll";
import { ParallaxScroll } from "./components/gsap-components/parallax-scroll";
import { PageTransition } from "./components/gsap-components/page-transition";
import { StaggeredGrid } from "./components/gsap-components/staggered-grid";
import { HorizontalScroll } from "./components/gsap-components/horizontal-scroll";
import { RollingText } from "./components/gsap-components/RollingText";

import { Button } from "./components/ui/button";

// Sample code snippets for each component
const textRevealCode = `import { TextReveal } from "./components/gsap-components/text-reveal";

<TextReveal>
  Hello World
</TextReveal>`;

const fadeInScrollCode = `import { FadeInScroll } from "./components/gsap-components/fade-in-scroll";

<FadeInScroll>
  <div>This content will fade in on scroll</div>
</FadeInScroll>`;

const parallaxScrollCode = `import { ParallaxScroll } from "./components/gsap-components/parallax-scroll";

<ParallaxScroll speed={0.5}>
  <div>This content will move in parallax</div>
</ParallaxScroll>`;

const pageTransitionCode = `import { PageTransition } from "./components/gsap-components/page-transition";

<PageTransition>
  <div>Page content with transition effect</div>
</PageTransition>`;

const staggeredGridCode = `import { StaggeredGrid } from "./components/gsap-components/staggered-grid";

<StaggeredGrid className="grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggeredGrid>`;

const horizontalScrollCode = `import { HorizontalScroll } from "./components/gsap-components/horizontal-scroll";

<HorizontalScroll>
  <section className="w-screen h-screen flex items-center justify-center">
    Section 1
  </section>
  <section className="w-screen h-screen flex items-center justify-center">
    Section 2
  </section>
</HorizontalScroll>`;

function App() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <TextReveal>
            <h1 className="tracking text-4xl font-semibold md:text-5xl">
              Reusable GSAP Animations For React Developers
            </h1>

            <p className="text-secondary mt-4 max-w-2xl text-xl">
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

      {/* Components Grid */}
      <section
        id="components"
        className="bg-[#0d0d10] px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-6xl">
          <FadeInScroll>
            <h2 className="mb-6 text-3xl font-normal tracking-tight">
              Featured Components
            </h2>
          </FadeInScroll>

          <StaggeredGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard
              title="Text Reveal"
              description="Animate text with a character-by-character reveal effect"
              preview={
                <TextReveal>
                  <p>Hello World</p>
                </TextReveal>
              }
            />

            <ComponentCard
              title="Fade In Scroll"
              description="Fade in elements as they enter the viewport"
              code={fadeInScrollCode}
              preview={<div className="text-xl">Fade In Content</div>}
            />

            <ComponentCard
              title="Rolling Text"
              description="Transform words into rolling text"
              // code={parallaxScrollCode}
              preview={
                <div className="h-4">
                  <RollingText words={["Rolling", "Text", "Animation"]} />
                </div>
              }
            />

            <ComponentCard
              title="Page Transition"
              description="Smooth transitions between pages or sections"
              code={pageTransitionCode}
              preview={<div className="text-xl">Page Content</div>}
            />

            <ComponentCard
              title="Staggered Grid"
              description="Animate grid items with a staggered effect"
              code={staggeredGridCode}
              preview={
                <div className="grid w-full grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-muted rounded p-2 text-center">
                      {i}
                    </div>
                  ))}
                </div>
              }
            />

            <ComponentCard
              title="Horizontal Scroll"
              description="Transform vertical scrolling into horizontal movement"
              code={horizontalScrollCode}
              preview={<div className="text-xl">Horizontal Scroll</div>}
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
                  1. Choose a Component
                </h3>
                <p className="text-secondary">
                  Browse the library of GSAP components and select the one that
                  fits your needs.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll>
              <div className="bg-card border-border rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">2. Copy the Code</h3>
                <p className="text-secondary">
                  View and copy the component code directly into your React
                  project.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll>
              <div className="bg-card border-border rounded-lg border p-6">
                <h3 className="mb-4 text-xl font-semibold">3. Customize</h3>
                <p className="text-secondary">
                  Adjust the parameters to customize the animation to your
                  specific needs.
                </p>
              </div>
            </FadeInScroll>
          </div>
        </div>
      </section>

      {/* For Developers Section */}
      <section
        id="for-developers"
        className="bg-[#0d0d10] px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-4xl">
          <FadeInScroll>
            <h2 className="mb-12 text-center text-3xl font-bold">
              For Developers
            </h2>
          </FadeInScroll>

          <div className="bg-card border-border rounded-lg border p-6">
            <FadeInScroll>
              <h3 className="mb-4 text-xl font-semibold">
                Built with Modern Tools
              </h3>
              <p className="text-secondary mb-6">
                GSAP-Box is built with React, Vite, TailwindCSS, and GSAP -
                providing a modern development experience.
              </p>

              <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                <div className="bg-muted rounded-md p-4">
                  <p className="font-medium">React</p>
                </div>
                <div className="bg-muted rounded-md p-4">
                  <p className="font-medium">GSAP</p>
                </div>
                <div className="bg-muted rounded-md p-4">
                  <p className="font-medium">TailwindCSS</p>
                </div>
                <div className="bg-muted rounded-md p-4">
                  <p className="font-medium">Vite</p>
                </div>
              </div>
            </FadeInScroll>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default App;
