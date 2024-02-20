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
