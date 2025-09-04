// src/components/Sidebar.jsx

import "./Style/sidebar.css";
import FacebookWidget from "./FacebookWidget";
import AdBanner from "./AdBanner"; // ad component
import RecentUpdates from "./RecentUpdates"; // import RecentUpdates

// Example recent updates data
const recentUpdatesData = [
  {
    id: 1,
    title: "New Product Launch",
    date: "Aug 29, 2025",
    image: "../assets/Hero/1.avif",
    href: "",
  },
  {
    id: 2,
    title: "Website Redesign Complete",
    date: "Aug 28, 2025",
    image: "./assets/Hero/2.avif",
    href: "/news/website-redesign",
  },
  {
    id: 3,
    title: "Upcoming Events This Month",
    date: "Aug 25, 2025",
    image: "./assets/Hero/3.avif",
    href: "/news/upcoming-events",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Ad Banner Widget */}
      <div className="widget">
        <div className="ad-box">
          <AdBanner />
        </div>
      </div>

      {/* Recent Updates Widget */}
      <div className="widget">
        <RecentUpdates items={recentUpdatesData} />
      </div>


      {/* Follow Us Widget */}
      <div className="widget">
        <h3>Follow Us</h3>
        <FacebookWidget />
      </div>
    </aside>
  );
}
