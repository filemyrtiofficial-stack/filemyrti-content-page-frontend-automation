// Article.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import RelatedPosts from "./RelatedPosts";
import Reactions from "./Reactions";
import { API_BASE_URL } from "../../config";
import "./Style/article.css";

// Skeleton loader component for dynamic content
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-card"></div>
    <div className="skeleton-card"></div>
  </div>
);

function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default function Article() {
  const { identifier } = useParams(); // slug or ID
  const [article, setArticle] = useState(null);
  const [views, setViews] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Fetch single article by slug or ID
  useEffect(() => {
    let isMounted = true; // avoid state updates if unmounted
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs/${identifier}`);
        if (isMounted) setArticle(res.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      }
    };
    fetchArticle();
    return () => {
      isMounted = false;
    };
  }, [identifier]);

  // Track views (localStorage only, not backend)
  useEffect(() => {
    if (!article?._id) return;
    const key = `article-${article._id}-views`;
    const stored = parseInt(localStorage.getItem(key)) || 0;
    const newViews = stored + 1;
    localStorage.setItem(key, newViews);
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
        setRelatedPosts(filtered.slice(0, 3)); // Limit to 3 to reduce LCP impact
      } catch (err) {
        console.error("Error fetching related posts:", err);
      }
    };
    fetchRelated();
  }, [article]);

  if (!article) {
    return (
      <article className="article">
        <SkeletonLoader />
      </article>
    );
  }

  const readTime = calculateReadTime(article.content);

  return (
    <article className="article">
      <h1 className="article-title">{article.title}</h1>

      <p className="article-meta">
        <span>{new Date(article.date || article.createdAt).toLocaleDateString()}</span>
        <span>{views} views</span>
        <span>{readTime}</span>
      </p>

      {/* Reserve space for LCP image */}
      <div className="article-intro two-column">
        {article.image && (
          <div className="article-intro-img">
            <img
              src={article.image}
              alt={article.title}
              width="600"
              height="400"
              fetchpriority="high" // 🚀 Boost LCP image
              decoding="async"
              style={{
                objectFit: "cover",
                maxWidth: "100%",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
        <div
          className="article-intro-text"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      <Reactions />

      {/* Related posts with skeleton loader */}
      <div className="related-posts">
        {relatedPosts.length === 0 ? (
          <SkeletonLoader />
        ) : (
          <RelatedPosts posts={relatedPosts} currentPost={article.title} />
        )}
      </div>

      {/* Comments section with reserved space */}
      <div className="article-comments">
        {!article._id ? (
          <div
            className="loading-comments"
            style={{ height: "200px", backgroundColor: "#f0f0f0" }}
          ></div>
        ) : (
          <Comments articleId={article._id} />
        )}
      </div>
    </article>
  );
}
