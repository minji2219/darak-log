let connectDB = require("../database");

export default async function handler(req, res) {
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);

  const createdAt = kr_curr?.toLocaleDateString("ko", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const client = await connectDB;
  const db = client.db("blog");

  await db.collection("post").insertOne({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    summary: req.body.summary,
    user: req.body.user,
    createdAt: createdAt,
  });

  res.end();
}
