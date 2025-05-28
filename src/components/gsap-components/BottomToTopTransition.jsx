import React, { useState, useEffect } from "react";
import { PageTransition } from "./PageTransition";

/**
 * Bottom-to-top page transition component
 * @param {Object} props - Component props
 * @param {Array} props.pages - Array of page objects with {id, content}
 * @param {number} props.activePage - ID of the active page
 * @param {Function} props.onTransitionComplete - Callback called when a transition is complete
 */
export function BottomToTopTransition({
  pages,
  activePage,
  onTransitionComplete,
}) {
  // Initialize page states
  const [pageStates, setPageStates] = useState({});
  const [previousActivePage, setPreviousActivePage] = useState(null);

  // Initialize states on first render
  useEffect(() => {
    const initialStates = {};
    pages.forEach((page) => {
      initialStates[page.id] = page.id === activePage ? "active" : "inactive";
    });
    setPageStates(initialStates);
    setPreviousActivePage(activePage);
  }, []);

  // Handle active page changes
  useEffect(() => {
    if (previousActivePage !== null && previousActivePage !== activePage) {
      // Start the transition
      setPageStates((prev) => ({
        ...prev,
        [previousActivePage]: "exiting",
        [activePage]: "entering",
      }));
    }

    setPreviousActivePage(activePage);
  }, [activePage, previousActivePage]);

  // Handle transition events
  const handleTransition = (type, pageId) => {
    if (type === "enter-complete") {
      // When the page has finished entering, update states
      setPageStates((prev) => {
        const newStates = { ...prev };
        // Set all pages to inactive except the active one
        Object.keys(newStates).forEach((key) => {
          const id = parseInt(key);
          newStates[key] = id === activePage ? "active" : "inactive";
        });
        return newStates;
      });

      // Notify that the transition is complete
      if (onTransitionComplete) {
        onTransitionComplete("enter-complete", pageId);
      }
    } else if (type === "exit-complete") {
      // Notify that the exit is complete
      if (onTransitionComplete) {
        onTransitionComplete("exit-complete", pageId);
      }
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {pages.map((page) => (
        <PageTransition
          key={page.id}
          state={pageStates[page.id] || "inactive"}
          onComplete={(type) => handleTransition(type, page.id)}
        >
          {page.content}
        </PageTransition>
      ))}
    </div>
  );
}

export default BottomToTopTransition;
