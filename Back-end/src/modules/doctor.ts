import { databaseUrl } from "../config";

import express from "express";
import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";

const doctorService = require("../service/doctorService");

const router = express.Router();
router.use(express.json());

const client = new MongoClient(databaseUrl);

router.get("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("doctor");
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
    const collection = db.collection("doctor");
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

router.get("/schedule/:doctorId", async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("schedule");
    const result = await collection.findOne({ doctorId: doctorId });
    if (result) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ message: "Nie znaleziono harmonogramu dla danego lekarza." });
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
  const collection = db.collection("doctor");
  await collection
    .insertOne(req.body)
    .then(() => res.status(200).send("Dodano Lekarza"));
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("doctor");
    const id = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).send("Usuinięto Lekarza");
    } else {
      res.status(404).send("Brak Lekarza do usnuięcia");
    }
  } catch (e) {
    res.status(400).send("Brak Lekarza do usnuięcia");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("doctor");
  const id = new ObjectId(req.params.id);
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.status(200).send("Zmieniono dane Lekarza");
});

module.exports = router;

router.post("/doctor/:doctorId/assign-schedule", (req, res) => {
  const doctorId = req.params.doctorId;
  const schedule = req.body;
  console.log(`Przypisano harmonogram do lekarza o ID: ${doctorId}`, schedule);
  res.status(200).json({ message: "Harmonogram przypisany pomyślnie" });
});
