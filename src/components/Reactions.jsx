import { useState } from "react";
import "./Style/reactions.css";

export default function Reactions() {
  const [reactions, setReactions] = useState({
    like: 5,
    love: 2,
    laugh: 3,
    wow: 1,
    sad: 0,
  });

  const handleReact = (type) => {
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  return (
    <div className="reactions">
      <button onClick={() => handleReact("like")}>👍 {reactions.like}</button>
      <button onClick={() => handleReact("love")}>❤️ {reactions.love}</button>
      <button onClick={() => handleReact("laugh")}>😂 {reactions.laugh}</button>
      <button onClick={() => handleReact("wow")}>😮 {reactions.wow}</button>
      <button onClick={() => handleReact("sad")}>😢 {reactions.sad}</button>
    </div>
  );
}
