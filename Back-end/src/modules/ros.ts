import express, { Request, Response } from "express";
import rosService from "../service/ros.service";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await rosService.getRosItems();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Błąd podczas pobierania elementów ROS");
  } finally {
    await rosService.closeConnection();
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await rosService.createRosItem(req.body);
    res.status(200).send("");
  } catch (e) {
    res.status(500).send("Błąd podczas dodawania nowego elementu ROS");
  } finally {
    await rosService.closeConnection();
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await rosService.deleteRosItem(req.params.id);
    if (result) {
      res.status(200).send("");
    } else {
      res.status(404).send("");
    }
  } catch (e) {
    res.status(500).send("");
  } finally {
    await rosService.closeConnection();
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    await rosService.updateRosItem(req.params.id, req.body);
    res.status(200).send("");
  } catch (e) {
    res.status(500).send("Błąd podczas aktualizowania elementu ROS");
  } finally {
    await rosService.closeConnection();
  }
});

export default router;
