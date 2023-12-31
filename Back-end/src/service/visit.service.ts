import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class VisitService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(databaseUrl);
  }

  async getVisits() {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("visit");
    const result = await collection.find().toArray();
    return result;
  }

  async createVisit(visitData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("visit");
    await collection.insertOne(visitData);
  }

  async getVisitsByDoctorId(doctorId: string) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("visit");
    const result = await collection.find({ lekarz: doctorId }).toArray();
    return result;
  }

  async deleteVisit(id: string) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("visit");
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateVisit(id: string, visitData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("visit");
    const objectId = new ObjectId(id);
    await collection.updateOne({ _id: objectId }, { $set: visitData });
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new VisitService();
