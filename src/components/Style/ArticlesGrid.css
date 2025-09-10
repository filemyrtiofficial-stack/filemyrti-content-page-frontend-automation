/* ArticlesGrid.css */

/* ---------- Grid Container ---------- */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
}

/* ---------- Skeleton Loader ---------- */
.skeleton-loader {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px;
}

.skeleton-card {
  background-color: #e0e0e0;
  border-radius: 12px;
  width: 100%;
  padding-top: 60%; /* aspect ratio placeholder */
  position: relative;
  overflow: hidden;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}

/* ---------- Article Card ---------- */
.article-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.article-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  border-bottom: 1px solid #eee;
}

.article-card-content {
  padding: 15px;
  flex: 1;
}

.article-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.article-card-description {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.4;
}

/* ---------- Pagination ---------- */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  flex-wrap: wrap;
  gap: 8px;
}

.pagination button {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination button:hover {
  background-color: #f0f0f0;
  border-color: #999;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .article-card img {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .articles-grid {
    gap: 15px;
    padding: 10px 5px;
  }

  .article-card img {
    height: 150px;
  }
}
