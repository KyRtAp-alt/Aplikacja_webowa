import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class HarmonogramService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(databaseUrl);
  }

  async getHarmonogramItems() {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("harmonogram");
    const result = await collection.find().toArray();
    return result;
  }

  async getHarmonogramItemById(id: string) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("harmonogram");
    const objectId = new ObjectId(id);
    const result = await collection.findOne({ _id: objectId });
    return result;
  }

  async createHarmonogramItem(itemData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("harmonogram");
    await collection.insertOne(itemData);
  }

  async deleteHarmonogramItem(id: string) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("harmonogram");
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateHarmonogramItem(id: string, itemData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("harmonogram");
    const objectId = new ObjectId(id);
    await collection.updateOne({ _id: objectId }, { $set: itemData });
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new HarmonogramService();
