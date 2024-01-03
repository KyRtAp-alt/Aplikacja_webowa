import express, { Request, Response } from "express";
import rosService from "../service/ros.service";

const router = express.Router();
router.use(express.json());

const withDB = async (callback: Function) => {
  try {
    await rosService.connectToDatabase();
    await callback();
  } catch (error) {
    console.error("Błąd podczas pracy z bazą danych:", error);
  } finally {
    await rosService.closeConnection();
  }
};

router.get("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await rosService.getRosItems();
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send("Błąd podczas pobierania elementów ROS");
    }
  });
});

router.post("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await rosService.createRosItem(req.body);
      res.status(200).send("");
    } catch (e) {
      res.status(500).send("Błąd podczas dodawania nowego elementu ROS");
    }
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await rosService.deleteRosItem(req.params.id);
      if (result) {
        res.status(200).send("");
      } else {
        res.status(404).send("");
      }
    } catch (e) {
      res.status(500).send("");
    }
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await rosService.updateRosItem(req.params.id, req.body);
      res.status(200).send("");
    } catch (e) {
      res.status(500).send("Błąd podczas aktualizowania elementu ROS");
    }
  });
});

export default router;
