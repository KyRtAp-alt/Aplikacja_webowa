import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class BlogService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(databaseUrl);
  }

  async getBlogPosts() {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("blog");
    const result = await collection.find().toArray();
    return result;
  }

  async createBlogPost(postData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("blog");
    await collection.insertOne(postData);
  }

  async deleteBlogPost(id: string) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("blog");
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateBlogPost(id: string, postData: any) {
    await this.client.connect();
    const db = this.client.db();
    const collection = db.collection("blog");
    const objectId = new ObjectId(id);
    await collection.updateOne({ _id: objectId }, { $set: postData });
  }

  async getBlogPostById(id: string) {
    await this.client.connect();
    const objectId = new ObjectId(id);
    const db = this.client.db();
    const collection = db.collection("blog");
    const result = await collection.findOne({ _id: objectId });
    return result;
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new BlogService();
