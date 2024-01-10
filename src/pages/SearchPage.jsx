import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [userId, setUserId] = useState("");
  const [blogData, setBlogData] = useState(null);

  const handleSearch = async () => {
    try {

      const userIdValue = "aa"; 
      const apiUrl = `http://localhost:3002/blog_posts?user_id=${userIdValue}`;
      const response = await axios.get(apiUrl);

      setBlogData(response.data);
    } catch (error) {
      console.error("ブログの検索中にエラーが発生しました: ", error);
    }
  };

  return (
    <div>
      <h2>ブログ検索</h2>
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <button onClick={handleSearch}>検索する</button>

      {blogData && (
        <div>
          <h3>検索結果</h3>
          <ul>
            {blogData.map((blogPost) => (
              <li key={blogPost.id}>
                <strong>ID:</strong> {blogPost.id} <br />
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
