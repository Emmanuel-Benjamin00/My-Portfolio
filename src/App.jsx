import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import { useResumeAccess } from "./context/ResumeAccessContext";

// Heavy PDF library — only load it when the Resume Builder is opened.
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));

// Blocks direct-URL access to the Resume Builder until it's unlocked.
function ResumeRoute() {
  const { unlocked } = useResumeAccess();
  if (!unlocked) return <Navigate to="/" replace />;
  return (
    <Suspense
      fallback={
        <div style={{ padding: "120px 24px", textAlign: "center" }}>
          Loading Resume Builder…
        </div>
      }
    >
      <ResumeBuilder />
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume-builder" element={<ResumeRoute />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
