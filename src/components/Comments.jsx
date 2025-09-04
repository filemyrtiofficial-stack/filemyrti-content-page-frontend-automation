import { useState } from "react";
import "./style/comments.css";

export default function Comments({ articleId }) {
  const [comments, setComments] = useState([
    { id: 1, user: "Alice", text: "Great article! Very informative." },
    { id: 2, user: "Bob", text: "I totally agree with your points." },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: comments.length + 1, user: "Guest", text: newComment },
    ]);
    setNewComment("");
  };

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      <ul className="comments-list">
        {comments.map((c) => (
          <li key={c.id}>
            <strong>{c.user}:</strong> {c.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
