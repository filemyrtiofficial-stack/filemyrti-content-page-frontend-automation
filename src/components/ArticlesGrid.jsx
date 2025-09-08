import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { API_BASE_URL } from "../../config"; // use config
import "./Style/ArticlesGrid.css";

export default function ArticlesGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        // Ensure we always have an array
        setArticles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Loading state
  if (loading) return <p>Loading articles...</p>;

  // Error state
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // No articles found state
  if (!articles.length) return <p>No articles found.</p>;

  return (
    <section className="articles-grid">
      {/* Map through articles to render ArticleCard */}
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          _id={article._id}
          {...article}
          aria-label={`Read more about ${article.title}`}
        />
      ))}
    </section>
  );
}
