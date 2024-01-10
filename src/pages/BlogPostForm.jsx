import React, { useState } from "react";
import axios from "axios";

const BlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:3002/blog_posts";

      const blogData = {
        title,
        content,
        user_id: userId, 
      };

      
      const response = await axios.post(apiUrl, blogData);

      console.log(response.data);

      setTitle("");
      setContent("");
      setUserId(""); 
    } catch (error) {
      console.error("ブログポストの送信中にエラーが発生しました: ", error);
    }
  };

  return (
    <div>
      <h2>ブログ投稿フォーム</h2>
      <form onSubmit={handleSubmit}>
        <label>
          タイトル:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          コンテンツ:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
};

export default BlogPostForm;
