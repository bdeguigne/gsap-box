import { Outlet } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../components/ui/navigation-menu";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function RootLayout() {
  const navigate = useNavigate();

  // Navigation animation
  useGSAP(() => {
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <div className="bg-background text-primary flex min-h-screen flex-col">
      <header className="border-border bg-menu/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-2 sm:px-2 lg:px-3">
          <div className="flex h-12 items-center justify-between">
            <div className="flex items-center">
              <a
                onClick={() => navigate("/")}
                className="nav-item flex cursor-pointer items-center text-sm font-light tracking-tight italic"
              >
                <img src="/logo.png" alt="" className="h-10 w-10" />
                <span>GSAP-BOX</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-border bg-background border-t border-dashed py-4">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-3">
            <p className="text-secondary text-xs">
              Built by brice_deg. The source code is available on GitHub.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/bdeguigne/gsap-box"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent flex items-center gap-1 text-xs transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                GitHub
              </a>
              <a
                href="https://x.com/brice_deg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent flex items-center gap-1 text-xs transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 512 462.799"
                  fill="none"
                >
                  <path
                    d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                    fill="currentColor"
                  />
                </svg>
                @brice_deg
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
