import { databaseUrl } from "../config";
import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(databaseUrl);
