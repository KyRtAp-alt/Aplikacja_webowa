import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class RosService {
  private client: MongoClient;
  private collection: any;

  constructor() {
    this.client = new MongoClient(databaseUrl);
    this.connectToDatabase();
  }

  async connectToDatabase() {
    await this.client.connect();
    const db = this.client.db();
    this.collection = db.collection("ros");
  }

  async getRosItems() {
    const result = await this.collection.find().toArray();
    return result;
  }

  async createRosItem(itemData: any) {
    await this.collection.insertOne(itemData);
  }

  async deleteRosItem(id: string) {
    const objectId = new ObjectId(id);
    const result = await this.collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateRosItem(id: string, itemData: any) {
    const objectId = new ObjectId(id);
    await this.collection.updateOne({ _id: objectId }, { $set: itemData });
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new RosService();
