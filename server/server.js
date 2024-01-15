const express = require("express");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
const cors = require("cors");
const app = express();

let connectDB = require("./database");
let db;

connectDB
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("blog");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "*",
  })
);

app.get("/postlist", async (req, res) => {
  let result = await db.collection("post").find().toArray();
  res.json({ posts: result });
});

app.get("*", (req, res) => {
  return handle(req, res);
});

app.listen(8080, (err) => {
  if (err) throw err;
  console.log("listening to 8080");
});
