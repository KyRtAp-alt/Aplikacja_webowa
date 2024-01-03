import express, { Request, Response } from "express";
import harmonogramService from "../service/harmonogram.service";

const router = express.Router();
router.use(express.json());

const withDB = async (callback: Function) => {
  try {
    await harmonogramService.connectToDatabase();
    await callback();
  } catch (error) {
    console.error("Błąd podczas pracy z bazą danych:", error);
  } finally {
    await harmonogramService.closeConnection();
  }
};

router.get("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await harmonogramService.getHarmonogramItems();
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send("Błąd podczas pobierania harmonogramu");
    }
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await harmonogramService.getHarmonogramItemById(
        req.params.id
      );
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
    }
  });
});

router.post("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await harmonogramService.createHarmonogramItem(req.body);
      res.status(200).send("Dodano nowy harmonogram");
    } catch (e) {
      res.status(500).send("Błąd podczas dodawania nowego harmonogramu");
    }
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await harmonogramService.deleteHarmonogramItem(
        req.params.id
      );
      if (result) {
        res.status(200).send("Usunięto harmonogram");
      } else {
        res.status(404).send("Brak harmonogramu do usunięcia");
      }
    } catch (e) {
      res.status(500).send("Błąd podczas usuwania harmonogramu");
    }
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await harmonogramService.updateHarmonogramItem(req.params.id, req.body);
      res.status(200).send("Zmieniono zawartość harmonogramu");
    } catch (e) {
      res
        .status(500)
        .send("Błąd podczas aktualizowania zawartości harmonogramu");
    }
  });
});

export default router;
