import { MongoClient, ObjectId } from "mongodb";
import { databaseUrl } from "../config";

class BlogService {
  private client: MongoClient;
  private collection: any;

  constructor() {
    this.client = new MongoClient(databaseUrl);
    this.connectToDatabase();
  }

  async connectToDatabase() {
    await this.client.connect();
    const db = this.client.db();
    this.collection = db.collection("blog");
  }

  async getBlogPosts() {
    const result = await this.collection.find().toArray();
    return result;
  }

  async createBlogPost(postData: any) {
    await this.collection.insertOne(postData);
  }

  async deleteBlogPost(id: string) {
    const objectId = new ObjectId(id);
    const result = await this.collection.deleteOne({ _id: objectId });
    return result.deletedCount > 0;
  }

  async updateBlogPost(id: string, postData: any) {
    const objectId = new ObjectId(id);
    await this.collection.updateOne({ _id: objectId }, { $set: postData });
  }

  async getBlogPostById(id: string) {
    const objectId = new ObjectId(id);
    const result = await this.collection.findOne({ _id: objectId });
    return result;
  }

  async closeConnection() {
    await this.client.close();
  }
}

export default new BlogService();
