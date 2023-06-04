// import express from 'express';
// import { Console } from 'console';
// import { Request, Response } from 'express';

// const app = express()
// app.use(express.json());
// app.get('/', function (req, res) {
//     res.send('Hello World!!!')
// })

// app.listen(3000, () => {
//     console.log("Application started on port 3000!");
// });

import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

const doctor = require("./modules/doctor");
app.use("/doctor", doctor);

const blog = require("./modules/blog");
app.use("/blog", blog);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
