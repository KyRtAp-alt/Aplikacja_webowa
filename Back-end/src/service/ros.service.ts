import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class RosService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(databaseUrl);
  }

  async getRosItems() {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("ros");
    const result = await collection.find().toArray();
    return result;
  }

  async createRosItem(itemData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("ros");
    await collection.insertOne(itemData);
  }

  async deleteRosItem(id: string) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("ros");
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateRosItem(id: string, itemData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("ros");
    const objectId = new ObjectId(id);
    await collection.updateOne({ _id: objectId }, { $set: itemData });
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new RosService();
