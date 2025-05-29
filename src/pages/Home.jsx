import { useNavigate } from "react-router-dom";
import { TextReveal } from "../components/gsap-components/TextReveal";
import { FadeInScroll } from "../components/gsap-components/FadeInScroll";
import { RollingText } from "../components/gsap-components/RollingText";
import { Button } from "../components/ui/button";
import { ArrowRight, Github, Code, Wand2, Zap } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center border-b border-gray-800/20 px-4 lg:min-h-[60vh] xl:min-h-[70vh]">
        <div className="container mx-auto flex max-w-6xl flex-col items-center gap-10 py-12 md:flex-row md:justify-between md:py-0">
          <div className="max-w-xl">
            <TextReveal>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                GSAP Animations <br />
                <span className="text-accent">for React Developers</span>
              </h1>

              <p className="text-secondary mb-8 text-lg">
                A collection of reusable GSAP animation components for React.
                Copy, paste, and customize for your projects.
              </p>
            </TextReveal>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => navigate("/components")}
              >
                Explore Components
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a
                  href="https://github.com/bdeguigne/gsap-box"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View source code on GitHub"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="border-border relative h-[350px] w-full max-w-lg overflow-hidden rounded-lg border bg-black/10 shadow-lg backdrop-blur-sm md:h-[400px] lg:max-w-xl">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: "scale(1.05)" }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/gsap-box-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <FadeInScroll>
            <h2 className="mb-12 text-center text-3xl font-bold">
              Simple, Powerful, Ready to Use
            </h2>
          </FadeInScroll>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FadeInScroll>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Code className="text-accent h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Ready to Use</h3>
                <p className="text-secondary">
                  Pre-built components that you can copy and paste directly into
                  your React projects.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll delay={0.2}>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Wand2 className="text-accent h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Customizable</h3>
                <p className="text-secondary">
                  Easily customize animations with props to match your design
                  requirements.
                </p>
              </div>
            </FadeInScroll>

            <FadeInScroll delay={0.4}>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Zap className="text-accent h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Optimized</h3>
                <p className="text-secondary">
                  Performance-optimized animations that run smoothly on all
                  devices.
                </p>
              </div>
            </FadeInScroll>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y border-gray-800/10 bg-black/10 px-4 py-16">
        <div className="container mx-auto max-w-3xl text-center">
          <FadeInScroll>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
              Ready to add animations to your project?
            </h2>
            <p className="text-secondary mx-auto mb-8 max-w-2xl text-base md:text-lg">
              Browse our collection of GSAP animation components and start
              implementing them in your React project today.
            </p>
            <Button
              size="lg"
              className="gap-2"
              onClick={() => navigate("/components")}
            >
              View All Components
              <ArrowRight className="h-4 w-4" />
            </Button>
          </FadeInScroll>
        </div>
      </section>
    </div>
  );
}
