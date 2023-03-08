// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import assignStudentsMentors from "./router/assign.router.js";

const app = express();
const PORT = process.env.PORT;

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
console.log("Mongo is Connected!...")

app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("Lets Assign Mentor and Student");
});

app.use("/", assignStudentsMentors)

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client }