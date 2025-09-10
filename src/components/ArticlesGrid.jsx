// ArticlesGrid.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { API_BASE_URL } from "../../config";
import "./Style/ArticlesGrid.css";

// Skeleton loader with reserved image space
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    {[...Array(9)].map((_, i) => (
      <div key={i} className="skeleton-card"></div>
    ))}
  </div>
);

export default function ArticlesGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Fetching articles with caching
  useEffect(() => {
    const fetchArticles = async () => {
      const cachedArticles = localStorage.getItem("articlesData");
      if (cachedArticles) {
        setArticles(JSON.parse(cachedArticles));
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        const data = Array.isArray(res.data) ? res.data : [];
        setArticles(data);
        localStorage.setItem("articlesData", JSON.stringify(data));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Pagination calculation
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = useMemo(
    () => articles.slice(indexOfFirstArticle, indexOfLastArticle),
    [articles, indexOfFirstArticle, indexOfLastArticle]
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // UX boost
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, totalPages]);

  if (loading) return <SkeletonLoader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!articles.length) return <p>No articles found.</p>;

  return (
    <section>
      <div className="articles-grid">
        {currentArticles.map((article, idx) => (
          <ArticleCard
            key={article._id}
            slug={encodeURIComponent(article.slug)}
            title={article.title}
            image={article.image}
            description={article.description}
            loading={idx === 0 ? "eager" : "lazy"} 
            // ✅ First article loads eagerly for better LCP
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={handleNextPage}>Next</button>
          )}
        </div>
      )}
    </section>
  );
}
