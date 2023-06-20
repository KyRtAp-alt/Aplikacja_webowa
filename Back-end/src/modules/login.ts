const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

const app = express();
app.use(bodyParser.json());

const mongoURI =
  "mongodb+srv://admin:Book54321@cluster0.qxenmyc.mongodb.net/Restauracja";
const client = new MongoClient(mongoURI);

// Endpoint do logowania
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection("users");

    // Sprawdzenie poprawności danych logowania w bazie danych
    const user = await usersCollection.findOne({
      username: username,
      password: password,
    });

    if (user) {
      // Generowanie tokena JWT
      const token = jwt.sign(
        { id: user._id, username: user.username },
        "secret_key"
      );

      // Zwracanie tokena jako odpowiedź
      res.json({ token });
    } else {
      res.status(401).json({ message: "Nieprawidłowe dane logowania" });
    }
  } catch (error) {
    console.error("Błąd logowania:", error);
    res.status(500).json({ message: "Wystąpił błąd logowania" });
  } finally {
    await client.close();
  }
});

// Middleware do weryfikacji tokena
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Endpoint chroniony tokenem
app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message:
      "Chroniony zasób dostępny tylko dla uwierzytelnionych użytkowników",
  });
});
