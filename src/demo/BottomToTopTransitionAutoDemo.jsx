import React, { useState, useEffect } from "react";
import BottomToTopTransition from "../components/gsap-components/BottomToTopTransition";

/**
 * Auto-animated demo of the BottomToTopTransition component for the home page
 */
export function BottomToTopTransitionAutoDemo() {
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-switch pages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev === 1 ? 2 : 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Demo pages with minimal content for preview
  const pages = [
    {
      id: 1,
      content: (
        <div className="flex h-full flex-col items-center justify-center bg-blue-50 p-2">
          <h3 className="text-sm font-medium text-blue-800">Page One</h3>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex h-full flex-col items-center justify-center bg-green-50 p-2">
          <h3 className="text-sm font-medium text-green-800">Page Two</h3>
        </div>
      ),
    },
  ];

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg border bg-black"
      style={{ height: "150px" }}
    >
      <BottomToTopTransition pages={pages} activePage={currentPage} />
    </div>
  );
}

export default BottomToTopTransitionAutoDemo;
