import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { API_BASE_URL } from "../../config";
import "./Style/ArticlesGrid.css";

export default function ArticlesGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        setArticles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!articles.length) return <p>No articles found.</p>;

  return (
    <section>
      <div className="articles-grid">
        {currentArticles.map((article) => (
          <ArticleCard
            key={article._id}
            slug={article.slug}  // ✅ slug used here
            title={article.title}
            image={article.image}
            description={article.description}
          />
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </section>
  );
}
