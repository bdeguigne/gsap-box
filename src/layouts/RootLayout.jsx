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

      <footer className="border-border bg-background border-t py-6">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-secondary text-sm">
              GSAP-Box - A library of reusable GSAP components for React
            </p>
            <p className="text-secondary text-xs">
              © {new Date().getFullYear()} - Built with React, TailwindCSS and
              GSAP
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
