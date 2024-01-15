const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://minji:minji0219@cluster0.lyybb93.mongodb.net/?retryWrites=true&w=majority";
const connectDB = new MongoClient(url).connect();

module.exports = connectDB;
