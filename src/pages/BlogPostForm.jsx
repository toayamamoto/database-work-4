import React, { useState } from "react";
import axios from "axios";

const BlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:3001/blog_posts";

      const blogData = {
        title,
        content,
        user_id: userId,
      };

      const response = await axios.post(apiUrl, blogData);

      setSuccessMessage(response.data.message);

      setErrorMessage("");

      setTitle("");
      setContent("");
      setUserId("");
    } catch (error) {
      setErrorMessage("UserIDが不正です.UserIDが正しいか確認するか,User Formよりユーザー登録してください.");
      
      setSuccessMessage("");
    }
  };

  const inputStyle = {
    width: "90%",
    padding: "30px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  };

  return (
    <div>
      <h2 style={{ fontSize: "2em", color: "#3498db", marginBottom: "30px" }}>ブログ投稿フォーム</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label>
          タイトル:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
        </label>
        <br />
        <label>
          コンテンツ:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} style={inputStyle} />
        </label>
        <br />
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} style={inputStyle} />
        </label>
        <br />
        <button type="submit" style={buttonStyle}>投稿する</button>
        
        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default BlogPostForm;
