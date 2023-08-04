// const { MongoClient, ObjectId } = require("mongodb");

// const connectionString = "mongodb://localhost:27017";
// const dbName = "blogdb";
// const collectionName = "blog";

// async function connectToDatabase() {
//   const client = new MongoClient(connectionString);
//   await client.connect();
//   return client.db(dbName);
// }

// async function getAllPosts() {
//   const db = await connectToDatabase();
//   const collection = db.collection(collectionName);
//   return await collection.find().toArray();
// }

// async function addPost(post) {
//   const db = await connectToDatabase();
//   const collection = db.collection(collectionName);
//   return await collection.insertOne(post);
// }

// async function deletePost(postId) {
//   const db = await connectToDatabase();
//   const collection = db.collection(collectionName);
//   const id = new ObjectId(postId);
//   return await collection.deleteOne({ _id: id });
// }

// async function updatePost(postId, updatedPost) {
//   const db = await connectToDatabase();
//   const collection = db.collection(collectionName);
//   const id = new ObjectId(postId);
//   return await collection.updateOne({ _id: id }, { $set: updatedPost });
// }

// async function getPostById(postId) {
//   const db = await connectToDatabase();
//   const collection = db.collection(collectionName);
//   const id = new ObjectId(postId);
//   return await collection.findOne({ _id: id });
// }

// module.exports = {
//   getAllPosts,
//   addPost,
//   deletePost,
//   updatePost,
//   getPostById,
// };
