// const express = require("express");
// const router = express.Router();
// const Harmonogram = require("../modules/scheme");

// router.get("/harmonogramy/:lekarzId", async (req, res) => {
//   const lekarzId = req.params.lekarzId;

//   try {
//     const harmonogramy = await Harmonogram.find({ lekarz: lekarzId });
//     res.json(harmonogramy);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Błąd serwera" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Lekarz = require("../modules/doctor");

// router.get("/lekarze/:id", async (req, res) => {
//   const lekarzId = req.params.id;

//   try {
//     const lekarz = await Lekarz.findById(lekarzId).populate("harmonogramId");
//     res.json(lekarz);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Błąd serwera" });
//   }
// });

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
