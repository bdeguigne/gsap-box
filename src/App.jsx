import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComponentPreview from "./pages/ComponentPreview";
import { RootLayout } from "./layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/component/:componentId" element={<ComponentPreview />} />
      </Route>
    </Routes>
  );
}

export default App;
