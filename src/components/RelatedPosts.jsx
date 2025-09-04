import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config"; // production backend URL

export default function RelatedPosts({ currentPost }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!currentPost?._id) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/blogs/${currentPost._id}/related-or-recent`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [currentPost]);

  if (!posts.length) return null;

  // Optional: Shuffle posts on frontend as well for extra randomness
  const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);

  return (
    <section className="related-posts">
      <h3>Related Posts</h3>
      <div className="related-posts-list">
        {shuffledPosts.map((post) => (
          <div key={post._id} className="related-post-card">
            {post.image && (
              <div className="related-post-img">
                <img src={post.image} alt={post.title} />
              </div>
            )}
            <div className="related-post-content">
              <Link to={`/blog/${post._id}`} className="related-post-title">
                {post.title}
              </Link>
              <p className="related-post-date">
                {new Date(post.date || post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
