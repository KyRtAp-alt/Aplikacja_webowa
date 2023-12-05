import express from "express";
import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";

const doctorService = require("../service/doctorService");

const router = express.Router();
router.use(express.json());
const client = new MongoClient(
  "mongodb+srv://admin:Book54321@cluster0.qxenmyc.mongodb.net/Restauracja"
);

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

router.post("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  req.body.harmonogram = new ObjectId(req.body.harmonogram);
  console.log(req.body);
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
  // req.body.harmonogram = new ObjectId(req.body.harmonogram);
  const collection = db.collection("doctor");
  const id = new ObjectId(req.params.id);
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.status(200).send("Zmieniono dane Lekarza");
});

// router.post("/doctor/:doctorId/assign-schedule", (req, res) => {
//   const doctorId = req.params.doctorId;
//   const schedule = req.body;
//   console.log(`Przypisano harmonogram do lekarza o ID: ${doctorId}`, schedule);
//   res.status(200).json({ message: "Harmonogram przypisany pomyślnie" });
// });

module.exports = router;

// router.get("/", async (req, res) => {
//   try {
//     const doctors = await doctorService.getAllDoctors();
//     res.status(200).send(doctors);
//   } catch (error) {
//     console.error("Error while fetching doctors", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// export interface Doctor {
//   schedule: schedule;
// }

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const result = await doctorService.addDoctor(req.body);
//     res.status(200).send("Dodano Lekarza");
//   } catch (error) {
//     console.error("Error while adding doctor", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const doctorId = req.params.id;
//     const deletedCount = await doctorService.deleteDoctor(doctorId);
//     if (deletedCount > 0) {
//       res.status(200).send("Usunięto Lekarza");
//     } else {
//       res.status(404).send("Brak Lekarza do usunięcia");
//     }
//   } catch (error) {
//     console.error("Error while deleting doctor", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//   try {
//     const doctorId = req.params.id;
//     await doctorService.updateDoctor(doctorId, req.body);
//     res.status(200).send("Zmieniono dane Lekarza");
//   } catch (error) {
//     console.error("Error while updating doctor", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
