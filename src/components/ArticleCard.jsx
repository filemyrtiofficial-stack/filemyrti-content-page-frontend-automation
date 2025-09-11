import { Link } from "react-router-dom";
import "./Style/ArticleCard.css";

export default function ArticleCard({ slug, title, image, description, category }) {
  // Use the category from backend if exists, else default to 'blog'
  const displayCategory = category || "blog";

  return (
    <div className="article-card">
      <img 
        src={image} 
        alt={title} 
        className="article-image" 
        loading="lazy" 
        title={title} 
      />

      <div className="article-content">
        <p className="article-category">{displayCategory}</p>
        <h3 className="article-title">{title}</h3>
        
        <p className="article-desc">
          {description?.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>

        <Link to={`/blog/${slug}`} aria-label={`Read more about ${title}`}>
          <button className="article-btn">Continue Reading</button>
        </Link>
      </div>
    </div>
  );
}
