let connectDB = require("../database");
const { ObjectId } = require("mongodb");
export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");

  try {
    db.collection("post").updateOne(
      { _id: new ObjectId(`${req.query.id}`) },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          summary: req.body.summary,
        },
      }
    );
    res.end();
  } catch (e) {}
}
