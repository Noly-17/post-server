import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { conn } from "./config/database";
import { graphqlHTTP } from "express-graphql";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

conn.connect((err) => {
  if (err) throw err;
  console.log("mysql connection succeeded");
});

app.get("/create-db", (req, res) => {
  conn.query("CREATE DATABASE nodemysql", (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Databases created successfully");
  });
});

app.get("/create-post-table", (req, res) => {
  const sql =
    "CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL,  body VARCHAR(255) NOT NULL)";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Post created successfully");
  });
});

app.post("/posts", (req, res) => {
  const sql = "INSERT INTO posts SET ?";

  conn.query(sql, req.body, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Post added");
  });
});

app.get("/posts", (req, res) => {
  conn.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.send(results);
    }
  });
});

app.listen(5000, () => console.log(`Server listening on ${5000}`));
