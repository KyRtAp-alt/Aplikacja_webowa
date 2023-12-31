import express, { Request, Response } from "express";
import blogService from "../service/blog.service";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await blogService.getBlogPosts();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Błąd podczas pobierania wpisów na blogu");
  } finally {
    await blogService.closeConnection();
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await blogService.createBlogPost(req.body);
    res.status(200).send("Dodano nowy post na blogu");
  } catch (e) {
    res.status(500).send("Błąd podczas dodawania nowego posta na blogu");
  } finally {
    await blogService.closeConnection();
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const result = await blogService.deleteBlogPost(req.params.id);
    if (result) {
      res.status(200).send("Usunięto post na blogu");
    } else {
      res.status(404).send("Brak wpisu na blogu do usunięcia");
    }
  } catch (e) {
    res.status(500).send("Błąd podczas usuwania posta na blogu");
  } finally {
    await blogService.closeConnection();
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    await blogService.updateBlogPost(req.params.id, req.body);
    res.status(200).send("Zmieniono treść wpisu na blogu");
  } catch (e) {
    res.status(500).send("Błąd podczas aktualizowania treści wpisu na blogu");
  } finally {
    await blogService.closeConnection();
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await blogService.getBlogPostById(req.params.id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Brak wpisu na blogu o podanym ID");
    }
  } catch (e) {
    res.status(500).send("Błąd podczas pobierania wpisu na blogu");
  } finally {
    await blogService.closeConnection();
  }
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
//   const collection = db.collection("blog");
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
//   const collection = db.collection("blog");
//   await collection
//     .insertOne(req.body)
//     .then(() => res.status(200).send("Dodano nowy post na blogu"));
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection("blog");
//     const id = new ObjectId(req.params.id);
//     const result = await collection.deleteOne({ _id: id });
//     if (result.deletedCount > 0) {
//       res.status(200).send("Usunęto post na blogu");
//     } else {
//       res.status(404).send("Brak wpisu na blogu do usunięcia");
//     }
//   } catch (e) {
//     res.status(400).send("Brak wpisu na blogu do usunięcia");
//   }
// });

// router.put("/:id", async (req: Request, res: Response) => {
//   await client.connect();
//   const db = client.db();
//   const collection = db.collection("blog");
//   const id = new ObjectId(req.params.id);
//   await collection.updateOne({ _id: id }, { $set: req.body });
//   res.status(200).send("Zmieniono tresc wpisu na blogu");
// });

// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     await client.connect();
//     const id = new ObjectId(req.params.id);
//     const db = client.db();
//     const collection = db.collection("blog");
//     const result = await collection.findOne({ _id: id });
//     if (result) {
//       res.status(200).send(result);
//     } else {
//       res.status(404).send("Brak wpisu na blogu o podanym ID");
//     }
//   } catch (e) {
//     res.status(400).send("Błąd podczas pobierania wpisu na blogu");
//   }
// });

// module.exports = router;
