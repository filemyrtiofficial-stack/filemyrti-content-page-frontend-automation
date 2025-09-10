//App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import ArticlesGrid from "./components/ArticlesGrid";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import BlogPage from "./pages/BlogPage";

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
              <HeroCarousel />
              <ArticlesGrid />
              <Footer />
            </>
          }
        />

        {/* Blog Detail Page */}
        <Route
          path="/blog/:identifier"   // ✅ supports slug or ID
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
                  <BlogPage />
                </main>
                <aside style={{ flex: "1 1 300px", minWidth: "250px" }}>
                  <Sidebar />
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
