import { Kafka } from "kafkajs";
import Logger from "../logger";

const logger = new Logger("Kafka");

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS?.split(",") || [],
  logLevel: 1,
  logCreator:
    () =>
    ({ label, log, level }) => {
      if (level > 1) {
        logger.info(`[${label}] ${log.message}`);
      } else {
        logger.error(`[${label}] ${log.message}`);
      }
    },
});

const producer = kafka.producer();

export const init = async () => {
  try {
    logger.info("Connecting to Kafka...");
    producer.connect();
    logger.info("Connected to Kafka");
  } catch (error) {
    logger.error(`Failed to connect to Kafka: ${error}`);
  }
};

export const sendEvent = async (event: Partial<ClickHouseEvent>) => {
  try {
    const [record] = await producer.send({
      topic: process.env.KAFKA_TOPIC || "",
      messages: [
        {
          key: event.id,
          value: JSON.stringify(event),
        },
      ],
    });
    logger.info(
      `Sent event to Kafka: ${record.topicName}:${record.partition}:${record.baseOffset}`
    );
    return record;
  } catch (error) {
    logger.error(`Failed to send event to Kafka: ${error}`);
  }
};

const admin = kafka.admin();

// (async () => {
//   await admin.deleteTopics({
//     topics: ['armd-events'],
//   });
// })();
