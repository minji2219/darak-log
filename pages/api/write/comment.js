let connectDB = require("../database");
const { ObjectId } = require("mongodb");

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

  await db.collection("post").updateMany(
    { _id: new ObjectId(`${req.query.id}`) },
    {
      $push: { comments: { comment: req.body.comment, createdAt: createdAt } },
    }
  );
}
