const express = require("express");
const next = require("next");
const { MongoClient } = require("mongodb");

const dev = process.env.NODE_ENV !== "production";
const cors = require("cors");
const app = express();

let db;
const url =
  "mongodb+srv://minji:minji0219@cluster0.lyybb93.mongodb.net/?retryWrites=true&w=majority";
new MongoClient(url).connect().then((client) => {
  console.log("DB연결성공");
  db = client.db("blog");
});

app.use(
  cors({
    origin: "*",
  })
);

app.get("/post", async (req, res) => {
  let result = await db.collection("post").find().toArray();
  res.json({ posts: result });
});

// app.get("*", (req, res) => {
//   return handle(req, res);
// });

app.listen(8080, (err) => {
  if (err) throw err;
  console.log("listening to 8080");
});
