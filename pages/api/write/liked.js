let connectDB = require("../database");
const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");

  await db.collection("post").updateMany(
    { _id: new ObjectId(`${req.query.id}`) },
    {
      $inc: { like: 1 },
    }
  );
  res.end();
}
