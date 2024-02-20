import express from "express";

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

import blogRouter from "./modules/blog";
app.use("/blog", blogRouter);

import rosRouter from "./modules/ros";
app.use("/ros", rosRouter);

import visitRouter from "./modules/visit";
app.use("/visit", visitRouter);

import schemeRouter from "./modules/scheme";
app.use("/scheme", schemeRouter);

const doctor = require("./modules/doctor");
app.use("/doctor", doctor);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
