import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import ArticlesGrid from "./components/ArticlesGrid";
import Sidebar from "./components/Sidebar";
import AdBanner from "./components/AdBanner";
import Footer from "./components/Footer";
import BlogPage from "./pages/BlogPage";
import BlogHome from "./pages/BlogHome";

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
              {/* <AdBanner /> */}
              <Footer />
            </>
          }
        />

        {/* Blog Detail Page */}
        <Route
          path="/blog/:identifier"   // ✅ supports both ID and slug
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
                  {/* <AdBanner /> */}
                </main>
                <aside style={{ flex: "1 1 300px", minWidth: "250px" }}>
                  <Sidebar />
                </aside>
              </div>
              <Footer /> {/* ✅ moved outside so it stays at bottom */}
            </>
          }
        />
      </Routes>
    </Router>
  );
}
