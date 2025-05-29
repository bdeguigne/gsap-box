import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Components from "./pages/Components";
import ComponentPreview from "./pages/ComponentPreview";
import DemoPage from "./pages/DemoPage";
import { RootLayout } from "./layouts/RootLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/component/:componentId" element={<ComponentPreview />} />
        <Route path="/demo" element={<DemoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
