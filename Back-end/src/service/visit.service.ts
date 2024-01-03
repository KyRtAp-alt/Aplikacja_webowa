import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class VisitService {
  private client: MongoClient;
  private collection: any;

  constructor() {
    this.client = new MongoClient(databaseUrl);
    this.connectToDatabase();
  }

  async connectToDatabase() {
    await this.client.connect();
    const db = this.client.db();
    this.collection = db.collection("visit");
  }

  async getVisits() {
    const result = await this.collection.find().toArray();
    return result;
  }

  async createVisit(visitData: any) {
    await this.collection.insertOne(visitData);
  }

  async getVisitsByDoctorId(doctorId: string) {
    const result = await this.collection.find({ lekarz: doctorId }).toArray();
    return result;
  }

  async deleteVisit(id: string) {
    const objectId = new ObjectId(id);
    const result = await this.collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateVisit(id: string, visitData: any) {
    const objectId = new ObjectId(id);
    await this.collection.updateOne({ _id: objectId }, { $set: visitData });
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new VisitService();
