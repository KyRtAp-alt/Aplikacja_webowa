import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://admin:Book54321@cluster0.qxenmyc.mongodb.net/Restauracja"
);

async function getAllDoctors() {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("doctor");
    const result = await collection.find().toArray();
    return result;
  } catch (error) {
    console.error("Error while getting doctors from the database", error);
    throw error;
  }
}
