import express, { Request, Response } from "express";
import blogService from "../service/blog.service";

const router = express.Router();
router.use(express.json());

const withDB = async (callback: Function) => {
  try {
    await blogService.connectToDatabase();
    await callback();
  } catch (error) {
    console.error("Błąd podczas pracy z bazą danych:", error);
  } finally {
    await blogService.closeConnection();
  }
};

router.get("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await blogService.getBlogPosts();
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send("Błąd podczas pobierania wpisów na blogu");
    }
  });
});

router.post("/", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await blogService.createBlogPost(req.body);
      res.status(200).send("Dodano nowy post na blogu");
    } catch (e) {
      res.status(500).send("Błąd podczas dodawania nowego posta na blogu");
    }
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await blogService.deleteBlogPost(req.params.id);
      if (result) {
        res.status(200).send("Usunięto post na blogu");
      } else {
        res.status(404).send("Brak wpisu na blogu do usunięcia");
      }
    } catch (e) {
      res.status(500).send("Błąd podczas usuwania posta na blogu");
    }
  });
});

router.put("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      await blogService.updateBlogPost(req.params.id, req.body);
      res.status(200).send("Zmieniono treść wpisu na blogu");
    } catch (e) {
      res.status(500).send("Błąd podczas aktualizowania treści wpisu na blogu");
    }
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  await withDB(async () => {
    try {
      const result = await blogService.getBlogPostById(req.params.id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Brak wpisu na blogu o podanym ID");
      }
    } catch (e) {
      res.status(500).send("Błąd podczas pobierania wpisu na blogu");
    }
  });
});

export default router;
