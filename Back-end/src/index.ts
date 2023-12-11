import express from "express";

// import { Request, Response } from "express";
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const doctor = require("./modules/doctor");
app.use("/doctor", doctor);

const blog = require("./modules/blog");
app.use("/blog", blog);

const ros = require("./modules/ros");
app.use("/ros", ros);

// const reservation = require("./modules/reservation");
// app.use("/reservation", reservation);

const schedule = require("./modules/schedule");
app.use("/schedule", schedule);

const visit = require("./modules/visit");
app.use("/visit", visit);

const scheme = require("./modules/scheme");
app.use("/scheme", scheme);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
