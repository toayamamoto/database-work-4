

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "toa20020814",
  database: "blog_platform",
});

// ブログ記事投稿
app.post("/blog_posts", (req, res) => {
  const { title, content, user_id } = req.body;

  const query =
    "INSERT INTO blog_posts (title, content, user_id, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";
  db.query(query, [title, content, user_id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error posting blog" });
    } else {
      const insertedId = result.insertId;
      res.status(200).json({ message: "Blog posted successfully", blogId: insertedId });
    }
  });
});

// ブログ記事取得

app.get("/blog_posts", (req, res) => {
  const query = "SELECT * FROM blog_posts";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error retrieving blog posts" });
    } else {
      res.status(200).json(result);
    }
  });
});

// ブログ記事取得
/*
app.get("/blog_posts", (req, res) => {
  const { user_id } = req.query;

  let query;
  let queryParams;

  if (user_id) {
    // If user_id is provided, filter by user_id
    query = "SELECT * FROM blog_posts WHERE user_id = ?";
    queryParams = [user_id];
  } else {
    // If no user_id is provided, retrieve all blog posts
    query = "SELECT * FROM blog_posts";
    queryParams = [];
  }

  db.query(query, queryParams, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error retrieving blog posts" });
    } else {
      res.status(200).json(result);
    }
  });
});
*/

// ブログ記事削除
app.delete("/blog_posts/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM blog_posts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "Error deleting blog post" });
    } else {
      res.status(200).json({ message: "Blog post deleted successfully" });
    }
  });
});

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
