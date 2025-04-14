import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/posts");
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content required");
    await axios.post("http://localhost:5000/posts", { title, content });
    setTitle("");
    setContent("");
    fetchPosts();
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app ${theme}`}>
      <div className="header">
        <h1>📝 Simple Blog with Markdown</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
        </button>
      </div>

      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="10"
          placeholder="Write your post in Markdown..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <div className="preview">
        <h2>Live Markdown Preview</h2>
        <div className="markdown-preview">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <hr />
      <div className="posts">
        <h2>📚 All Blog Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
