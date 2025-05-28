import React, { useState } from "react";
import BottomToTopTransition from "../components/gsap-components/BottomToTopTransition";

export function BottomToTopTransitionDemo() {
  const [currentPage, setCurrentPage] = useState(1);

  // Demo pages with contrasting styles
  const pages = [
    {
      id: 1,
      content: (
        <div className="flex h-full flex-col items-center justify-center bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-blue-800">First Page</h2>
          <p className="mb-6 text-center text-sm text-blue-600">
            This page has a blue theme
          </p>
          <button
            onClick={() => setCurrentPage(2)}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Go to Green Page
          </button>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex h-full flex-col items-center justify-center bg-green-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-green-800">Second Page</h2>
          <p className="mb-6 text-center text-sm text-green-600">
            This page has a green theme
          </p>
          <button
            onClick={() => setCurrentPage(1)}
            className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            Go to Blue Page
          </button>
        </div>
      ),
    },
  ];

  // Handle transition events (optional)
  const handleTransitionComplete = (type, pageId) => {
    console.log(`Transition ${type} completed for page ${pageId}`);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg border bg-black"
      style={{ height: "300px" }}
    >
      {/* Debug info */}
      <div className="absolute top-0 right-0 z-50 bg-black/10 p-1 text-[10px] text-gray-500">
        Current Page: {currentPage}
      </div>

      {/* Container for pages */}
      <BottomToTopTransition
        pages={pages}
        activePage={currentPage}
        onTransitionComplete={handleTransitionComplete}
      />
    </div>
  );
}

export default BottomToTopTransitionDemo;
