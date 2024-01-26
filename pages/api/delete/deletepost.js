let connectDB = require("../database");
const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");
  try {
    await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(`${req.query.id}`) });
    res.end();
  } catch (e) {
    console.log(e);
  }
}
