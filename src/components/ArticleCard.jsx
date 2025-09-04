// src/components/ArticleCard.jsx
import { Link } from "react-router-dom";
import "./Style/ArticleCard.css";

export default function ArticleCard({ _id, category, title, image, description }) {
  return (
    <div className="article-card">
      <img src={image} alt={title} className="article-image" />
      <div className="article-content">
        <p className="article-category">{category}</p>
        <h3 className="article-title">{title}</h3>
        <p className="article-desc">
          {description?.length > 100 
            ? description.substring(0, 100) + "..." 
            : description} 
        </p>
        <Link to={`/blog/${_id}`}>
          <button className="article-btn">Continue Reading</button>
        </Link>
      </div>
    </div>
  );
}
