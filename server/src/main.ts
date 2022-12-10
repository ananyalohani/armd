import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { sendEvent } from "./services/kafka";
import prisma from "./services/prisma";
import init from "./init";
import Logger from "./logger";
import { asynchronouslyProcessEvent } from "./process-event";

const PORT = process.env.PORT || 3000;

const logger = new Logger("Node");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set("trust proxy", true);
app.set("json spaces", 2);

app.post("/log", async (req, res) => {
  const event = req.body;
  const ipAddress = (req.ip || req.headers["x-forwarded-for"] || "") as string;
  asynchronouslyProcessEvent({ event, ipAddress });
  res.send("Logged");
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

async function main() {
  await init(logger);
  app.listen(PORT, () => {
    logger.info(`Server running on port http://localhost:${PORT}...`);
  });
}

main();
