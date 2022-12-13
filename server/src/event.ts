import { getGeoData } from './services/maxmind';
import { sendEvent } from './services/kafka';
import prisma from './services/prisma';
import cuid from 'cuid';

const snakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const transformEvent = (event: ArmdEvent): Partial<ClickHouseEvent> => {
  const { id, type, sessionId, properties } = event;
  const datetime = new Date().toISOString().replace('T', ' ').split('.')[0];
  const clickhouseEvent: Partial<ClickHouseEvent> = {
    id,
    type,
    sessionId,
    datetime,
  };
  for (const [key, value] of Object.entries(properties)) {
    clickhouseEvent[`prop_${snakeCase(key)}`] = value;
  }
  return clickhouseEvent;
};

export const asynchronouslyProcessEvent = async ({
  event,
  ipAddress,
}: {
  event: ArmdEvent;
  ipAddress: string;
}) => {
  // Generate a CUID for the event
  event.id = cuid();

  // Get geo data from MaxMind and add it to the event
  const { country, continent } = getGeoData(ipAddress);
  event.properties = {
    ...event.properties,
    ipAddress,
    country,
    continent,
  };

  // Transform to clickhouse event
  const clickhouseEvent = transformEvent(event);

  // Create a Person record in Postgres if it doesn't exist
  const createPersonPromise = prisma.person.upsert({
    create: {
      ipAddress: event.properties.ipAddress,
      country: event.properties.country,
      continent: event.properties.continent,
    },
    update: {},
    where: {
      ipAddress: event.properties.ipAddress,
    },
  });

  // Send the event to Kafka
  const sendEventPromise = sendEvent(clickhouseEvent);

  // Wait for both promises to resolve
  await Promise.all([createPersonPromise, sendEventPromise]);

  return event;
};
