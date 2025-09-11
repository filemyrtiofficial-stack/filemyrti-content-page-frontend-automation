import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { motion, AnimatePresence } from "framer-motion";
import "./Style/SearchPage.css";

export default function SearchPage() {
  const navigate = useNavigate(); // ✅ hook for closing via navigation
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/blogs`, {
        params: { search: query },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/blogs`, {
        params: { search: query },
      });
      setSuggestions(res.data.slice(0, 5));
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(searchQuery);
    setSuggestions([]);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    fetchPosts(tag);
    setSuggestions([]);
  };

  const handleClose = () => {
    navigate("/"); // ✅ go back to homepage
  };

  const authors = [
    { name: "Raj", posts: 45 },
    { name: "Danish", posts: 22 },
    { name: "Abcd", posts: 12 },
    { name: "Manish", posts: 34 },
    { name: "Neha", posts: 18 },
  ];

  const tags = [
    "Competitive Exam",
    "Constitution",
    "Judiciary",
    "Current Affairs",
    "Parliament",
    "Criminal Law",
    "Supreme Court",
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="search-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="search-page"
          initial={{ opacity: 0, scale: 0.9, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          {/* ✅ Close Button */}
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>

          {/* Search Input */}
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search... (Eg: judiciary)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
            />
            <button type="submit">Search</button>
          </form>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((s) => (
                <div
                  key={s._id}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(s.title);
                    fetchPosts(s.title);
                    setSuggestions([]);
                  }}
                >
                  {s.title}
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="search-content">
            {/* Tags */}
            <div className="section">
              <h2>Popular Tags</h2>
              <div className="tags">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="tag clickable"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Authors */}
            <div className="section">
              <h2>Popular Authors</h2>
              <div className="authors">
                {authors.map((a, i) => (
                  <div
                    key={i}
                    className="author-card clickable"
                    onClick={() => handleTagClick(a.name)}
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${a.name}&background=random`}
                      alt={a.name}
                      className="avatar-img"
                    />
                    <div className="info">
                      <p>{a.name}</p>
                      <span className="post-count">{a.posts} Posts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="section">
              <h2>{searchQuery ? "Search Results" : "Popular Posts"}</h2>
              {loading ? (
                <p>Loading...</p>
              ) : posts.length === 0 ? (
                <p>No results found</p>
              ) : (
                <div className="posts">
                  {posts.slice(0, 5).map((post) => (
                    <a
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="post-card"
                    >
                      <img src={post.image} alt={post.title} />
                      <p>{post.title}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
