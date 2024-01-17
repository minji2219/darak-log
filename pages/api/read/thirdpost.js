let connectDB = require("../database");

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");
  let result = await db
    ?.collection("post")
    .find()
    .sort({ createdAt: -1 })
    .limit(3)
    .toArray();
  return res.json({ posts: result });
}
