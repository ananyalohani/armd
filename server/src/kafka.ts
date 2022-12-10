import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: process.env.KAFKA_BROKERS?.split(",") || [],
});

const producer = kafka.producer();
producer.connect();

export const sendLog = (log: any) =>
  producer.send({
    topic: process.env.KAFKA_TOPIC || "",
    messages: [{ value: JSON.stringify(log) }],
  });
