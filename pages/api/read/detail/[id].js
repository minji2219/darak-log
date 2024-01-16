let connectDB = require("../../database");
const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");

  let result = await db
    ?.collection("post")
    .findOne({ _id: new ObjectId(`${req.query.id}`) });
  return res.json({ post: result });
}
