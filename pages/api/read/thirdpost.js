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

  let postNum = await db.collection("post").find().count();

  let likedNumArr = await db
    .collection("post")
    .find({ like: { $gte: 0 } })
    .toArray();

  let likedNum = likedNumArr.reduce((acc, cur) => {
    return acc + cur.like;
  }, 0);

  return res.json({ posts: result, postNum: postNum, likedNum: likedNum });
}
