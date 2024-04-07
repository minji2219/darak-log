let connectDB = require("../database");

export default async function Handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");

  let postNum = await db
    .collection("post")
    .find({ user: `${req.query.user}` })
    .count();

  let likedNumArr = await db
    .collection("post")
    .find({ user: `${req.query.user}` }, { like: { $gte: 0 } })
    .toArray();

  let likedNum = likedNumArr.reduce((acc, cur) => {
    return acc + cur.like;
  }, 0);

  return res.json({ postNum: postNum, likedNum: likedNum });
}
