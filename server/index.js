const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "s5421015",
  database: "blog_platform",
});

// ブログ記事投稿
app.post("/blog_posts", (req, res) => {
  const { title, content, user_id } = req.body;

  // ユーザーが存在するか確認
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  db.query(checkUserQuery, [user_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.log(checkErr);
      res.status(500).send({ error: "Error checking user existence" });
      return;
    }

    // ユーザーが存在しない場合はエラーを返す
    if (checkResult.length === 0) {
      res.status(400).send({ error: "User does not exist. Cannot post blog." });
      return;
    }

    // ユーザーが存在する場合、ブログ記事を投稿
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
});


// ユーザー登録
app.post("/users", (req, res) => {
  const { user_id, email } = req.body;

  // ユーザーがすでに存在するか確認
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  db.query(checkUserQuery, [user_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.log(checkErr);
      res.status(500).send({ error: "Error checking existing user" });
      return;
    }

    // ユーザーが存在する場合はエラーを返す
    if (checkResult.length > 0) {
      res.status(400).send({ error: "User already exists" });
      return;
    }

    // ユーザーが存在しない場合は登録
    const insertUserQuery = "INSERT INTO users (user_id, email) VALUES (?, ?)";
    db.query(insertUserQuery, [user_id, email], (insertErr, insertResult) => {
      if (insertErr) {
        console.log(insertErr);
        res.status(500).send({ error: "Error registering user" });
      } else {
        const insertedId = insertResult.insertId;
        res.status(200).json({ message: "User registered successfully", userId: insertedId });
      }
    });
  });
});


// ブログ記事取得

app.get("/blog_posts", (req, res) => {
  const userId = req.query.user_id;

  // クエリが指定された場合は特定のユーザーのブログ記事のみを取得
  if (userId) {
    // ユーザーが存在するか確認
    const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
    db.query(checkUserQuery, [userId], (checkErr, checkResult) => {
      if (checkErr) {
        console.log(checkErr);
        res.status(500).send({ error: "Error checking user existence" });
        return;
      }

      // ユーザーが存在しない場合は空の結果を返す
      if (checkResult.length === 0) {
        res.status(200).json([]);
        return;
      }

      // ユーザーが存在する場合、ブログ記事を取得
      const query = "SELECT * FROM blog_posts WHERE user_id = ?";
      const values = [userId];

      db.query(query, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Error retrieving blog posts" });
        } else {
          res.status(200).json(result);
        }
      });
    });
  } else {
    // クエリが指定されていない場合は何も返さない
    res.status(400).send({ error: "User ID is required for blog search" });
  }
});




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

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
