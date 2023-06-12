import express from "express";
import { Request, Response } from "express";
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const doctor = require("./modules/doctor");
app.use("/doctor", doctor);

const blog = require("./modules/blog");
app.use("/blog", blog);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
