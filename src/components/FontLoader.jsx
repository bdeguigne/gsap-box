import { useEffect, useState } from "react";

export function FontLoader({ children, fallback = null }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setReady(true));
    } else {
      setReady(true); // old browsers
    }
  }, []);

  if (!ready) {
    return (
      fallback || (
        <div style={{ textAlign: "center", padding: 40, fontSize: 24 }}>
          Loading…
        </div>
      )
    );
  }
  return children;
}
