import { databaseUrl } from "../config";

import express from "express";
import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";

const router = express.Router();
router.use(express.json());
const client = new MongoClient(databaseUrl);

router.get("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("harmonogram");
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

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("harmonogram");
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (result) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ message: "Nie znaleziono harmonogramu o podanym ID." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd serwera." });
  } finally {
    await client.close();
  }
});

router.post("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("harmonogram");
  await collection
    .insertOne(req.body)
    .then(() => res.status(200).send("Dodano nowy harmonogram"));
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("harmonogram");
    const id = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).send("Usunęto harmonogram");
    } else {
      res.status(404).send("Brak harmonogramu do usunięcia");
    }
  } catch (e) {
    res.status(400).send("Brak harmonogramu do usunięcia");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("harmonogram");
  const id = new ObjectId(req.params.id);
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.status(200).send("Zmieniono zawarosc harmonogramu");
});

module.exports = router;
