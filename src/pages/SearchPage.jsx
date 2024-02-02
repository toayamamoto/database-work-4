import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [userId, setUserId] = useState("");
  const [blogData, setBlogData] = useState(null);

  const handleSearch = async () => {
    try {
      const apiUrl = `http://localhost:3001/blog_posts?user_id=a`;
      const response = await axios.get(apiUrl);

      if (response.data.error) {
        console.error("ブログの検索中にエラーが発生しました: ", response.data.error);
      } else {
        setBlogData(response.data);
      }
    } catch (error) {
      console.error("ブログの検索中にエラーが発生しました: ", error);
    }
  };

  const inputStyle = {
    width: "15%",
    padding: "10px",
    marginBottom: "15px",
  };

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  };

  const resultContainerStyle = {
    marginTop: "20px",
  };

  return (
    <div>
      <h2 style={{ fontSize: "2em", color: "#3498db", marginBottom: "20px" }}>ブログ閲覧</h2>

      <button onClick={handleSearch} style={buttonStyle}>ブログを表示する</button>

      {blogData && (
        <div style={resultContainerStyle}>
          <h3>ブログ一覧</h3>
          <ul>
            {blogData.map((blogPost) => (
              <li key={blogPost.id}>
                <strong>User ID:</strong> {blogPost.user_id} <br />
                <strong>タイトル:</strong> {blogPost.title} <br />
                <strong>コンテンツ:</strong> {blogPost.content} <br />
                <strong>投稿日時:</strong> {blogPost.created_at}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
