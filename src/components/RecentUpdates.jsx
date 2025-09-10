import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config"; // production backend URL
import "./Style/recent-updates.css";

// Skeleton Loader for the list
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
  </div>
);

export default function RecentUpdates() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRecentUpdates = async () => {
      try {
        // Fetch recent blogs from backend
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        // Sort by date descending and take top 5
        const recent = res.data
          .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
          .slice(0, 5)
          .map((blog) => ({
            id: blog._id,
            title: blog.title,
            date: new Date(blog.date || blog.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            image: blog.image || "", // optional fallback image
            href: `/blog/${blog._id}`,
          }));
        setItems(recent);
      } catch (err) {
        console.error("Error fetching recent updates:", err);
      }
    };

    fetchRecentUpdates();
  }, []);

  if (!items.length) return <SkeletonLoader />;

  return (
    <section className="recent-updates">
      <h2 className="ru-heading">Under Recent Updates</h2>

      <ul className="ru-list">
        {items.map((p) => (
          <li key={p.id} className="ru-item">
            <Link to={p.href} className="ru-link">
              {p.image && (
                <div className="ru-thumb" style={{ width: '100px', height: '100px' }}>
                  <img src={p.image} alt={p.title} loading="lazy" width="100" height="100" />
                </div>
              )}
              <div className="ru-meta">
                <h3 className="ru-title">{p.title}</h3>
                <time className="ru-date">{p.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
