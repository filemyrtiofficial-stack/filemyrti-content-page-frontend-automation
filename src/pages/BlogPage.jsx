// BlogPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments";
import RelatedPosts from "../components/RelatedPosts";
import Reactions from "../components/Reactions";
import { API_BASE_URL } from "../../config"; 
import "./article.css";

// Skeleton loader with reserved layout
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
  </div>
);

function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
}

export default function BlogPage() {
  const { identifier } = useParams();
  const decodedIdentifier = decodeURIComponent(identifier);

  const [article, setArticle] = useState(null);
  const [views, setViews] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs/${decodedIdentifier}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [decodedIdentifier]);

  // Increment local views
  useEffect(() => {
    if (!article?._id) return;
    const storageKey = `article-${article._id}-views`;
    const storedViews = parseInt(localStorage.getItem(storageKey)) || 0;
    const newViews = storedViews + 1;
    localStorage.setItem(storageKey, newViews);
    setViews(newViews);
  }, [article]);

  // Fetch related posts
  useEffect(() => {
    if (!article?.tags?.length) return;

    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        const filtered = res.data.filter(
          (b) => b._id !== article._id && b.tags?.some((tag) => article.tags.includes(tag))
        );
        setRelatedPosts(filtered);
      } catch (err) {
        console.error("Error fetching related posts:", err);
      }
    };
    fetchRelated();
  }, [article]);

  if (loading) return <SkeletonLoader />;
  if (!article) return <p style={{ color: "red" }}>Article not found.</p>;

  const readTime = calculateReadTime(article.content);

  return (
    <article className="article">
      {/* Main Title */}
      <h1 className="article-title">{article.title}</h1>

      {/* Meta Info */}
      <p className="article-meta">
        <span>{new Date(article.date || article.createdAt).toLocaleDateString()}</span>
        <span>{views} views</span>
        <span>{readTime}</span>
      </p>

      {/* Image + Content */}
      <div className="article-intro two-column">
        {article.image && (
          <div className="article-intro-img" style={{ width: "100%", maxHeight: "400px" }}>
            <img 
              src={article.image} 
              alt={article.title} 
              width="600" 
              height="400" 
              loading="eager" // ✅ ensures hero/blog image is LCP candidate
              style={{ objectFit: "cover", borderRadius: "8px" }} 
            />
          </div>
        )}
        <div
          className="article-intro-text"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Reactions */}
      <Reactions />

      {/* Related posts with reserved layout */}
      <div className="related-posts">
        {relatedPosts.length === 0 ? (
          <SkeletonLoader />
        ) : (
          <RelatedPosts posts={relatedPosts} currentPost={article.title} />
        )}
      </div>

      {/* Comments section with fallback skeleton */}
      <div className="article-comments">
        {!article._id ? (
          <div
            className="loading-comments"
            style={{ height: "200px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}
          ></div>
        ) : (
          <Comments articleId={article._id} />
        )}
      </div>
    </article>
  );
}
