import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments";
import RelatedPosts from "../components/RelatedPosts";
import Reactions from "../components/Reactions";
import { API_BASE_URL } from "../../config"; 
import "./article.css";

function calculateReadTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default function BlogPage() {
  const { identifier } = useParams();
  const decodedIdentifier = decodeURIComponent(identifier); // ✅ decode URL param

  const [article, setArticle] = useState(null);
  const [views, setViews] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Fetch blog data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs/${decodedIdentifier}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
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

  // Fetch related posts based on tags
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
        console.error(err);
      }
    };
    fetchRelated();
  }, [article]);

  if (!article) return <p>Loading...</p>;

  const readTime = calculateReadTime(article.content);

  return (
    <article className="article">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-meta">
        <span>{new Date(article.date || article.createdAt).toLocaleDateString()}</span>
        <span>{views} views</span>
        <span>{readTime}</span>
      </p>

      <div className="article-intro two-column">
        {article.image && (
          <div className="article-intro-img">
            <img src={article.image} alt={article.title} />
            <h1 className="article-img-title">{article.title}</h1>
          </div>
        )}
        <div
          className="article-intro-text"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      <Reactions />
      <RelatedPosts posts={relatedPosts} currentPost={article.title} />
      <Comments articleId={article._id} />
    </article>
  );
}
