const express = require("express");
const router = express.Router();
const Lekarz = require("../modules/doctor");

router.get("lekarze/:id", async (req, res) => {
  const lekarzId = req.params.id;

  try {
    const lekarz = await Lekarz.findById(lekarzId).populate("harmonogramId");
    res.json(lekarz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera" });
  }
});

module.exports = router;
