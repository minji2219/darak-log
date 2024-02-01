let connectDB = require("../database");

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");
  let result;
  const category = req.query.category;

  if (category === "전체") {
    result = await db
      ?.collection("post")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
  } else {
    result = await db
      ?.collection("post")
      .find({ category: category })
      .sort({ createdAt: -1 })
      .toArray();
  }

  return res.json({ posts: result });
}
