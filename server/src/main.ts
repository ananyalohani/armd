import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import prisma from "./database";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/log", async (req, res) => {
  const log = req.body;
  console.log(req.body);
  res.json(log);
});

app.get("/persons", async (req, res) => {
  const persons = await prisma.person.findMany();
  res.json(persons);
});

app.get("/persons/:id", async (req, res) => {
  const person = await prisma.person.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}...`);
});
