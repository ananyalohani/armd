import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { asynchronouslyProcessEvent } from './event';
import init from './init';
import Logger from './logger';
import {
  getCountries,
  getDomains,
  getEvents,
  getEventsById,
  getPageviews,
  getPaths,
} from './services/clickhouse';
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
    await prisma.session.upsert({
      where: { id: sessionId },
      create: {
        id: sessionId,
        startTime: new Date(events[0].timestamp),
        endTime: new Date(events[events.length - 1].timestamp),
      },
      update: {
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
    res.send('Logged');
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
  const events = (await getEvents()) as ClientEvent;
  res.json(events.data);
});

app.get('/events/pageviews', async (req, res) => {
  const { startTime, endTime } = req.query;
  if (!startTime) {
    res.json({
      message: 'Missing startTime',
    });
  }
  const pageviews = (await getPageviews(
    startTime as string,
    endTime as string | undefined
  )) as ClientEvent;
  res.json(pageviews.data);
});

app.get('/events/domains', async (req, res) => {
  const domains = (await getDomains()) as ClientEvent;
  res.json(domains.data);
});

app.get('/events/paths', async (req, res) => {
  const paths = (await getPaths()) as ClientEvent;
  res.json(paths.data);
});

app.get('/events/countries', async (req, res) => {
  const countries = (await getCountries()) as ClientEvent;
  res.json(countries.data);
});

app.get('/events/sessions', async (req, res) => {
  const { startTime, endTime } = req.query;
  if (!startTime) {
    res.json({
      message: 'Missing startTime',
    });
  }
  const sessions = await prisma.session.findMany({
    where: {
      startTime: {
        gte: new Date(parseInt(startTime as string)),
        lte: endTime ? new Date(parseInt(endTime as string)) : new Date(),
      },
    },
  });
  res.json(sessions);
});

app.get('/events/:id', async (req, res) => {
  const events = (await getEventsById(req.params.id)) as ClientEvent;
  res.json(events.data);
});

async function main() {
  await init(logger);
  app.listen(PORT, () => {
    logger.info(`Server running on port http://localhost:${PORT}...`);
  });
}

main();
