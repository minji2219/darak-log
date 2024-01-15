let connectDB = require("../database");
// import connectDB from "../../../server/database";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("blog");
  let result = await db?.collection("post").find().toArray();
  // console.log(result);
  return res.json({ posts: result });
}
