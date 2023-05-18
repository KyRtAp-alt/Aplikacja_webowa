import express from 'express';
// import { Console } from 'console';
// import { Request, Response } from 'express';

const app = express() 
app.use(express.json())
app.get('/', function (req, res) { 
    res.send('Hello World!!!') 
}) 


app.listen(3000)