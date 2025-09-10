// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Lazy load heavy components to reduce initial bundle size
const HeroCarousel = lazy(() => import("./components/HeroCarousel"));
const ArticlesGrid = lazy(() => import("./components/ArticlesGrid"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Suspense fallback={<div style={{ minHeight: "400px" }}>Loading...</div>}>
                <HeroCarousel /> {/* ✅ LCP element optimized */}
              </Suspense>

              <Suspense fallback={<div>Loading articles...</div>}>
                <ArticlesGrid />
              </Suspense>

              <Footer />
            </>
          }
        />

        {/* Blog Detail Page */}
        <Route
          path="/blog/:identifier"
          element={
            <>
              <div
                className="container"
                style={{
                  display: "flex",
                  gap: "30px",
                  flexWrap: "wrap",
                  marginBottom: "40px",
                }}
              >
                <main style={{ flex: "3 1 0%" }}>
                  <Suspense fallback={<div>Loading blog...</div>}>
                    <BlogPage />
                  </Suspense>
                </main>

                <aside style={{ flex: "1 1 300px", minWidth: "250px" }}>
                  <Suspense fallback={<div>Loading sidebar...</div>}>
                    <Sidebar />
                  </Suspense>
                </aside>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
