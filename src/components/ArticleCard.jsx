import { Link } from "react-router-dom";
import "./Style/ArticleCard.css";

export default function ArticleCard({ _id, title, image, description }) {
  return (
    <div className="article-card">
      {/* Use lazy loading for images to improve performance */}
      <img 
        src={image} 
        alt={title} 
        className="article-image" 
        loading="lazy" 
        title={title} // Title for image for better SEO
      />
      <div className="article-content">
        {/* Optional category section */}
        {/* <p className="article-category">{category}</p> */}
        <h3 className="article-title">{title}</h3>
        <p className="article-desc">
          {description?.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>
        
        {/* Link to the detailed article page with aria-label for accessibility */}
        <Link to={`/blog/${_id}`} aria-label={`Read more about ${title}`}>
          <button 
            className="article-btn" 
            aria-label={`Continue reading the article: ${title}`}>
            Continue Reading
          </button>
        </Link>
      </div>
    </div>
  );
}
