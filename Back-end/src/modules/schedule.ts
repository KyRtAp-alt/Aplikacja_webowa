import express from "express";
import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";

const router = express.Router();
router.use(express.json());
const client = new MongoClient(
  "mongodb+srv://admin:Book54321@cluster0.qxenmyc.mongodb.net/Restauracja"
);

router.get("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("schedule");
  const result = await collection.find();
  let aray: Object[] = [];
  result
    .forEach((element) => {
      aray.push(element);
    })
    .then(() => {
      res.status(200).send(aray);
    });
});

router.post("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("schedule");
  await collection.insertOne(req.body).then(() => res.status(200).send(""));
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("schedule");
    const id = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).send("");
    } else {
      res.status(404).send("");
    }
  } catch (e) {
    res.status(400).send("");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("schedule");
  const id = new ObjectId(req.params.id);
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.status(200).send("");
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const id = new ObjectId(req.params.id);
    const db = client.db();
    const collection = db.collection("schedule");
    const result = await collection.findOne({ _id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("");
    }
  } catch (e) {
    res.status(400).send("");
  }
});

module.exports = router;