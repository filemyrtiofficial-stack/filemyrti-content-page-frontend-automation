import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const location = useLocation();

  // Determine if Sidebar should be shown
  const showSidebar = location.pathname.startsWith("/blog/");

  return (
    <div className="layout">
      <Navbar />

      <div className="layout-content" style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 3 }}>{children}</div>
        {showSidebar && <div style={{ flex: 1 }}><Sidebar /></div>}
      </div>

      <Footer />
    </div>
  );
}
