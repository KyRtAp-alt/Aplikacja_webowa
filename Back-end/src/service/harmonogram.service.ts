import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class HarmonogramService {
  private client: MongoClient;
  private collection: any;

  constructor() {
    this.client = new MongoClient(databaseUrl);
    this.connectToDatabase();
  }

  async connectToDatabase() {
    await this.client.connect();
    const db = this.client.db();
    this.collection = db.collection("harmonogram");
  }

  async getHarmonogramItems() {
    const result = await this.collection.find().toArray();
    return result;
  }

  async getHarmonogramItemById(id: string) {
    const objectId = new ObjectId(id);
    const result = await this.collection.findOne({ _id: objectId });
    return result;
  }

  async createHarmonogramItem(itemData: any) {
    await this.collection.insertOne(itemData);
  }

  async deleteHarmonogramItem(id: string) {
    const objectId = new ObjectId(id);
    const result = await this.collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateHarmonogramItem(id: string, itemData: any) {
    const objectId = new ObjectId(id);
    await this.collection.updateOne({ _id: objectId }, { $set: itemData });
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new HarmonogramService();
