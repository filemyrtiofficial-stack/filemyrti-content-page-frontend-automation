import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { API_BASE_URL } from "../../config";
import "./Style/ArticlesGrid.css";

// Skeleton loader for articles
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
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
        setArticles(Array.isArray(res.data) ? res.data : []);
        localStorage.setItem("articlesData", JSON.stringify(res.data));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Pagination calculation
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    scrollToTop();
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      scrollToTop();
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      scrollToTop();
    }
  }, [currentPage]);

  // Smart Pagination Pages
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!articles.length) return <p>No articles found.</p>;

  return (
    <section>
      <div className="articles-grid">
        {currentArticles.map((article) => (
          <ArticleCard
            key={article._id}
            slug={encodeURIComponent(article.slug)}
            title={article.title}
            image={article.image}
            description={article.description}
            loading="lazy"
          />
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePrevPage} className="page-btn">
            &lt;
          </button>
        )}

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="dotss">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`page-btn ${currentPage === page ? "active" : ""}`}
            >
              {String(page).padStart(2, "0")}.
            </button>
          )
        )}

        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="page-btn">
            &gt;
          </button>
        )}
      </div>
    </section>
  );
}
