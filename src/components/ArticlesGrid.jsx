// src/components/ArticlesGrid.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { API_BASE_URL } from "../../config"; // use config
import "./Style/ArticlesGrid.css";

export default function ArticlesGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        // Ensure we always have an array
        setArticles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!articles.length) return <p>No articles found.</p>;

  return (
    <section className="articles-grid">
      {articles.map((a) => (
        <ArticleCard key={a._id} _id={a._id} {...a} />
      ))}
    </section>
  );
}
