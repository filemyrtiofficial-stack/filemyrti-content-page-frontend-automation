import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import "./Style/recent-updates.css";

// ✅ Skeleton Loader for Speed Index
const SkeletonItem = () => (
  <li className="ru-item skeleton">
    <div className="ru-thumb skeleton-thumb"></div>
    <div className="ru-meta">
      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>
    </div>
  </li>
);

export default function RecentUpdates() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUpdates = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);

        const recent = res.data
          .sort(
            (a, b) =>
              new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
          )
          .slice(0, 5)
          .map((blog) => ({
            id: blog._id,
            slug: blog.slug,
            title: blog.title,
            date: new Date(blog.date || blog.createdAt).toLocaleDateString(
              undefined,
              { year: "numeric", month: "short", day: "numeric" }
            ),
            image: blog.image || "",
            href: `/blog/${encodeURIComponent(blog.slug)}`, // ✅ use slug not _id
          }));

        setItems(recent);
      } catch (err) {
        console.error("Error fetching recent updates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUpdates();
  }, []);

  return (
    <section className="recent-updates">
      <h2 className="ru-heading">Recent Updates</h2>

      <ul className="ru-list">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonItem key={i} />)
          : items.map((p) => (
              <li key={p.id} className="ru-item">
                <Link
                  to={p.href}
                  className="ru-link"
                  aria-label={`Read update: ${p.title}`}
                >
                  {p.image && (
                    <div className="ru-thumb">
                      {/* ✅ Optimized image delivery */}
                      <picture>
                        <source
                          srcSet={p.image.replace(/\.(jpg|jpeg|png)$/i, ".avif")}
                          type="image/avif"
                        />
                        <source
                          srcSet={p.image.replace(/\.(jpg|jpeg|png)$/i, ".webp")}
                          type="image/webp"
                        />
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          decoding="async"
                          width="80"
                          height="60"
                        />
                      </picture>
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
