let connectDB = require("../database");

export default async function handler(req, res) {
  const createdAt = new Date()?.toLocaleDateString("ko", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const client = await connectDB;
  const db = client.db("blog");

  await db.collection("post").insertOne({
    title: req.body.title,
    content: req.body.content,
    createdAt: createdAt,
  });
  //카테고리 추가
}
