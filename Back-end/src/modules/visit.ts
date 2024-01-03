import express, { Request, Response } from "express";
import visitService from "../service/visit.service";

const router = express.Router();
router.use(express.json());

const withDB = async (callback: Function) => {
  try {
    await visitService.connectToDatabase();
    await callback();
  } catch (error) {
    console.error("Błąd podczas pracy z bazą danych:", error);
  } finally {
    await visitService.closeConnection();
  }
};

router.get("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await visitService.getVisits();
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send("Błąd podczas pobierania wizyt");
    }
  });
});

router.post("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await visitService.createVisit(req.body);
      res.status(200).send("Dodano wizytę");
    } catch (e) {
      res.status(500).send("Błąd podczas dodawania nowej wizyty");
    }
  });
});

router.get("/:lekarzId", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await visitService.getVisitsByDoctorId(
        req.params.lekarzId
      );
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Wystąpił błąd serwera");
    }
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await visitService.deleteVisit(req.params.id);
      if (result) {
        res.status(200).send("Usunięto wizytę");
      } else {
        res.status(404).send("Brak wizyty do usunięcia");
      }
    } catch (e) {
      res.status(500).send("Błąd podczas usuwania wizyty");
    }
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await visitService.updateVisit(req.params.id, req.body);
      res.status(200).send("Zmieniono dane wizyty");
    } catch (e) {
      res.status(500).send("Błąd podczas aktualizowania danych wizyty");
    }
  });
});

export default router;

// import { databaseUrl } from "../config";

// import express from "express";
// import { Request, Response } from "express";
// import { MongoClient, ObjectId } from "mongodb";

// const router = express.Router();
// router.use(express.json());
// const client = new MongoClient(databaseUrl);

// router.get("/", async (req: Request, res: Response) => {
//   await client.connect();
//   const db = client.db();
//   const collection = db.collection("visit");
//   const result = await collection.find();
//   let aray: Object[] = [];
//   result
//     .forEach((element) => {
//       aray.push(element);
//     })
//     .then(() => {
//       res.status(200).send(aray);
//     });
// });

// router.post("/", async (req: Request, res: Response) => {
//   await client.connect();
//   const db = client.db();
//   const collection = db.collection("visit");
//   await collection
//     .insertOne(req.body)
//     .then(() => res.status(200).send("Dodano wizyte"));
// });

// router.get("/:lekarzId", async (req: Request, res: Response) => {
//   try {
//     const lekarzId = req.params.lekarzId;
//     const db = client.db();
//     const collection = db.collection("visit");

//     // Znajdź wizyty dla danego lekarza
//     const result = await collection.find({ lekarz: lekarzId }).toArray();

//     // Odpowiedz z wynikami
//     res.status(200).send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Wystąpił błąd serwera");
//   }
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection("visit");
//     const id = new ObjectId(req.params.id);
//     const result = await collection.deleteOne({ _id: id });
//     if (result.deletedCount > 0) {
//       res.status(200).send("Usunięto wizyte");
//     } else {
//       res.status(404).send("Brak  wizyty do ununięcia");
//     }
//   } catch (e) {
//     res.status(400).send("Brak  wizyty do ununięcia");
//   }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//   await client.connect();
//   const db = client.db();
//   const collection = db.collection("visit");
//   const id = new ObjectId(req.params.id);
//   await collection.updateOne({ _id: id }, { $set: req.body });
//   res.status(200).send("Zmieniono dane wizyty");
// });

// module.exports = router;
