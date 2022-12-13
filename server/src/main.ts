import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { asynchronouslyProcessEvent } from './event';
import init from './init';
import Logger from './logger';
import { getEvents } from './services/clickhouse';
import prisma from './services/prisma';

const PORT = process.env.PORT || 3000;

const logger = new Logger('Node');

const app = express();
// Allow all origins
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(bodyParser.json());

app.set('trust proxy', true);
app.set('json spaces', 2);

app.post('/log', async (req, res) => {
  const event = req.body;
  if (!event?.data) {
    res.status(400).send('Missing event data');
    return;
  }
  const ipAddress = (req.ip || req.headers['x-forwarded-for'] || '') as string;
  asynchronouslyProcessEvent({ event: event.data, ipAddress });
  res.send('Logged');
});

app.post('/sessions', async (req, res) => {
  const { events, sessionId }: { events: any[]; sessionId: string } = req.body;

  try {
    let session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });
    if (!session) {
      session = await prisma.session.create({
        data: {
          id: sessionId,
          startTime: new Date(events[0].timestamp),
          endTime: new Date(events[events.length - 1].timestamp),
          events: {
            create: events.map((e) => ({
              type: e.type,
              timestamp: new Date(e.timestamp),
              data: e.data,
            })),
          },
        },
      });
    } else {
      await prisma.session.update({
        where: {
          id: sessionId,
        },
        data: {
          endTime: new Date(events[events.length - 1].timestamp),
        },
      });
      events.map(async (e) => {
        await prisma.sessionEvent.create({
          data: {
            type: e.type,
            timestamp: new Date(e.timestamp),
            data: e.data,
            sessionId: sessionId,
          },
        });
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/sessions', async (req, res) => {
  const sessions = await prisma.session.findMany({
    include: {
      events: true,
    },
    orderBy: {
      startTime: 'desc',
    },
  });
  console.log({ sessions });
  res.json(sessions);
});

app.get('/persons', async (req, res) => {
  const persons = await prisma.person.findMany();
  res.json(persons);
});

app.get('/persons/:id', async (req, res) => {
  const person = await prisma.person.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json(person);
});

app.get('/events', async (req, res) => {
  const events = await getEvents();
  res.json(events);
});

async function main() {
  await init(logger);
  app.listen(PORT, () => {
    logger.info(`Server running on port http://localhost:${PORT}...`);
  });
}

main();
